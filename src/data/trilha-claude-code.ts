import type { Topic } from './types'

const xpMap = { alta: 30, media: 20, baixa: 10 }

export const claudeCodeTopics: Topic[] = [
  {
    id: 'cc-1',
    index: 1,
    title: 'Instalação: npm global vs installer nativo',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Instalação da CLI e requisitos mínimos de ambiente.',
    concept:
      'O Claude Code é a interface de terminal oficial da Anthropic para agentes. Ele exige Node.js 18+ instalado no sistema. Existem dois caminhos principais: a instalação global via npm (npm install -g @anthropic-ai/claude-code) ou o installer nativo compilado (para ambientes onde o Node.js não é viável). No Windows, é fortemente recomendado rodar através do WSL (Windows Subsystem for Linux) para compatibilidade nativa com ferramentas bash de terceiros, embora a execução nativa no cmd/powershell seja suportada.',
    references: [
      {
        label: 'Visão Geral do Claude Code',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
      {
        label: 'Guia de Configuração e Instalação',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/quickstart',
      },
    ],
    practiceSteps: [
      'Verifique se sua versão do Node é superior à 18 executando `node -v`.',
      'Instale a CLI globalmente executando `npm install -g @anthropic-ai/claude-code`.',
      'Execute `claude doctor` para validar que todos os requisitos do sistema (como git e gh CLI) estão instalados corretamente.',
    ],
    projectContext:
      'No onboarding de um cliente, comece validando o ambiente. Se ele usa Windows, configure o WSL imediatamente para evitar incompatibilidades nas chamadas de comandos bash do agente.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-2',
    index: 2,
    title: 'As 4 superfícies do Claude',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'CLI vs Desktop App vs Extensão VS Code vs Mobile/Web App.',
    concept:
      'O ecossistema Claude atua em quatro interfaces. O Claude CLI (terminal) é focado em automação, pipelines e desenvolvedores raiz. O Desktop App oferece isolamento de abas e atalhos globais. A extensão do VS Code coloca o agente diretamente na barra lateral, compartilhando o contexto do editor. A interface web/mobile é voltada para conversações gerais, análise de arquivos rápidos e interações portáteis. Cada uma possui limitações específicas, como suporte a ferramentas locais e limites de contexto.',
    references: [
      { label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' },
      { label: 'Claude para Trabalho', url: 'https://www.anthropic.com/learn/claude-for-work' },
    ],
    practiceSteps: [
      'Baixe o app Desktop oficial da Anthropic.',
      'Instale a extensão do Claude no VS Code.',
      'Abra o mesmo projeto em ambas as interfaces e avalie como a extensão lê os arquivos abertos no editor.',
    ],
    projectContext:
      'Para clientes não técnicos (gestores de projetos ou analistas), indique sempre o Desktop App ou a Web UI. Para desenvolvedores, direcione para a CLI ou a extensão do VS Code.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-3',
    index: 3,
    title: 'Login e planos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Autenticação com conta Claude.ai vs API keys.',
    concept:
      'Para utilizar o Claude Code, o usuário pode autenticar de duas formas: logando diretamente com sua conta Claude.ai (que usa o teto de mensagens do plano Pro/Max) ou inserindo uma chave de API (Console Anthropic) que cobra por tokens consumidos (pay-as-you-go). Planos Pro, Team e Enterprise fornecem cotas de uso diferenciadas (o plano Max oferece 5x a 20x mais cota). Usar chaves de API é ideal para empresas que desejam faturamento centralizado e limites elásticos.',
    references: [
      { label: 'Faturamento do Console Anthropic', url: 'https://console.anthropic.com' },
      { label: 'Claude Code no GitHub', url: 'https://github.com/anthropics/claude-code' },
    ],
    practiceSteps: [
      'Gere uma chave de API de teste no Console da Anthropic.',
      'Rode `claude login` no terminal e escolha o método de autenticação desejado.',
      'Monitore no Console quanto uma chamada de debug simples custa em centavos de dólar.',
    ],
    projectContext:
      'Oriente sempre o cliente corporativo a criar uma conta no Anthropic Console e faturar por API key em vez de comprar assinaturas individuais para os desenvolvedores, pois facilita o controle centralizado de custos.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-4',
    index: 4,
    title: 'Limites de uso na prática',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Gerenciamento de cotas de uso e comandos /usage.',
    concept:
      'As contas possuem limites de uso baseados em janelas de 5 horas e tetos semanais. Executar tarefas complexas que leem muitos arquivos consome esses limites exponencialmente mais rápido. O modelo Claude 3 Opus consome muito mais limites por mensagem do que o Claude 3.5 Sonnet. O Claude Code disponibiliza os comandos `/usage` e `/cost` para auditar a quantidade de tokens consumidos na sessão atual e estimar o valor gasto.',
    references: [
      {
        label: 'Gerenciando Custos no Claude Code',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/manage-costs',
      },
      {
        label: 'Curso Claude Code in Action',
        url: 'https://anthropic.skilljar.com/claude-code-in-action',
      },
    ],
    practiceSteps: [
      'Execute uma tarefa complexa no Claude CLI.',
      'Digite `/usage` durante a sessão para verificar a porcentagem de cota restante.',
      'Compare a velocidade de consumo configurando o modelo para Sonnet e depois para Opus.',
    ],
    projectContext:
      'Clientes frequentemente reclamam que o Claude "travou". Em 90% dos casos, eles atingiram o limite da janela de 5 horas. Ensine-os a usar o Sonnet para codificação básica e a reservar o Opus apenas para refatorações estruturais complexas.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-5',
    index: 5,
    title: 'Janela de contexto',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'O que ocupa o contexto e o comando /context.',
    concept:
      'A janela de contexto do Claude Code armazena o histórico da conversa, os arquivos lidos na sessão, as saídas de comandos executados no terminal e as definições de todas as ferramentas de MCP que estiverem conectadas. Quando a janela fica cheia, o modelo começa a esquecer mensagens antigas e a alucinar. O comando `/context` permite analisar detalhadamente o tamanho de cada elemento e identificar o que está "inchando" o contexto.',
    references: [
      {
        label: 'Manual de Comandos da CLI',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/cli-reference',
      },
      { label: 'Construindo com Claude', url: 'https://www.anthropic.com/learn/build-with-claude' },
    ],
    practiceSteps: [
      'Abra um repositório grande com o Claude Code.',
      'Digite `/context` para listar o tamanho em tokens de cada arquivo adicionado automaticamente.',
      'Conecte um servidor MCP e observe o incremento de tokens do sistema na tabela do `/context`.',
    ],
    projectContext:
      'Se o agente começar a ignorar instruções explícitas, rode `/context`. Geralmente, logs gigantes de build ou pacotes inteiros de terceiros foram lidos pelo agente por engano. Limpe o contexto imediatamente.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-6',
    index: 6,
    title: '/compact vs /clear vs abrir sessão nova',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Estratégias para gerenciar o histórico da conversa.',
    concept:
      'Quando o contexto está cheio, você tem três opções: `/compact` (resume o histórico mantendo as edições de arquivos e instruções cruciais, economizando espaço mas perdendo detalhes do chat), `/clear` (limpa todo o histórico e arquivos lidos, preservando apenas as regras do CLAUDE.md) ou simplesmente iniciar uma sessão nova fechando e abrindo o Claude. O auto-compact ocorre de forma autônoma nas sessões, mas compactar repetidamente deteriora o entendimento do agente sobre o projeto.',
    references: [
      {
        label: 'CLI Reference - Commands',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/cli-reference',
      },
    ],
    practiceSteps: [
      'Após 20 mensagens no chat, digite `/compact` e pergunte ao Claude o que ele lembra das primeiras instruções.',
      'Digite `/clear` e rode `/context` para atestar a limpeza do histórico.',
      'Identifique a diferença prática entre limpar a sessão e fechar o processo.',
    ],
    projectContext:
      'Instrua o time do cliente a NUNCA manter uma única sessão do Claude aberta o dia todo. Mudar de tarefa exige obrigatoriamente um `/clear` ou uma nova sessão para evitar desperdício de tokens e alucinações.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-7',
    index: 7,
    title: 'CLAUDE.md: configuração de projeto',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Memória permanente e regras de codificação do repositório.',
    concept:
      'O CLAUDE.md é o arquivo de configuração mais importante do projeto. Ele funciona como a memória permanente do agente e é lido automaticamente em toda inicialização de sessão. A hierarquia respeita a seguinte ordem: regras globais (`~/.claude/CLAUDE.md`) -> regras da raiz do repositório -> regras locais de subpastas. O arquivo deve descrever os comandos de build/test/lint do repositório, convenções de código adotadas, a estrutura da arquitetura em poucas linhas e proibições explícitas (ex: "nunca use Tailwind"). O comando `/init` ajuda a gerar um esqueleto inicial.',
    references: [
      {
        label: 'Instruções de Projeto e Memória',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#project-instructions-claudemd',
      },
    ],
    practiceSteps: [
      'Crie um repositório Git de teste.',
      'Rode `claude /init` para inspecionar a geração automática do CLAUDE.md.',
      'Crie um arquivo `.claude.local.md` para colocar suas anotações pessoais do projeto que não devem ser commitadas.',
    ],
    projectContext:
      'Um CLAUDE.md bem formatado economiza até 30% de contexto e garante que o código gerado pelo agente passe no pipeline de CI/CD sem precisar de ajustes manuais de estilo e lint.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-8',
    index: 8,
    title: 'Configurar MCP',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Conectando o Claude a servidores externos via protocolo MCP.',
    concept:
      'O Claude Code pode estender suas capacidades através do Model Context Protocol (MCP). O comando `claude mcp add` registra um novo servidor de ferramentas. Existem três escopos de configuração: local (configurado na máquina para um único projeto), project (salva as definições no arquivo `.mcp.json` na raiz do repositório, permitindo que todo o time herde as ferramentas ao versionar o projeto) e user (global para o usuário logado em qualquer diretório). Os servidores podem rodar localmente por stdio ou conectar-se a APIs remotas via SSE.',
    references: [
      {
        label: 'Conectando Claude ao MCP',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/mcp',
      },
    ],
    practiceSteps: [
      'Rode `claude mcp add sqlite sqlite3 /caminho/do/banco.db` para criar uma conexão local.',
      'Inspecione o arquivo `.mcp.json` criado na raiz do seu projeto.',
      'Versiona o `.mcp.json` no git e compartilhe com outro repositório para testar a herança de ferramentas.',
    ],
    projectContext:
      'Em consultoria corporativa, sempre configure o MCP no escopo de projeto (`project`). Isso garante que, quando o cliente clonar o repositório, o agente dele terá as mesmas ferramentas de banco e API que o seu, sem necessidade de configuração manual.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-9',
    index: 9,
    title: 'Debugar MCP',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Solução de problemas de conexões MCP falhas.',
    concept:
      'Debugar MCPs é uma habilidade crítica. Problemas comuns incluem servidores que não inicializam devido a caminhos errados de binários, falhas de autenticação de chaves de API em servidores remotos, e loops em chamadas que incharam o contexto. O comando `/mcp` exibe o status de todos os servidores configurados (ativos, inativos ou falhando). Analisar os logs em tempo real e inspecionar a saída padrão do processo do servidor (stdio) ajuda a isolar erros sintáticos de ambiente.',
    references: [
      {
        label: 'Model Context Protocol (MCP) Docs',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/mcp',
      },
    ],
    practiceSteps: [
      'Desconfigure intencionalmente um comando de inicialização no `.mcp.json`.',
      'Abra o Claude Code, execute `/mcp` e identifique a falha descrita.',
      'Restaure o comando e execute `/mcp reload` para reestabelecer o status ativo.',
    ],
    projectContext:
      'Se um servidor MCP travar no meio de uma demonstração com o cliente, use `/mcp` para verificar se a porta de conexão caiu. Reinicie com `/mcp reload` sem fechar o Claude.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-10',
    index: 10,
    title: 'Permissões e Segurança',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Controle de permissões para execução de comandos locais.',
    concept:
      'Por padrão, o Claude Code solicita autorização toda vez que precisa ler um arquivo confidencial, editar código ou rodar um comando bash. A combinação `shift+tab` ativa a auto-aceitação temporária na sessão. O comando `/permissions` permite definir regras granulares, como listar comandos pré-aprovados (allowlist) e bloquear explicitamente comandos de alto risco (denylist). O uso de `--dangerously-skip-permissions` desativa toda a segurança, útil apenas em ambientes controlados como containers isolados de CI/CD.',
    references: [
      {
        label: 'Segurança e Permissões no Claude',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/advanced-setup#security-and-permissions',
      },
    ],
    practiceSteps: [
      'Abra as permissões digitando `/permissions`.',
      'Adicione o comando `pnpm test` na lista de comandos pré-aprovados.',
      'Crie um commit de checkpoint no git e execute um comando do agente utilizando a auto-aceitação.',
    ],
    projectContext:
      'Nunca use `--dangerously-skip-permissions` na máquina local de um cliente. Se o agente executar um comando destrutivo por conta própria, a responsabilidade será sua. Ensine-os a criar allowlists restritas no `/permissions`.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-11',
    index: 11,
    title: 'Plan mode a fundo',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Criação de planos estruturados antes da escrita de código.',
    concept:
      'O Plan Mode (`claude --plan` ou digitando `/model` e ativando o modo de planejamento) instrui o agente a apenas planejar, pesquisar e detalhar as etapas lógicas de uma modificação sem realizar nenhuma alteração nos arquivos ou executar comandos destrutivos. É a ferramenta ideal para revisões de arquitetura e tarefas complexas, permitindo que o consultor revise e altere a estratégia de implementação antes que qualquer código seja de fato escrito.',
    references: [
      {
        label: 'Modo de Planejamento (Plan Mode)',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
    ],
    practiceSteps: [
      'Abra um repositório e chame o Claude Code com `claude --plan`.',
      'Peça a criação de um módulo complexo e avalie o arquivo de planejamento gerado.',
      'Aprove o plano no chat e execute a transição para a escrita de código.',
    ],
    projectContext:
      'Antes de realizar alterações em bancos de dados ou em rotas de APIs, exija que o agente execute em `Plan Mode`. Mostre esse plano para o cliente como garantia de alinhamento técnico antes de codar.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-12',
    index: 12,
    title: 'Slash commands do dia a dia',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Uso ágil de comandos internos do Claude CLI.',
    concept:
      'Atalhos e comandos agilizam a produtividade no terminal: `/model` (troca o LLM ativo), `/resume` (escolhe uma sessão antiga), `/init` (inicializa regras do repo), `/agents` (gerencia subagentes em execução), `/hooks` (gerencia scripts automáticos). Pressionar a tecla `Esc` interrompe o pensamento do modelo; pressionar `Esc` duas vezes navega pelo histórico de prompts. O prefixo `!` permite que você execute comandos bash locais sem precisar sair da interface do Claude.',
    references: [
      {
        label: 'Referência de Comandos da CLI',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/cli-reference',
      },
    ],
    practiceSteps: [
      'Digite `/model` e alterne entre Claude 3.5 Sonnet e Claude 3.5 Haiku.',
      'Escreva um prompt no terminal e pressione `Esc` para cancelar a digitação.',
      'Execute `!git status` direto no chat do Claude Code.',
    ],
    projectContext:
      'Saber operar o Claude sem digitar prompts longos (usando apenas atalhos como `Esc` duplo e comandos com `!`) demonstra grande fluência técnica frente ao cliente durante sessões de pair-programming.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-13',
    index: 13,
    title: 'Retomar trabalho',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Como continuar o trabalho em sessões passadas.',
    concept:
      'O Claude CLI armazena o histórico completo de todas as conversas realizadas em diretórios locais. O comando `claude --continue` retoma a última sessão ativa naquele repositório. O comando `claude --resume` lista as sessões recentes, exibindo o dia, a hora e o último prompt enviado, permitindo que você reative o histórico exato sem perder os arquivos que estavam carregados no contexto.',
    references: [
      {
        label: 'Gerenciando Sessões de Chat',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/cli-reference',
      },
    ],
    practiceSteps: [
      'Faça uma alteração em um arquivo e feche o terminal.',
      'Abra o terminal novamente no mesmo diretório e digite `claude --continue`.',
      'Verifique se o histórico e o contexto anterior continuam ativos.',
    ],
    projectContext:
      'Se um pipeline de build quebrar após você ter fechado o terminal, não comece um chat do zero. Use `claude --continue` para que o agente tenha a memória das últimas edições e saiba exatamente o que consertar.',
    xp: xpMap.alta,
  },
  {
    id: 'cc-14',
    index: 14,
    title: 'Custom slash commands',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Criando seus próprios atalhos de prompt do projeto.',
    concept:
      'Você pode criar comandos personalizados adicionando scripts ou arquivos markdown no diretório `.claude/commands/` do projeto. O Claude Code lê essa pasta e adiciona novos comandos que aceitam `$ARGUMENTS` dinâmicos. Isso é extremamente útil para criar comandos padronizados como `/review` (que analisa o git diff do repositório) ou `/document` (que gera documentação para arquivos selecionados).',
    references: [
      {
        label: 'Custom Commands (Claude Code)',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
    ],
    practiceSteps: [
      'Crie a pasta `.claude/commands/` na raiz do seu projeto.',
      'Crie um arquivo chamado `review.md` com instruções sistemáticas de code review.',
      'Abra o Claude e digite `/review` para ver seu atalho em ação.',
    ],
    projectContext:
      'Automatize tarefas de entrega de código criando custom commands no repositório do cliente. Isso ajuda o time dele a seguir os mesmos padrões de auditoria que você desenhou.',
    xp: xpMap.media,
  },
  {
    id: 'cc-15',
    index: 15,
    title: 'Subagents',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Orquestração de múltiplos agentes especializados.',
    concept:
      'Ao invocar `/agents` ou pedir ao Claude para criar um agente secundário, ele instancia um "Subagent" com prompt de sistema isolado e ferramentas específicas. O contexto de conversação do subagente é independente da sessão principal, impedindo que o histórico do chat principal fique inflado de código desnecessário. O subagente conclui sua tarefa isoladamente e devolve apenas o resultado final para o agente principal.',
    references: [
      {
        label: 'Sub-agents e Contextos Isolados',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
    ],
    practiceSteps: [
      'Abra o Claude CLI e peça para ele criar um subagente especializado em testes unitários.',
      'Observe como a barra lateral exibe as tarefas paralelas do subagente.',
      'Valide o resultado devolvido pelo subagente no fluxo principal.',
    ],
    projectContext:
      'Use subagentes para tarefas de varredura ou auditoria. Por exemplo, delegue a revisão de segurança de um arquivo para um subagente especializado em segurança, mantendo o agente principal livre de logs e focado na arquitetura principal.',
    xp: xpMap.media,
  },
  {
    id: 'cc-16',
    index: 16,
    title: 'Skills',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Definição de procedimentos técnicos reutilizáveis.',
    concept:
      'As Skills no Claude Code são configuradas escrevendo arquivos estruturados no formato `SKILL.md`. Diferente de comandos e MCPs, uma skill encapsula conhecimento procedural complexo e boas práticas de modelagem que você ensina ao agente (ex: "como mapear fluxos de banco com o Supabase"). O agente carrega a skill sob demanda quando detecta que a tarefa atual precisa daquela expertise.',
    references: [
      {
        label: 'Estendendo o Claude com Skills',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/skills',
      },
    ],
    practiceSteps: [
      'Crie um arquivo `SKILL.md` dentro de uma pasta de skills.',
      'Escreva um passo a passo rigoroso de como sua consultoria desenha diagramas de processos.',
      'Peça ao Claude para desenhar um processo e certifique-se de que ele lê e segue a skill criada.',
    ],
    projectContext:
      'Desenvolver e documentar "Skills" personalizadas de engenharia de software para o time do cliente é um dos entregáveis mais valiosos da nossa consultoria, pois padroniza a produção da equipe.',
    xp: xpMap.media,
  },
  {
    id: 'cc-17',
    index: 17,
    title: 'Hooks',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Gatilhos de automação pós-ações e edições.',
    concept:
      'Os Hooks são gatilhos que rodam de forma automática em resposta a eventos no ciclo de execução do Claude Code, como antes da chamada de uma ferramenta (`PreToolUse`), depois do uso de uma ferramenta (`PostToolUse`) ou na finalização do chat (`Stop`). Isso possibilita, por exemplo, disparar lints automáticos nos arquivos editados, rodar testes de regressão ou auditar se o agente escreveu credenciais hardcoded.',
    references: [
      {
        label: 'Gatilhos e Hooks (CLI Docs)',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/cli-reference',
      },
    ],
    practiceSteps: [
      'Crie um hook no arquivo de configurações que impede o Claude de rodar o comando `git push --force`.',
      'Edite um arquivo de código e verifique se o hook de pós-edição formata o arquivo automaticamente com o Prettier.',
      'Inspecione a saída do hook no terminal do Claude.',
    ],
    projectContext:
      'Instale hooks de validação estática de código no repositório de desenvolvimento do cliente. Isso garante que o agente nunca commite código com erros de sintaxe ou chaves expostas.',
    xp: xpMap.media,
  },
  {
    id: 'cc-18',
    index: 18,
    title: 'Seleção de modelo',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Escolha do modelo ideal por complexidade de tarefa.',
    concept:
      'A família Claude 3.5 possui modelos com perfis distintos. O Claude 3.5 Sonnet é o modelo de uso geral padrão, oferecendo alta inteligência de codificação e velocidade. O Claude 3.5 Haiku é extremamente rápido e de baixo custo, ideal para scripts rápidos, refatoração de nomes e testes simples. O Claude 3 Opus é o modelo mais pesado e analítico, indicado para revisões de arquitetura e lógica matemática avançada. Mudar de modelo durante a sessão otimiza custos e cotas.',
    references: [
      {
        label: 'Visão Geral de Modelos Anthropic',
        url: 'https://docs.anthropic.com/en/docs/about-claude/models',
      },
    ],
    practiceSteps: [
      'Insciie o Claude CLI e alterne para o Haiku digitando `/model haiku`.',
      'Peça tarefas repetitivas simples e anote a latência de resposta.',
      'Alterne para o Sonnet e compare a profundidade conceitual das respostas.',
    ],
    projectContext:
      'Ensine o time do cliente a lógica de seleção de modelos: "Se for codificar coisas simples, use o Sonnet ou Haiku; se for desenhar a arquitetura do sistema do zero, chame o Opus". Isso reduz custos e economiza a cota da empresa.',
    xp: xpMap.media,
  },
  {
    id: 'cc-19',
    index: 19,
    title: 'Trabalhando com imagens',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Uso de screenshots para depuração visual e front-end.',
    concept:
      'O Claude Code suporta leitura visual direta. Você pode colar screenshots de telas com erro, arrastar arquivos de imagem para a CLI ou passar caminhos de imagens locais. O modelo analisa a imagem e a correlaciona com o código-fonte, tornando muito mais fácil debugar problemas de layout em CSS, replicar interfaces a partir de mockups de design ou extrair dados de diagramas estruturais.',
    references: [
      {
        label: 'Multimodalidade e Visão na API',
        url: 'https://docs.anthropic.com/en/docs/about-claude/vision',
      },
    ],
    practiceSteps: [
      'Tire um print de um bug visual em um app local.',
      'Inicie o Claude Code e cole a imagem na sessão, pedindo o conserto do código CSS associado.',
      'Veja o agente inspecionar a imagem e corrigir o arquivo correto no repositório.',
    ],
    projectContext:
      'Para projetos de frontend, mostre ao cliente como ele pode acelerar homologações enviando prints de tela diretamente para o Claude para correção rápida de bugs estéticos.',
    xp: xpMap.media,
  },
  {
    id: 'cc-20',
    index: 20,
    title: 'Git pelo Claude Code',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Uso profissional do Git e integração com GitHub CLI.',
    concept:
      'O Claude Code vem integrado com comandos git locais e com a ferramenta de terminal do GitHub (gh CLI). O agente consegue criar branches sem colidir nomes, realizar commits com mensagens descritivas detalhadas (incluindo o que mudou e porquê), resolver conflitos de merge analisando as duas versões do arquivo, criar Pull Requests diretamente no GitHub e consultar issues abertas para criar as features associadas.',
    references: [
      {
        label: 'Git no Claude Code (Docs)',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
    ],
    practiceSteps: [
      'Peça ao Claude para criar um branch chamado `feature/setup-auth`.',
      'Faça alterações e ordene que ele commite as modificações com mensagens estruturadas.',
      'Crie um Pull Request no GitHub diretamente pelo chat do Claude utilizando a ferramenta `gh`.',
    ],
    projectContext:
      'A integração com git é o que viabiliza o desenvolvimento autônomo. No CLAUDE.md do cliente, defina a regra de que o agente deve sempre criar branches isolados e commits no padrão conventional commits.',
    xp: xpMap.media,
  },
  {
    id: 'cc-21',
    index: 21,
    title: 'Worktrees + múltiplos agentes',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Desenvolvimento paralelo em múltiplos branches.',
    concept:
      'Os Git Worktrees permitem que você tenha múltiplos branches do mesmo repositório clonados em pastas locais separadas na sua máquina, compartilhando o mesmo repositório `.git`. Isso permite iniciar várias sessões do Claude Code em diretórios diferentes simultaneamente, trabalhando em features distintas em paralelo sem que um agente sobrescreva as edições ou o contexto do outro.',
    references: [
      { label: 'Worktrees do Git (Manual)', url: 'https://git-scm.com/docs/git-worktree' },
    ],
    practiceSteps: [
      'Crie um worktree em uma pasta paralela executando `git worktree add ../feature-b branch-b`.',
      'Abra uma sessão do Claude na raiz do projeto e outra na pasta do worktree.',
      'Desenvolva duas features ao mesmo tempo e envie os pushes sem colisão de branch local.',
    ],
    projectContext:
      'Essa arquitetura é ideal para projetos com prazos apertados. Múltiplos agentes trabalhando em worktrees separados aumentam a velocidade de entrega sem complicar a gerência de repositórios.',
    xp: xpMap.media,
  },
  {
    id: 'cc-22',
    index: 22,
    title: 'Boas práticas de sessão',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Regras de ouro para manter o agente produtivo e focado.',
    concept:
      'Trabalhar com agentes de IA exige disciplina operacional. As melhores práticas incluem: 1) Quebrar grandes problemas em tarefas minúsculas e fáceis de validar; 2) Sempre exigir um plano lógico antes de codificar grandes refatorações; 3) Usar `/clear` para iniciar novas tarefas e evitar misturar lixo de contexto; 4) Commitar checkpoints antes de deixar o agente fazer alterações grandes em arquivos complexos.',
    references: [
      {
        label: 'Boas Práticas de Uso (CLI Docs)',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
    ],
    practiceSteps: [
      'Escreva um prompt detalhando uma tarefa grande dividida em 4 marcos claros.',
      'Peça ao Claude para fazer um checkpoint commit antes de rodar os testes.',
      'Siga o ciclo de validação a cada arquivo editado.',
    ],
    projectContext:
      'Sua função como consultor é treinar os desenvolvedores do cliente a não criarem "sessões infinitas" no Claude. A falta de disciplina de contexto é o maior causador de bugs em projetos criados por IA.',
    xp: xpMap.media,
  },
  {
    id: 'cc-23',
    index: 23,
    title: 'Modo headless',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Execução de comandos Claude não interativos.',
    concept:
      'O modo headless permite invocar o Claude Code diretamente em scripts de shell ou pipelines de integração contínua (CI/CD) sem a necessidade de uma interface de terminal interativa. A sintaxe `claude -p "instrução"` permite enviar prompts pontuais (ex: gerar documentação de um arquivo específico ou rodar uma varredura de segurança) e receber o retorno em formato estruturado (JSON ou texto limpo).',
    references: [
      {
        label: 'Executando Claude no Modo Headless',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      },
    ],
    practiceSteps: [
      'Crie um script em bash que chama o Claude em modo headless.',
      'Passe o prompt `claude -p "Gere um arquivo CHANGELOG.md baseado nos últimos 3 commits"` no terminal.',
      'Verifique se a saída foi gravada no arquivo de texto sem abrir o chat.',
    ],
    projectContext:
      'Mostre ao cliente como usar o modo headless para automatizar a geração de relatórios de código ou resumos semanais de commits que alimentam a newsletter interna da empresa.',
    xp: xpMap.baixa,
  },
  {
    id: 'cc-24',
    index: 24,
    title: 'settings.json avançado',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Configuração avançada de comportamento e variáveis de ambiente.',
    concept:
      'O arquivo `settings.json` localizado na pasta de configurações global do Claude armazena preferências finas do sistema. É possível definir quais extensões de arquivos devem ser ignoradas na leitura padrão, configurar limites estritos de permissão para comandos automáticos, injetar variáveis de ambiente específicas para os servidores MCP e alterar o modelo padrão que o CLI inicia para economizar tokens.',
    references: [
      {
        label: 'Configurações Globais (CLI Docs)',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/advanced-setup',
      },
    ],
    practiceSteps: [
      'Abra o arquivo de configurações no editor.',
      'Configure as variáveis de ambiente necessárias para o seu MCP no bloco `env`.',
      'Defina as extensões `.log` e `.lock` para serem ignoradas no carregamento automático de arquivos do Claude.',
    ],
    projectContext:
      'Em clientes corporativos de grande porte com políticas rígidas de compliance, use o `settings.json` para garantir que o agente nunca acesse pastas externas do sistema de arquivos ou execute scripts não auditados.',
    xp: xpMap.baixa,
  },
  {
    id: 'cc-25',
    index: 25,
    title: 'Proxy e rede corporativa',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Configurando o Claude CLI em ambientes corporativos restritos.',
    concept:
      'Muitas empresas utilizam proxies e firewalls rígidos que interceptam requisições HTTP e quebram a conexão de agentes de inteligência artificial. Para que o Claude Code funcione nesses ambientes, é preciso configurar as variáveis de ambiente globais `HTTP_PROXY`, `HTTPS_PROXY` e importar certificados SSL corporativos customizados para que o binário do Node.js possa autenticar os endpoints da Anthropic sem erros de handshake TLS.',
    references: [
      {
        label: 'Configuração de Redes Restritas',
        url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/advanced-setup#network-configuration',
      },
    ],
    practiceSteps: [
      'Simule a configuração de um proxy de desenvolvimento local configurando as variáveis de ambiente `HTTP_PROXY`.',
      'Faça o teste de ping de requisições da CLI para atestar que o tráfego está passando pela rota corporativa.',
      'Registre os passos de solução de erro de SSL (self-signed certificate).',
    ],
    projectContext:
      'Esse é um gargalo comum em projetos do setor financeiro ou corporativo tradicional. Dominar as variáveis de proxy economiza dias de discussões técnicas com a equipe de infraestrutura de rede do cliente.',
    xp: xpMap.baixa,
  },
  {
    id: 'cc-26',
    index: 26,
    title: 'GitHub Actions com Claude Code',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Integração contínua e reviews automáticos no GitHub.',
    concept:
      'Integrar o Claude Code diretamente em pipelines do GitHub Actions viabiliza fluxos avançados como: abrir uma issue e deixar o agente criar o PR de correção automaticamente, ou usar o Claude como revisor automático de Pull Requests a cada push. Utilizar a menção `@claude` nos comentários do PR instrui o agente a ler a alteração e propor as correções necessárias de forma assíncrona.',
    references: [
      {
        label: 'GitHub Actions integration',
        url: 'https://github.com/marketplace/actions/claude-code-action',
      },
    ],
    practiceSteps: [
      'Crie um arquivo de workflow em `.github/workflows/claude-review.yml`.',
      'Configure o token de acesso e a trigger de pull requests.',
      'Abra um PR com erro intencional e verifique o comentário de revisão postado pelo Claude na conversa do GitHub.',
    ],
    projectContext:
      'Venda a integração do Claude no GitHub Actions como um "revisor júnior automático de PRs". O time do cliente ganha escala na triagem de bugs óbvios antes da revisão humana.',
    xp: xpMap.baixa,
  },
]
