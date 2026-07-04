import { Network } from 'lucide-react'
import type { Trail } from './types'

export const trilhaFundamentos: Trail = {
  id: 'fundamentos',
  order: 6,
  title: 'Fundamentos: Contexto & Vetorização',
  tagline: 'Como o modelo enxerga o mundo — tokens, embeddings e RAG sem mistificação.',
  color: '#4DD8E6',
  colorGlow: 'rgba(77, 216, 230, 0.15)',
  icon: 'Network',
  slug: 'fundamentos',
  description: 'Como o modelo enxerga o mundo — tokens, embeddings e RAG sem mistificação.',
  topics: [
    {
      id: 'fu-1',
      index: 1,
      title: 'Tokens e a janela de contexto',
      priority: 'alta',
      type: 'conceito',
      shortDescription: 'O que ocupa o contexto e o impacto no custo e latência.',
      concept:
        'Modelos de linguagem não processam palavras inteiras, mas sim tokens (fragmentos de caracteres). A janela de contexto é o limite de tokens que o modelo consegue processar simultaneamente, englobando o system prompt, histórico da conversa, arquivos lidos e chaves MCP conectadas. Estourar esse limite gera lentidão e degradação de respostas.',
      references: [
        { label: 'Anthropic Learn Portal', url: 'https://www.anthropic.com/learn' },
        {
          label: 'Visão Geral do Claude (Docs)',
          url: 'https://docs.anthropic.com/en/docs/about-claude/models',
        },
      ],
      practiceSteps: [
        'Explique tokens e janela de contexto em 5 frases, sem usar jargões técnicos complexos.',
        'Faça uma lista de 4 elementos que consomem a janela de contexto em sessões ativas do Claude Code.',
        'Explique por que conectar MCPs redundantes degrada a capacidade do agente.',
      ],
      projectContext:
        'Mantenha as conversas dos consultores focadas em tarefas específicas para evitar o inchaço de tokens e prevenir erros de contextualização.',
      xp: 60,
    },
    {
      id: 'fu-2',
      index: 2,
      title: 'Vetorização e embeddings',
      priority: 'alta',
      type: 'conceito',
      shortDescription: 'Bancos de dados vetoriais e busca semântica.',
      concept:
        'Vetorização (embeddings) consiste em converter textos em listas de números (vetores) que capturam o significado conceitual das palavras. Isso viabiliza pesquisas semânticas avançadas que localizam dados por afinidade de ideias em vez de correspondência exata de termos.',
      references: [
        { label: 'Supabase AI & Vectors Guide', url: 'https://supabase.com/docs/guides/ai' },
      ],
      practiceSteps: [
        'Desenhe o fluxo do pipeline de vetorização de documentos do cliente.',
        'Ative a extensão pgvector em um banco Supabase e realize queries de teste.',
        'Escreva um resumo didático sobre vetorização direcionado a gestores leigos.',
      ],
      projectContext:
        'A vetorização de documentos corporativos é a base de robôs de RAG focados no suporte interno do cliente.',
      xp: 60,
    },
    {
      id: 'fu-3',
      index: 3,
      title: 'RAG vs contexto direto',
      priority: 'alta',
      type: 'conceito',
      shortDescription: 'Arquitetura de RAG contra injeção de contexto.',
      concept:
        'RAG (Retrieval-Augmented Generation) recupera apenas os fragmentos de texto relevantes e os injeta na janela do modelo. Já o contexto direto envia o documento inteiro. Escolher entre RAG e contexto direto depende do volume da base de dados, frequência de atualização e custos de infraestrutura.',
      references: [
        {
          label: 'Introdução ao Supabase',
          url: 'https://supabase.com/docs/guides/getting-started',
        },
        {
          label: 'Modelos e Contextos (Docs)',
          url: 'https://docs.anthropic.com/en/docs/about-claude/models',
        },
      ],
      practiceSteps: [
        'Esboce uma árvore de decisão para RAG vs Contexto Direto para um projeto.',
        'Analise dois cenários de clientes reais e classifique qual arquitetura era a ideal.',
        'Estime o ponto de equilíbrio financeiro em que um RAG se paga.',
      ],
      projectContext:
        'Aconselhe a estratégia correta de contexto no início do projeto para evitar gastos excessivos com APIs no cliente.',
      xp: 60,
    },
    {
      id: 'fu-4',
      index: 4,
      title: 'Context engineering para agentes',
      priority: 'alta',
      type: 'conceito',
      shortDescription: 'Organização estruturada de dados para o agente.',
      concept:
        'Context engineering envolve definir quais informações (instruções permanentes, scripts, conexões MCP, arquivos de código) devem preencher a janela do agente para garantir que ele atue com foco e eficiência sem poluir o histórico.',
      references: [
        {
          label: 'Visão Geral do Claude Code',
          url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
        },
        { label: 'Anthropic Learn Portal', url: 'https://www.anthropic.com/learn' },
      ],
      practiceSteps: [
        'Audite as regras do arquivo CLAUDE.md do seu projeto atual e remova instruções ociosas.',
        'Estruture um CLAUDE.md limpo focado em comportamento e diretrizes.',
        'Mapeie as camadas de contexto recomendadas antes de iniciar o desenvolvimento.',
      ],
      projectContext:
        'A qualidade dos resultados gerados por agentes de código é proporcional à clareza das camadas de contexto fornecidas.',
      xp: 60,
    },
  ],
}
