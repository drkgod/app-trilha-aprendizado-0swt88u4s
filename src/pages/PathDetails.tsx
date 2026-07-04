import { useParams, Link } from 'react-router-dom'
import { Play, CheckCircle2, Lock, Clock, BookOpen, ChevronRight } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CircularProgress } from '@/components/CircularProgress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export default function PathDetails() {
  const { id } = useParams()
  const { paths, getPathProgress, getLessonProgress, completedLessons, setActivePath } =
    useAppStore()

  const path = paths.find((p) => p.id === id)

  if (!path) {
    return <div className="p-8 text-center">Trilha não encontrada</div>
  }

  const progress = getPathProgress(path.id)

  // Find first uncompleted lesson for the "Continuar" button
  const allLessons = path.modules.flatMap((m) => m.lessons)
  const nextLesson = allLessons.find((l) => !completedLessons.includes(l.id)) || allLessons[0]

  const handleEnroll = () => {
    setActivePath(path.id)
  }

  return (
    <div className="pb-12 animate-fade-in">
      {/* Path Header Banner */}
      <div className="relative bg-foreground text-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={path.thumbnail} alt="" className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Badge variant="secondary" className="bg-primary text-primary-foreground border-none">
                {path.difficulty}
              </Badge>
              <span className="text-sm text-gray-300 flex items-center gap-1">
                <Clock size={14} /> {path.totalDuration}
              </span>
              <span className="text-sm text-gray-300 flex items-center gap-1">
                <BookOpen size={14} /> {path.modules.length} Módulos
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{path.title}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto md:mx-0">{path.description}</p>

            <div className="pt-4">
              <Link to={`/lesson/${path.id}/${nextLesson.id}`} onClick={handleEnroll}>
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg gap-2 shadow-lg hover:scale-105 transition-transform"
                >
                  <Play className="fill-current" />
                  {progress > 0 ? 'Continuar Trilha' : 'Começar Agora'}
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
            <CircularProgress value={progress} size={120} strokeWidth={8} className="text-white" />
            <span className="mt-4 font-medium text-sm text-gray-200">Progresso Atual</span>
          </div>
        </div>
      </div>

      {/* Modules Roadmap View */}
      <div className="container max-w-3xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">Roteiro de Estudos</h2>

        <Accordion type="multiple" defaultValue={[path.modules[0].id]} className="space-y-6">
          {path.modules.map((module, mIndex) => {
            return (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="bg-card border rounded-xl overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]>div>div>.indicator]:rotate-90">
                  <div className="flex items-center gap-4 text-left flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {mIndex + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-2 pb-4 px-2">
                  <div className="space-y-1 relative before:absolute before:inset-y-4 before:left-8 before:w-0.5 before:bg-border">
                    {module.lessons.map((lesson) => {
                      const { isUnlocked } = getLessonProgress(lesson.id, path.id)
                      const isCompleted = completedLessons.includes(lesson.id)
                      const isActive = nextLesson.id === lesson.id

                      return (
                        <div
                          key={lesson.id}
                          className={cn(
                            'relative flex items-center gap-4 p-3 rounded-lg ml-3 mr-3 transition-colors group',
                            isActive ? 'bg-primary/5' : 'hover:bg-muted',
                            !isUnlocked && 'opacity-60',
                          )}
                        >
                          {/* Timeline Node */}
                          <div
                            className={cn(
                              'relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-card border-2 transition-colors',
                              isCompleted
                                ? 'border-secondary text-secondary'
                                : isActive
                                  ? 'border-primary text-primary shadow-sm'
                                  : 'border-muted-foreground/30 text-muted-foreground',
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={20} className="fill-secondary/20" />
                            ) : isUnlocked ? (
                              <Play size={16} className={cn(isActive && 'fill-current ml-1')} />
                            ) : (
                              <Lock size={16} />
                            )}
                          </div>

                          {/* Lesson Content */}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={cn(
                                'font-medium truncate transition-colors',
                                isActive ? 'text-primary font-bold' : 'text-foreground',
                              )}
                            >
                              {lesson.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span className="capitalize">{lesson.type}</span>
                              <span>•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex-shrink-0 pr-2">
                            {isUnlocked ? (
                              <Link to={`/lesson/${path.id}/${lesson.id}`}>
                                <Button
                                  variant={isActive ? 'default' : 'ghost'}
                                  size="sm"
                                  className={cn(
                                    'rounded-full',
                                    !isActive &&
                                      'opacity-0 group-hover:opacity-100 transition-opacity',
                                  )}
                                >
                                  {isCompleted ? 'Revisar' : 'Acessar'}
                                </Button>
                              </Link>
                            ) : (
                              <Lock size={16} className="text-muted-foreground mr-4" />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
