import type { Topic } from './types'

const CE = 'https://every.to/guides/compound-engineering'
const CC = 'https://code.claude.com/docs/en'

export const compoundTopics: Topic[] = [
  {
    id: 'ce-1',
    index: 1,
    title: 'A filosofia: cada trabalho torna o próximo mais fácil',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'O princípio que inverte a dívida técnica — features ensinam o sistema em vez de complicá-lo.',
    concept:
      'Compound Engineering (engenharia composta) é a filosofia de desenvolvimento AI-native criada por Kieran Klaassen (Every/Cora): cada unidade de trabalho entregue deve tornar a PRÓXIMA mais fácil, não mais difícil. Na engenharia tradicional, todo código novo é uma negociação com o antigo — o sistema fica mais complexo, mais frágil e mais lento de mudar com o tempo (a dívida técnica clássica). O compound inverte isso: cada bug corrigido elimina uma categoria inteira de bugs futuros; cada padrão vira ferramenta reutilizável; cada correção de review vira uma regra que o agente aplica sozinho na próxima. Em vez de complexidade acumulada, você acumula CAPACIDADE. O resultado prático de vocês: entregar sistemas ao cliente que ficam mais fáceis de evoluir a cada entrega, não mais difíceis.',
    deepDive: [
      'A prova de conceito é radical: a Every roda cinco produtos com times de engenharia de UMA pessoa cada — só é possível porque o investimento em contexto e sistema compõe ao longo do tempo.',
      'A diferença mental: engenharia tradicional pergunta "como resolvo esta tarefa?"; compound pergunta "como resolvo esta tarefa DE UM JEITO que a próxima fique mais barata?".',
      'Isso não é sobre digitar mais rápido com IA — é sobre parar de digitar e passar a ENSINAR o sistema. O tempo gasto dando contexto ao agente paga dividendos exponenciais; o tempo digitando código resolve só a tarefa da frente.',
    ],
    pitfalls: [
      'Usar IA como autocomplete turbinado (resolve a tarefa, não ensina o sistema) — ganho linear, não composto.',
      'Achar que é só ligar o agente — sem os sistemas (instruções, checks, memória), o agente repete os mesmos erros pra sempre.',
    ],
    practiceSteps: [
      'Pegue os 3 erros que você mais corrige manualmente no agente e escreva por que cada um deveria virar uma regra permanente.',
      'Numa tarefa real, cronometre: quanto tempo você gastou "fazendo" vs "ensinando o sistema a fazer"?',
      'Escreva em 5 frases o que "compõe" no seu fluxo atual — e o que só se repete.',
    ],
    projectContext:
      'É a tese que sustenta a promessa do Adapta Native: entregar ao cliente um sistema que melhora sozinho a cada iteração, em vez de um monólito que apodrece.',
    references: [
      {
        label: 'Comece aqui: o guia definitivo de Compound Engineering (Every)',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Depois leia: como a Every coda com agentes (a filosofia aplicada)',
        url: 'https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ce-2',
    index: 2,
    title: 'Os cinco princípios que sustentam o método',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'As crenças-base: trabalho que compõe, gosto em sistemas, ensinar em vez de fazer, redes de segurança, ambiente agent-native.',
    concept:
      'O compound engineering se apoia em cinco crenças que orientam toda decisão. (1) Cada unidade de trabalho torna a próxima mais fácil — código, docs e tooling constroem uns sobre os outros. (2) Gosto pertence a SISTEMAS, não a review — em vez de checar manualmente toda vez, você assa seu julgamento em configuração, schemas e checks automatizados (revisão manual não escala). (3) Ensine o sistema, não faça o trabalho — dar contexto ao agente rende dividendos exponenciais; digitar código resolve só a tarefa da frente. (4) Construa redes de segurança, não processos de revisão — confiança em IA vem de infraestrutura de verificação (testes, checks, hooks), não de guardar o portão manualmente a cada passo. (5) Torne o ambiente agent-native — estruture projetos para que os agentes naveguem e modifiquem sozinhos. Esses cinco viram o filtro de "estou fazendo compound ou só usando IA?".',
    deepDive: [
      'O princípio 2 é o mais subestimado: toda vez que você reprova algo no review por "gosto", esse gosto deveria virar um check automatizado — senão você vira o gargalo humano de toda entrega.',
      'O princípio 4 muda o design: ao construir uma feature, pergunte "como o agente vai interagir com isto?"; ao debugar, "o que o agente precisaria ver?"; ao documentar, "o agente vai entender?".',
      'Os cinco juntos explicam por que o compound não é "prompt melhor" — é arquitetura de trabalho e de repositório.',
    ],
    pitfalls: [
      'Manter o gosto na cabeça do sênior em vez de codificá-lo — o dia que ele sai de férias, a qualidade cai.',
      'Confundir "rede de segurança" com "burocracia": o objetivo é liberar autonomia com confiança, não criar mais aprovações manuais.',
    ],
    practiceSteps: [
      'Liste 3 regras de "gosto" que hoje só vivem na sua cabeça e transforme cada uma em check, schema ou instrução.',
      'Avalie seu repo atual contra o princípio 4: um agente novo consegue navegar e modificar sozinho? O que falta?',
    ],
    projectContext:
      'Os cinco princípios viram o checklist de maturidade que a consultoria aplica no ambiente do cliente antes de escalar o uso de agentes.',
    references: [
      {
        label: 'Comece aqui: os princípios que sustentam a abordagem',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Aprofunde: gosto em sistemas, não em review (a prática)',
        url: 'https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ce-3',
    index: 3,
    title: 'A escada de 5 estágios de adoção de IA',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Onde você está: de escrever linha a linha até delegar tarefas autônomas com revisão multi-agente.',
    concept:
      'Klaassen descreve cinco estágios de adoção, e o erro fatal é pular degraus. Estágio 1: você escreve código linha a linha, sem IA. Estágio 2: autocomplete e perguntas pontuais ao chat. Estágio 3: você delega tarefas ao agente com plano e revisão, controlando o fluxo. Estágio 4: múltiplos agentes trabalham e revisam em paralelo; você foca em intenção e arquitetura. Estágio 5: agentes com acesso a sistemas (tickets, deploy, serviços externos) executam tarefas de ponta a ponta com autonomia. A regra dura: pular estágios NÃO funciona — cada degrau constrói os modelos mentais e hábitos que o próximo exige. Quem ouve falar de "13 agentes revisando em paralelo" e tenta ir direto pro estágio 5 se sente desconfortável, não confia na ferramenta, e desiste. O valor prático: diagnosticar em que degrau cada consultor (e cada cliente) está, e construir a partir dali.',
    deepDive: [
      'A maioria dos que "não conseguem trabalhar com IA" simplesmente não sabe em que degrau está — e tenta operar num que ainda não dominou.',
      'A transição 3→4 é a mais difícil: sair de "um agente que eu supervisiono" para "vários agentes que eu oriento" exige confiança construída nas redes de segurança (princípio 4).',
      'O estágio 5 é agent-native de verdade: o agente tem as ferramentas e o ambiente para fechar o ciclo sozinho — é o alvo, não o ponto de partida.',
    ],
    pitfalls: [
      'Vender ao cliente o estágio 5 quando o time dele está no 2 — frustração garantida e contrato queimado.',
      'Desprezar os estágios baixos: eles não são "atraso", são a fundação dos modelos mentais dos altos.',
    ],
    practiceSteps: [
      'Autoavalie: em qual estágio VOCÊ está hoje, honestamente? E cada pessoa do time?',
      'Escreva o próximo degrau concreto pra você — o hábito específico que falta pra subir um nível.',
      'Mapeie um cliente real nos 5 estágios e defina a meta realista de 3 meses.',
    ],
    projectContext:
      'A escada é a ferramenta de diagnóstico de maturidade que a consultoria usa no discovery — dá pra vender a jornada de adoção degrau a degrau, não um salto impossível.',
    references: [
      {
        label: 'Comece aqui: os 5 estágios da escada de adoção',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Veja aplicado: os fluxos de IA dos 6 engenheiros da Every',
        url: 'https://every.to/source-code/inside-the-ai-workflows-of-every-s-six-engineers',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ce-4',
    index: 4,
    title: 'O loop: Plan → Work → Review → Compound',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'O ciclo central do método e o que cada fase exige de você — e do agente.',
    concept:
      'O coração do compound engineering é um loop: PLAN (planejar) → WORK (executar) → REVIEW (revisar) → COMPOUND (compor as lições) → repetir. Plan: você e o agente desenham a abordagem antes de tocar em código — em documento revisável, assíncrono. Work: o agente executa o plano aprovado (essa fase virou "chata, no melhor sentido" — é a mais automatizável). Review: revisão focada em INTENÇÃO, não em sintaxe — os agentes já pegaram bugs, segurança e estilo; o humano pergunta "isto é o que combinamos construir?". Compound: a parte que dá nome ao método — cada lição do review vira regra permanente (no CLAUDE.md, num check, num subagente), pra o mesmo erro nunca mais acontecer. O loop evoluiu (a Every expandiu de 4 para 7-8 passos, colocando "ideate" na frente e "polish" no fim), mas o núcleo plan-work-review-compound é o que você precisa internalizar.',
    deepDive: [
      'A fase COMPOUND é o que separa compound engineering de "só usar agente": sem ela, você corrige o mesmo erro pra sempre; com ela, cada erro morre na origem.',
      'A metáfora do "sanduíche" (versão nova): humano nas duas pontas (ideate/plan no começo, polish/decisão no fim), IA no meio fazendo o trabalho pesado.',
      'Plan e review assíncronos destravam o time: "criei um doc de plano, comenta até o fim do dia" substitui a reunião de alinhamento.',
    ],
    pitfalls: [
      'Pular o PLAN e deixar o agente codar direto — execução perfeita da abordagem errada é o retrabalho mais caro.',
      'Fazer review de sintaxe quando o agente já cuidou disso — desperdiça o olho humano, que deveria mirar intenção e arquitetura.',
      'Nunca fechar o COMPOUND: a lição fica na sua cabeça, não no sistema, e evapora.',
    ],
    practiceSteps: [
      'Rode o loop completo numa tarefa real, escrevendo o plano ANTES e fechando com pelo menos uma lição virando regra.',
      'Na fase review, force-se a comentar só intenção/arquitetura por uma sessão inteira — nada de sintaxe.',
      'Crie seu primeiro "artefato de compound": uma regra no CLAUDE.md nascida de um erro real desta semana.',
    ],
    projectContext:
      'O loop é o método de trabalho que a consultoria instala no time do cliente — plan-work-review-compound vira o processo padrão de toda entrega com agente.',
    references: [
      {
        label: 'Comece aqui: o loop plan-work-review-compound explicado',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'A evolução do loop (de 4 para 8 passos, o "sanduíche")',
        url: 'https://every.to/p/compound-engineering-gets-an-upgrade',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'ce-5',
    index: 5,
    title: 'PLAN: planejar com o agente antes de codar',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Planos como documentos revisáveis, planejamento multi-agente e o plan mode do Claude Code.',
    concept:
      'A fase de planejamento é onde o compound ganha ou perde. Em vez de mandar o agente "fazer", você primeiro produz um PLANO — um documento com a abordagem, os arquivos que serão tocados, os critérios de aceite e os riscos. O plano é revisável e assíncrono: o time comenta sem precisar de reunião. O planejamento pode ser multi-agente: um subagente pesquisa o repositório, outro busca best practices, outro investiga o framework — e você sintetiza o plano a partir disso. No Claude Code, o plan mode faz exatamente isso: o agente explora em modo somente-leitura e te apresenta um plano estruturado antes de mudar qualquer arquivo. O julgamento humano entra AQUI: é no plano que você simplifica (cortar a criptografia que adiciona complexidade escondida), não no meio da execução.',
    deepDive: [
      'Plano bom tem critério de aceite explícito ("os testes X passam, o lint fica limpo") — é o que permite o agente se autoverificar depois.',
      'Planejamento multi-agente em paralelo: repo-scout + best-practices-scout + framework-researcher rodando juntos produzem um plano muito mais rico que um agente sozinho.',
      'O plano é o melhor lugar pra cortar escopo: simplificar no plano custa minutos; simplificar depois de codado custa a reescrita.',
    ],
    pitfalls: [
      'Plano vago ("melhore o módulo de auth") — o agente precisa de abordagem e critério, não de um desejo.',
      'Aprovar o plano no automático — a revisão do plano É a economia; ler com atenção aqui evita o retrabalho caro.',
    ],
    practiceSteps: [
      'Use o plan mode do Claude Code numa tarefa real e revise o plano ANTES de deixar executar.',
      'Rode um planejamento multi-agente (pesquisa de repo + best practices) e sintetize o plano.',
      'Escreva um plano com critério de aceite verificável e deixe o agente se autoconferir contra ele.',
    ],
    projectContext:
      'O "plano revisável antes de codar" é entregável e ritual da consultoria — no Adapta Native, o plano aprovado é a ponte entre a spec do cliente e o código.',
    references: [
      {
        label: 'Comece aqui: plan mode do Claude Code (planejar antes de agir)',
        url: CC + '/common-workflows',
        kind: 'doc',
      },
      {
        label: 'Aprofunde: planejamento multi-agente no fluxo da Every',
        url: 'https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents',
        kind: 'artigo',
      },
      {
        label: 'Subagentes para pesquisa paralela (Claude Code)',
        url: CC + '/sub-agents',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'ce-6',
    index: 6,
    title: 'WORK: execução e a autonomia calibrada',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Deixar o agente executar o plano aprovado, e calibrar quando ele pede permissão.',
    concept:
      'Com o plano aprovado, a fase WORK é a execução — e no compound maduro ela virou "chata, no melhor sentido": o agente roda o plano enquanto você cuida de intenção e das próximas frentes. O ponto crítico é a AUTONOMIA CALIBRADA: por padrão o Claude Code pede permissão antes de cada ação (criar arquivo, rodar comando), o que é uma rede de segurança sensata no começo, mas mata o fluxo nos estágios 3+ da escada. A calibração é: pré-aprovar o que é seguro e repetitivo (rodar testes, lint, ler git), manter aprovação pro que é destrutivo ou externo (deploy, force push, apagar). A flag --dangerously-skip-permissions existe (o nome assustador é de propósito), mas autonomia total só faz sentido em ambiente descartável ou quando você confia no processo E tem as redes de segurança montadas. A regra: autonomia cresce com a confiança construída, não nasce no máximo.',
    deepDive: [
      'Klaassen roda "44 agentes, cada um é um modelo apontado pra uma pasta" — só é sustentável porque cada pasta tem CLAUDE.md, skills e redes de segurança que tornam a autonomia segura.',
      'Pré-aprovação por padrão de comando (allowlist) é o que transforma sessões que travam a cada 2 minutos em sessões de 15+ minutos autônomas.',
      'A confiança pra soltar a mão vem das redes de segurança (testes, checks): sem elas, autonomia é aposta; com elas, é processo.',
    ],
    pitfalls: [
      'Ligar --dangerously-skip-permissions na máquina com credenciais de produção do cliente por "conveniência".',
      'Ficar preso no estágio 2 por não calibrar permissões — o agente pergunta tudo e você desiste da autonomia.',
    ],
    practiceSteps: [
      'Configure uma allowlist de comandos seguros (testes, lint, git read) e meça o ganho de tempo autônomo.',
      'Defina explicitamente o que NUNCA é auto-aprovado no seu fluxo (a denylist do destrutivo).',
      'Rode uma tarefa inteira em modo mais autônomo num repo descartável e observe onde você ainda precisaria intervir.',
    ],
    projectContext:
      'A matriz de autonomia calibrada é parte da governança que a consultoria entrega ao cliente — produtividade com trilho, não anarquia de agente.',
    references: [
      {
        label: 'Comece aqui: permissões e modos de permissão (Claude Code)',
        url: CC + '/permissions',
        kind: 'doc',
      },
      {
        label: 'Aprofunde: a pasta é o agente (44 agentes na prática)',
        url: 'https://every.to/source-code/the-folder-is-the-agent',
        kind: 'artigo',
      },
      { label: 'Configuração de settings e allowlists', url: CC + '/settings', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ce-7',
    index: 7,
    title: 'REVIEW: revisar intenção, não sintaxe',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Review multi-agente pega o técnico; o humano foca no que combinamos construir.',
    concept:
      'No compound engineering, a revisão muda de natureza. Quando agentes de review já analisaram o PR — bugs, vulnerabilidades, performance, estilo — o revisor humano NÃO deve perder tempo com isso. As perguntas humanas são de intenção: "isto corresponde ao que combinamos construir? A abordagem faz sentido? Há problema de lógica de negócio?". Klaassen relata rodar até 13 agentes revisando em paralelo, cada um com um foco (segurança, performance, convenções, lógica), que pegam o que um humano cansado deixaria passar — inclusive bugs críticos. O humano vira o revisor de ALTO NÍVEL: arquitetura e alinhamento com o objetivo. Isso só funciona com a disciplina de confiar nos agentes de review para o técnico (senão você duplica o trabalho) e de manter o olho humano onde ele é insubstituível: o julgamento sobre SE era isso que deveria ser construído.',
    deepDive: [
      'Contexto fresco melhora review: um agente que não escreveu o código o revisa sem o viés de defender a própria solução (padrão Writer/Reviewer).',
      'Review multi-agente em paralelo é o exemplo canônico do estágio 4 da escada — e a razão de a fase WORK poder ficar "chata".',
      'A regra de ouro: se o humano está corrigindo vírgula, o sistema de review automatizado está incompleto — invista lá, não no olho humano.',
    ],
    pitfalls: [
      'Aprovar por confiança acumulada ("os últimos 10 estavam bons") — a taxa de erro não é zero e o caro é o 11º.',
      'Revisar sintaxe manualmente quando os agentes já fizeram isso — desperdício do recurso humano mais valioso.',
    ],
    practiceSteps: [
      'Monte um subagente revisor de segurança e um de convenções e rode-os antes da sua revisão humana.',
      'Numa revisão real, force-se a comentar SÓ intenção e arquitetura — deixe o técnico para os agentes.',
      'Compare: o que os agentes pegaram vs o que você pegou? Onde cada um é melhor?',
    ],
    projectContext:
      'O sistema de review multi-agente é o que garante a qualidade prometida ao cliente na era do código gerado — e é entregável interno da consultoria.',
    references: [
      {
        label: 'Comece aqui: review focado em intenção (guia)',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Aprofunde: 13 agentes em paralelo pegaram um bug crítico',
        url: 'https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it',
        kind: 'artigo',
      },
      {
        label: 'Como criar subagentes revisores (Claude Code)',
        url: CC + '/sub-agents',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'ce-8',
    index: 8,
    title: 'COMPOUND: transformar lições em regras permanentes',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'A fase que dá nome ao método — cada feedback vira CLAUDE.md, check ou subagente.',
    concept:
      'Esta é a fase que faz o método compor — e a que quase todo mundo pula. Toda lição do review deve virar algo PERMANENTE no sistema, para que o mesmo erro não se repita: uma regra no CLAUDE.md/AGENTS.md, um teste que trava a regressão, um hook que bloqueia o padrão ruim, um subagente que passa a checar aquilo, uma entrada no schema. O efeito é o que Klaassen chama de "meu AI já tinha corrigido o código antes de eu ver": depois de meses compondo, o agente aplica automaticamente centenas de lições que você ensinou uma vez. Isto é o oposto de re-explicar a mesma preferência toda semana. A regra operacional: nenhuma sessão de review termina sem perguntar "esta lição deveria virar regra? Onde?". Uma hora ensinando o sistema hoje economiza dezenas de horas de correção manual no futuro.',
    deepDive: [
      'A hierarquia da codificação: preferência → instrução (CLAUDE.md); garantia inegociável → hook ou teste; verificação recorrente → subagente. Escolha o mecanismo certo pra cada lição.',
      '"Gaste uma hora ensinando a IA como você pensa, e ela fica mais inteligente a cada feature" — a fase compound É essa hora, distribuída em lições pequenas.',
      'O composto é mensurável: conte quantas lições viraram regra este mês. Se o número é zero, você está usando IA, não fazendo compound.',
    ],
    pitfalls: [
      'Deixar a lição na cabeça ("da próxima eu lembro") — não lembra, e o agente também não.',
      'Codificar como instrução o que precisava ser hook (e vice-versa) — garantia que depende da boa vontade do modelo não é garantia.',
    ],
    practiceSteps: [
      'Feche TODA sessão de review desta semana com pelo menos uma lição virando regra concreta.',
      'Revise seu CLAUDE.md: quantas regras ali nasceram de erros reais vs foram escritas no vácuo?',
      'Transforme um erro recorrente num hook ou teste — e comprove que ele agora bloqueia sozinho.',
    ],
    projectContext:
      'O "sistema que aprende" é o diferencial vendável do Adapta Native: a cada entrega, o repositório do cliente fica mais inteligente — a fase compound é onde essa mágica acontece.',
    references: [
      {
        label: 'Comece aqui: a IA que já tinha corrigido antes de eu ver',
        url: 'https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it',
        kind: 'artigo',
      },
      {
        label: 'Onde codificar: memória do Claude Code (CLAUDE.md)',
        url: CC + '/memory',
        kind: 'doc',
      },
      {
        label: 'Hooks para travar regras de forma determinística',
        url: CC + '/hooks',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'ce-9',
    index: 9,
    title: 'A pasta é o agente: contexto que se acumula',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'CLAUDE.md + skills + contexto acumulado transformam um modelo genérico em especialista.',
    concept:
      'A ideia mais poderosa e prática do compound: "a pasta é o agente". Um modelo genérico não é especialista em nada — mas uma PASTA com um CLAUDE.md (que ensina como trabalhar naquele projeto), definições de skills, e contexto acumulado em meses de compound engineering transforma esse modelo genérico num especialista naquele domínio. Klaassen roda 44 dessas "pastas-agente" em vários projetos, com uma camada de dispatch roteando entre elas. Cada pasta é um agente porque carrega o conhecimento acumulado — o composto vive ali. Isso reposiciona o CLAUDE.md: ele não é "um arquivo de config", é o cérebro acumulado do agente daquele projeto. Quanto mais você compõe (fase 8), mais especialista a pasta fica. Para consultoria: cada cliente vira uma pasta-agente que fica mais capaz a cada projeto entregue.',
    deepDive: [
      'A camada de dispatch (roteamento entre pastas-agente) é o que permite escalar de 1 pra dezenas de agentes sem virar caos.',
      'Skills empacotam capacidades reutilizáveis dentro da pasta — o agente da pasta "sabe fazer" X porque a skill está ali, não porque você reexplica.',
      'O CLAUDE.md de um projeto compound de meses é radicalmente diferente de um gerado por /init — o valor está no contexto acumulado, não no template inicial.',
    ],
    pitfalls: [
      'Tratar CLAUDE.md como config estática de setup — ele deveria crescer (e ser podado) a cada lição composta.',
      'Uma pasta-agente genérica pra tudo em vez de especializadas — perde-se o ganho de contexto focado.',
    ],
    practiceSteps: [
      'Escolha um projeto e trate a pasta como agente por uma semana: toda lição vai pro CLAUDE.md dela.',
      'Crie uma skill para uma capacidade que você reexplica sempre, e teste o agente usando-a sozinho.',
      'Compare seu CLAUDE.md de hoje com o de um mês atrás — ele está composto ou estagnado?',
    ],
    projectContext:
      'O modelo "cliente = pasta-agente que acumula" é como a consultoria escala: cada projeto deixa a pasta do cliente mais capaz, e o próximo sai mais rápido.',
    references: [
      {
        label: 'Comece aqui: a pasta é o agente (Every)',
        url: 'https://every.to/source-code/the-folder-is-the-agent',
        kind: 'artigo',
      },
      {
        label: 'Skills no Claude Code (capacidades reutilizáveis)',
        url: CC + '/skills',
        kind: 'doc',
      },
      { label: 'Memória e CLAUDE.md como cérebro do projeto', url: CC + '/memory', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'ce-10',
    index: 10,
    title: 'Trabalho assíncrono e handoffs perfeitos',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Planos e reviews sem reunião, e passagens de bastão que carregam todo o contexto.',
    concept:
      'O compound engineering é naturalmente assíncrono — e isso é uma vantagem, não um efeito colateral. Planos podem ser criados, revisados e aprovados sem marcar reunião: "criei um doc de plano, comenta até o fim do dia" substitui "vamos marcar pra discutir a abordagem". A mesma lógica vale para HANDOFFS: quando você passa trabalho pra outra pessoa (ou pro agente amanhã), inclui tudo que ela precisa — status, o que foi feito, o que falta, contexto e como continuar. Klaassen usa um formato explícito: "## Handoff: [feature] / De: X → Para: Y / Status: plano aprovado, implementação 50% / Falta: ... / Como continuar: rode /work na branch". Isso conversa direto com a lição de sessões do Claude Code e do Codex: o estado de verdade vive em arquivos (PROGRESS.md, o plano, o Git), não na memória de uma conversa que envelhece.',
    deepDive: [
      'Handoff bom é agent-native: escrito de um jeito que TANTO um humano QUANTO um agente conseguem retomar sem você explicar.',
      'Assíncrono destrava consultoria multi-cliente: você orienta várias frentes por documento, sem ser gargalo de reunião de cada uma.',
      'O formato de handoff é reutilizável — vira um template/skill que padroniza a passagem de bastão do time inteiro.',
    ],
    pitfalls: [
      'Handoff que assume contexto na cabeça de quem passa — a pessoa (ou o agente) que recebe trava.',
      'Confiar o estado do trabalho ao histórico do chat em vez de a arquivos — o histórico envelhece e o repo muda por fora.',
    ],
    practiceSteps: [
      'Escreva um handoff no formato completo (status/feito/falta/contexto/como continuar) numa tarefa real.',
      'Substitua uma reunião de alinhamento por um doc de plano comentável e meça o resultado.',
      'Crie um template de handoff da consultoria e use-o na próxima passagem entre consultores.',
    ],
    projectContext:
      'Handoff perfeito é o que permite entregar e transferir projetos ao cliente sem depender de você de plantão — é a base do handover limpo da trilha de Projetos.',
    references: [
      {
        label: 'Comece aqui: trabalho assíncrono e handoffs (guia)',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Retomar sessões e estado em arquivos (Claude Code)',
        url: CC + '/common-workflows',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'ce-11',
    index: 11,
    title: 'O plugin de Compound Engineering na prática',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Subagentes e skills prontos que operacionalizam o loop — e como adaptar ao contexto de vocês.',
    concept:
      'A Every empacotou o método num plugin open-source de compound engineering (dezenas de milhares de estrelas no GitHub) que traz o loop pronto: subagentes especializados e slash-commands/skills que operacionalizam plan → work → review → compound. Nas versões recentes, são dezenas de subagentes e comandos (ex.: /work para executar na branch, comandos de planejamento e de review). O valor pra vocês não é copiar cego — é ESTUDAR como um sistema compound maduro é estruturado e adaptar ao stack da consultoria (Claude Code + Codex + Supabase + os padrões do Adapta Native). Ver os subagentes reais, os prompts de review, a estrutura de skills, é o atalho pra montar o próprio conjunto sem reinventar do zero. É também um exemplo vivo do princípio "a pasta é o agente" em escala de produto.',
    deepDive: [
      'Ler os prompts dos subagentes de review do plugin ensina mais sobre revisão de código de agente do que qualquer teoria.',
      'Adaptar > adotar: o plugin foi feito pro contexto Ruby/Rails da Every; extraia os PADRÕES (estrutura do loop, tipos de subagente) e reimplemente no seu stack.',
      'Como é open-source e versionado, dá pra acompanhar a evolução do método pela evolução do próprio plugin.',
    ],
    pitfalls: [
      'Instalar o plugin e esperar mágica sem entender o loop — ferramenta sem método é só mais complexidade.',
      'Copiar prompts específicos de outro stack sem adaptar às convenções do cliente.',
    ],
    practiceSteps: [
      'Explore o repositório do plugin e mapeie quais subagentes/comandos fazem cada fase do loop.',
      'Escolha um subagente (ex.: o revisor) e adapte o prompt dele ao stack e às convenções de vocês.',
      'Monte um mini-conjunto próprio (1 comando de plano + 1 de review) inspirado na estrutura do plugin.',
    ],
    projectContext:
      'O plugin é o molde a partir do qual a consultoria monta seu próprio kit de subagentes e comandos — o "template de repo profissional" da trilha de Projetos ganha o método compound embutido.',
    references: [
      {
        label: 'Comece aqui: o plugin open-source de compound engineering',
        url: 'https://github.com/EveryInc/compound-engineering-plugin',
        kind: 'tool',
      },
      {
        label: 'Referência do método por trás do plugin (guia)',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Como criar seus próprios subagentes (Claude Code)',
        url: CC + '/sub-agents',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'ce-12',
    index: 12,
    title: 'Compound Engineering aplicado ao Adapta Native',
    priority: 'alta',
    type: 'missao',
    shortDescription:
      'Missão: instalar o loop plan-work-review-compound num projeto real de cliente.',
    concept:
      'Missão de fechamento: pegar um projeto (seu ou de um cliente piloto) e instalar o ciclo compound de ponta a ponta. Passos: (1) monte a pasta-agente — CLAUDE.md com as convenções, skills iniciais, redes de segurança (testes + hooks); (2) rode uma feature real pelo loop completo — plano revisável, execução com autonomia calibrada, review multi-agente (pelo menos 2 subagentes), e a fase compound fechando com lições virando regra; (3) documente o handoff no formato padrão; (4) meça o composto: quantas lições viraram regra permanente. O critério de vitória não é "a feature funcionou" — é "o repositório ficou mais capaz do que estava, e a PRÓXIMA feature vai ser mais fácil". Essa é a prova de que você internalizou o método, não só usou um agente.',
    deepDive: [
      'Amarre com as outras trilhas: as redes de segurança usam o que você aprendeu em GitHub (CI, branch protection) e Supabase (migrations, testes de RLS).',
      'A fase compound desta missão deve deixar um artefato tangível: um CLAUDE.md maior e melhor, hooks novos, subagentes novos — o "sistema que aprendeu".',
      'Registre o antes/depois: o CLAUDE.md e o conjunto de checks no início vs no fim da missão contam a história do composto.',
    ],
    pitfalls: [
      'Rodar o loop mas pular a fase compound — sem ela, foi só mais uma feature, não compound engineering.',
      'Escopo grande demais: uma feature pequena bem composta ensina mais que um épico mal supervisionado.',
    ],
    practiceSteps: [
      'Monte a pasta-agente completa (CLAUDE.md + skills + redes de segurança) do projeto escolhido.',
      'Rode uma feature pelo loop inteiro, com review multi-agente e fase compound explícita.',
      'Entregue: a feature + o handoff + o registro de quantas lições viraram regra permanente.',
    ],
    projectContext:
      'É a prática que transforma o método em capacidade real da consultoria — e o resultado (um repo que melhora sozinho) é exatamente o que o Adapta Native promete ao cliente.',
    references: [
      {
        label: 'Referência do loop completo (guia definitivo)',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Best practices do Claude Code (para as redes de segurança)',
        url: CC + '/best-practices',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 240,
  },
  {
    id: 'ce-boss',
    index: 13,
    title: 'BOSS: Engenheiro Composto',
    priority: 'alta',
    type: 'boss',
    shortDescription:
      'Desafio final — a filosofia, os 5 princípios, a escada, o loop e a fase compound.',
    concept:
      'O boss de Compound Engineering testa o que define o método: a filosofia do trabalho que compõe, os cinco princípios, a escada de adoção, o loop plan-work-review-compound e — o coração de tudo — a fase compound que transforma lições em capacidade permanente. Acerte 4 de 5 para vencer.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação indica que o consultor internalizou o compound engineering e consegue instalá-lo no time e no repositório do cliente.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
