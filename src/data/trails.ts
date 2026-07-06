import type { Trail } from './types'
import { fundamentosTopics } from './trilha-fundamentos'
import { claudeCodeTopics } from './trilha-claude-code'
import { codexTopics } from './trilha-codex'
import { claudeAiTopics } from './trilha-anthropic'
import { githubTopics } from './trilha-github'
import { supabaseTopics } from './trilha-supabase'
import { projetosTopics } from './trilha-projetos'
import { compoundTopics } from './trilha-compound'
import { specDrivenTopics } from './trilha-spec-driven'

export type { Trail, Topic, QuizQuestion, ReferenceLink } from './types'

export const trails: Trail[] = [
  {
    id: 'fundamentos',
    name: 'Fundamentos de IA',
    slug: 'fundamentos',
    icon: 'BrainCircuit',
    color: '#4DD8E6',
    colorGlow: 'rgba(77, 216, 230, 0.35)',
    tagline: 'Tokens, embeddings, RAG e grafos',
    description:
      'A base conceitual que sustenta todo o resto: como modelos funcionam, contexto, vetorização, busca semântica, GraphRAG, segundo cérebro e o mapa dos agentes — incluindo o Antigravity.',
    topics: fundamentosTopics,
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    slug: 'claude-code',
    icon: 'Terminal',
    color: '#FF6B35',
    colorGlow: 'rgba(255, 107, 53, 0.35)',
    tagline: 'O agente da Anthropic no seu terminal',
    description:
      'Instalação, CLAUDE.md, permissões, subagentes, hooks, MCP, worktrees e automação headless — o domínio operacional completo da ferramenta.',
    topics: claudeCodeTopics,
  },
  {
    id: 'codex',
    name: 'Codex',
    slug: 'codex',
    icon: 'Bot',
    color: '#A855F7',
    colorGlow: 'rgba(168, 85, 247, 0.35)',
    tagline: 'CLI, app, extensão e Cloud da OpenAI',
    description:
      'As quatro superfícies do Codex, AGENTS.md, sandbox, delegação ao Cloud, @codex em PRs e o comparativo honesto com o Claude Code.',
    topics: codexTopics,
  },
  {
    id: 'compound',
    name: 'Compound Engineering',
    slug: 'compound',
    icon: 'Infinity',
    color: '#EF7D57',
    colorGlow: 'rgba(239, 125, 87, 0.35)',
    tagline: 'O trabalho que compõe: plan, work, review, compound',
    description:
      'A filosofia AI-native de Kieran Klaassen (Every): cada entrega torna a próxima mais fácil. Os cinco princípios, a escada de adoção, o loop completo e a pasta que vira agente — o método que sustenta o Adapta Native.',
    topics: compoundTopics,
  },
  {
    id: 'spec-driven',
    name: 'Spec-Driven Development',
    slug: 'spec-driven',
    icon: 'FileCode2',
    color: '#818CF8',
    colorGlow: 'rgba(129, 140, 248, 0.35)',
    tagline: 'A spec como fonte de verdade executável',
    description:
      'O método do GitHub Spec Kit: constituição, specify, plan, tasks e implement com checkpoints. Separar o o-quê do como e entregar um contrato que o agente executa — a espinha dorsal da entrega Adapta Native.',
    topics: specDrivenTopics,
  },
  {
    id: 'claude-ai',
    name: 'Ecossistema Claude',
    slug: 'claude-ai',
    icon: 'Sparkles',
    color: '#3B82F6',
    colorGlow: 'rgba(59, 130, 246, 0.35)',
    tagline: 'Claude.ai, API, Cowork e Academy',
    description:
      'Planos, Projects, Artifacts, conectores, memória, o essencial da API, agentes embarcados e as respostas corporativas de privacidade.',
    topics: claudeAiTopics,
  },
  {
    id: 'github',
    name: 'GitHub & Git',
    slug: 'github',
    icon: 'GitBranch',
    color: '#E5E7EB',
    colorGlow: 'rgba(229, 231, 235, 0.30)',
    tagline: 'Submodules, PRs e governança de repo',
    description:
      'Do fluxo diário ao avançado: submodules a fundo (o dia a dia dos projetos), desfazer sem medo, PRs de agente, worktrees, proteção de branch e o protocolo do segredo vazado.',
    topics: githubTopics,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    slug: 'supabase',
    icon: 'Database',
    color: '#22C55E',
    colorGlow: 'rgba(34, 197, 94, 0.35)',
    tagline: 'Postgres, RLS, pgvector e Edge Functions',
    description:
      'O backend completo: keys e RLS, auth, migrations, branches de banco, storage, busca vetorial e híbrida, Realtime e o plano de desastre.',
    topics: supabaseTopics,
  },
  {
    id: 'projetos',
    name: 'Projetos na Prática',
    slug: 'projetos',
    icon: 'Rocket',
    color: '#F5B94A',
    colorGlow: 'rgba(245, 185, 74, 0.35)',
    tagline: 'Missões reais de consultoria',
    description:
      'As missões que cruzam tudo: discovery, blueprint, repo profissional, RAG interno, app completo com agente, QA de código gerado, entrega e o comparativo de stack.',
    topics: projetosTopics,
  },
]

export const totalTopics = trails.reduce((sum, trail) => sum + trail.topics.length, 0)

export function getTrailById(id: string): Trail | undefined {
  return trails.find((t) => t.id === id)
}

export function getTopicById(trailId: string, topicId: string) {
  const trail = getTrailById(trailId)
  const topic = trail?.topics.find((t) => t.id === topicId)
  return { trail, topic }
}
