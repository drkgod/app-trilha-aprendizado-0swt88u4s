import type { Trail, Topic } from './types'

// Serializa o conteúdo de uma trilha em texto, para alimentar o tutor de IA como contexto.
// Mantém enxuto (conceito + deep dive + pitfalls) para caber no system prompt sem estourar.
export function buildTrailKnowledge(trail: Trail): string {
  const parts: string[] = []
  parts.push(`TRILHA: ${trail.name}`)
  if (trail.tagline) parts.push(`Resumo: ${trail.tagline}`)
  if (trail.description) parts.push(trail.description)
  parts.push('')
  parts.push('CONTEÚDO DAS ETAPAS:')

  trail.topics.forEach((t: Topic) => {
    if (t.type === 'boss') return // boss não tem conteúdo didático
    const seg: string[] = []
    seg.push(`\n### ${t.index}. ${t.title}`)
    if (t.concept) seg.push(t.concept)
    if (t.deepDive && t.deepDive.length > 0) {
      seg.push('Pontos-chave: ' + t.deepDive.join(' '))
    }
    if (t.pitfalls && t.pitfalls.length > 0) {
      seg.push('Armadilhas: ' + t.pitfalls.join(' '))
    }
    parts.push(seg.join('\n'))
  })

  return parts.join('\n')
}
