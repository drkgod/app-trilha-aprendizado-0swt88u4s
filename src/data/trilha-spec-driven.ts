import type { Topic } from './types'

const SK = 'https://github.com/github/spec-kit'
const SKD = 'https://github.github.com/spec-kit'
const CC = 'https://code.claude.com/docs/en'

export const specDrivenTopics: Topic[] = [
  {
    id: 'sd-1',
    index: 1,
    title: 'O problema: código como fonte de verdade não escala com IA',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Por que "vibe coding" quebra em produção e por que a spec precisa virar o contrato.',
    concept:
      'Spec-Driven Development (SDD, desenvolvimento guiado por especificação) nasce de um problema real da era dos agentes: quando você manda o agente "codar direto" (vibe coding), o código vira a especificação de fato — uma coleção de componentes que até funcionam juntos, mas são difíceis de manter, evoluir e debugar. O código é um artefato VINCULANTE: uma vez escrito, é caro desacoplar. Reescritas e experimentos custam esforço enorme de time. Pior: os requisitos de verdade (regras de segurança, compliance, design system, integrações) acabam na cabeça de alguém, num wiki que ninguém lê, ou espalhados no Slack. A tese do SDD é inverter isso: a ESPECIFICAÇÃO passa a ser a fonte de verdade compartilhada, e o código vira consequência dela. Você descreve o QUE construir e o PORQUÊ antes de decidir o COMO — e o agente implementa a partir daí. Para uma consultoria que entrega sistemas, isso é a diferença entre entregar um monólito opaco e entregar um contrato executável.',
    deepDive: [
      'A frase-chave da GitHub: "tratamos agentes de código como mecanismos de busca quando deveríamos tratá-los como programadores pareados literais" — spec ruim gera código que compila mas erra a intenção.',
      'Como a spec é DESACOPLADA do código, dá pra gerar múltiplas implementações da mesma spec (ex.: uma variante em Rust e outra em Go) e comparar — algo impossível quando o código é o único artefato.',
      'SDD brilha em greenfield, feature nova em sistema existente e modernização de legado; para bug fix pequeno, o overhead não compensa (observação do time do Martin Fowler).',
    ],
    pitfalls: [
      'Achar que SDD é "documentação antes de codar" — não é doc morta, é artefato executável que o agente consome e valida contra.',
      'Deixar requisitos críticos (segurança, compliance) fora da spec — é justamente onde eles deveriam morar pra a IA usar.',
    ],
    practiceSteps: [
      'Pegue um projeto recente feito por vibe coding e liste onde a falta de spec gerou retrabalho.',
      'Escreva em 1 parágrafo o "o quê" e o "porquê" de uma feature, sem mencionar NENHUMA decisão de implementação.',
      'Identifique 3 requisitos (segurança/compliance/design) que hoje vivem "na cabeça de alguém" no seu contexto.',
    ],
    projectContext:
      'É o alicerce conceitual do Adapta Native: entregar ao cliente uma spec que é fonte de verdade executável, não um código que só o autor entende.',
    references: [
      {
        label: 'Comece aqui: o anúncio oficial do SDD e do Spec Kit (GitHub Blog)',
        url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/',
        kind: 'artigo',
      },
      {
        label: 'Depois leia: mergulho no SDD com o Spec Kit (Microsoft for Developers)',
        url: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'sd-2',
    index: 2,
    title: 'A spec como artefato vivo e executável',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Separar o "o quê" do "como" — e manter a spec como contrato que evolui com o projeto.',
    concept:
      'A ideia central do SDD é repensar especificações: não como documentos estáticos, mas como artefatos VIVOS e EXECUTÁVEIS que evoluem com o projeto. A spec captura a intenção com clareza e vira a fonte de verdade que suas ferramentas e agentes usam para gerar, testar e validar código. O princípio que sustenta tudo: separar o QUE (a spec descreve o que o sistema deve fazer) do COMO (a implementação decide como fazer). Isso cria um contrato claro e sem ambiguidade entre todos os envolvidos — stakeholders de negócio, PMs, devs e os agentes de IA. Quando algo não faz sentido, você volta à spec; quando o projeto cresce em complexidade, você refina a spec; quando uma tarefa fica grande demais, você a quebra. A spec deixa de ser burocracia inicial e vira o eixo em torno do qual o desenvolvimento gira — inclusive permitindo que gente nova entenda o que está sendo construído sem mergulhar no código.',
    deepDive: [
      'Especificações "executáveis" geram implementações funcionais diretamente, em vez de apenas orientá-las — a spec vira insumo de produção, não anexo.',
      'O papel humano muda de "dirigir" para VERIFICAR: a cada fase você reflete e refina — a spec captura o que você realmente quer? O plano considera as restrições reais? Há casos de borda que a IA perdeu?',
      'Como a spec é markdown simples, todo o time (e o agente) lê, comenta e edita — é o denominador comum entre negócio e engenharia.',
    ],
    pitfalls: [
      'Misturar "o quê" com "como" na spec (ex.: fixar biblioteca na descrição de comportamento) — polui o contrato e amarra a implementação cedo demais.',
      'Escrever a spec uma vez e nunca mais tocar — ela é viva; produção informa a spec de volta (métricas, incidentes viram refinamento).',
    ],
    practiceSteps: [
      'Reescreva uma feature separando explicitamente duas seções: "O QUÊ (comportamento/critérios)" e "COMO (decisões técnicas)".',
      'Defina os critérios de aceite da spec de forma verificável ("dado X, quando Y, então Z").',
      'Estabeleça o gatilho de refinamento: que sinal de produção faria você voltar e editar esta spec?',
    ],
    projectContext:
      'A spec viva é o entregável central do Adapta Native — o cliente recebe um contrato executável que o time dele (e os agentes) continuam evoluindo.',
    references: [
      {
        label: 'Comece aqui: o que é SDD (documentação oficial do Spec Kit)',
        url: 'https://github.github.com/spec-kit/',
        kind: 'doc',
      },
      {
        label: 'Aprofunde: a metodologia completa de SDD (repositório oficial)',
        url: 'https://github.com/github/spec-kit/blob/main/spec-driven.md',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'sd-3',
    index: 3,
    title: 'GitHub Spec Kit: o toolkit e a Specify CLI',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Instalar o Spec Kit, bootstrapar um projeto e entender o que a CLI monta.',
    concept:
      'O GitHub Spec Kit é o toolkit open-source (MIT) que traz o SDD para o fluxo real de agentes. Ele é agnóstico de agente — funciona com Claude Code, Copilot, Gemini CLI, Cursor, Codex e 30+ integrações. A peça central é a Specify CLI: um comando que faz bootstrap do projeto, baixa os templates oficiais para o agente escolhido e monta o scaffolding de SDD (a pasta .specify/) de um jeito que o agente já começa a iterar. Não há mágica além de duas partes: (1) a CLI e (2) um conjunto de templates + scripts que definem o que é uma spec, o que é um plano técnico e como isso vira tarefas. Instalação: uv tool install specify-cli (recomendado) e specify init <projeto> --ai claude. Pré-requisitos: Python 3.11+, uv e Git. Depois do init, seu agente ganha acesso aos slash commands do Spec Kit (/speckit.*). Como os templates vêm de um repositório versionado, você pode usar os oficiais ou customizar para as convenções da consultoria.',
    deepDive: [
      'Modo skills: passando --integration <agente> --integration-options="--skills", o Spec Kit instala skills de agente em vez de prompts de slash command — casa direto com o que você aprendeu de Skills no Claude Code.',
      'Os artefatos ficam na pasta specs/ como markdown puro — você revisa e ajusta manual ou com ajuda do agente, sem lock-in.',
      'Cross-platform: scripts shell (Unix) e PowerShell (Windows), então roda em qualquer IDE ou pipeline de CI/CD.',
    ],
    pitfalls: [
      'Rodar specify init no diretório errado — use --here para o diretório atual e revise o que foi criado antes de commitar.',
      'Ignorar a escolha de --ai/--integration: o agente errado gera prompts que não batem com a ferramenta que você usa.',
    ],
    practiceSteps: [
      'Instale a Specify CLI (uv tool install) e rode specify check para validar os pré-requisitos.',
      'Faça specify init num projeto de teste com --ai claude e explore a pasta .specify/ e specs/ que foram criadas.',
      'Rode specify integration list para ver as integrações disponíveis na sua versão.',
    ],
    projectContext:
      'O Spec Kit é a ferramenta concreta que operacionaliza o Adapta Native — a consultoria pode padronizar o scaffolding de SDD e customizar os templates para cada cliente.',
    references: [
      {
        label: 'Comece aqui: o repositório oficial do Spec Kit (instalação e comandos)',
        url: 'https://github.com/github/spec-kit',
        kind: 'tool',
      },
      {
        label: 'Depois: getting started da documentação oficial',
        url: 'https://github.github.com/spec-kit/',
        kind: 'doc',
      },
      {
        label: 'Guia prático passo a passo (Microsoft for Developers)',
        url: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 40,
  },
  {
    id: 'sd-4',
    index: 4,
    title: 'As quatro fases com checkpoints: Specify, Plan, Tasks, Implement',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'O fluxo faseado e por que você não avança sem validar a fase atual.',
    concept:
      'O SDD organiza o trabalho em quatro fases com checkpoints explícitos — e você NÃO avança até validar a fase atual. (1) SPECIFY: descreva objetivos e jornadas de usuário; o agente redige uma spec detalhada que evolui com seu feedback (foca no comportamento e critérios de aceite, sem prescrever implementação). (2) PLAN: declare arquitetura, stack e restrições; o agente propõe um plano técnico que respeita os padrões e standards da organização. (3) TASKS: o agente quebra o trabalho em unidades pequenas, revisáveis e testáveis isoladamente. (4) IMPLEMENT: o agente executa as tarefas enquanto você verifica e itera em cada checkpoint. A força do processo está nos checkpoints: em cada fase você critica o que foi gerado, aponta lacunas e corrige o rumo ANTES de seguir. A IA gera os artefatos; você garante que estão certos. É o oposto de revisar um dump de mil linhas no final — você revisa mudanças focadas que resolvem problemas específicos, porque a spec disse ao agente o que construir, o plano disse como, e a tarefa disse exatamente no que trabalhar.',
    deepDive: [
      'Princípio crítico da fase Implement: implemente passo a passo por fases/tarefas — evite gerar o projeto inteiro de uma vez, senão fica impossível revisar e verificar.',
      'Os checkpoints são o mecanismo anti-alucinação do SDD: cada fase valida contra a anterior, então erro de intenção é pego cedo, não em produção.',
      'O comando /clarify (a IA faz perguntas direcionadas) fecha ambiguidades da spec antes do plano — é onde o agente admite o que não sabe.',
    ],
    pitfalls: [
      'Pular o checkpoint e deixar a fase seguinte rodar sobre uma spec/plano ainda ambíguo — o erro se propaga amplificado.',
      'Tratar as fases como cascata rígida: elas são iterativas; você volta e refina quando produção ou testes revelam algo.',
    ],
    practiceSteps: [
      'Rode as quatro fases numa feature pequena, parando em cada checkpoint para criticar o artefato antes de avançar.',
      'Na fase Specify, use /clarify e responda às perguntas do agente para eliminar ambiguidade.',
      'Na fase Tasks, verifique se cada tarefa é testável isoladamente — se não for, quebre mais.',
    ],
    projectContext:
      'O fluxo faseado com checkpoints é o método de entrega que a consultoria instala — dá previsibilidade e pontos de validação com o cliente em cada etapa.',
    references: [
      {
        label: 'Comece aqui: as quatro fases explicadas (GitHub Blog)',
        url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/',
        kind: 'artigo',
      },
      {
        label: 'Referência dos comandos do fluxo (repositório oficial)',
        url: 'https://github.com/github/spec-kit',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'sd-5',
    index: 5,
    title: 'A constituição: princípios que governam o projeto',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'O /speckit.constitution — as regras inegociáveis que guiam todas as fases.',
    concept:
      'Antes mesmo de especificar a primeira feature, o SDD tem um passo fundacional: a CONSTITUIÇÃO do projeto (/speckit.constitution). É onde você define os princípios governantes e as diretrizes de desenvolvimento que guiam TODAS as fases subsequentes — qualidade de código, padrões de teste, consistência de UX, restrições de segurança, o que é inegociável. A constituição é o topo da hierarquia: a spec, o plano e as tarefas devem respeitá-la. É análoga ao CLAUDE.md/AGENTS.md do compound engineering, mas no contexto do SDD: enquanto o CLAUDE.md ensina "como trabalhar neste repo", a constituição declara "quais princípios este projeto nunca viola". Para uma consultoria, a constituição é o lugar de codificar os padrões da casa (as convenções Adapta) e as exigências do cliente (compliance, design system) de forma que o agente respeite em cada linha gerada. É a governança virando artefato executável.',
    deepDive: [
      'A constituição resolve o problema do "requisito que vive na cabeça de alguém": segurança e compliance viram princípios explícitos que a IA aplica desde o dia um.',
      'Constituição + spec + plano formam a pilha de contexto que o agente consome — quanto mais clara a constituição, menos retrabalho nas fases seguintes.',
      'Conecta com governança: é o instrumento pra garantir que o código gerado por agente respeite as políticas do cliente sem revisão manual linha a linha.',
    ],
    pitfalls: [
      'Deixar a constituição genérica ("código limpo, boas práticas") — princípios vagos não guiam o agente; seja específico e verificável.',
      'Esquecer de atualizar a constituição quando uma política do cliente muda — ela é a fonte de verdade da governança.',
    ],
    practiceSteps: [
      'Rode /speckit.constitution e escreva 5 princípios inegociáveis específicos do seu contexto (não genéricos).',
      'Inclua ao menos um requisito de segurança/compliance e um de design system.',
      'Teste: gere uma feature e verifique se o agente respeitou a constituição sem você repetir as regras.',
    ],
    projectContext:
      'A constituição é onde a consultoria codifica a governança do cliente — o mecanismo que garante que agentes entreguem dentro das políticas, auditável e sem depender de vigilância manual.',
    references: [
      {
        label: 'Comece aqui: o comando de constituição no fluxo (repositório oficial)',
        url: 'https://github.com/github/spec-kit',
        kind: 'doc',
      },
      {
        label: 'Contexto: por que a constituição importa (documentação oficial)',
        url: 'https://github.github.com/spec-kit/',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'sd-6',
    index: 6,
    title: 'Escrevendo uma boa spec: intenção, critérios e casos de borda',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'O /speckit.specify e /clarify — como capturar o "o quê" sem vazar o "como".',
    concept:
      'A qualidade da entrega inteira depende da qualidade da spec. A fase /speckit.specify responde "o que estamos construindo?" — focando exclusivamente em comportamento, requisitos e critérios de aceite, sem prescrever implementação. Uma boa spec descreve jornadas de usuário concretas, define o que é sucesso, e explicita os casos de borda que a IA sozinha tende a esquecer. O comando /clarify entra logo depois: a IA faz perguntas direcionadas para fechar ambiguidades ANTES de virar plano — é o momento em que o agente admite o que não sabe e você decide, em vez de deixá-lo chutar. A regra de ouro: quanto mais detalhe e intenção você assa na spec, menos tempo você gasta ajustando os artefatos depois. A spec não é sobre prever tudo — é sobre capturar a intenção com clareza suficiente para o agente não precisar adivinhar, e para você conseguir verificar se ele acertou.',
    deepDive: [
      'Casos de borda são o maior valor humano na spec: a IA gera o caminho feliz sozinha; você garante que os cantos escuros foram considerados.',
      'O /speckit.checklist gera "testes unitários para o inglês" — checklists que validam se a spec está completa, clara e consistente antes de avançar.',
      'Spec boa permite exploração paralela: a mesma spec pode gerar variantes (via Figma MCP, por exemplo) para comparar direções de design.',
    ],
    pitfalls: [
      'Escrever spec no nível "faça um app de tarefas" — vago demais; o agente preenche as lacunas com suposições que você não fez.',
      'Vazar decisão de implementação na spec (framework, biblioteca) — isso é fase Plan; misturar amarra cedo e polui o contrato.',
    ],
    practiceSteps: [
      'Escreva uma spec com /speckit.specify e rode /clarify, respondendo a todas as perguntas do agente.',
      'Liste explicitamente 3 casos de borda que a IA provavelmente esqueceria.',
      'Rode /speckit.checklist e corrija as lacunas apontadas antes de ir para o plano.',
    ],
    projectContext:
      'Escrever specs excelentes é a habilidade central do consultor Adapta Native — é o que transforma a conversa com o cliente em contrato que o agente executa fielmente.',
    references: [
      {
        label: 'Comece aqui: escrevendo specs no fluxo SDD (repositório oficial)',
        url: 'https://github.com/github/spec-kit',
        kind: 'doc',
      },
      {
        label: 'Guia prático de escrita de spec (Microsoft for Developers)',
        url: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 40,
  },
  {
    id: 'sd-7',
    index: 7,
    title: 'Do plano às tarefas: quebrar em unidades testáveis',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'O /speckit.plan e /speckit.tasks — arquitetura primeiro, depois incrementos revisáveis.',
    concept:
      'Com a spec validada, a fase /speckit.plan traduz o "o quê" em decisões técnicas: você declara arquitetura, stack e restrições, e o agente propõe um plano que respeita os padrões da organização (a constituição). Aqui é onde a decisão de implementação finalmente entra — e onde você pode ser específico ("use Vite, JS puro, SQLite local") ou deixar a IA escolher. Depois, /speckit.tasks quebra o plano em tarefas pequenas, acionáveis e testáveis isoladamente. Essa granularidade é o que torna a revisão humana viável: em vez de um dump gigante, você recebe incrementos focados que resolvem problemas específicos. O comando /speckit.analyze roda entre tasks e implement para checar consistência e cobertura entre os artefatos (a spec, o plano e as tarefas estão coerentes entre si?). A lição prática mais repetida por quem usa: implemente incrementalmente por tarefa, nunca o projeto inteiro de uma vez — gerar demais de uma vez é o que torna impossível revisar e verificar.',
    deepDive: [
      'O /speckit.analyze é o "gate de consistência": pega contradições entre spec, plano e tarefas antes de qualquer código ser gerado.',
      'Tarefas testáveis isoladamente conectam com as redes de segurança do compound engineering — cada tarefa vem com seu critério de verificação.',
      'Quão específico ser no plano é uma escolha: fixar a lib quando importa para produção, deixar a IA escolher quando é indiferente.',
    ],
    pitfalls: [
      'Tarefas grandes demais ("implemente o backend") — inviabilizam a revisão incremental que é a vantagem do SDD.',
      'Pular o /speckit.analyze e descobrir só na implementação que o plano contradizia a spec.',
    ],
    practiceSteps: [
      'Rode /speckit.plan declarando stack e restrições, e revise se ele respeitou a constituição.',
      'Gere /speckit.tasks e verifique se cada tarefa tem critério de verificação isolado.',
      'Rode /speckit.analyze e resolva qualquer inconsistência apontada antes de implementar.',
    ],
    projectContext:
      'A quebra em tarefas testáveis é o que permite entregar com previsibilidade e revisar com o cliente incremento a incremento, em vez de um big bang no fim.',
    references: [
      {
        label: 'Comece aqui: comandos de plan, tasks e analyze (repositório oficial)',
        url: 'https://github.com/github/spec-kit',
        kind: 'doc',
      },
      {
        label: 'Como as fases se conectam (documentação oficial)',
        url: 'https://github.github.com/spec-kit/',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'sd-8',
    index: 8,
    title: 'Implementar, verificar e o papel humano de curador',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'O /speckit.implement — a IA gera, você verifica em cada checkpoint.',
    concept:
      'A fase /speckit.implement é onde os artefatos viram código: o agente executa as tarefas enquanto você verifica e itera em cada checkpoint. O ponto que muda tudo: seu papel não é só dirigir, é VERIFICAR. A IA gera os artefatos; você garante que estão certos. Como o agente sabe o que construir (a spec disse), como construir (o plano disse) e exatamente no que trabalhar (a tarefa disse), a implementação é focada — e a sua revisão também. Você não lê mil linhas de código; você confere mudanças pequenas contra critérios claros. É a mesma disciplina do review por intenção do compound engineering: confie na geração para o mecânico, concentre o olho humano em "isto corresponde à spec que aprovamos?". A verificação contínua (o /speckit.analyze e os checklists) roda ao longo do processo, não como um portão único no fim — a IA analisa a spec por ambiguidade, contradição e lacuna de forma contínua.',
    deepDive: [
      'Feedback bidirecional: realidade de produção (métricas, incidentes, aprendizados operacionais) volta a informar e refinar a spec — o ciclo não termina no deploy.',
      'A verificação humana é o que impede o "código que compila mas erra a intenção" — o modo de falha clássico do vibe coding que o SDD foi criado para eliminar.',
      'Casa com o Codex e o Claude Code: o Spec Kit gera os prompts; o agente da sua preferência executa a implementação tarefa a tarefa.',
    ],
    pitfalls: [
      'Deixar o agente gerar tudo e revisar no fim — perde-se o ponto do SDD; verifique tarefa a tarefa.',
      'Tratar a implementação como fim de linha e não realimentar a spec com o que produção ensinou.',
    ],
    practiceSteps: [
      'Rode /speckit.implement tarefa a tarefa, verificando cada incremento contra a spec antes de seguir.',
      'Ao achar um desvio, corrija na spec/plano (não só no código) para manter o contrato como fonte de verdade.',
      'Depois de um deploy, registre um aprendizado de produção que deveria refinar a spec.',
    ],
    projectContext:
      'A postura de "curador que verifica" é o que a consultoria ensina o time do cliente a fazer — garantir qualidade sem virar gargalo manual de cada linha.',
    references: [
      {
        label: 'Comece aqui: a fase de implementação e verificação (GitHub Blog)',
        url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/',
        kind: 'artigo',
      },
      {
        label: 'Metodologia completa (repositório oficial)',
        url: 'https://github.com/github/spec-kit/blob/main/spec-driven.md',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'sd-9',
    index: 9,
    title: 'SDD + Compound Engineering: como as duas se encaixam',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'Spec como fonte de verdade e loop que compõe — a mesma família AI-native.',
    concept:
      'SDD e Compound Engineering não competem — são complementares e da mesma família AI-native. O SDD estrutura o QUE e o COMO num contrato faseado (constituição → spec → plano → tarefas → implementação); o Compound Engineering estrutura o CICLO de trabalho (plan → work → review → compound) e como cada entrega torna a próxima mais fácil. Encaixe prático: a spec e a constituição do SDD são artefatos que ENTRAM na fase de planejamento do compound; e a fase compound (transformar lições em regras permanentes) alimenta de volta a constituição e os templates de spec — cada projeto deixa os templates da consultoria melhores. Onde o SDD diz "a spec é a fonte de verdade", o compound diz "o sistema aprende com cada review"; juntos, você entrega um contrato executável (SDD) num repositório que fica mais capaz a cada iteração (compound). Para o Adapta Native, essa é a combinação completa: spec pronta e método de evolução embutido.',
    deepDive: [
      'A constituição do SDD e o CLAUDE.md do compound cumprem papéis irmãos: princípios de projeto vs como trabalhar no repo — ter os dois é o ideal.',
      'Lições da fase compound (o que o review pegou) viram refinamento de template de spec e novos itens de checklist — o SDD da consultoria fica mais afiado a cada cliente.',
      'Exploração paralela (SDD) + review multi-agente (compound) = comparar variantes de implementação com qualidade verificada em cada uma.',
    ],
    pitfalls: [
      'Adotar SDD como cascata rígida e perder o loop de aprendizado do compound — ou vice-versa. A força está em combinar.',
      'Manter templates de spec estáticos — a fase compound deveria evoluí-los projeto a projeto.',
    ],
    practiceSteps: [
      'Mapeie onde a spec do SDD entra no seu loop plan-work-review-compound.',
      'Após um projeto SDD, faça a fase compound: que lição vira melhoria de template de spec ou de constituição?',
      'Monte um template de constituição da consultoria que evolua a cada entrega.',
    ],
    projectContext:
      'A união SDD + compound é a metodologia madura do Adapta Native: contrato executável na entrega, sistema que aprende na evolução.',
    references: [
      {
        label: 'Reveja: o loop do Compound Engineering (Every)',
        url: 'https://every.to/guides/compound-engineering',
        kind: 'artigo',
      },
      {
        label: 'Reveja: a metodologia SDD (repositório oficial)',
        url: 'https://github.com/github/spec-kit/blob/main/spec-driven.md',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'sd-10',
    index: 10,
    title: 'O ecossistema além do Spec Kit: Kiro, Tessl e o futuro',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'SDD está virando norma da indústria — vale conhecer o panorama.',
    concept:
      'O SDD deixou de ser experimento e virou tendência de indústria — e conhecer o panorama posiciona a consultoria como quem está na fronteira. O Spec Kit da GitHub é a referência, mas não está sozinho: a AWS lançou o Kiro, uma IDE agêntica construída sobre Code OSS que implementa SDD nativamente; a Tessl empurra a fronteira do "spec-as-source" (a spec como o artefato-fonte, do qual o código é derivado); e a IBM adaptou a abordagem para infraestrutura como código (IaC Spec Kit). O movimento de fundo: especificações estão cada vez mais tratadas como artefatos de código, embutidas nos fluxos e aplicadas automaticamente por assistentes de IA. Para o desenvolvedor, isso significa migrar de digitar código linha a linha para arquitetar soluções em alto nível. A ressalva honesta (do time do Martin Fowler): SDD não é bala de prata — brilha em features grandes e greenfield, mas bug fix pequeno pode não justificar o overhead. Saber quando aplicar é parte da maturidade.',
    deepDive: [
      'A tese "spec-as-source" (Tessl) é o extremo da ideia: se a spec gera o código, versionar a spec passa a importar mais que versionar o código.',
      'Kiro nativo vs Spec Kit agnóstico: vale entender o trade-off entre IDE dedicada e toolkit que roda com qualquer agente.',
      'IaC Spec Kit mostra a generalização: a mesma spec pode gerar infra em clouds diferentes — o "o quê" desacoplado do "como" no nível de infraestrutura.',
    ],
    pitfalls: [
      'Aplicar SDD onde o overhead não compensa (correção trivial) — maturidade é saber quando NÃO usar.',
      'Casar com uma ferramenta específica cedo demais num campo que ainda está se consolidando.',
    ],
    practiceSteps: [
      'Compare Spec Kit (agnóstico) e Kiro (IDE nativa) e decida qual faz sentido para um cliente hipotético.',
      'Defina seu critério pessoal de "quando SDD compensa vs quando é overhead".',
      'Acompanhe a evolução do Spec Kit pelo repositório — o campo muda rápido.',
    ],
    projectContext:
      'Conhecer o ecossistema permite à consultoria recomendar a abordagem certa por cliente, em vez de empurrar uma ferramenta única — consultoria de verdade, não revenda.',
    references: [
      {
        label: 'Comece aqui: panorama do ecossistema SDD em 2026',
        url: 'https://intuitionlabs.ai/articles/spec-driven-development-spec-kit',
        kind: 'artigo',
      },
      {
        label: 'IaC Spec Kit — SDD aplicado a infraestrutura (IBM)',
        url: 'https://github.com/IBM/iac-spec-kit',
        kind: 'tool',
      },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'sd-11',
    index: 11,
    title: 'Missão: entregar uma feature real via SDD ponta a ponta',
    priority: 'alta',
    type: 'missao',
    shortDescription:
      'Do specify init ao implement — uma feature completa com os artefatos versionados.',
    concept:
      'Missão de fechamento: pegar uma feature real (de um projeto seu ou de cliente piloto) e levá-la do zero ao funcionando inteiramente via SDD com o Spec Kit. Passos: (1) specify init no repositório com --ai claude (ou codex); (2) escreva a constituição com os princípios da consultoria + do cliente; (3) /speckit.specify a feature, rode /clarify e /speckit.checklist até a spec estar limpa; (4) /speckit.plan declarando stack e restrições; (5) /speckit.tasks e /speckit.analyze para garantir consistência; (6) /speckit.implement tarefa a tarefa, verificando cada incremento. O entregável não é só a feature funcionando — é o conjunto de artefatos versionados (constituição, spec, plano, tarefas) que qualquer pessoa (ou agente) consegue ler e evoluir. O critério de vitória: alguém que não participou consegue entender o que foi construído e por quê lendo só os artefatos, sem mergulhar no código.',
    deepDive: [
      'Amarre com GitHub: commite os artefatos SDD junto com o código, e use PR para revisar spec + implementação juntas.',
      'Feche com a fase compound: que lição desta missão vira melhoria no seu template de constituição ou de spec?',
      'Se der tempo, explore a exploração paralela: gere duas variantes de uma tarefa a partir da mesma spec e compare.',
    ],
    pitfalls: [
      'Gerar tudo de uma vez na implementação — quebra a verificação incremental; vá tarefa a tarefa.',
      'Deixar os artefatos fora do controle de versão — eles SÃO a fonte de verdade, precisam estar no Git.',
    ],
    practiceSteps: [
      'Rode o fluxo completo (init → constitution → specify → plan → tasks → implement) numa feature pequena e real.',
      'Versione todos os artefatos no Git e abra um PR que inclua spec + código.',
      'Peça a alguém de fora para entender a feature lendo só os artefatos — e ajuste o que ficou ambíguo.',
    ],
    projectContext:
      'É o ensaio geral do Adapta Native: a consultoria entrega exatamente esse pacote — spec executável + artefatos versionados que o cliente evolui com os próprios agentes.',
    references: [
      {
        label: 'Referência do fluxo completo (repositório oficial)',
        url: 'https://github.com/github/spec-kit',
        kind: 'tool',
      },
      {
        label: 'Walkthrough passo a passo (Microsoft for Developers)',
        url: 'https://developer.microsoft.com/blog/spec-driven-development-spec-kit',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 240,
  },
  {
    id: 'sd-boss',
    index: 12,
    title: 'BOSS: Arquiteto de Especificações',
    priority: 'alta',
    type: 'boss',
    shortDescription:
      'Desafio final — spec como fonte de verdade, as 4 fases, a constituição e os checkpoints.',
    concept:
      'O boss de Spec-Driven Development testa o núcleo do método: por que a spec vira a fonte de verdade, a separação entre o "o quê" e o "como", as quatro fases com checkpoints (specify, plan, tasks, implement), o papel da constituição e a postura humana de verificar em vez de só dirigir. Acerte 4 de 5 para vencer.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação indica que o consultor consegue conduzir uma entrega inteira via SDD e ensinar o método ao time do cliente.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
