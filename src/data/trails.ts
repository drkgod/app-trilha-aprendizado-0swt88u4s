import type { Trail } from './types'
import { claudeCodeTopics } from './trilha-claude-code'
import { codexTopics } from './trilha-codex'
import { claudeAiTopics } from './trilha-anthropic'
import { githubTopics } from './trilha-github'
import { supabaseTopics } from './trilha-supabase'
import { trilhaFundamentos } from './trilha-fundamentos'
import { consultoriaTopics } from './trilha-consultoria'

export { type Topic, type Trail, type Priority, type TopicType, type ReferenceLink } from './types'

export const trails: Trail[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    slug: 'claude-code',
    icon: '🟠',
    color: '#FF6B35',
    colorGlow: '24 100% 60%',
    description:
      'Domine o agente de terminal da Anthropic — da instalação a subagents, hooks e automações avançadas.',
    topics: claudeCodeTopics,
  },
  {
    id: 'codex',
    name: 'Codex',
    slug: 'codex',
    icon: '🟣',
    color: '#A855F7',
    colorGlow: '271 91% 65%',
    description:
      'Domine a ferramenta de agentes da OpenAI — CLI, app desktop, Cloud e integração com GitHub.',
    topics: codexTopics,
  },
  {
    id: 'claude-ai',
    name: 'Claude.ai',
    slug: 'claude-ai',
    icon: '🔵',
    color: '#3B82F6',
    colorGlow: '217 91% 60%',
    description:
      'Domine a plataforma web do Claude.ai — Projects, Artifacts, Web Search e integrações.',
    topics: claudeAiTopics,
  },
  {
    id: 'github',
    name: 'GitHub',
    slug: 'github',
    icon: '⚫',
    color: '#E5E7EB',
    colorGlow: '220 13% 91%',
    description:
      'Domine Git e GitHub — do setup à arquitetura de repositórios, submodules e pipelines.',
    topics: githubTopics,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    slug: 'supabase',
    icon: '🟢',
    color: '#22C55E',
    colorGlow: '142 71% 45%',
    description:
      'Domine o backend-as-a-service Postgres — RLS, Autenticação, Storage, Realtime e Migrations.',
    topics: supabaseTopics,
  },
  {
    id: 'fundamentos',
    name: 'Fundamentos',
    slug: 'fundamentos',
    icon: '🌐',
    color: '#4DD8E6',
    colorGlow: '185 80% 60%',
    description:
      'Domine tokens, embeddings, busca semântica e vetorização com Supabase e pgvector.',
    topics: trilhaFundamentos.topics,
  },
  {
    id: 'consultoria',
    name: 'Consultoria na Prática',
    slug: 'consultoria',
    icon: '🧭',
    color: '#FBD65C',
    colorGlow: '45 94% 67%',
    description:
      'Mapeamento de processos, Antigravity, setup padrão e a simulação end-to-end da consultoria.',
    topics: consultoriaTopics,
  },
]

export const totalTopics = trails.reduce((sum, trail) => sum + trail.topics.length, 0)
