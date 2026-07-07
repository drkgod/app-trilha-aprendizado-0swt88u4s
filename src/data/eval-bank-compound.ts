import type { EvalQuestion } from './eval-types'

// Banco de avaliação — Compound Engineering (50 questões).
// Mix de múltipla escolha (mc) e discursivas (open, corrigidas por IA).
export const compoundEvalBank: EvalQuestion[] = [
  // ---------- Múltipla escolha ----------
  {
    id: 'ce-e1',
    type: 'mc',
    question: 'Qual é a tese central do Compound Engineering?',
    options: [
      'Cada unidade de trabalho deve tornar a próxima mais fácil',
      'Escrever código o mais rápido possível com autocomplete',
      'Substituir desenvolvedores por agentes autônomos',
      'Combinar vários modelos num sistema único',
    ],
    correctIndex: 0,
    explanation:
      'O compound inverte a dívida técnica: cada entrega acumula capacidade em vez de complexidade, tornando o trabalho futuro mais barato.',
  },
  {
    id: 'ce-e2',
    type: 'mc',
    question: 'Na engenharia tradicional, o que tende a acontecer com o sistema ao longo do tempo?',
    options: [
      'Fica mais fácil de mudar a cada feature',
      'Acumula complexidade e fica mais frágil e lento de evoluir',
      'Se mantém constante em complexidade',
      'Reduz automaticamente a dívida técnica',
    ],
    correctIndex: 1,
    explanation:
      'O padrão tradicional acumula dívida técnica — cada código novo negocia com o antigo, aumentando fragilidade e custo de mudança.',
  },
  {
    id: 'ce-e3',
    type: 'mc',
    question: 'Qual é a ordem correta do loop do Compound Engineering?',
    options: [
      'Work → Plan → Compound → Review',
      'Plan → Work → Review → Compound',
      'Review → Plan → Work → Compound',
      'Plan → Review → Work → Compound',
    ],
    correctIndex: 1,
    explanation:
      'Planejar, executar, revisar e então compor as lições em regras permanentes — o ciclo que se repete.',
  },
  {
    id: 'ce-e4',
    type: 'mc',
    question: 'O que a fase COMPOUND do loop exige?',
    options: [
      'Executar o plano o mais rápido possível',
      'Revisar apenas a sintaxe do código',
      'Transformar cada lição do review em regra permanente (CLAUDE.md, hook, teste, subagente)',
      'Combinar múltiplos agentes num sistema',
    ],
    correctIndex: 2,
    explanation:
      'Sem a fase compound você corrige o mesmo erro pra sempre; com ela, cada lição vira capacidade permanente do sistema.',
  },
  {
    id: 'ce-e5',
    type: 'mc',
    question: 'Segundo a escada de 5 estágios de adoção de IA, qual é o erro fatal?',
    options: [
      'Começar sem usar IA no estágio 1',
      'Pular estágios sem construir os modelos mentais de cada degrau',
      'Usar mais de um agente ao mesmo tempo',
      'Revisar código manualmente',
    ],
    correctIndex: 1,
    explanation:
      'Cada degrau constrói os hábitos que o próximo exige; pular direto para autonomia total leva à desconfiança e ao abandono.',
  },
  {
    id: 'ce-e6',
    type: 'mc',
    question: 'No estágio 4 da escada de adoção, o que caracteriza o trabalho?',
    options: [
      'Escrever código linha a linha sem IA',
      'Usar apenas autocomplete',
      'Múltiplos agentes trabalhando e revisando em paralelo, com o humano focando em intenção e arquitetura',
      'Um único agente supervisionado de perto',
    ],
    correctIndex: 2,
    explanation:
      'O estágio 4 é o de orquestração paralela — vários agentes ao mesmo tempo, humano no papel de arquiteto.',
  },
  {
    id: 'ce-e7',
    type: 'mc',
    question: 'Na fase REVIEW madura, onde o revisor humano deve concentrar a atenção?',
    options: [
      'Sintaxe e formatação',
      'Vulnerabilidades de segurança linha a linha',
      'Intenção e arquitetura — se corresponde ao que foi combinado construir',
      'Contagem de linhas alteradas',
    ],
    correctIndex: 2,
    explanation:
      'Quando os agentes já cobrem o técnico, o olho humano vira insubstituível no alinhamento com a intenção e nas decisões de arquitetura.',
  },
  {
    id: 'ce-e8',
    type: 'mc',
    question: 'O que significa o princípio "a pasta é o agente"?',
    options: [
      'Cada agente precisa de um servidor próprio',
      'Uma pasta com CLAUDE.md, skills e contexto acumulado transforma um modelo genérico em especialista',
      'Agentes só funcionam dentro de repositórios Git',
      'Cada arquivo vira um agente independente',
    ],
    correctIndex: 1,
    explanation:
      'O composto vive na pasta: o contexto acumulado especializa o modelo genérico naquele domínio.',
  },
  {
    id: 'ce-e9',
    type: 'mc',
    question: 'Qual princípio afirma que "gosto pertence a sistemas, não a review"?',
    options: [
      'Significa nunca revisar código',
      'Significa codificar o julgamento em checks, schemas e configuração em vez de checar manualmente toda vez',
      'Significa que o gosto não importa',
      'Significa terceirizar a revisão para outro time',
    ],
    correctIndex: 1,
    explanation:
      'Revisão manual não escala; toda reprovação por "gosto" deveria virar um check automatizado para não depender do humano.',
  },
  {
    id: 'ce-e10',
    type: 'mc',
    question: 'O que são "redes de segurança" no compound engineering?',
    options: [
      'Processos de aprovação manual em cada passo',
      'Infraestrutura de verificação (testes, checks, hooks) que dá confiança para autonomia',
      'Backups do banco de dados',
      'Firewalls de rede',
    ],
    correctIndex: 1,
    explanation:
      'Confiança em IA vem de infraestrutura de verificação, não de guardar o portão manualmente — o princípio "redes de segurança, não processos de revisão".',
  },
  {
    id: 'ce-e11',
    type: 'mc',
    question: 'Por que a fase WORK pode ficar "chata, no melhor sentido"?',
    options: [
      'Porque o trabalho é entediante e repetitivo para o humano',
      'Porque, com plano aprovado e redes de segurança, o agente executa enquanto o humano cuida de intenção e das próximas frentes',
      'Porque não há mais nada para fazer',
      'Porque o código gerado é sempre igual',
    ],
    correctIndex: 1,
    explanation:
      'Com o planejamento e a verificação bem feitos, a execução deixa de exigir supervisão minuto a minuto.',
  },
  {
    id: 'ce-e12',
    type: 'mc',
    question: 'O que é "autonomia calibrada" na fase WORK?',
    options: [
      'Dar ao agente autonomia total sempre',
      'Nunca deixar o agente executar nada sozinho',
      'Pré-aprovar o que é seguro e repetitivo, mantendo aprovação para o que é destrutivo ou externo',
      'Deixar o agente decidir quais permissões quer',
    ],
    correctIndex: 2,
    explanation:
      'Calibrar é pré-aprovar comandos seguros (testes, lint, git read) e exigir confirmação para o destrutivo (deploy, force push).',
  },
  {
    id: 'ce-e13',
    type: 'mc',
    question: 'O que a flag --dangerously-skip-permissions faz, e quando usá-la?',
    options: [
      'Acelera o modelo; use sempre',
      'Remove as confirmações de permissão; só em ambiente descartável ou com redes de segurança sólidas',
      'Desliga o agente; use para economizar',
      'Ativa o modo de revisão; use em produção',
    ],
    correctIndex: 1,
    explanation:
      'O nome assustador é proposital — autonomia total só é sensata em ambiente controlado e com verificação automatizada montada.',
  },
  {
    id: 'ce-e14',
    type: 'mc',
    question: 'Como o compound engineering trata handoffs (passagens de bastão)?',
    options: [
      'Reuniões longas de alinhamento',
      'Documentos com status, o que foi feito, o que falta, contexto e como continuar — legíveis por humano e agente',
      'Mensagens rápidas no chat',
      'Não há handoffs, cada um trabalha isolado',
    ],
    correctIndex: 1,
    explanation:
      'Handoff bom é agent-native: carrega todo o contexto para que outra pessoa ou o agente retomem sem explicação verbal.',
  },
  {
    id: 'ce-e15',
    type: 'mc',
    question: 'Onde deve viver o estado de verdade de um trabalho em andamento?',
    options: [
      'Na memória da conversa com o agente',
      'Em arquivos (plano, PROGRESS.md, Git), não no histórico do chat que envelhece',
      'Na cabeça do desenvolvedor',
      'Em mensagens de Slack',
    ],
    correctIndex: 1,
    explanation:
      'O histórico de conversa envelhece e o repo muda por fora; o estado confiável vive em arquivos versionados.',
  },
  {
    id: 'ce-e16',
    type: 'mc',
    question: 'Qual a diferença entre codificar uma lição como instrução (CLAUDE.md) vs como hook?',
    options: [
      'Não há diferença',
      'Instrução é uma preferência que o modelo tenta seguir; hook é uma garantia determinística que bloqueia',
      'Hook é mais fraco que instrução',
      'Instrução só funciona em produção',
    ],
    correctIndex: 1,
    explanation:
      'Garantia inegociável precisa de hook ou teste; preferência que depende da boa vontade do modelo vai em instrução.',
  },
  {
    id: 'ce-e17',
    type: 'mc',
    question: 'Como se mede se você está realmente fazendo compound engineering?',
    options: [
      'Pela quantidade de linhas de código escritas',
      'Por quantas lições viraram regra permanente no período — se é zero, você só está usando IA',
      'Pela velocidade de digitação',
      'Pelo número de agentes rodando',
    ],
    correctIndex: 1,
    explanation:
      'O composto é mensurável: contar lições que viraram regra distingue compound de simplesmente usar um agente.',
  },
  {
    id: 'ce-e18',
    type: 'mc',
    question: 'Por que contexto fresco melhora a revisão de código de agente?',
    options: [
      'Porque usa menos tokens',
      'Porque um agente que não escreveu o código o revisa sem o viés de defender a própria solução',
      'Porque é mais rápido',
      'Porque contexto fresco nunca erra',
    ],
    correctIndex: 1,
    explanation:
      'O padrão Writer/Reviewer separa quem escreve de quem revisa justamente para remover o viés de autodefesa.',
  },
  {
    id: 'ce-e19',
    type: 'mc',
    question: 'O que a camada de dispatch permite no modelo de dezenas de "pastas-agente"?',
    options: [
      'Compilar o código mais rápido',
      'Rotear o trabalho entre as pastas-agente especializadas sem virar caos',
      'Fazer backup automático',
      'Gerar embeddings',
    ],
    correctIndex: 1,
    explanation:
      'O dispatch é o que permite escalar de um para muitos agentes especializados mantendo a organização.',
  },
  {
    id: 'ce-e20',
    type: 'mc',
    question:
      'Como o plugin open-source de Compound Engineering da Every deve ser usado por uma consultoria?',
    options: [
      'Copiado sem alterações para todo cliente',
      'Estudado como referência de estrutura e adaptado ao stack e às convenções de cada contexto',
      'Ignorado por ser específico demais',
      'Vendido diretamente ao cliente',
    ],
    correctIndex: 1,
    explanation:
      'Adaptar > adotar: extraia os padrões (estrutura do loop, tipos de subagente) e reimplemente no seu stack.',
  },
  {
    id: 'ce-e21',
    type: 'mc',
    question: 'Qual afirmação melhor descreve "ensine o sistema, não faça o trabalho"?',
    options: [
      'Dar contexto ao agente rende dividendos exponenciais; digitar código resolve só a tarefa da frente',
      'Nunca escrever código você mesmo',
      'Ensinar outras pessoas em vez de programar',
      'Documentar tudo depois de pronto',
    ],
    correctIndex: 0,
    explanation:
      'O tempo investido ensinando o sistema compõe ao longo do tempo; o tempo digitando resolve apenas o problema imediato.',
  },
  {
    id: 'ce-e22',
    type: 'mc',
    question: 'O que significa tornar o ambiente "agent-native"?',
    options: [
      'Instalar o agente no servidor',
      'Estruturar projetos para que os agentes naveguem e modifiquem sozinhos',
      'Usar só ferramentas de IA',
      'Remover todos os humanos do processo',
    ],
    correctIndex: 1,
    explanation:
      'Ao construir, pergunte "como o agente vai interagir com isto?" — o ambiente é desenhado para a operação autônoma.',
  },
  {
    id: 'ce-e23',
    type: 'mc',
    question:
      'Por que revisar apenas por confiança acumulada ("os últimos 10 estavam bons") é arriscado?',
    options: [
      'Porque consome tempo',
      'Porque a taxa de erro não é zero e o caro é justamente o caso que passa sem revisão',
      'Porque os agentes nunca erram',
      'Porque a confiança é sempre válida',
    ],
    correctIndex: 1,
    explanation:
      'A ausência de erro nas últimas vezes não garante a próxima; a verificação precisa ser sistemática, não baseada em fé.',
  },
  {
    id: 'ce-e24',
    type: 'mc',
    question: 'No planejamento multi-agente, o que rodar em paralelo produz?',
    options: [
      'Mais bugs',
      'Um plano mais rico (ex.: um agente pesquisa o repo, outro busca best practices, outro o framework)',
      'Um plano idêntico ao de um agente só',
      'Apenas relatórios de erro',
    ],
    correctIndex: 1,
    explanation:
      'Pesquisa paralela (repo + best practices + framework) alimenta um plano muito mais completo do que um agente sozinho.',
  },
  {
    id: 'ce-e25',
    type: 'mc',
    question: 'Qual é o melhor momento para cortar escopo e simplificar?',
    options: [
      'Depois do código pronto',
      'No plano — simplificar ali custa minutos; depois de codado custa a reescrita',
      'Nunca, o escopo é fixo',
      'Durante o deploy',
    ],
    correctIndex: 1,
    explanation:
      'O plano é o lugar mais barato para simplificar; é ali que o julgamento humano evita complexidade escondida.',
  },
  {
    id: 'ce-e26',
    type: 'mc',
    question: 'Como o compound engineering se relaciona com o Spec-Driven Development?',
    options: [
      'São concorrentes incompatíveis',
      'São complementares: a spec entra no planejamento e a fase compound refina os templates de spec',
      'São a mesma coisa com nomes diferentes',
      'Um substitui o outro completamente',
    ],
    correctIndex: 1,
    explanation:
      'SDD estrutura o contrato (o quê/como) e o compound estrutura o ciclo que aprende; juntos, entregam contrato executável num repo que melhora.',
  },
  {
    id: 'ce-e27',
    type: 'mc',
    question: 'O que a Every demonstra ao rodar cinco produtos com times de uma pessoa?',
    options: [
      'Que qualidade não importa',
      'Que o investimento em contexto e sistema compõe, viabilizando alta alavancagem por pessoa',
      'Que agentes substituem produtos',
      'Que uma pessoa não precisa de ferramentas',
    ],
    correctIndex: 1,
    explanation:
      'A prova de conceito radical só é possível porque o composto acumulado multiplica a capacidade de cada pessoa.',
  },
  {
    id: 'ce-e28',
    type: 'mc',
    question: 'Qual pergunta caracteriza a mentalidade compound ao pegar uma tarefa?',
    options: [
      '"Como resolvo esta tarefa?"',
      '"Como resolvo esta tarefa de um jeito que a próxima fique mais barata?"',
      '"Qual o jeito mais rápido de digitar?"',
      '"Quantos agentes posso usar?"',
    ],
    correctIndex: 1,
    explanation:
      'A diferença mental é mirar não só a tarefa da frente, mas o barateamento das tarefas futuras.',
  },
  {
    id: 'ce-e29',
    type: 'mc',
    question: 'Por que trabalho assíncrono é uma vantagem no compound engineering?',
    options: [
      'Porque elimina a necessidade de planos',
      'Porque planos e reviews podem ser criados e aprovados por documento, sem reunião, destravando várias frentes',
      'Porque remove a revisão',
      'Porque acelera a digitação',
    ],
    correctIndex: 1,
    explanation:
      '"Criei um doc de plano, comenta até o fim do dia" substitui a reunião e permite orientar várias frentes em paralelo.',
  },
  {
    id: 'ce-e30',
    type: 'mc',
    question: 'O CLAUDE.md de um projeto compound maduro difere de um gerado por /init porque:',
    options: [
      'É mais curto',
      'Carrega contexto acumulado de meses de lições compostas, não apenas um template inicial',
      'Não tem valor',
      'É idêntico',
    ],
    correctIndex: 1,
    explanation:
      'O valor está no contexto acumulado; um template inicial é só o ponto de partida do que a fase compound vai enriquecer.',
  },
  {
    id: 'ce-e31',
    type: 'mc',
    question: 'Ao delegar review a subagentes, qual configuração é típica?',
    options: [
      'Um único agente genérico revisa tudo',
      'Vários subagentes com focos distintos (segurança, performance, convenções, lógica) em paralelo',
      'Nenhum agente revisa',
      'O mesmo agente que escreveu revisa a si mesmo',
    ],
    correctIndex: 1,
    explanation:
      'Subagentes especializados em paralelo pegam o que um humano cansado deixaria passar, cada um no seu foco.',
  },
  {
    id: 'ce-e32',
    type: 'mc',
    question: 'Qual destes NÃO é um dos cinco princípios do compound engineering?',
    options: [
      'Cada unidade de trabalho torna a próxima mais fácil',
      'Ensine o sistema, não faça o trabalho',
      'Sempre escreva testes depois do deploy',
      'Construa redes de segurança, não processos de revisão',
    ],
    correctIndex: 2,
    explanation:
      '"Escrever testes depois do deploy" não é princípio; os cinco giram em torno de trabalho que compõe, gosto em sistemas, ensinar, redes de segurança e ambiente agent-native.',
  },
  {
    id: 'ce-e33',
    type: 'mc',
    question: 'Por que o estágio 5 da escada é o "alvo, não o ponto de partida"?',
    options: [
      'Porque é impossível de alcançar',
      'Porque exige a confiança e os hábitos construídos nos degraus anteriores para operar com segurança',
      'Porque não vale a pena',
      'Porque só funciona sem redes de segurança',
    ],
    correctIndex: 1,
    explanation:
      'Autonomia de ponta a ponta com acesso a sistemas exige a fundação dos estágios anteriores; começar por ela leva ao abandono.',
  },
  {
    id: 'ce-e34',
    type: 'mc',
    question: 'O que representa a metáfora do "sanduíche" na versão nova do loop?',
    options: [
      'Humano nas duas pontas (ideate/plan e polish/decisão), IA no meio no trabalho pesado',
      'IA nas duas pontas e humano no meio',
      'Três agentes empilhados',
      'Um loop sem humanos',
    ],
    correctIndex: 0,
    explanation:
      'O humano abre (ideação/plano) e fecha (polimento/decisão); a IA faz o miolo pesado da execução.',
  },
  {
    id: 'ce-e35',
    type: 'mc',
    question: 'Uma allowlist de comandos seguros serve para:',
    options: [
      'Bloquear o agente completamente',
      'Transformar sessões que travam a cada 2 minutos em sessões autônomas mais longas',
      'Aumentar o número de confirmações',
      'Desabilitar testes',
    ],
    correctIndex: 1,
    explanation:
      'Pré-aprovar comandos seguros e repetitivos é o que dá fluxo à execução autônoma sem abrir mão do controle sobre o destrutivo.',
  },
  // ---------- Discursivas (corrigidas por IA) ----------
  {
    id: 'ce-o1',
    type: 'open',
    question:
      'Explique, com suas próprias palavras, o que significa "trabalho que compõe" e dê um exemplo concreto de como uma correção de bug hoje pode tornar o trabalho futuro mais barato.',
    expected:
      'Trabalho que compõe é aquele em que cada entrega aumenta a capacidade do sistema em vez da complexidade. Exemplo: ao corrigir um bug, em vez de só consertar, você cria um teste que trava aquela regressão e/ou uma regra no CLAUDE.md — assim aquela categoria de erro nunca mais volta, e o agente já evita o padrão sozinho nas próximas features. O ganho é que o esforço investido uma vez elimina retrabalho futuro repetido.',
  },
  {
    id: 'ce-o2',
    type: 'open',
    question:
      'Descreva o loop plan → work → review → compound e explique por que pular a fase compound descaracteriza o método.',
    expected:
      'Plan: desenhar a abordagem em documento revisável antes de codar. Work: o agente executa o plano aprovado com autonomia calibrada. Review: revisão focada em intenção e arquitetura, já que agentes cobrem o técnico. Compound: transformar cada lição do review em regra permanente (CLAUDE.md, hook, teste, subagente). Pular a fase compound significa corrigir o mesmo erro para sempre — sem ela não há acúmulo de capacidade, então vira apenas "usar um agente", não compound engineering.',
  },
  {
    id: 'ce-o3',
    type: 'open',
    question:
      'Um cliente cujo time está no estágio 2 da escada (autocomplete e chat pontual) pede para implementar um fluxo com 13 agentes revisando em paralelo. Como você responderia como consultor, e por quê?',
    expected:
      'Eu explicaria que pular direto do estágio 2 para o 4/5 tende a fracassar, porque cada degrau constrói os modelos mentais e a confiança que o próximo exige. Proporia um plano de adoção degrau a degrau: primeiro firmar delegação de tarefas com plano e revisão (estágio 3), montar redes de segurança (testes, checks), e só então introduzir review multi-agente. A meta é evitar a frustração e o abandono que vêm de operar num degrau ainda não dominado.',
  },
  {
    id: 'ce-o4',
    type: 'open',
    question:
      'O que significa o princípio "gosto pertence a sistemas, não a review"? Dê um exemplo de uma preferência de "gosto" que deveria virar um mecanismo automatizado.',
    expected:
      'Significa que o julgamento de qualidade do sênior deve ser codificado em checks, schemas e configuração, em vez de aplicado manualmente a cada revisão — porque revisão manual não escala e cria um gargalo humano. Exemplo: se você sempre reprova PRs que não tratam erro em Português para o usuário, isso deveria virar uma regra no CLAUDE.md e, idealmente, um check/lint que bloqueia mensagens de erro fora do padrão, em vez de você apontar isso toda vez.',
  },
  {
    id: 'ce-o5',
    type: 'open',
    question:
      'Explique a diferença entre codificar uma lição como instrução (CLAUDE.md) e como hook/teste, e como você decide qual usar.',
    expected:
      'Instrução no CLAUDE.md é uma preferência que o modelo tenta seguir, mas não é garantida — depende da boa vontade do modelo naquele contexto. Hook ou teste é uma garantia determinística: bloqueia ou falha independentemente do modelo. A decisão: preferências e convenções de estilo vão como instrução; garantias inegociáveis (segurança, algo que nunca pode passar) precisam de hook ou teste; verificações recorrentes específicas podem virar um subagente.',
  },
  {
    id: 'ce-o6',
    type: 'open',
    question:
      'O que quer dizer "a pasta é o agente" e como esse conceito muda a forma de uma consultoria escalar entre clientes?',
    expected:
      'Quer dizer que um modelo genérico não é especialista, mas uma pasta com CLAUDE.md, skills e contexto acumulado o especializa naquele domínio — o composto vive na pasta. Para a consultoria, cada cliente vira uma pasta-agente que acumula conhecimento a cada projeto entregue; assim o próximo trabalho naquele cliente sai mais rápido e melhor, porque a pasta já "sabe" as convenções, o histórico e as decisões daquele contexto.',
  },
  {
    id: 'ce-o7',
    type: 'open',
    question:
      'Descreva o que é "autonomia calibrada" na fase Work e dê exemplos do que você pré-aprovaria e do que manteria sob confirmação.',
    expected:
      'Autonomia calibrada é ajustar o nível de permissão do agente conforme o risco: pré-aprovar ações seguras e repetitivas para não travar o fluxo, e exigir confirmação para ações destrutivas ou externas. Pré-aprovaria: rodar testes, lint, ler o git, formatar código. Manteria sob confirmação: deploy, force push, apagar arquivos/branches, alterar produção do cliente, mexer em credenciais. A autonomia cresce com a confiança e com as redes de segurança montadas.',
  },
  {
    id: 'ce-o8',
    type: 'open',
    question:
      'Por que, no compound engineering, o revisor humano deve focar em intenção e arquitetura em vez de sintaxe? O que precisa estar montado para isso funcionar?',
    expected:
      'Porque quando agentes de review já cobrem bugs, segurança, performance e estilo, gastar o olho humano com sintaxe é desperdício do recurso mais valioso — o julgamento sobre se aquilo é o que deveria ser construído. Para funcionar, precisa estar montado o sistema de review automatizado (subagentes ou checks) que cobre o técnico de forma confiável; se o humano ainda corrige vírgula, é sinal de que a rede de segurança está incompleta.',
  },
  {
    id: 'ce-o9',
    type: 'open',
    question:
      'Escreva um exemplo de handoff no formato do compound engineering para uma feature de autenticação que está pela metade.',
    expected:
      'Um bom handoff traz: título da feature, de quem para quem, status (ex.: plano aprovado, implementação 50%), o que já foi feito (ex.: tela de login e validação prontas), o que falta (ex.: integração com OAuth e testes), contexto/decisões (ex.: escolhemos provider X, RLS já configurada) e como continuar (ex.: rode a branch feature/auth, o plano está em docs/plan-auth.md). O ponto é que outra pessoa ou o agente consiga retomar sem explicação verbal.',
  },
  {
    id: 'ce-o10',
    type: 'open',
    question:
      'Como você mediria, de forma concreta, se um time realmente adotou compound engineering em vez de apenas "usar IA"?',
    expected:
      'Mediria pelo acúmulo de capacidade: quantas lições viraram regra permanente no período (entradas novas no CLAUDE.md nascidas de erros reais, hooks/testes criados a partir de reviews, subagentes novos). Se esse número é zero, o time só está usando IA. Outros sinais: as features novas estão ficando mais fáceis e rápidas? O repositório está mais capaz do que há um mês? A taxa de repetição do mesmo erro caiu?',
  },
  {
    id: 'ce-o11',
    type: 'open',
    question:
      'Explique como o compound engineering e o Spec-Driven Development se encaixam numa entrega do Adapta Native.',
    expected:
      'O SDD estrutura o contrato: constituição, spec, plano e tarefas, separando o quê do como e criando a fonte de verdade executável entregue ao cliente. O compound estrutura o ciclo de trabalho que aprende: plan-work-review-compound, onde cada entrega torna a próxima mais fácil. Na entrega, a spec e a constituição do SDD entram no planejamento do compound; e a fase compound refina de volta os templates de spec e a constituição. O resultado é um contrato executável num repositório que fica mais capaz a cada iteração.',
  },
  {
    id: 'ce-o12',
    type: 'open',
    question:
      'Por que o estado de verdade de um trabalho deve viver em arquivos e não na conversa com o agente? Dê uma consequência prática de ignorar isso.',
    expected:
      'Porque o histórico de conversa envelhece e o repositório muda por fora dela, então a conversa deixa de refletir a realidade. Arquivos versionados (plano, PROGRESS.md, Git) são a fonte confiável e legível por humano e agente. Consequência de ignorar: ao retomar amanhã ou passar para outra pessoa/agente, o contexto real se perde, gerando retrabalho, decisões duplicadas ou contradições com o que o repo já tem.',
  },
  {
    id: 'ce-o13',
    type: 'open',
    question:
      'Um sênior do time diz que revisar plano antes de codar é "burocracia que atrasa". Como você defende a fase Plan em termos de custo?',
    expected:
      'Argumentaria que o plano é o lugar mais barato para acertar a direção e cortar escopo: simplificar ou corrigir a abordagem ali custa minutos, enquanto descobrir o erro depois de codado custa a reescrita inteira. Execução perfeita da abordagem errada é o retrabalho mais caro que existe. O plano também destrava trabalho assíncrono (revisão por documento, sem reunião) e dá ao agente critérios de aceite para se autoverificar, o que acelera, não atrasa.',
  },
  {
    id: 'ce-o14',
    type: 'open',
    question:
      'O que você extrairia do plugin open-source de Compound Engineering da Every para montar o kit de agentes da consultoria, e o que evitaria copiar cego?',
    expected:
      'Extrairia os padrões estruturais: como o loop plan-work-review-compound é operacionalizado em comandos/skills, quais tipos de subagente existem (planejador, revisores por foco), e como os prompts de review são construídos. Evitaria copiar cego os detalhes específicos do stack da Every (ex.: convenções Ruby/Rails, prompts amarrados às ferramentas deles) — esses precisam ser reimplementados nas convenções do cliente e no stack da consultoria (Claude Code, Codex, Supabase, padrões do Adapta Native).',
  },
  {
    id: 'ce-o15',
    type: 'open',
    question:
      'Descreva uma situação real de projeto em que aplicar a fase Compound evitaria um problema recorrente, detalhando qual mecanismo você criaria.',
    expected:
      'Resposta livre, mas deve conter: um problema recorrente concreto (ex.: o agente esquece de tratar erro em Português, ou quebra a RLS ao criar tabela nova), e o mecanismo permanente que resolveria na origem — por exemplo, um hook que bloqueia PR sem tratamento de erro adequado, um teste que verifica políticas RLS em toda tabela nova, ou uma regra no CLAUDE.md documentando a convenção. O essencial é ligar a lição a um artefato permanente que impede a repetição.',
  },
]
