import React, { createContext, useContext, useState, useMemo } from 'react'

export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'article' | 'quiz'
  contentUrl?: string
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Path {
  id: string
  title: string
  description: string
  thumbnail: string
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  totalDuration: string
  modules: Module[]
}

interface AppState {
  paths: Path[]
  completedLessons: string[]
  notes: Record<string, string>
  activePathId: string | null
  streak: number
  toggleLesson: (lessonId: string) => void
  saveNote: (lessonId: string, note: string) => void
  setActivePath: (pathId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
  getPathProgress: (pathId: string) => number
  getLessonProgress: (
    lessonId: string,
    pathId: string,
  ) => { isUnlocked: boolean; previousCompleted: boolean }
}

const mockPaths: Path[] = [
  {
    id: 'p1',
    title: 'Fundamentos do Desenvolvimento Web',
    description:
      'Aprenda as bases da web construindo páginas com HTML, estilizando com CSS e adicionando interatividade com JavaScript moderno.',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=code&color=blue',
    difficulty: 'Iniciante',
    totalDuration: '12h 30m',
    modules: [
      {
        id: 'm1',
        title: 'Introdução ao HTML5',
        description: 'Estrutura, semântica e boas práticas.',
        lessons: [
          { id: 'l1', title: 'O que é a Web?', duration: '15m', type: 'video' },
          { id: 'l2', title: 'Estruturando sua primeira página', duration: '25m', type: 'video' },
          { id: 'l3', title: 'Tags Semânticas', duration: '20m', type: 'article' },
        ],
      },
      {
        id: 'm2',
        title: 'Estilizando com CSS3',
        description: 'Cores, layouts e responsividade.',
        lessons: [
          { id: 'l4', title: 'Seletores e Cascatas', duration: '30m', type: 'video' },
          { id: 'l5', title: 'Flexbox na Prática', duration: '45m', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'p2',
    title: 'Mestrando React e Ecossistema',
    description:
      'Domine a biblioteca mais popular do mercado. Aprenda hooks, gerenciamento de estado e crie interfaces dinâmicas e rápidas.',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=react&color=cyan',
    difficulty: 'Intermediário',
    totalDuration: '24h 00m',
    modules: [
      {
        id: 'm3',
        title: 'Fundamentos do React',
        description: 'Componentes, Props e Estado local.',
        lessons: [
          { id: 'l6', title: 'Pensando em React', duration: '20m', type: 'video' },
          { id: 'l7', title: 'useState e Interatividade', duration: '35m', type: 'video' },
        ],
      },
    ],
  },
  {
    id: 'p3',
    title: 'UI/UX para Desenvolvedores',
    description:
      'Melhore o design das suas aplicações entendendo princípios fundamentais de usabilidade e interface de usuário.',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=design&color=purple',
    difficulty: 'Avançado',
    totalDuration: '8h 45m',
    modules: [
      {
        id: 'm4',
        title: 'Princípios de Design Visual',
        description: 'Hierarquia, contraste e alinhamento.',
        lessons: [{ id: 'l8', title: 'Tipografia Básica', duration: '25m', type: 'video' }],
      },
    ],
  },
]

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1', 'l2'])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [activePathId, setActivePathId] = useState<string | null>('p1')

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId],
    )
  }

  const saveNote = (lessonId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [lessonId]: note }))
  }

  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId)

  const getPathProgress = (pathId: string) => {
    const path = mockPaths.find((p) => p.id === pathId)
    if (!path) return 0
    const allLessons = path.modules.flatMap((m) => m.lessons)
    if (allLessons.length === 0) return 0
    const completed = allLessons.filter((l) => completedLessons.includes(l.id)).length
    return Math.round((completed / allLessons.length) * 100)
  }

  const getLessonProgress = (lessonId: string, pathId: string) => {
    const path = mockPaths.find((p) => p.id === pathId)
    if (!path) return { isUnlocked: false, previousCompleted: false }

    const allLessons = path.modules.flatMap((m) => m.lessons)
    const index = allLessons.findIndex((l) => l.id === lessonId)

    if (index === 0) return { isUnlocked: true, previousCompleted: true }
    if (index === -1) return { isUnlocked: false, previousCompleted: false }

    const previousLesson = allLessons[index - 1]
    const prevCompleted = isLessonCompleted(previousLesson.id)

    return {
      isUnlocked: prevCompleted || isLessonCompleted(lessonId),
      previousCompleted: prevCompleted,
    }
  }

  const value = useMemo(
    () => ({
      paths: mockPaths,
      completedLessons,
      notes,
      activePathId,
      streak: 12,
      toggleLesson,
      saveNote,
      setActivePath: setActivePathId,
      isLessonCompleted,
      getPathProgress,
      getLessonProgress,
    }),
    [completedLessons, notes, activePathId],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider')
  }
  return context
}
