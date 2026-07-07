import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Loader2, Sparkles, X, MessageCircle } from 'lucide-react'
import type { Trail } from '@/data/types'
import { buildTrailKnowledge } from '@/data/trail-knowledge'
import { parseChatStream } from '@/lib/skipAi'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function TrailTutor({ trail }: { trail: Trail }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const suggestions = [
    'Me explica o conceito principal desta trilha',
    'Qual o erro mais comum que as pessoas cometem aqui?',
    'Me dá um exemplo prático aplicado a consultoria',
    'Quero debater: quando isso NÃO faz sentido usar?',
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streaming])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || streaming) return
      setError(null)
      setInput('')
      const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
      setMessages(nextMessages)
      setStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(`${import.meta.env.VITE_POCKETBASE_URL}/backend/v1/tutor-chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: pb.authStore.token,
          },
          body: JSON.stringify({
            trailName: trail.name,
            trailKnowledge: buildTrailKnowledge(trail),
            messages: nextMessages,
          }),
          signal: controller.signal,
        })

        if (!res.ok) {
          let msg = 'O tutor está indisponível no momento.'
          try {
            const body = await res.clone().json()
            if (body?.message) msg = body.message
          } catch {
            /* ignore */
          }
          setError(msg)
          setStreaming(false)
          return
        }

        // Placeholder da resposta que vai sendo preenchido pelo stream.
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
        let acc = ''
        for await (const chunk of parseChatStream(res, controller.signal)) {
          const delta = chunk.choices?.[0]?.delta?.content
          if (typeof delta === 'string') {
            acc += delta
            setMessages((prev) => {
              const copy = [...prev]
              copy[copy.length - 1] = { role: 'assistant', content: acc }
              return copy
            })
          }
        }
        if (!acc) {
          setError('Não recebi resposta do tutor. Tente novamente.')
          setMessages((prev) => prev.slice(0, -1))
        }
      } catch (e) {
        if ((e as Error)?.name !== 'AbortError') {
          setError('Falha ao falar com o tutor. Verifique a conexão e tente de novo.')
        }
      } finally {
        setStreaming(false)
        abortRef.current = null
      }
    },
    [messages, streaming, trail],
  )

  const stop = () => {
    abortRef.current?.abort()
    setStreaming(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="btn-glow inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
      >
        <MessageCircle className="h-4 w-4" /> Falar com o tutor da trilha
      </button>
    )
  }

  return (
    <div className="glass flex h-[560px] flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${trail.color}22` }}
          >
            <Sparkles className="h-4 w-4" style={{ color: trail.color }} />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Tutor · {trail.name}</p>
            <p className="text-[11px] text-muted-foreground">Tire dúvidas e debata o conteúdo</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mensagens */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <div className="space-y-4 py-4">
            <p className="text-center text-sm text-muted-foreground">
              Pergunte o que quiser sobre <span className="font-semibold">{trail.name}</span>. O
              tutor conhece todo o conteúdo da trilha.
            </p>
            <div className="grid gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-left text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-secondary/50 text-foreground/90',
              )}
            >
              {m.content || (
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> pensando…
                </span>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
            placeholder="Escreva sua dúvida… (Enter envia, Shift+Enter quebra linha)"
            className="max-h-32 min-h-[44px] flex-1 resize-none bg-secondary/40 text-sm"
            disabled={streaming}
          />
          {streaming ? (
            <Button onClick={stop} variant="secondary" className="h-11 shrink-0 gap-1.5">
              <Loader2 className="h-4 w-4 animate-spin" /> Parar
            </Button>
          ) : (
            <Button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="btn-glow h-11 shrink-0 gap-1.5 font-semibold"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
