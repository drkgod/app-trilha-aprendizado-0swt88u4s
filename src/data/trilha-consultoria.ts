import type { Topic } from './types'

// Trilha 7 — Consultoria na Prática
// Mapeamento de processos, criação de projetos com IA, Antigravity e o fluxo end-to-end da consultoria.
export const consultoriaTopics: Topic[] = [
  {
    id: 'co-1',
    index: 1,
    title: 'Mapeamento de processos com IA',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Levantar, desenhar e priorizar os processos do cliente usando IA como ferramenta de descoberta.',
    concept:
      'Mapeamento de processos é a porta de entrada de quase todo projeto nosso: antes de automatizar, é preciso enxergar. O fluxo profissional tem quatro fases. 1) Descoberta: entrevistas com quem executa o processo (não só com o gestor), gravadas e transcritas — a transcrição vira insumo pra IA extrair etapas, sistemas envolvidos, exceções e gargalos. 2) Desenho AS-IS: o processo como É hoje, em etapas numeradas com dono, sistema e tempo estimado; peça ao Claude para transformar a transcrição bruta em um fluxo estruturado e valide com o cliente (a validação é onde aparecem as exceções escondidas). 3) Classificação: para cada etapa, decidir se é automatizável (agente executa), assistida (humano com IA) ou humana (fica como está) — essa tríade evita o erro clássico de prometer automação total. 4) TO-BE priorizado: o processo redesenhado, com as oportunidades ranqueadas por impacto × esforço. O artefato final (mapa AS-IS + TO-BE + backlog priorizado) é o documento que transforma conversa em contrato de projeto.',
    references: [
      { label: 'Anthropic Academy — cursos de aplicação', url: 'https://www.anthropic.com/learn' },
      { label: 'Docs da plataforma Anthropic', url: 'https://docs.claude.com' },
    ],
    practiceSteps: [
      'Escolha um processo interno nosso (ex: onboarding de cliente) e conduza uma entrevista de descoberta de 20 min com um colega, gravando.',
      'Use o Claude para transformar a transcrição em um fluxo AS-IS estruturado (etapas, dono, sistema, tempo) e valide com o entrevistado.',
      'Classifique cada etapa em automatizável / assistida / humana e monte o TO-BE com as 3 oportunidades de maior impacto.',
    ],
    projectContext:
      'O mapa de processos é o primeiro entregável pago da maioria dos nossos contratos — e é o que define o escopo de tudo que vem depois. Um mapeamento bem feito vende os próximos 3 projetos sozinho.',
    xp: 60,
  },
  {
    id: 'co-2',
    index: 2,
    title: 'Do processo ao projeto: escopo e arquitetura',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Converter uma dor de processo em um projeto de IA com escopo, stack e critério de pronto.',
    concept:
      'Entre o mapa de processos e o código existe a decisão de arquitetura — e é aqui que a consultoria ganha ou perde dinheiro. O checklist de conversão: 1) Entregável: qual artefato resolve a dor? (um app, um agente, um Project no Claude.ai, uma automação). Nem toda dor precisa de software: às vezes um Project bem montado resolve. 2) Superfície: quem vai USAR? Gestor não-técnico → Claude.ai/Projects ou app web; time de dev → Claude Code/Codex no repo; operação em volume → API. 3) Dados: onde vivem, quem pode ver (LGPD!), precisam de vetorização ou cabem no contexto? 4) Estrutura de repositório: projeto isolado → repo simples; módulos compartilhados entre clientes → repo pai + submodules com versão travada. 5) Backend: precisa de persistência/auth/realtime → Supabase entra no desenho. 6) Critério de pronto: a frase que o cliente assina — "está pronto quando X acontece em Y segundos com Z% de acerto". Sem critério de pronto explícito, o projeto nunca termina e a margem evapora.',
    references: [
      { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      { label: 'Docs do Supabase', url: 'https://supabase.com/docs' },
    ],
    practiceSteps: [
      'Pegue as 3 oportunidades priorizadas no co-1 e passe cada uma pelo checklist dos 6 pontos.',
      'Escreva a proposta de arquitetura de 1 página para a oportunidade número 1 (entregável, superfície, dados, repo, backend, critério de pronto).',
      'Apresente pro time em 5 minutos e colete objeções — refine até a proposta ficar defensável.',
    ],
    projectContext:
      'Este checklist É o nosso produto de consultoria de criação de projetos: o cliente paga pela decisão certa de arquitetura, não pelas linhas de código.',
    xp: 60,
  },
  {
    id: 'co-3',
    index: 3,
    title: 'Antigravity e o mapa das IDEs agênticas',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'O agente do Google e o panorama completo: qual ferramenta recomendar pra cada perfil de cliente.',
    concept:
      'Consultoria agnóstica precisa conhecer o tabuleiro inteiro. Google Antigravity é a plataforma de desenvolvimento agêntico do Google (gratuita em preview público, com Gemini como modelo principal): a interface tem duas visões — o Editor (IDE clássica com agente ao lado, familiar pra quem vem do VS Code) e o Manager, a visão que a diferencia: um painel pra orquestrar VÁRIOS agentes em paralelo, cada um em sua tarefa/workspace. Os agentes produzem Artifacts (plano de implementação, lista de tarefas, screenshots, gravações de walkthrough no navegador) que você revisa e comenta — a verificação faz parte do fluxo, não é improviso. O agente tem acesso a editor, terminal e navegador (consegue testar a própria UI que criou). Quando entra no radar: cliente já no ecossistema Google, necessidade de orquestrar múltiplos agentes com supervisão visual, ou orçamento zero pra ferramenta. O mapa completo pra recomendação: Claude Code (terminal-first, profundidade e automação via skills/hooks/MCP), Codex (4 superfícies + delegação em nuvem), Antigravity (orquestração multi-agente com verificação visual), Cursor/Windsurf (IDE com IA embutida, transição suave pra quem vive no VS Code). A resposta profissional nunca é "a melhor ferramenta" — é a melhor ferramenta PARA O PERFIL do time do cliente.',
    references: [
      { label: 'Google Antigravity (site oficial)', url: 'https://antigravity.google' },
      { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      { label: 'Docs do Codex', url: 'https://developers.openai.com/codex/quickstart' },
    ],
    practiceSteps: [
      'Instale o Antigravity e execute uma tarefa pequena, explorando o Manager e os Artifacts gerados.',
      'Rode a MESMA tarefa no Claude Code e anote as diferenças de fluxo, verificação e resultado.',
      'Monte a matriz de recomendação da consultoria: 4 perfis de cliente × ferramenta indicada × justificativa em 1 linha.',
    ],
    projectContext:
      'Cliente pergunta "e essa tal de Antigravity?" na primeira reunião. Responder com experiência própria (não com resumo de YouTube) é o que sustenta nosso posicionamento agnóstico.',
    xp: 60,
  },
  {
    id: 'co-4',
    index: 4,
    title: 'Setup padrão de projeto da consultoria',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'O esqueleto que todo projeto nosso recebe no dia 1: repo, memória, MCP, permissões e proteções.',
    concept:
      'Todo projeto que criamos com cliente nasce do mesmo esqueleto — padronização é margem. O setup padrão: 1) Repositório no GitHub com .gitignore correto ANTES do primeiro commit (.env, node_modules, credenciais) e branch protection na main exigindo PR. 2) Memória dos agentes: CLAUDE.md e AGENTS.md alinhados na raiz (comandos, arquitetura em 5 linhas, convenções, proibições) — e, se houver submodules, o protocolo de 2 commits documentado nos dois níveis. 3) MCP em escopo project: .mcp.json versionado com Supabase (read-only por padrão) e GitHub — quem clona herda tudo. 4) Permissões: allowlist pra testes/lint/gh, denylist pra comandos destrutivos, plan mode como padrão pra tarefas grandes. 5) Backend: projeto Supabase com migrations desde a primeira tabela e RLS ativado por padrão. 6) README de handover: como o time do cliente opera aquilo sem a gente. Esse esqueleto elimina 80% dos chamados de suporte antes de existirem.',
    references: [
      { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      { label: 'Docs do GitHub', url: 'https://docs.github.com' },
      { label: 'MCP do Supabase', url: 'https://supabase.com/docs/guides/getting-started/mcp' },
    ],
    practiceSteps: [
      'Monte o repositório-esqueleto completo (itens 1 a 6) num repo novo chamado template-projeto-cliente.',
      'Peça pra um colega clonar e rodar uma tarefa com agente SEM te perguntar nada — cada pergunta que ele fizer é um buraco no template.',
      'Corrija os buracos e fixe o repo como template oficial da consultoria no GitHub.',
    ],
    projectContext:
      'Este template é o ativo que faz um projeto novo começar em 30 minutos em vez de 2 dias. É literalmente margem de lucro versionada no GitHub.',
    xp: 60,
  },
  {
    id: 'co-5',
    index: 5,
    title: 'Diagnóstico rápido: as 10 dúvidas crônicas de cliente',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'As perguntas que TODO cliente faz — e a resposta de consultor pra cada uma, na ponta da língua.',
    concept:
      'Existe um conjunto de perguntas que se repete em toda consultoria — e a velocidade da sua resposta define a percepção de senioridade. As 10: 1) "Por que meu contexto acaba tão rápido?" → tudo ocupa a janela (arquivos, histórico, MCPs); auditar com /context, limpar com /clear entre tarefas. 2) "Codex ou Claude Code?" → depende do perfil do time; nossa matriz comparativa responde por cenário. 3) "O submodule veio vazio no clone" → git submodule update --init --recursive. 4) "Commitei uma API key" → revogar a chave AGORA; apagar do código não apaga do histórico. 5) "Qualquer usuário vê os dados dos outros" → tabela sem RLS; auditoria + policies de posse. 6) "O chat ficou burro/lento" → conversa longa demais; chat novo (Project preserva o conhecimento). 7) "Qual plano contratar?" → árvore de decisão + conferir números na fonte oficial. 8) "Posso dar full access pro agente?" → default com allowlist; full access só em ambiente descartável. 9) "Jogo tudo no contexto ou faço RAG?" → régua: volume, mutabilidade e frequência de consulta. 10) "O agente pode quebrar meu banco?" → MCP read-only + migrations + branch de dev + backup: pode errar sem estragar. Decorar a ESTRUTURA dessas respostas (diagnóstico → causa → ação) vale mais que decorar detalhes.',
    references: [
      { label: 'Central de ajuda Claude', url: 'https://support.claude.com' },
      { label: 'Pro Git — Submodules', url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules' },
      {
        label: 'Guia de RLS do Supabase',
        url: 'https://supabase.com/docs/guides/database/postgres/row-level-security',
      },
    ],
    practiceSteps: [
      'Simule com um colega: ele sorteia 5 das 10 dúvidas e você responde de bate-pronto, em até 60 segundos cada.',
      'Grave as respostas e avalie: teve diagnóstico, causa e ação em cada uma?',
      'Escreva sua versão pessoal das 10 respostas em um documento de bolso (meia página).',
    ],
    projectContext:
      'Essas 10 respostas são o nosso "atendimento nível 1". Respondê-las com segurança em call é o que faz o cliente renovar o contrato sem pesquisar concorrente.',
    xp: 60,
  },
  {
    id: 'co-6',
    index: 6,
    title: 'Adoção e treinamento do time do cliente',
    priority: 'media',
    type: 'conceito',
    shortDescription:
      'Projeto entregue não é projeto adotado: como garantir que o time do cliente realmente use o que criamos.',
    concept:
      'A causa número 1 de churn em consultoria de IA não é técnica — é adoção. O projeto funciona, mas o time do cliente volta pro jeito antigo em 3 semanas. O playbook de adoção: 1) Campeão interno: identifique no mapeamento quem será o dono da ferramenta dentro do cliente e envolva essa pessoa em TODAS as decisões — adoção é dela, manutenção é nossa. 2) Treinamento por perfil: gestor aprende a pedir e avaliar (Projects, dashboards); operador aprende o fluxo diário (a tarefa dele, passo a passo); dev aprende a manter (CLAUDE.md, permissões, MCP). Treinamento genérico não gruda. 3) Material que sobrevive: vídeos curtos de 3-5 min por fluxo (não manuais de 40 páginas) + o README de handover do setup padrão. 4) Métricas de adoção combinadas no contrato: uso semanal, tarefas concluídas via ferramenta, tempo economizado — o que não se mede, o cliente esquece que comprou. 5) Ritual de acompanhamento: checkpoint quinzenal de 30 min no primeiro trimestre, olhando as métricas e destravando fricções. Consultoria que entrega adoção renova; consultoria que entrega código compete por preço.',
    references: [
      { label: 'Anthropic Academy', url: 'https://www.anthropic.com/learn' },
      { label: 'Central de ajuda Claude', url: 'https://support.claude.com' },
    ],
    practiceSteps: [
      'Escreva o plano de adoção de 1 página para um projeto fictício: campeão, treinamentos por perfil, métricas e ritual.',
      'Grave um vídeo de treinamento de 4 min ensinando UM fluxo específico como se fosse pro operador do cliente.',
      'Defina as 3 métricas de adoção que colocaríamos em contrato como padrão.',
    ],
    projectContext:
      'Adoção é o que transforma projeto pontual em contrato recorrente. Este playbook é a diferença entre vender um projeto e virar o braço de IA do cliente.',
    xp: 60,
  },
  {
    id: 'co-7',
    index: 7,
    title: 'DESAFIO FINAL: Consultoria end-to-end',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'A simulação completa: do mapeamento ao handover, usando a stack inteira. O chefe final do programa.',
    concept:
      'Este é o desafio que integra as 7 trilhas numa entrega só — a simulação fiel de um projeto real da consultoria. O cenário: um cliente fictício (escolha um segmento que conhecemos) tem um processo manual doloroso. Sua missão end-to-end: 1) Mapear o processo (AS-IS → classificação → TO-BE priorizado) com um colega fazendo o papel do cliente. 2) Converter em projeto: proposta de arquitetura de 1 página com o checklist dos 6 pontos e critério de pronto assinável. 3) Executar o setup padrão: repo (pai + 1 submodule), CLAUDE.md + AGENTS.md, .mcp.json com Supabase, permissões e branch protection. 4) Construir o MVP com agente: banco no Supabase com migrations e RLS testado com 2 usuários, uma feature via Claude Code e outra via Codex, cada uma por PR revisado pelo colega. 5) Preparar o handover: README, vídeo de treinamento de 4 min e plano de adoção com métricas. 6) Apresentar em 15 minutos de call como se fosse a entrega final pro cliente. Quem completa este desafio não estudou a stack — operou a consultoria inteira de ponta a ponta.',
    references: [
      { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      { label: 'Docs do Codex', url: 'https://developers.openai.com/codex/quickstart' },
      { label: 'Docs do Supabase', url: 'https://supabase.com/docs' },
    ],
    practiceSteps: [
      'Execute as etapas 1 a 5 do cenário ao longo de uma semana, com um colega no papel de cliente.',
      'Agende a call de 15 min de "entrega final" com o time inteiro assistindo.',
      'Colete feedback estruturado: o que compraria, o que não compraria, o que faltou — e registre as lições no repositório do desafio.',
    ],
    projectContext:
      'O resultado deste desafio é o nosso portfólio vivo: o repositório, a proposta e o vídeo viram o material que mostramos em reunião comercial para fechar clientes novos.',
    xp: 150,
  },
]
