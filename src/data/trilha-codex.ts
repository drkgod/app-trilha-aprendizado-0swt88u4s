import type { Topic } from './types'

const xpMap = { alta: 30, media: 20, baixa: 10 }

export const codexTopics: Topic[] = [
  {
    id: 'cx-1',
    index: 1,
    title: 'Instalação da CLI do Codex',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Setup da interface de terminal do Codex.',
    concept:
      'A CLI do Codex é uma interface interativa de terminal (TUI) voltada para automação de código no ecossistema OpenAI. Ela é distribuída tanto por pacotes npm quanto por installers standalone para Windows, macOS e Linux. Exige Node.js ativo e permite orquestrar agentes e workflows complexos diretamente da linha de comando.',
    references: [{ label: 'Codex CLI Installation', url: 'https://docs.openai.com/codex/cli' }],
    practiceSteps: [
      'Instale a CLI executando `npm install -g @openai/codex-cli` ou via standalone binary.',
      'Valide a instalação executando `codex --version`.',
      'Execute `codex doctor` para testar o ambiente.',
    ],
    projectContext:
      'Certifique-se de que o time do cliente tenha a CLI instalada localmente para integração rápida em scripts de automação build-deploy.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-2',
    index: 2,
    title: 'Instalação do app desktop',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Configuração do aplicativo visual do Codex.',
    concept:
      'O aplicativo desktop do Codex fornece uma central visual para controle de projetos, gerenciamento de threads de agentes ativos e visualizações de código formatadas em tempo real. Há instaladores específicos para Apple Silicon, Intel e Windows. O app gerencia repositórios locais e permite visualizar diffs estruturados de forma muito mais amigável do que a CLI tradicional.',
    references: [
      { label: 'Codex Desktop App Guide', url: 'https://docs.openai.com/codex/desktop' },
    ],
    practiceSteps: [
      'Baixe o installer adequado para sua arquitetura (Apple Silicon vs Intel vs Windows).',
      'Abra o app e associe-o a um diretório de código local.',
      'Explore as abas de threads e a visualização do terminal embutido.',
    ],
    projectContext:
      'Recomende o aplicativo desktop para consultores e clientes que preferem uma interface visual e necessitam acompanhar o fluxo de escrita do agente sem digitar comandos no terminal.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-3',
    index: 3,
    title: 'Instalação da extensão IDE',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Integrando o Codex ao VS Code, Cursor ou Windsurf.',
    concept:
      'A extensão de IDE do Codex acopla a inteligência do agente diretamente nos editores favoritos do mercado. O painel lateral dá acesso direto ao chat do Codex e permite que ele faça edições em tempo real nos arquivos abertos, além de aceitar comandos de atalho no editor para refatorar seleções de código específicas.',
    references: [{ label: 'Codex IDE Extension Setup', url: 'https://docs.openai.com/codex/ide' }],
    practiceSteps: [
      'Procure por "Codex" no marketplace de extensões do seu editor (VS Code/Cursor).',
      'Instale e realize o vínculo de login.',
      'Configure o painel da extensão no lado direito para não atrapalhar a visualização da árvore de arquivos.',
    ],
    projectContext:
      'Ao prestar consultoria para times de engenharia, a extensão no IDE é a melhor indicação pois minimiza a perda de foco dos devs ao alternarem de janela.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-4',
    index: 4,
    title: 'Login e planos do Codex',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Diferenças de cobrança e recursos entre Plus, Pro e API.',
    concept:
      'O acesso ao Codex pode ser feito vinculando uma conta do ChatGPT (Plus, Pro, Business ou Enterprise) ou utilizando créditos via chaves de API direto. Usar chaves de API permite total customização e escalabilidade de chamadas simultâneas, enquanto os planos pagos fornecem pacotes de uso com cotas de requisições de alta prioridade.',
    references: [
      { label: 'Codex Subscription Plans', url: 'https://docs.openai.com/codex/billing' },
    ],
    practiceSteps: [
      'Faça o login inicial no app desktop usando sua assinatura do ChatGPT.',
      'Alterne para o método de API Key nas configurações e configure os limites de faturamento.',
      'Identifique no console de uso o gasto gerado pelas tarefas executadas.',
    ],
    projectContext:
      'Oriente clientes que possuem times grandes a utilizar planos Enterprise para segurança de dados corporativos ou API key com cotas controladas.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-5',
    index: 5,
    title: 'App vs CLI vs extensão vs Cloud',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Entendendo os cenários de uso de cada interface.',
    concept:
      'O Codex atua em múltiplas frentes. O App desktop se destaca pela visualização de diffs e threads isoladas. A CLI é focada em velocidade de digitação e TUI interativa. A extensão IDE atua de forma contextual ao lado do código ativo. O Codex Cloud permite delegar tarefas pesadas de execução em servidores da OpenAI conectando repositórios Git, poupando recursos locais da máquina.',
    references: [
      { label: 'Codex Surfaces Comparison', url: 'https://docs.openai.com/codex/surfaces' },
    ],
    practiceSteps: [
      'Abra um mesmo repositório e execute uma tarefa simples via CLI.',
      'Rode a mesma tarefa na nuvem usando o Codex Cloud e monitore os logs remotos.',
      'Documente os prós e contras de cada superfície.',
    ],
    projectContext:
      'A escolha da superfície correta reduz em muito o tempo de setup do time de desenvolvimento. Saiba recomendar as melhores ferramentas por caso de uso.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-6',
    index: 6,
    title: 'Conceitos do app Codex',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Estruturação de Projetos e Threads.',
    concept:
      'No aplicativo desktop do Codex, um "projeto" equivale a uma pasta física em sua máquina local. Uma "thread" é uma sessão isolada de conversa com o agente. Manter threads distintas para features separadas ajuda a organizar o histórico e evita que arquivos antigos poluam a janela de raciocínio atual. A sidebar exibe todo o histórico de conversas e o terminal embutido executa comandos.',
    references: [
      { label: 'Desktop App Concepts', url: 'https://docs.openai.com/codex/desktop/concepts' },
    ],
    practiceSteps: [
      'Crie um projeto no app desktop apontando para uma pasta vazia.',
      'Inicie uma nova thread para configurar o package.json.',
      'Inicie outra thread separada para criar a primeira rota da aplicação, observando a independência de arquivos entre elas.',
    ],
    projectContext:
      'Ensine os desenvolvedores a criar uma thread para cada cartão de tarefa (ticket/issue) do board. Isso garante histórico limpo e foco do agente.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-7',
    index: 7,
    title: 'AGENTS.md',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Memória e instruções do agente Codex.',
    concept:
      'O `AGENTS.md` armazena as instruções específicas de arquitetura e padrões de codificação do projeto para o Codex. Ele respeita a hierarquia: pasta global de configurações (`CODEX_HOME`) -> raiz do projeto -> subpastas específicas. O arquivo `AGENTS.override.md` pode ser criado para sobrescrever regras locais sem afetar as definições originais commitadas no repositório.',
    references: [
      { label: 'AGENTS.md Specifications', url: 'https://docs.openai.com/codex/agents-md' },
    ],
    practiceSteps: [
      'Crie um arquivo `AGENTS.md` na raiz do seu projeto.',
      'Escreva convenções claras de imports, frameworks autorizados e comandos de build.',
      'Chame o Codex e pergunte quais regras ele deve seguir para atestar a leitura do arquivo.',
    ],
    projectContext:
      'Adicione o `AGENTS.md` em todos os repositórios criados com IA. É a garantia de que as diretrizes do projeto serão respeitadas por qualquer agente que entre para codificar.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-8',
    index: 8,
    title: 'Permissões e sandbox',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Segurança e sandboxing de execução.',
    concept:
      'O Codex possui recursos avançados de permissão de acesso ao sistema de arquivos e execução de comandos. O modo "work locally" isola a execução do agente em um ambiente restrito (sandbox), solicitando permissão antes de rodar qualquer comando no sistema operacional. Conhecer quando liberar ou não acesso irrestrito é crucial para segurança dos dados do cliente.',
    references: [
      {
        label: 'Codex Sandbox and Security',
        url: 'https://docs.openai.com/codex/security/sandbox',
      },
    ],
    practiceSteps: [
      'Alterne as permissões de acesso da thread no app desktop.',
      'Execute um script shell e observe o popup de solicitação de permissão.',
      'Configure regras restritas de escrita para apenas pastas de desenvolvimento (`/src`).',
    ],
    projectContext:
      'Oriente os clientes corporativos a nunca concederem acesso total fora do sandbox em suas máquinas de desenvolvimento para proteger códigos internos proprietários.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-9',
    index: 9,
    title: 'Pré-aprovar comandos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Acelerando a automação com comandos autorizados.',
    concept:
      'Para evitar que o Codex pare constantemente solicitando confirmação de execução de tarefas básicas, você pode configurar uma lista de comandos pré-aprovados. Comandos de teste (jest, vitest), formatação (prettier, eslint) e chamadas git/gh seguras podem rodar livremente, acelerando as entregas de forma autônoma do agente.',
    references: [
      {
        label: 'Configuring Pre-Approved Commands',
        url: 'https://docs.openai.com/codex/security/permissions',
      },
    ],
    practiceSteps: [
      'Abra as configurações de segurança do Codex.',
      'Adicione `pnpm build` e `pnpm lint` na lista de comandos pré-aprovados.',
      'Dispare o Codex em uma tarefa e observe-o rodar o build e lint sem pausas.',
    ],
    projectContext:
      'Configurar a lista de comandos pré-aprovados economiza dezenas de minutos por dia de trabalho. Inclua no setup padrão de toda equipe que você treinar.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-10',
    index: 10,
    title: 'Fluxo básico de tarefa',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Ciclo completo de planejamento e execução.',
    concept:
      'O fluxo de trabalho ideal no Codex segue a seguinte ordem lógica: 1) Enviar o prompt descrevendo a feature; 2) O agente elabora um plano de implementação; 3) O agente executa as edições nos arquivos; 4) Você revisa o diff visual gerado; 5) Você aceita ou rejeita as mudanças em blocos. Criar commits de checkpoint no git antes e depois de cada ciclo é obrigatório.',
    references: [{ label: 'Codex Workflow Guide', url: 'https://docs.openai.com/codex/workflow' }],
    practiceSteps: [
      'Inicie uma nova tarefa e peça a criação de um componente simples.',
      'Revise o plano sugerido e faça alterações pontuais.',
      'Inspecione o diff visual final das edições e aceite as modificações.',
    ],
    projectContext:
      'Treine a equipe do cliente a seguir rigorosamente o ciclo de revisão do diff. Aceitar alterações sem conferir o diff gerado leva a códigos quebrados em produção.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-11',
    index: 11,
    title: '/model e reasoning',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Escolha de modelos e níveis de raciocínio lógico.',
    concept:
      'O Codex permite alternar dinamicamente os modelos ativos e configurar o nível de raciocínio (reasoning budget). Tarefas de refatoração complexa, cálculos e design de bancos de dados exigem modelos avançados com reasoning elevado (como o o1/o3-mini), enquanto a escrita repetitiva de arquivos e rotas básicas pode rodar em modelos rápidos para otimização de custo.',
    references: [
      { label: 'OpenAI Reasoning Models', url: 'https://docs.openai.com/models/reasoning' },
    ],
    practiceSteps: [
      'Digite `/model` na CLI e selecione um modelo com alto reasoning.',
      'Envie uma lógica matemática complexa e observe o tempo de raciocínio.',
      'Alterne para o modelo rápido e note a diferença de latência e profundidade.',
    ],
    projectContext:
      'Ensine o cliente a reservar modelos de reasoning apenas para refatorações estruturais críticas, mantendo os modelos de uso geral para tarefas básicas para poupar créditos.',
    xp: xpMap.alta,
  },
  {
    id: 'cx-12',
    index: 12,
    title: 'Codex Cloud',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Delegação de tarefas na nuvem conectando o GitHub.',
    concept:
      'O Codex Cloud conecta seus repositórios do GitHub à infraestrutura de servidores da OpenAI. Isso possibilita delegar tarefas extensas (como escrever testes automatizados para toda a aplicação) diretamente no servidor remoto. Você inicia a tarefa, acompanha os logs em tempo real pelo navegador ou console, e o Codex Cloud cria o PR de entrega sem usar o processamento da sua máquina.',
    references: [{ label: 'Codex Cloud Guide', url: 'https://docs.openai.com/codex/cloud' }],
    practiceSteps: [
      'Conecte sua conta do GitHub ao portal do Codex Cloud.',
      'Cadastre as etapas de configuração de dependências nas configurações do repositório.',
      'Mande uma tarefa longa e verifique o processamento remoto.',
    ],
    projectContext:
      'Esta é uma feature excelente para acelerar a escrita de testes legados. Delegue a tarefa ao Codex Cloud à noite e inicie o dia revisando os PRs gerados.',
    xp: xpMap.media,
  },
  {
    id: 'cx-13',
    index: 13,
    title: '@codex em PR',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Correção de código direta por comentários no GitHub.',
    concept:
      'Uma vez integrado aos repositórios do cliente, é possível invocar o agente comentando `@codex` em qualquer Pull Request no GitHub. O Codex lê as alterações do arquivo referenciado, analisa o comentário explicativo com a instrução de correção (ex: "@codex corrija esse tratamento de erro para retornar 400") e realiza o push do commit de ajuste diretamente na branch associada.',
    references: [
      { label: 'GitHub PR Integration', url: 'https://docs.openai.com/codex/github-pr' },
    ],
    practiceSteps: [
      'Abra um Pull Request de teste no seu GitHub.',
      'Crie um comentário em uma linha de código chamando `@codex` e solicitando uma refatoração.',
      'Acompanhe o commit gerado pelo agente na branch.',
    ],
    projectContext:
      'Apresente isso para o cliente como uma forma ágil de realizar revisões e ajustes de código sem a necessidade de clonar o branch localmente na máquina dos revisores.',
    xp: xpMap.media,
  },
  {
    id: 'cx-14',
    index: 14,
    title: 'Code review integrado',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Painel visual de code review e histórico.',
    concept:
      'O painel de code review do app desktop do Codex fornece ferramentas para inspecionar alterações linha a linha. É possível realizar o staging seletivo de blocos de modificações, clicar em trechos específicos e solicitar ajustes pontuais do agente no chat interno, além de possuir atalhos rápidos para reverter modificações indesejadas.',
    references: [
      { label: 'Desktop Code Review UI', url: 'https://docs.openai.com/codex/desktop/review' },
    ],
    practiceSteps: [
      'Após o Codex editar múltiplos arquivos, abra o painel de review.',
      'Selecione apenas as linhas de um arquivo que você deseja manter na branch.',
      'Utilize o botão de revert nos blocos que você deseja descartar.',
    ],
    projectContext:
      'Esta interface visual do Codex substitui com vantagens ferramentas de git externas para desenvolvedores menos experientes que têm medo de lidar com diffs complexos no terminal.',
    xp: xpMap.media,
  },
  {
    id: 'cx-15',
    index: 15,
    title: 'Worktrees no app',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Gerenciando desenvolvimento paralelo.',
    concept:
      'O aplicativo desktop do Codex tem suporte nativo para Git Worktrees. A sidebar de projetos permite clonar branches de tarefas em pastas paralelas automaticamente. Isso permite trabalhar em múltiplos tickets em paralelo com instâncias de agentes isolados sem colidir o estado local dos arquivos.',
    references: [
      {
        label: 'Worktrees inside Codex App',
        url: 'https://docs.openai.com/codex/desktop/worktrees',
      },
    ],
    practiceSteps: [
      'Crie um worktree de teste no app desktop.',
      'Inicie um agente em cada diretório de worktree.',
      'Verifique como os agentes trabalham de forma independente nas branches locais.',
    ],
    projectContext:
      'Mostre essa flexibilidade em projetos ágeis com muitas tarefas paralelas de correção de bugs.',
    xp: xpMap.media,
  },
  {
    id: 'cx-16',
    index: 16,
    title: 'Limites e consumo',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Controle de créditos e custos das sessões.',
    concept:
      'O Codex exibe de forma clara o consumo de créditos por chamada no painel do desenvolvedor. Acompanhar a estimativa de custos é fundamental para prever faturamentos no fim do mês e diagnosticar queries ineficientes que estão consumindo muitos tokens com retornos redundantes.',
    references: [
      {
        label: 'Billing and Consumption Control',
        url: 'https://docs.openai.com/codex/billing/usage',
      },
    ],
    practiceSteps: [
      'Monitore o painel de faturamento da sua conta de teste.',
      'Escreva um prompt detalhado e note o consumo gerado pela chamada.',
      'Crie limites estritos de gastos mensais nas configurações do Console.',
    ],
    projectContext:
      'Configurar limites de consumo e alertas de gastos é a primeira tarefa ao entregar uma conta corporativa do Codex para o cliente, prevenindo cobranças inesperadas.',
    xp: xpMap.media,
  },
  {
    id: 'cx-17',
    index: 17,
    title: 'Slash commands e atalhos da TUI',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Operação rápida via atalhos do terminal.',
    concept:
      'A interface interativa de terminal (TUI) possui comandos para alternar modelos, limpar telas de chat e buscar referências de commits anteriores. Dominar estes atalhos acelera a interação diária com o agente.',
    references: [
      { label: 'Codex TUI Cheatsheet', url: 'https://docs.openai.com/codex/tui/shortcuts' },
    ],
    practiceSteps: [
      'Abra a CLI e utilize os atalhos de navegação de chat.',
      'Utilize comandos rápidos para limpar a tela e pesquisar logs.',
      'Liste os 5 atalhos que você mais utilizou.',
    ],
    projectContext:
      'Saber operar a TUI com agilidade durante apresentações com o cliente passa autoridade técnica imediata.',
    xp: xpMap.media,
  },
  {
    id: 'cx-18',
    index: 18,
    title: 'Retomar threads',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Histórico de conversas e persistência de dados.',
    concept:
      'Todas as threads criadas no Codex são persistidas localmente ou sincronizadas na conta na nuvem. Retomar threads de semanas atrás recupera o contexto exato do chat e os caminhos de arquivos associados, facilitando a manutenção e a continuidade de tarefas de longo prazo.',
    references: [
      {
        label: 'Persisting and Resuming Threads',
        url: 'https://docs.openai.com/codex/threads/history',
      },
    ],
    practiceSteps: [
      'Abra uma thread antiga na barra lateral.',
      'Verifique se as anotações e o histórico de commits daquela tarefa estão visíveis.',
      'Envie uma mensagem para continuar o trabalho.',
    ],
    projectContext:
      'O histórico de threads é uma documentação viva de como as decisões técnicas do projeto foram tomadas de forma colaborativa com a IA.',
    xp: xpMap.media,
  },
  {
    id: 'cx-19',
    index: 19,
    title: 'Codex para não-código',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Uso da ferramenta para dados e processos.',
    concept:
      'Embora focado em código, o Codex pode ser utilizado para estruturação de dados em formato JSON, limpeza de planilhas CSV locais, geração de diagramas em sintaxe Mermaid para documentar processos da empresa e comparação de grandes blocos de texto estruturado.',
    references: [
      {
        label: 'Non-Code Automation with Codex',
        url: 'https://docs.openai.com/codex/guides/text-automation',
      },
    ],
    practiceSteps: [
      'Forneça um arquivo CSV bagunçado e peça ao Codex para limpar e formatar em JSON.',
      'Gere um fluxograma de processos usando a sintaxe Mermaid.',
      'Documente os casos de uso para equipes administrativas.',
    ],
    projectContext:
      'Apresentar soluções de automação de documentos com Codex para áreas não técnicas abre novos canais de faturamento na consultoria de processos corporativos.',
    xp: xpMap.media,
  },
  {
    id: 'cx-20',
    index: 20,
    title: 'MCP no Codex',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Integrando ferramentas ao Codex via protocolo MCP.',
    concept:
      'Assim como no Claude Code, o Codex suporta o protocolo MCP. Conectar servidores locais e remotos expande o leque de ações do agente, permitindo que ele consulte bancos de dados, chame endpoints de teste e envie mensagens no Slack do time corporativo.',
    references: [{ label: 'MCP Support in Codex', url: 'https://docs.openai.com/codex/mcp/setup' }],
    practiceSteps: [
      'Rode `codex mcp add` para conectar um servidor local.',
      'Verifique a lista de ferramentas expostas.',
      'Execute uma tarefa utilizando a ferramenta conectada.',
    ],
    projectContext:
      'Padronizar conexões MCP entre o Codex e o Claude CLI facilita o revezamento de ferramentas nos times de desenvolvimento dos clientes.',
    xp: xpMap.media,
  },
  {
    id: 'cx-21',
    index: 21,
    title: 'Hooks no Codex',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Gatilhos de ciclo de vida do agente.',
    concept:
      'Os hooks do Codex permitem automatizar tarefas nos eventos de início, execução de ferramentas e fim de threads de conversa. Peça para o próprio agente gerar os scripts de hooks em Node.js ou bash para otimizar os fluxos locais de commit e formatação do repositório.',
    references: [{ label: 'Codex Lifecycle Hooks', url: 'https://docs.openai.com/codex/hooks' }],
    practiceSteps: [
      'Crie um hook em bash que formata o código modificado antes de salvar a thread.',
      'Valide a execução automática do script.',
      'Compartilhe a configuração no repositório de teste.',
    ],
    projectContext:
      'Os hooks reduzem a incidência de erros de build causados por esquecimento de lints e formatações de arquivos.',
    xp: xpMap.baixa,
  },
  {
    id: 'cx-22',
    index: 22,
    title: 'config.toml avançado',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Configuração detalhada de ambiente corporativo.',
    concept:
      'O arquivo `config.toml` do Codex armazena variáveis de ambiente de alta prioridade, definições de portas de escuta locais e caminhos customizados de binários de execução de linguagens de programação, fundamental para setups de ambientes corporativos complexos.',
    references: [
      { label: 'Advanced Config TOML Settings', url: 'https://docs.openai.com/codex/config-toml' },
    ],
    practiceSteps: [
      'Abra o arquivo `config.toml` nas configurações globais da sua máquina.',
      'Altere a porta de escuta do backend local do app.',
      'Configure variáveis de ambiente para acesso de API keys.',
    ],
    projectContext:
      'Esse arquivo é o destino número 1 ao debugar problemas de instalação do app desktop em firewalls e ambientes corporativos restritos.',
    xp: xpMap.baixa,
  },
  {
    id: 'cx-23',
    index: 23,
    title: 'Codex em CI/headless',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Automação sem interface em pipelines de CI/CD.',
    concept:
      'Rodar o Codex no modo headless em ambientes de integração contínua (CI) permite automatizar auditorias de PRs, executar testes e lints de forma autônoma nos servidores de deploy da empresa a cada commit enviado.',
    references: [
      {
        label: 'CI/CD Integration with Codex Headless',
        url: 'https://docs.openai.com/codex/ci-cd',
      },
    ],
    practiceSteps: [
      'Configure uma GitHub Action executando a CLI do Codex no modo headless.',
      'Passe um prompt de auditoria de segurança de código no workflow.',
      'Acompanhe o log da Action e valide o resultado do build.',
    ],
    projectContext:
      'Oferecer revisões automáticas no CI com Codex ajuda a fechar pacotes de consultoria técnica de alto nível em médias e grandes empresas.',
    xp: xpMap.baixa,
  },
  {
    id: 'cx-24',
    index: 24,
    title: 'Codex vs Claude Code: comparativo',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Prós, contras e quando recomendar cada ferramenta.',
    concept:
      'Entender a fundo as diferenças entre Codex e Claude Code é obrigatório para consultores. O Claude Code se destaca pela CLI extremamente madura, velocidade e suporte a hooks. O Codex possui excelente app desktop, worktrees simplificados e integração robusta com modelos de reasoning da OpenAI. Saber orientar os clientes sobre qual ferramenta adota reduz erros de compra e fricção operacional.',
    references: [
      { label: 'AI Code Agents Comparison', url: 'https://docs.openai.com/codex/vs-claude' },
    ],
    practiceSteps: [
      'Monte uma tabela de prós e contras das duas ferramentas.',
      'Avalie o desempenho em tarefas de refatoração usando os dois agentes.',
      'Prepare uma resposta padrão de 5 linhas para a pergunta "qual eu escolho?".',
    ],
    projectContext:
      'Esta é a pergunta número 1 dos clientes ao iniciar a consultoria. Ter a resposta pronta com prós e contras objetivos gera autoridade técnica imediata.',
    xp: xpMap.baixa,
  },
]
