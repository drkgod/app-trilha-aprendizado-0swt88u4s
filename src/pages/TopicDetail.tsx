import { useState } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Layers,
  ListChecks,
  Newspaper,
  Play,
  Swords,
  Wrench,
  Zap,
} from 'lucide-react'
import { useAppStore } from '@/hooks/use-app-store'
import { getTopicById } from '@/data/trails'
import { getQuizForTopic } from '@/data/quizzes'
import type { RefKind } from '@/data/types'
import { QuizRunner } from '@/components/QuizRunner'
import { ConfettiEffect } from '@/components/ConfettiEffect'
import { useActivityTracker } from '@/hooks/use-activity-tracker'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const refIcons: Record<RefKind, typeof BookOpen> = {
  doc: BookOpen,
  curso: GraduationCap,
  video: Play,
  artigo: Newspaper,
  tool: Wrench,
}

const refLabels: Record<RefKind, string> = {
  doc: 'Doc',
  curso: 'Curso',
  video: 'Vídeo',
  artigo: 'Artigo',
  tool: 'Ferramenta',
}

const priorityStyle: Record<string, { label: string; className: string }> = {
  alta: { label: '🔴 Prioridade alta', className: 'border-red-500/40 bg-red-500/10 text-red-300' },
  media: {
    label: '🟡 Prioridade média',
    className: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300',
  },
  baixa: {
    label: '🟢 Prioridade baixa',
    className: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  },
}

export default function TopicDetail() {
  const { trailId, topicId } = useParams<{ trailId: string; topicId: string }>()
  const navigate = useNavigate()
  const { isTopicCompleted, toggleTopic } = useAppStore()
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [celebrate, setCelebrate] = useState(false)
  const [saving, setSaving] = useState(false)

  const { trail, topic } =
    trailId && topicId ? getTopicById(trailId, topicId) : { trail: undefined, topic: undefined }
  const completed = topic ? isTopicCompleted(topic.id) : false
  useActivityTracker(trail?.id ?? '', topic?.id ?? '', completed)

  if (!trail || !topic) return <Navigate to="/trails" replace />
  const isBoss = topic.type === 'boss'
  const quiz = isBoss ? getQuizForTopic(topic.id) : []

  const topicIdx = trail.topics.findIndex((t) => t.id === topic.id)
  const nextInTrail = trail.topics[topicIdx + 1] ?? null

  const handleComplete = async () => {
    if (completed || saving) return
    setSaving(true)
    try {
      await toggleTopic(topic, trail.id)
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 2500)
    } catch (e) {
      console.error('Erro ao salvar progresso:', e)
    } finally {
      setSaving(false)
    }
  }

  const handleUncomplete = async () => {
    if (!completed || saving) return
    setSaving(true)
    try {
      await toggleTopic(topic, trail.id)
    } catch (e) {
      console.error('Erro ao salvar progresso:', e)
    } finally {
      setSaving(false)
    }
  }

  const prio = priorityStyle[topic.priority]

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {celebrate && <ConfettiEffect />}

      <header className="animate-fade-up">
        <Link
          to={`/trail/${trail.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {trail.name}
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="pill" style={{ borderColor: `${trail.color}55`, color: trail.color }}>
            {isBoss ? <Swords className="h-3.5 w-3.5" /> : null}
            {isBoss ? 'Boss fight' : `Etapa ${topic.index}`}
          </span>
          <span className={cn('pill', prio.className)}>{prio.label}</span>
          <span className="pill">
            <Zap className="h-3.5 w-3.5" /> +{topic.xp} XP
          </span>
          <span className="pill">
            <Clock className="h-3.5 w-3.5" /> ~{topic.estMinutes} min
          </span>
          {completed && (
            <span className="pill pill-glow">
              <CheckCircle2 className="h-3.5 w-3.5" /> Concluída
            </span>
          )}
        </div>

        <h1 className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
          {topic.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{topic.shortDescription}</p>
      </header>

      {/* Concept */}
      <section className="glass animate-fade-up p-6 sm:p-7" style={{ animationDelay: '80ms' }}>
        <span className="kicker">
          <BookOpen className="mr-1 h-3.5 w-3.5" /> Conceito
        </span>
        <p className="mt-3 leading-relaxed text-foreground/90">{topic.concept}</p>
      </section>

      {topic.deepDive.length > 0 && (
        <section className="glass animate-fade-up p-6 sm:p-7" style={{ animationDelay: '120ms' }}>
          <span className="kicker">
            <Layers className="mr-1 h-3.5 w-3.5" /> Aprofundando
          </span>
          <ul className="mt-4 space-y-3">
            {topic.deepDive.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {topic.pitfalls.length > 0 && (
        <section
          className="animate-fade-up rounded-2xl border border-orange-500/25 bg-orange-500/5 p-6 sm:p-7"
          style={{ animationDelay: '160ms' }}
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Armadilhas clássicas
          </span>
          <ul className="mt-4 space-y-3">
            {topic.pitfalls.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                <span className="mt-0.5 text-orange-400">⚠</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {topic.practiceSteps.length > 0 && (
        <section className="glass animate-fade-up p-6 sm:p-7" style={{ animationDelay: '200ms' }}>
          <span className="kicker">
            <ListChecks className="mr-1 h-3.5 w-3.5" /> Prática — mão na massa
          </span>
          <div className="mt-4 space-y-2.5">
            {topic.practiceSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-all',
                  checked[i]
                    ? 'border-primary/40 bg-primary/5 text-muted-foreground line-through'
                    : 'border-border bg-secondary/40 hover:border-primary/30',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors',
                    checked[i] ? 'border-primary bg-primary' : 'border-muted-foreground/40',
                  )}
                >
                  {checked[i] && (
                    <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                  )}
                </span>
                <span className="leading-relaxed">{step}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {topic.projectContext && (
        <section
          className="animate-fade-up rounded-2xl border p-6 sm:p-7"
          style={{
            animationDelay: '240ms',
            borderColor: `${trail.color}35`,
            background: `${trail.color}0a`,
          }}
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: trail.color }}
          >
            <Briefcase className="h-3.5 w-3.5" /> No projeto do cliente
          </span>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85">{topic.projectContext}</p>
        </section>
      )}

      {topic.references.length > 0 && (
        <section className="glass animate-fade-up p-6 sm:p-7" style={{ animationDelay: '280ms' }}>
          <span className="kicker">
            <GraduationCap className="mr-1 h-3.5 w-3.5" /> Curadoria — vá além
          </span>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {topic.references.map((ref, i) => {
              const Icon = refIcons[ref.kind]
              return (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3.5 transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4.5 w-4.5 h-5 w-5 text-primary" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{ref.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {refLabels[ref.kind]}
                    </span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )
            })}
          </div>
        </section>
      )}

      {/* Boss quiz OR complete button */}
      {isBoss ? (
        <section className="animate-fade-up space-y-4" style={{ animationDelay: '320ms' }}>
          <div className="text-center">
            <span className="kicker justify-center">
              <Swords className="mr-1 h-3.5 w-3.5" /> Hora do desafio
            </span>
            <h2 className="font-display mt-2 text-2xl font-bold">Derrote o boss</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Acerte 4 de 5 para conquistar +{topic.xp} XP.
            </p>
          </div>
          {completed ? (
            <div className="glass p-8 text-center">
              <span className="text-4xl">🏆</span>
              <h3 className="font-display mt-3 text-xl font-bold">Boss já derrotado!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Você venceu este desafio. Siga a jornada.
              </p>
            </div>
          ) : (
            <QuizRunner questions={quiz} onPass={handleComplete} />
          )}
        </section>
      ) : (
        <section className="animate-fade-up" style={{ animationDelay: '320ms' }}>
          {completed ? (
            <div className="glass flex flex-col items-center gap-3 p-6 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <p className="font-semibold">Etapa concluída · +{topic.xp} XP no bolso</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUncomplete}
                disabled={saving}
                className="text-muted-foreground"
              >
                Desmarcar
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={saving}
              className="btn-glow h-14 w-full text-base font-bold"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              {saving ? 'Salvando…' : `Concluir etapa · +${topic.xp} XP`}
            </Button>
          )}
        </section>
      )}

      {/* Next */}
      {nextInTrail && (
        <section className="animate-fade-up" style={{ animationDelay: '360ms' }}>
          <button
            onClick={() => navigate(`/trail/${trail.id}/topic/${nextInTrail.id}`)}
            className="glass glass-hover group flex w-full items-center gap-4 p-5 text-left"
          >
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Próxima etapa
              </span>
              <p className="font-display mt-0.5 truncate font-bold">{nextInTrail.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </button>
        </section>
      )}
    </div>
  )
}
