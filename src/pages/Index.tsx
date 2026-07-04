import { Link } from 'react-router-dom'
import { Play, Clock, Flame, Award, BookOpen } from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function Index() {
  const { paths, activePathId, streak, getPathProgress, completedLessons } = useAppStore()

  const activePath = paths.find((p) => p.id === activePathId) || paths[0]
  const activeProgress = getPathProgress(activePath.id)

  // Find next lesson to watch
  const allLessons = activePath.modules.flatMap((m) => m.lessons)
  const nextLesson = allLessons.find((l) => !completedLessons.includes(l.id)) || allLessons[0]

  return (
    <div className="container max-w-6xl mx-auto py-8 space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Olá, João! 👋</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Pronto para continuar sua jornada de aprendizado hoje?
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft border">
            <Flame className="text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Ofensiva</p>
              <p className="font-bold">{streak} dias</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-soft border">
            <Award className="text-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Concluídas</p>
              <p className="font-bold">{completedLessons.length} aulas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning Card */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Continuar Aprendendo</h2>
        <Card className="overflow-hidden border-none shadow-soft bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto">
              <img
                src={activePath.thumbnail}
                alt={activePath.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary hover:bg-primary/20"
                >
                  Trilha Ativa
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <BookOpen size={14} /> {activePath.title}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{nextLesson.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                Continue de onde parou. Você está quase terminando este módulo!
              </p>

              <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>Progresso da Trilha</span>
                    <span>{activeProgress}%</span>
                  </div>
                  <Progress value={activeProgress} className="h-2" />
                </div>
                <Link to={`/lesson/${activePath.id}/${nextLesson.id}`}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/25 group"
                  >
                    <Play
                      size={18}
                      className="fill-current group-hover:scale-110 transition-transform"
                    />
                    Retomar Aula
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Explore Paths Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Trilhas em Destaque</h2>
          <Link to="/explore" className="text-sm text-primary font-medium hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => {
            const progress = getPathProgress(path.id)
            return (
              <Link key={path.id} to={`/path/${path.id}`} className="block group">
                <Card className="h-full border-transparent hover:border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={path.thumbnail}
                      alt={path.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 backdrop-blur-sm font-semibold"
                      >
                        {path.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0 flex-1">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {path.description}
                    </p>
                  </CardHeader>
                  <CardFooter className="p-4 pt-4 flex flex-col gap-4 mt-auto border-t border-border/50">
                    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {path.totalDuration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={16} />
                        {path.modules.length} Módulos
                      </div>
                    </div>
                    {progress > 0 && (
                      <div className="w-full space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span>Progresso</span>
                          <span className="text-primary">{progress}%</span>
                        </div>
                        <Progress
                          value={progress}
                          className="h-1.5 bg-secondary/20"
                          indicatorClassName="bg-secondary"
                        />
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
