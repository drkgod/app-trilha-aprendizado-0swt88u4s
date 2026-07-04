import { Network } from 'lucide-react'
import type { Trail } from './types'

export const trilhaFundamentos: Trail = {
  id: 'fundamentos',
  order: 6,
  title: 'Fundamentos: Contexto & Vetorização',
  tagline: 'Como o modelo enxerga o mundo — tokens, embeddings e RAG sem mistificação.',
  color: '#4DD8E6',
  icon: Network,
  nodes: [
    {
      id: 'fu-1',
      title: 'Tokens e a janela de contexto',
      kind: 'lesson',
      xp: 60,
      minutes: 30,
      why: 'Todo diagnóstico de "IA burra", "IA que esquece" e "custo alto" passa por entender tokens. É o vocabulário mínimo do consultor.',
      content: [
        'Modelos não leem palavras: leem tokens — pedaços de texto (uma palavra curta pode ser 1 token; uma longa, vários). Custo e limite são medidos neles.',
        'Janela de contexto = tudo que o modelo consegue "ver" de uma vez: system prompt, histórico, arquivos anexados, definições de ferramentas e a própria resposta em produção.',
        'Quando a janela enche: ou trunca/compacta (o modelo "esquece" o início) ou a qualidade degrada — o famoso "ficou burro no fim da conversa".',
        'Entrada e saída têm custos distintos na API; conversa longa reprocessa o histórico inteiro a cada mensagem — por isso chat quilométrico fica caro e lento.',
        'Tradução pro cliente: contexto é a mesa de trabalho — cabe muita coisa, mas se você cobrir a mesa de papel, não sobra espaço pra trabalhar.',
        'Consequência prática em TODAS as ferramentas da stack: sessões focadas, contexto sob demanda e limpeza entre tarefas.',
      ],
      practice: [
        'Explique tokens e janela de contexto em 5 frases, sem jargão, como se fosse pro seu cliente mais leigo.',
        'Liste 4 coisas que ocupam a janela numa sessão de Claude Code.',
        'Relacione: por que MCP demais conectado degrada o agente?',
      ],
      scope:
        'Este vocabulário sustenta o diagnóstico técnico em toda consultoria — do suporte básico ao desenho de arquitetura.',
      links: [
        { label: 'Anthropic Academy', url: 'https://www.anthropic.com/learn' },
        { label: 'Docs da plataforma', url: 'https://docs.claude.com' },
      ],
      quiz: [
        {
          q: 'Por que uma conversa muito longa fica cara e lenta na API?',
          options: [
            'O servidor cansa',
            'O histórico inteiro é reprocessado (e cobrado) a cada nova mensagem',
            'Tokens ficam mais caros à noite',
            'Não fica',
          ],
          correct: 1,
          explain:
            'Cada rodada reenvia o histórico todo pela janela. Conversa longa = custo e latência crescentes.',
        },
        {
          q: 'O modelo "esqueceu" instruções dadas no início de uma sessão longa. Explicação mais provável?',
          options: [
            'Bug',
            'A janela encheu e o início foi compactado/truncado',
            'O modelo mudou sozinho',
            'Falta de internet',
          ],
          correct: 1,
          explain:
            'Janela cheia força compactação ou truncamento — o começo da conversa é o primeiro a virar resumo.',
        },
      ],
    },
    {
      id: 'fu-2',
      title: 'Vetorização e embeddings',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: '"Como funciona uma vetorização?" — pergunta direta de cliente que avalia se você é consultor de verdade ou vendedor de hype.',
      content: [
        'Embedding = transformar texto (ou imagem) num vetor: uma lista de números que captura o SIGNIFICADO. Textos parecidos viram vetores próximos no espaço.',
        'A mágica é busca semântica: "reembolso de cliente" encontra um documento que fala "devolução de pagamento" mesmo sem palavras em comum — coisa que busca por palavra-chave não faz.',
        'Pipeline típico: dividir documentos em chunks → gerar embedding de cada chunk (via um modelo de embeddings) → guardar num banco vetorial → na pergunta, vetorizar a query e buscar os chunks mais próximos (similaridade).',
        'Postgres faz isso com a extensão pgvector — por isso o Supabase é nosso banco vetorial padrão: dados e vetores no mesmo lugar.',
        'Decisões que mudam a qualidade: tamanho dos chunks, sobreposição entre eles e quantos resultados recuperar. Chunk gigante dilui o significado; minúsculo perde contexto.',
        'Limite honesto: embedding acha o SEMELHANTE, não o VERDADEIRO — a curadoria da base continua sendo trabalho humano (nosso).',
      ],
      practice: [
        'Desenhe (papel mesmo) o pipeline: documentos → chunks → embeddings → banco → busca.',
        'No Supabase, ative a pgvector num projeto de teste e explore a documentação de AI.',
        'Escreva a explicação de 5 frases de "o que é vetorização" para um gestor leigo.',
      ],
      scope:
        'Bases de conhecimento vetorizadas aparecem em quase todo projeto de IA corporativa — desenhar esse pipeline é escopo nosso.',
      links: [
        { label: 'Supabase — AI & Vectors (pgvector)', url: 'https://supabase.com/docs/guides/ai' },
      ],
      quiz: [
        {
          q: 'Qual a diferença entre busca semântica (embeddings) e busca por palavra-chave?',
          options: [
            'Nenhuma',
            'A semântica encontra por SIGNIFICADO: acha "devolução de pagamento" quando você busca "reembolso"',
            'A semântica é mais barata',
            'Palavra-chave é sempre melhor',
          ],
          correct: 1,
          explain:
            'Vetores próximos = significados próximos, mesmo sem palavras em comum. É o superpoder da vetorização.',
        },
        {
          q: 'Por que o tamanho do chunk importa ao vetorizar documentos?',
          options: [
            'Não importa',
            'Chunk gigante dilui o significado; chunk minúsculo perde contexto — o equilíbrio define a qualidade da busca',
            'Só afeta o preço',
            'Chunks precisam ser sempre iguais',
          ],
          correct: 1,
          explain:
            'O chunk é a unidade de significado recuperável. Errar o tamanho degrada a busca inteira.',
        },
      ],
    },
    {
      id: 'fu-3',
      title: 'RAG vs contexto direto',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'A pergunta de arquitetura mais frequente: "jogo tudo no contexto ou monto um RAG?" — e a resposta errada custa caro dos dois lados.',
      content: [
        'RAG (Retrieval-Augmented Generation): buscar os trechos relevantes (via embeddings) e injetar SÓ eles no contexto antes de gerar a resposta.',
        'Contexto direto: colocar o documento inteiro na janela. Simples, sem infraestrutura, e as janelas atuais são grandes — funciona bem até certo volume.',
        'A régua de decisão: cabe na janela com folga e o custo de reenviar é aceitável? Contexto direto. Base grande, que muda sempre, consultada com frequência? RAG.',
        'Custos comparados: RAG tem custo de infraestrutura (pipeline, banco vetorial, manutenção); contexto direto tem custo por chamada (reenvia tudo, sempre). Volume de uso decide.',
        'Erros clássicos que vamos corrigir em cliente: RAG superdimensionado pra 30 PDFs que caberiam num Project; e o oposto — espremer uma base de 10 mil documentos na janela.',
        'Meio-termos que resolvem muito: Projects com knowledge (RAG gerenciado pela Anthropic, zero infra) e prompt caching pra contexto repetido na API.',
      ],
      practice: [
        'Monte a árvore de decisão RAG × contexto direto × Project knowledge com 4 perguntas.',
        'Pegue 2 casos reais de clientes passados e classifique qual arquitetura era a certa.',
        'Estime: em que volume de documentos/uso o RAG começa a se pagar?',
      ],
      scope:
        'Esta decisão de arquitetura é literalmente o que o cliente paga a consultoria pra acertar — errar pra mais desperdiça, errar pra menos frustra.',
      links: [
        { label: 'Docs da plataforma Anthropic', url: 'https://docs.claude.com' },
        { label: 'Supabase — AI & Vectors', url: 'https://supabase.com/docs/guides/ai' },
      ],
      quiz: [
        {
          q: 'Cliente tem 25 PDFs de referência, estáveis, consultados num único contexto de trabalho. Arquitetura sensata?',
          options: [
            'RAG completo com banco vetorial',
            'Contexto direto/Project knowledge — o volume não justifica infraestrutura de RAG',
            'Fine-tuning',
            'Planilha',
          ],
          correct: 1,
          explain:
            'Volume pequeno e estável cabe na abordagem simples. RAG aqui é engenharia superdimensionada.',
        },
        {
          q: 'Quando o RAG se torna a escolha certa?',
          options: [
            'Sempre',
            'Base grande e/ou mutável, consultada com frequência, que não cabe (ou não compensa) reenviar na janela',
            'Só pra imagens',
            'Quando o cliente pede a palavra RAG',
          ],
          correct: 1,
          explain:
            'RAG paga seu custo de infra quando o volume, a mutabilidade e a frequência de consulta o justificam.',
        },
      ],
    },
    {
      id: 'fu-4',
      title: 'Context engineering para agentes',
      kind: 'lesson',
      xp: 60,
      minutes: 30,
      why: 'A evolução do prompt engineering: montar o AMBIENTE de informação do agente. É o que fazemos ao desenhar cada projeto.',
      content: [
        'Context engineering = decidir o que entra na janela do agente, quando e em que formato: instruções permanentes, conhecimento sob demanda, ferramentas e histórico.',
        'As camadas na nossa stack: CLAUDE.md/AGENTS.md (permanente) → skills (procedimentos sob demanda) → MCPs (acesso a dados vivos) → arquivos lidos na tarefa (efêmero).',
        'Princípio 1 — sob demanda vence despejo: agente que BUSCA o que precisa (grep, MCP, skill) supera agente afogado em contexto antecipado.',
        'Princípio 2 — cada item na janela paga aluguel: instrução que não muda comportamento, MCP que não é usado e arquivo lido "por via das dúvidas" são custo sem retorno.',
        'Princípio 3 — formato importa: informação estruturada (listas, exemplos, critérios de pronto) rende mais que prosa vaga do mesmo tamanho.',
        'É o mesmo princípio da vetorização aplicado ao agente: recuperar o relevante, não carregar o tudo.',
      ],
      practice: [
        'Audite o contexto de um projeto seu: o que é permanente, o que deveria ser sob demanda, o que é lixo.',
        'Transforme um CLAUDE.md prolixo em versão enxuta orientada a comportamento.',
        'Desenhe as camadas de contexto do próximo projeto de cliente antes de escrever qualquer prompt.',
      ],
      scope:
        'Ao criar projetos com IA para clientes, o desenho das camadas de contexto É o projeto. Essa lente diferencia nossa consultoria de quem só "escreve prompt".',
      links: [
        { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
        { label: 'Anthropic Academy', url: 'https://www.anthropic.com/learn' },
      ],
      quiz: [
        {
          q: 'Qual abordagem tende a render mais num agente de código?',
          options: [
            'Carregar o repositório inteiro no início',
            'Deixar o agente buscar sob demanda o que a tarefa exige',
            'Colar toda a documentação no prompt',
            'Nunca dar contexto',
          ],
          correct: 1,
          explain:
            'Busca sob demanda mantém a janela útil. Despejo antecipado afoga o agente em irrelevância.',
        },
        {
          q: '"Cada item na janela paga aluguel" significa:',
          options: [
            'Contexto é cobrado em reais',
            'Todo conteúdo permanente precisa justificar o espaço que ocupa em TODA sessão',
            'Instruções expiram',
            'MCPs são pagos',
          ],
          correct: 1,
          explain:
            'Espaço de janela é recurso finito: instrução inútil compete com informação que resolveria a tarefa.',
        },
      ],
    },
    {
      id: 'fu-5',
      title: 'BOSS: Tradutor técnico',
      kind: 'boss',
      xp: 150,
      minutes: 60,
      why: 'O teste final de fundamento não é saber — é fazer um leigo entender. É assim que se vende consultoria.',
      content: [
        'Você vai preparar e gravar a explicação de 5 minutos que daria a um gestor leigo cobrindo: tokens, janela de contexto, vetorização e quando usar RAG.',
        'Sem jargão gratuito, com analogias que funcionam e UMA recomendação prática no final.',
      ],
      practice: [],
      scope: 'Entregável real: o pitch técnico-didático que usamos em reunião comercial.',
      links: [{ label: 'Anthropic Academy', url: 'https://www.anthropic.com/learn' }],
      quiz: [],
      checklist: [
        'Roteiro escrito com as 4 explicações (tokens, janela, vetorização, RAG × contexto direto)',
        'Uma analogia própria e memorável para cada conceito',
        'Vídeo de até 5 minutos gravado',
        'Zero jargão sem tradução imediata',
        'Fecha com recomendação prática aplicável ao negócio do "cliente"',
        'Feedback de pelo menos 1 colega coletado',
      ],
    },
  ],
}
