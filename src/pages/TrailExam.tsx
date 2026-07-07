import { useState } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Clock, Ban, Eye, FileText, Sparkles } from 'lucide-react'
import { getTrailById } from '@/data/trails'
import {
  getEvalBank,
  hasEvalBank,
  EXAM_QUESTIONS,
  EXAM_PASS_PERCENT,
  EXAM_SECONDS,
} from '@/data/eval-banks'
import { EvalRunner } from '@/components/EvalRunner'
import { ConfettiEffect } from '@/components/ConfettiEffect'
import { Button } from '@/components/ui/button'

export default function TrailExam() {
  const { trailId } = useParams<{ trailId: string }>()
  const navigate = useNavigate()
  const trail = trailId ? getTrailById(trailId) : undefined
  const [started, setStarted] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  if (!trail) return <Navigate to="/trails" replace />

  const available = hasEvalBank(trail.id)
  const bank = getEvalBank(trail.id)

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
            <ShieldCheck className="h-3.5 w-3.5" /> Modo Avaliação
          </span>
        </div>
        <h1 className="font-display mt-4 text-3xl font-bold leading-tight sm:text-4xl">
          Avaliação — {trail.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A prova séria da trilha: questões sorteadas de um banco extenso, incluindo discursivas
          avaliadas por IA.
        </p>
      </header>

      {!available ? (
        <div className="glass p-8 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
          <h3 className="font-display text-xl font-bold">Avaliação em preparação</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            O banco de questões desta trilha ainda está sendo montado. Em breve disponível.
          </p>
        </div>
      ) : !started ? (
        <section className="glass animate-fade-up space-y-5 p-6 sm:p-7">
          <h2 className="font-display text-xl font-bold">Antes de começar, leia com atenção</h2>
          <p className="text-sm leading-relaxed text-foreground/85">
            Esta avaliação foi feita para medir o que você realmente sabe. Responda com o seu
            próprio raciocínio — as discursivas são avaliadas por IA e valorizam explicação com
            palavras suas, não respostas genéricas.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">{EXAM_QUESTIONS} questões sorteadas</p>
                <p className="text-xs text-muted-foreground">
                  De um banco grande — cada tentativa é diferente
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">{EXAM_SECONDS}s por questão</p>
                <p className="text-xs text-muted-foreground">
                  Tempo suficiente para pensar, não para consultar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
              <Ban className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Copiar e colar bloqueados</p>
                <p className="text-xs text-muted-foreground">Tentativas ficam registradas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
              <Eye className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Selo de integridade</p>
                <p className="text-xs text-muted-foreground">
                  Saídas de aba são detectadas e registradas
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Para passar você precisa de{' '}
            <span className="font-bold text-foreground">{EXAM_PASS_PERCENT}%</span>. Se não passar,
            pode refazer com questões novas.
          </p>
          <Button
            onClick={() => setStarted(true)}
            className="btn-glow h-12 w-full text-base font-bold"
          >
            Começar avaliação
          </Button>
        </section>
      ) : (
        <EvalRunner
          bank={bank}
          trailId={trail.id}
          kind="exam"
          questionCount={EXAM_QUESTIONS}
          passPercent={EXAM_PASS_PERCENT}
          secondsPerQuestion={EXAM_SECONDS}
          title={`Avaliação — ${trail.name}`}
          onPass={() => {
            setCelebrate(true)
            setTimeout(() => setCelebrate(false), 2500)
          }}
        />
      )}
    </div>
  )
}
