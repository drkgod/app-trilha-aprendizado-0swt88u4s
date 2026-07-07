import { useEffect, useRef, useState, useCallback } from 'react'

// Rastreia sinais de integridade durante uma avaliação:
// - saídas de aba / perda de foco (visibilitychange + blur)
// - tentativas de colar e copiar (bloqueadas e contadas)
// - tempo total e tempo por questão
// Não impede o uso de outro dispositivo — cria fricção e registro honesto.
export interface IntegrityTracker {
  visibilitySwitches: number
  pasteBlocks: number
  copyBlocks: number
  elapsedSeconds: number
  markQuestionStart: () => void
  takeQuestionTime: () => number
  reset: () => void
  showWarning: boolean
  dismissWarning: () => void
}

export function useEvalIntegrity(active: boolean): IntegrityTracker {
  const [visibilitySwitches, setVisibilitySwitches] = useState(0)
  const [pasteBlocks, setPasteBlocks] = useState(0)
  const [copyBlocks, setCopyBlocks] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [showWarning, setShowWarning] = useState(false)

  const startRef = useRef<number>(Date.now())
  const questionStartRef = useRef<number>(Date.now())

  const reset = useCallback(() => {
    setVisibilitySwitches(0)
    setPasteBlocks(0)
    setCopyBlocks(0)
    setElapsedSeconds(0)
    setShowWarning(false)
    startRef.current = Date.now()
    questionStartRef.current = Date.now()
  }, [])

  const markQuestionStart = useCallback(() => {
    questionStartRef.current = Date.now()
  }, [])

  const takeQuestionTime = useCallback(() => {
    return Math.round((Date.now() - questionStartRef.current) / 1000)
  }, [])

  const dismissWarning = useCallback(() => setShowWarning(false), [])

  // Cronômetro total
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => {
      setElapsedSeconds(Math.round((Date.now() - startRef.current) / 1000))
    }, 1000)
    return () => clearInterval(t)
  }, [active])

  // Saída de aba / perda de foco
  useEffect(() => {
    if (!active) return
    const onVisibility = () => {
      if (document.hidden) {
        setVisibilitySwitches((n) => n + 1)
        setShowWarning(true)
      }
    }
    const onBlur = () => {
      setVisibilitySwitches((n) => n + 1)
      setShowWarning(true)
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
    }
  }, [active])

  // Bloqueio de colar / copiar / menu de contexto
  useEffect(() => {
    if (!active) return
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault()
      setPasteBlocks((n) => n + 1)
      setShowWarning(true)
    }
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      setCopyBlocks((n) => n + 1)
    }
    const onContextMenu = (e: MouseEvent) => e.preventDefault()
    document.addEventListener('paste', onPaste)
    document.addEventListener('copy', onCopy)
    document.addEventListener('cut', onCopy)
    document.addEventListener('contextmenu', onContextMenu)
    return () => {
      document.removeEventListener('paste', onPaste)
      document.removeEventListener('copy', onCopy)
      document.removeEventListener('cut', onCopy)
      document.removeEventListener('contextmenu', onContextMenu)
    }
  }, [active])

  return {
    visibilitySwitches,
    pasteBlocks,
    copyBlocks,
    elapsedSeconds,
    markQuestionStart,
    takeQuestionTime,
    reset,
    showWarning,
    dismissWarning,
  }
}
