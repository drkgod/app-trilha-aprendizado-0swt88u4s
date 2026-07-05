import type { Topic } from './types'

export const projetosTopics: Topic[] = [
  {
    id: 'pj-1',
    index: 1,
    title: 'Missão: Discovery e mapeamento de processo com IA',
    priority: 'alta',
    type: 'missao',
    shortDescription: 'Conduzir o levantamento de um processo real e sair com o mapa digitalizado.',
    concept:
      'A missão que abre todo contrato: escolher UM processo real (seu ou de um cliente piloto) e mapeá-lo de ponta a ponta com IA como copiloto — entrevista gravada/transcrita ou notas de reunião viram, via Claude, um mapa estruturado: etapas, atores, sistemas envolvidos, entradas/saídas, exceções e dores. O entregável é o documento de discovery: fluxo atual (as-is), gargalos quantificados onde possível, e a shortlist de oportunidades de automação com estimativa de esforço/impacto. O padrão de qualidade: qualquer pessoa da operação lê o mapa e diz "é exatamente assim que funciona".',
    deepDive: [
      'Técnica de entrevista com IA: grave (com consentimento), transcreva, e peça ao Claude a extração estruturada — depois VALIDE com o entrevistado; a transcrição erra nomes de sistemas.',
      'Fotografe o quadro branco da dinâmica e deixe o modelo digitalizar o diagrama — o app mobile brilha aqui.',
      'A matriz esforço × impacto das oportunidades é o que vira proposta comercial — seja honesto no esforço; a credibilidade do funil depende dela.',
    ],
    pitfalls: [
      'Mapear o processo como o gestor DESCREVE em vez de como a operação EXECUTA — entreviste quem faz.',
      'Prometer automação de tudo — a shortlist boa tem 2-3 itens matadores, não 15 genéricos.',
    ],
    practiceSteps: [
      'Escolha o processo e conduza 1-2 entrevistas com transcrição.',
      'Gere o mapa as-is via Claude e valide com o dono do processo.',
      'Entregue o documento: fluxo + dores + matriz de oportunidades.',
    ],
    projectContext:
      'É o produto de entrada da consultoria — esta missão ensaia, com rede, o que você vai vender.',
    references: [
      {
        label: 'Claude.ai — Projects (organize o discovery)',
        url: 'https://support.claude.com',
        kind: 'doc',
      },
      {
        label: 'Anthropic Academy — AI Fluency',
        url: 'https://anthropic.skilljar.com/',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 120,
  },
  {
    id: 'pj-2',
    index: 2,
    title: 'Missão: Blueprint de automação',
    priority: 'alta',
    type: 'missao',
    shortDescription:
      'Transformar o discovery em desenho técnico: agentes, ferramentas, dados e riscos.',
    concept:
      'A ponte entre o mapa e o código: pegar a oportunidade nº 1 do discovery e escrever o blueprint — o desenho técnico da automação. Estrutura que funciona: o fluxo to-be (como fica com IA), a tabela de ferramentas do agente (o que ele pode fazer, com quais permissões, o que exige aprovação humana), as fontes de dados (de onde vem o contexto — e se precisa de RAG), o desenho de erro (o que acontece quando a IA erra? quem revisa?), e custos estimados (modelo × volume). O teste do blueprint bom: um dev que nunca viu o cliente consegue implementar a partir dele.',
    deepDive: [
      'A decisão humano-no-loop é a mais importante do desenho: quais ações o agente executa direto, quais propõe para aprovação — errar para o lado da aprovação no início e soltar com histórico.',
      'Estime custo com números: volume mensal × tokens médios × preço do modelo — a planilha simples que evita a surpresa da fatura.',
      'Use o Claude para red-team do próprio blueprint: "quais os 5 modos de falha mais prováveis deste desenho?".',
    ],
    pitfalls: [
      'Blueprint que descreve o feliz e ignora o fluxo de erro — produção é 80% exceção.',
      'Escolher a oportunidade tecnicamente interessante em vez da que dói no cliente.',
    ],
    practiceSteps: [
      'Escreva o blueprint completo da oportunidade nº 1 do seu discovery.',
      'Faça o red-team com o Claude e incorpore as defesas.',
      'Valide o desenho com alguém técnico que não participou.',
    ],
    projectContext:
      'O blueprint é o entregável que separa consultoria de "fizemos um chatbot" — é onde a engenharia da proposta mora.',
    references: [
      {
        label: 'Anthropic — building effective agents',
        url: 'https://www.anthropic.com/research/building-effective-agents',
        kind: 'artigo',
      },
      {
        label: 'Docs — tool use',
        url: 'https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 120,
  },
  {
    id: 'pj-3',
    index: 3,
    title: 'Missão: Setup de repo profissional',
    priority: 'alta',
    type: 'missao',
    shortDescription:
      'Criar o repositório padrão da consultoria: instruções, proteção, CI e submodule.',
    concept:
      'Missão de infraestrutura: montar do zero o repositório-template que todo projeto de cliente vai clonar. O checklist: CLAUDE.md + AGENTS.md com as convenções (o mesmo conteúdo servindo os dois agentes), .gitignore correto antes do primeiro commit, .env.example documentando variáveis, branch main protegida (PR + 1 aprovação + CI verde), workflow de Actions com lint+teste (checkout com submodules: recursive já embutido), CODEOWNERS nos caminhos críticos, e — o toque dos projetos de vocês — um submodule de exemplo configurado com as instruções de 2 níveis e o hook que bloqueia ponteiro sem push. O template pronto transforma o kickoff de dias em uma hora.',
    deepDive: [
      'Inclua os custom commands da consultoria (.claude/commands/): /revisar-pr, /preparar-entrega — a metodologia embarcada no template.',
      'Settings versionados (.claude/settings.json + config de permissões do Codex) — a política de segurança viaja com o repo.',
      'README do template explica o template: como usar, o que adaptar por cliente, o que nunca mudar.',
    ],
    pitfalls: [
      'Template que ninguém mantém — nomeie um dono e versione com tags (template@v2).',
      'Copiar configs entre projetos na mão em vez de usar o template — a deriva silenciosa.',
    ],
    practiceSteps: [
      'Monte o repo-template completo com o checklist inteiro.',
      'Teste-o: crie um projeto novo a partir dele e rode uma sessão de agente.',
      'Tagueie a v1 e apresente ao time.',
    ],
    projectContext:
      'É o produto interno que padroniza a qualidade de TODOS os projetos — e o hook de submodule sozinho paga a missão.',
    references: [
      {
        label: 'Claude Code — memória e settings',
        url: 'https://docs.claude.com/en/docs/claude-code/memory',
        kind: 'doc',
      },
      {
        label: 'GitHub — rulesets',
        url: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 150,
  },
  {
    id: 'pj-4',
    index: 4,
    title: 'Missão: RAG interno com Supabase + pgvector',
    priority: 'alta',
    type: 'missao',
    shortDescription:
      'Construir a busca semântica sobre documentos reais — chunking, embeddings e híbrida.',
    concept:
      'A missão que materializa a trilha de Fundamentos: construir um RAG funcional sobre um corpus real (as propostas/docs da consultoria, ou docs de um cliente piloto). O pipeline completo: ingestão (extrair texto dos documentos), chunking com estratégia consciente (por seção, com metadados: fonte, cliente, data), embeddings gerados via Edge Function e gravados no pgvector, a função hybrid_search (vetorial + full-text com RRF), e a interface de pergunta que injeta os chunks recuperados no prompt com citação da fonte. O critério de vitória: 10 perguntas reais de teste, 8+ respondidas com a fonte certa citada.',
    deepDive: [
      'Monte o conjunto de teste ANTES de construir: as 10 perguntas + onde está cada resposta — é seu eval de bolso e sua defesa contra otimização no achismo.',
      'RLS no RAG: chunks com cliente_id e policies — a pergunta do usuário só busca no que ele pode ver; segurança semântica de verdade.',
      'Quando a resposta vier errada, debugue o pipeline por partes: a busca achou o chunk certo? (problema de retrieval) ou achou e o modelo ignorou? (problema de prompt).',
    ],
    pitfalls: [
      'Chunking ingênuo (cortes no meio de tabelas/cláusulas) — a causa nº 1 de RAG ruim.',
      'Pular a avaliação e "sentir" que melhorou.',
    ],
    practiceSteps: [
      'Defina o corpus e as 10 perguntas de teste.',
      'Construa o pipeline completo (ingestão → chunks → embeddings → híbrida → resposta com fonte).',
      'Meça, ajuste chunking/busca, meça de novo.',
    ],
    projectContext:
      '"IA que responde sobre OS NOSSOS documentos" é o produto mais vendável do portfólio — esta missão é o protótipo comercial dele.',
    references: [
      { label: 'Supabase — AI & vectors', url: 'https://supabase.com/docs/guides/ai', kind: 'doc' },
      {
        label: 'Supabase — hybrid search',
        url: 'https://supabase.com/docs/guides/ai/hybrid-search',
        kind: 'doc',
      },
      {
        label: 'Anthropic — contextual retrieval',
        url: 'https://www.anthropic.com/news/contextual-retrieval',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 240,
  },
  {
    id: 'pj-5',
    index: 5,
    title: 'Missão: App completo com Claude Code + Supabase',
    priority: 'alta',
    type: 'missao',
    shortDescription: 'Do zero ao deploy: um app real de uma dor real, construído com agente.',
    concept:
      'A missão central do programa: construir um aplicativo completo — frontend, banco com RLS, auth — usando o agente como par de programação, a partir do template da pj-3. Escolha uma dor real e pequena (o rastreador de propostas da consultoria, o formulário de discovery estruturado). O método é o que importa mais que o app: plan mode antes de codar, uma feature por sessão/branch, migração por CLI, revisão de todo diff, commits atômicos, PR com CI verde. Deploy no final — app na URL, usável. O critério de vitória duplo: o app funciona E o repositório conta uma história limpa (qualquer dev entende o histórico).',
    deepDive: [
      'Comece pelo schema: modele as tabelas + RLS ANTES da primeira tela — o agente constrói o frontend muito melhor sobre um contrato de dados claro (tipos gerados!).',
      'Quando travar, o protocolo: Esc, contexto novo, tarefa menor — a habilidade de destravar agente é o aprendizado escondido da missão.',
      'Registre o tempo por feature — os números viram seu argumento comercial de velocidade ("CRUD completo com auth em X horas").',
    ],
    pitfalls: [
      'Escopo crescendo no meio ("já que estamos aqui…") — corte para a v1; anote o resto.',
      'Aceitar tudo que o agente propõe para "ir rápido" e pagar em dívida na semana 2.',
    ],
    practiceSteps: [
      'Defina o escopo v1 em 5 features ou menos.',
      'Schema + RLS primeiro; depois feature a feature com o método completo.',
      'Deploy, teste com um usuário real, registre os tempos.',
    ],
    projectContext:
      'É a prova prática de que a consultoria FAZ o que ensina — e o app resultante vira demo viva em toda reunião comercial.',
    references: [
      {
        label: 'Claude Code — workflows comuns',
        url: 'https://docs.claude.com/en/docs/claude-code/common-workflows',
        kind: 'doc',
      },
      {
        label: 'Supabase — quickstart React',
        url: 'https://supabase.com/docs/guides/getting-started/quickstarts/reactjs',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 360,
  },
  {
    id: 'pj-6',
    index: 6,
    title: 'Missão: QA de código de agente',
    priority: 'media',
    type: 'missao',
    shortDescription:
      'Auditar um PR grande gerado por IA com o checklist completo — e achar o que dói.',
    concept:
      'Missão de olho clínico: pegar um PR substancial gerado por agente (do seu app da pj-5, ou gere um de propósito: "refatore o módulo X inteiro") e auditá-lo formalmente com o checklist da trilha GitHub — escopo, testes de verdade vs testes de fachada, as red flags (dependência nova, catch engolindo erro, hardcode, teste deletado), segurança (inputs, segredos, permissões). O twist da missão: plante você mesmo 3 problemas sutis num PR e passe-o a um colega com o checklist — o exercício de esconder ensina a achar. Entregável: o relatório de auditoria + o template refinado.',
    deepDive: [
      'Use um subagente revisor como primeira passada e compare com sua revisão humana — onde a máquina pega melhor, onde você pega melhor; o processo bom usa os dois.',
      'Cronometre: revisão profunda de PR de 400 linhas leva X minutos — o número que dimensiona quanto trabalho de agente um humano consegue supervisionar por dia (o gargalo real da escala).',
      'Os achados recorrentes viram regras de CLAUDE.md e hooks — cada bug de auditoria deve morrer na origem.',
    ],
    pitfalls: [
      'Auditar só estilo e deixar passar semântica — linter acha estilo; você existe para a lógica.',
      'Checklist gigante que ninguém segue — 10 itens que o time USA vencem 40 ideais.',
    ],
    practiceSteps: [
      'Audite um PR real de agente com o checklist e escreva o relatório.',
      'Rode o exercício dos 3 problemas plantados com um colega (nos dois papéis).',
      'Refine o checklist da consultoria com o que aprendeu.',
    ],
    projectContext:
      'Supervisão de qualidade É o serviço na era do código gerado — esta missão treina o músculo que o cliente está comprando.',
    references: [
      {
        label: 'Claude Code — best practices',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        kind: 'artigo',
      },
      {
        label: 'GitHub — revisando PRs',
        url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 150,
  },
  {
    id: 'pj-7',
    index: 7,
    title: 'Missão: Entrega, versionamento e handover',
    priority: 'media',
    type: 'missao',
    shortDescription:
      'Empacotar o projeto para o cliente: release, docs, runbook e a passagem de bastão.',
    concept:
      'A missão que fecha o ciclo comercial: pegar o app da pj-5 e prepará-lo para entrega como se fosse a um cliente real. O pacote: release taggeada (SemVer + changelog gerado), README de operação (como rodar, como configurar, variáveis), o runbook de incidentes (o que fazer quando X quebrar — incluindo a recuperação de banco da trilha Supabase), a documentação de arquitetura em 2 páginas (decisões e porquês — as ADRs), e o plano de handover: a reunião de passagem, os acessos transferidos/revogados (offboarding limpo!), e o que fica de suporte. Use o agente para gerar 80% da documentação A PARTIR do código — e revise os 20% que importam.',
    deepDive: [
      'Documentação gerada do código real não mente: "documente a arquitetura deste repo, decisões visíveis no código e nas migrações" — o rascunho sai em minutos.',
      'O handover testa-se: alguém que nunca viu o projeto sobe o ambiente só com o README — se travou, o README falhou.',
      'Defina o que é suporte vs novo escopo POR ESCRITO na entrega — a fronteira mal definida corrói margem por meses.',
    ],
    pitfalls: [
      'Entregar código sem runbook — o primeiro incidente do cliente vira sua emergência de madrugada.',
      'Esquecer acessos vivos pós-projeto (o offboarding da trilha GitHub).',
    ],
    practiceSteps: [
      'Monte o pacote completo de entrega do seu app.',
      'Rode o teste do README com alguém de fora.',
      'Simule a reunião de handover com um colega no papel do cliente.',
    ],
    projectContext:
      'Entrega impecável é o que transforma projeto em contrato recorrente — o pacote desta missão é o padrão da casa.',
    references: [
      {
        label: 'GitHub — releases',
        url: 'https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases',
        kind: 'doc',
      },
      { label: 'Semantic Versioning', url: 'https://semver.org/', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 150,
  },
  {
    id: 'pj-8',
    index: 8,
    title: 'Missão: Comparativo de stack — o relatório que o cliente paga',
    priority: 'media',
    type: 'missao',
    shortDescription: 'Claude Code vs Codex vs Antigravity no MESMO caso real, com evidências.',
    concept:
      'A missão de fechamento intelectual: rodar as mesmas 5 tarefas reais (do seu app ou de um repo de cliente) em Claude Code, Codex e Antigravity, e produzir o relatório comparativo com evidências — tempo, qualidade do diff, quantidade de intervenção humana, custo estimado, experiência por perfil de usuário. O formato: matriz de resultados + recomendação POR CENÁRIO (não um vencedor universal: "para o time de vocês, com assinatura X já paga e perfil Y, recomendamos…"). Este relatório, com o piloto no código do próprio cliente, é um produto de consultoria que se vende sozinho — e a missão o deixa pronto como template.',
    deepDive: [
      'Tarefas do comparativo cobrindo perfis diferentes: 1 bug fix, 1 feature média, 1 refactor, 1 tarefa de dados/documentos, 1 tarefa delegada assíncrona (Cloud/Manager view).',
      'Padronize as condições: mesmo repo, mesmas instruções-base (AGENTS.md/CLAUDE.md equivalentes), mesmo critério de aceite — senão o comparativo mede setup, não ferramenta.',
      'Date o relatório e planeje a revisão trimestral — a meia-vida de comparativo de agentes é curta e o cliente valoriza a atualização (recorrência!).',
    ],
    pitfalls: [
      'Deixar a preferência pessoal vazar no desenho das tarefas.',
      'Comparar números sem contexto de perfil — a ferramenta "mais rápida" pode ser inutilizável para o time do cliente.',
    ],
    practiceSteps: [
      'Desenhe as 5 tarefas e as condições padronizadas.',
      'Execute nos 3 agentes, coletando as métricas.',
      'Escreva o relatório com recomendação por cenário e apresente ao time.',
    ],
    projectContext:
      'É a resposta definitiva e monetizável ao "qual ferramenta usamos?" — o entregável de discovery técnico do portfólio.',
    references: [
      {
        label: 'Docs Claude Code',
        url: 'https://docs.claude.com/en/docs/claude-code/overview',
        kind: 'doc',
      },
      { label: 'Docs Codex', url: 'https://developers.openai.com/codex', kind: 'doc' },
      { label: 'Antigravity', url: 'https://antigravity.google/', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 240,
  },
  {
    id: 'pj-boss',
    index: 9,
    title: 'BOSS FINAL: Consultor de IA Completo',
    priority: 'alta',
    type: 'boss',
    shortDescription: 'O desafio que cruza tudo — discovery, blueprint, RAG, QA e entrega.',
    concept:
      'O boss final do programa cruza as sete trilhas: método de discovery, decisões de blueprint, arquitetura de RAG, supervisão de qualidade de código gerado e o pacote de entrega profissional. Acerte 4 de 5 e complete a jornada.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação aqui indica o perfil completo: consultor que mapeia, desenha, constrói, audita e entrega projetos de IA.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
