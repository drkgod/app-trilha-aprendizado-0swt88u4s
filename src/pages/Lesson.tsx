import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  List,
  FileText,
} from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function Lesson() {
  const { pathId, lessonId } = useParams()
  const navigate = useNavigate()
  const { paths, completedLessons, toggleLesson, notes, saveNote } = useAppStore()
  const { toast } = useToast()

  const [noteText, setNoteText] = useState('')
  const [isCelebrating, setIsCelebrating] = useState(false)

  const path = paths.find((p) => p.id === pathId)

  useEffect(() => {
    if (lessonId && notes[lessonId]) {
      setNoteText(notes[lessonId])
    } else {
      setNoteText('')
    }
  }, [lessonId, notes])

  if (!path || !lessonId) return <div>Aula não encontrada</div>

  const allLessons = path.modules.flatMap((m) => m.lessons)
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const currentLesson = allLessons[currentIndex]

  if (!currentLesson) return <div>Aula não encontrada</div>

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  const isCompleted = completedLessons.includes(lessonId)

  const handleComplete = () => {
    toggleLesson(lessonId)
    if (!isCompleted) {
      setIsCelebrating(true)
      toast({
        title: 'Parabéns! 🎉',
        description: 'Você concluiu esta aula com sucesso.',
        className: 'bg-secondary text-secondary-foreground border-none',
      })
      setTimeout(() => setIsCelebrating(false), 1000)
    }
  }

  const handleSaveNote = () => {
    saveNote(lessonId, noteText)
    toast({
      title: 'Nota salva',
      description: 'Suas anotações foram salvas localmente.',
    })
  }

  // Right sidebar content (Table of Contents)
  const TocContent = () => (
    <div className="space-y-6">
      {path.modules.map((module) => (
        <div key={module.id} className="space-y-2">
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground px-2">
            {module.title}
          </h4>
          <div className="space-y-1">
            {module.lessons.map((lesson) => {
              const isCurrent = lesson.id === lessonId
              const isDone = completedLessons.includes(lesson.id)
              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${path.id}/${lesson.id}`}
                  className={cn(
                    'flex items-center gap-3 p-2 rounded-md text-sm transition-colors',
                    isCurrent ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted',
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-secondary shrink-0" />
                  ) : (
                    <PlayCircle
                      size={16}
                      className={cn(
                        'shrink-0',
                        isCurrent ? 'text-primary' : 'text-muted-foreground',
                      )}
                    />
                  )}
                  <span className="line-clamp-1">{lesson.title}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Top Nav Bar specific to lesson */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/path/${path.id}`)}>
            <ArrowLeft size={20} />
          </Button>
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground">{path.title}</p>
            <h2 className="font-semibold text-sm truncate max-w-[300px]">{currentLesson.title}</h2>
          </div>
        </div>

        {/* Mobile TOC Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <List size={16} />
                Conteúdo
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="mb-4 text-left">
                <SheetTitle>Roteiro da Trilha</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <TocContent />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar scroll-smooth relative">
          <div className="max-w-4xl w-full mx-auto p-4 md:p-8 flex-1 flex flex-col animate-slide-in-right">
            {/* Video Player Placeholder */}
            <div className="w-full aspect-video bg-black rounded-xl shadow-lg relative overflow-hidden group flex items-center justify-center">
              <img
                src={`https://img.usecurling.com/p/1280/720?q=${currentLesson.type === 'video' ? 'video%20player' : 'reading'}&color=black`}
                alt="Content placeholder"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="z-10 bg-primary/90 text-primary-foreground rounded-full p-4 cursor-pointer transform group-hover:scale-110 transition-transform duration-300">
                <PlayCircle size={48} className="fill-current" />
              </div>
            </div>

            {/* Lesson Info & Actions */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{currentLesson.title}</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Nesta aula você aprenderá conceitos fundamentais essenciais para o seu progresso
                  na trilha.
                </p>
              </div>

              <Button
                onClick={handleComplete}
                size="lg"
                variant={isCompleted ? 'outline' : 'default'}
                className={cn(
                  'shrink-0 gap-2 h-12 px-6 shadow-sm transition-all duration-300',
                  isCompleted && 'border-secondary text-secondary hover:bg-secondary/10',
                  isCelebrating && 'animate-pop bg-secondary text-white border-none',
                )}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 size={20} className="fill-current" />
                    Concluída
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    Marcar como Concluída
                  </>
                )}
              </Button>
            </div>

            {/* Notes Section */}
            <div className="mt-12 bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <FileText size={20} className="text-primary" />
                Minhas Anotações
              </h3>
              <Textarea
                placeholder="Faça anotações sobre esta aula para revisar depois..."
                className="min-h-[150px] resize-y bg-muted/30 focus-visible:ring-primary/50 text-base"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onBlur={handleSaveNote}
              />
              <p className="text-xs text-muted-foreground mt-2 text-right">
                Salvo automaticamente ao sair do campo
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-auto pt-12 flex items-center justify-between pb-8">
              {prevLesson ? (
                <Link to={`/lesson/${path.id}/${prevLesson.id}`}>
                  <Button variant="outline" className="gap-2">
                    <ChevronLeft size={16} />
                    Aula Anterior
                  </Button>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link to={`/lesson/${path.id}/${nextLesson.id}`}>
                  <Button className="gap-2">
                    Próxima Aula
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              ) : (
                <Button variant="secondary" onClick={() => navigate(`/path/${path.id}`)}>
                  Concluir Trilha
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Sidebar (Table of Contents) */}
        <aside className="hidden lg:block w-80 border-l bg-card shrink-0 h-full overflow-hidden flex-col">
          <div className="p-4 border-b font-semibold">Conteúdo da Trilha</div>
          <ScrollArea className="flex-1 p-4">
            <TocContent />
          </ScrollArea>
        </aside>
      </div>
    </div>
  )
}
