import type { QuizQuestion } from './types'

export const quizzes: Record<string, QuizQuestion[]> = {
  // CLAUDE CODE QUIZZES
  'cc-1': [
    {
      question:
        'Um desenvolvedor está rodando o Claude Code dentro do WSL2 (Ubuntu) e tenta interagir com arquivos no host Windows (ex: C:\\Users\\Projects). O agente relata que não encontra os arquivos ou falha ao executar comandos npm locales. Qual é a causa raiz e a solução recomendada?',
      options: [
        'O Claude Code não é compatível com WSL2; o desenvolvedor deve usar o cmd nativo do Windows.',
        'O WSL2 monta o drive Windows em /mnt/c/Users, mas links simbólicos de arquivos como node_modules no lado Windows podem causar falhas de permissão no Linux. A solução é clonar o repositório diretamente no filesystem nativo do Linux do WSL2 (~/projects) para obter compatibilidade e performance máxima.',
        'O Claude Code exige a variável de ambiente WIN_PATH setada no Linux.',
        'O desenvolvedor deve desativar o sandbox do Claude no Windows executando a flag --no-sandbox.',
      ],
      correctIndex: 1,
      explanation:
        'Acessar arquivos do host Windows a partir do WSL2 através de /mnt/c gera sérios gargalos de I/O e quebra a integridade de links simbólicos e permissões de node_modules. Para rodar ferramentas com agentes, clone o repositório diretamente no filesystem ext4 do WSL2 (ex: ~/projects).',
    },
    {
      question:
        'Ao tentar rodar o Claude Code em um container Docker headless em um pipeline de CI/CD (sem terminal interativo), o processo falha imediatamente ou fica travado no boot. Quais flags e variáveis de ambiente devem ser configuradas para rodar o agente corretamente nesse cenário?',
      options: [
        'Deve-se usar a flag --dangerously-skip-permissions e setar a variável de ambiente ANTHROPIC_API_KEY no container, além de invocar com a flag --headless.',
        'Basta rodar o comando claude login com um token de sessão estático.',
        'O Claude CLI exige obrigatoriamente um pseudoterminal (TTY) ativo e não pode rodar em pipelines de CI/CD.',
        'Deve-se configurar a variável VITE_POCKETBASE_URL e rodar com a flag --force.',
      ],
      correctIndex: 0,
      explanation:
        'No modo não-interativo (CI/CD/headless), a API Key da Anthropic deve ser fornecida via env var ANTHROPIC_API_KEY, a flag --dangerously-skip-permissions é exigida para evitar perguntas de permissão, e a flag -p (prompt) ou --headless deve ser passada para evitar que a CLI tente inicializar a TUI.',
    },
    {
      question:
        'Durante a execução de claude doctor em um servidor Linux de homologação, o comando retorna um aviso informando que o utilitário gh (GitHub CLI) não está instalado. Como isso impacta as capacidades do agente no Claude Code?',
      options: [
        'O Claude Code não conseguirá ler nenhum arquivo do repositório local.',
        'O agente não poderá realizar operações locais de git commit ou git push.',
        'O agente não conseguirá realizar interações avançadas com o GitHub remoto de forma autônoma, como criar Pull Requests, listar issues do repositório ou visualizar status de Actions.',
        'Nenhum impacto, pois o Claude CLI usa requisições REST internas para o GitHub.',
      ],
      correctIndex: 2,
      explanation:
        'O Claude Code usa o executável local gh CLI para interagir com o GitHub. Sem ele, funções como /pr, criação de issues e automação de revisões diretas pelo terminal não estarão disponíveis.',
    },
    {
      question:
        'Se a instalação global via npm do Claude Code falhar com erros de EACCES no macOS ou Linux, qual é a prática recomendada de engenharia para solucionar o problema sem usar o comando sudo?',
      options: [
        'Desativar o SIP (System Integrity Protection) do macOS.',
        'Alterar as permissões da pasta /usr/local/lib/node_modules manualmente com chmod 777.',
        'Reconfigurar o diretório padrão do npm para usar uma pasta no diretório home do usuário (ex: ~/.npm-global) ou utilizar um gerenciador de versão como o nvm (Node Version Manager).',
        'Copiar os arquivos binários do Claude manualmente para a pasta /bin.',
      ],
      correctIndex: 2,
      explanation:
        'Usar sudo para instalar pacotes globais via npm é uma má prática de segurança. Utilizar o nvm ou redefinir o prefixo global do npm para uma pasta no home do usuário resolve os problemas de permissão de gravação de forma segura.',
    },
    {
      question:
        'O Claude Code CLI avisa que há uma nova versão disponível. Qual é o perigo de continuar usando uma versão antiga em produção por mais de 3 semanas?',
      options: [
        'A CLI para de funcionar completamente e revoga as chaves API locais.',
        'A Anthropic atualiza constantemente as definições de ferramentas e melhorias de prompt de sistema enviadas ao modelo. Usar versões desatualizadas pode fazer o agente alucinar em chamadas de ferramentas de novos MCPs ou falhar em prompts de formatação.',
        'O repositório Git local pode ser corrompido.',
        'Nenhum, as atualizações são apenas cosméticas.',
      ],
      correctIndex: 1,
      explanation:
        'Atualizações frequentes da CLI trazem ajustes críticos no prompt do sistema e na estrutura dos schemas de chamadas de ferramentas. Versões antigas perdem alinhamento com a inteligência do Sonnet/Opus.',
    },
  ],
  'cc-2': [
    {
      question:
        'Um cliente com plano Claude Pro relata que o Claude Code exibe a mensagem "limite de mensagens excedido" todos os dias no final da tarde. Como funciona o reset de limites do plano Pro e qual a melhor alternativa de contingência para este time?',
      options: [
        'O reset ocorre a cada 24 horas; a única solução é assinar mais de uma conta por desenvolvedor.',
        'Os limites operam em janelas móveis de 5 horas baseadas no volume de tokens. A alternativa imediata é configurar o Claude Code para usar chaves de API do Console Anthropic (pay-as-you-go) com limites de faturamento escaláveis.',
        'O limite é fixo por semana; a solução é migrar o projeto para a Web UI.',
        'O limite só zera na segunda-feira.',
      ],
      correctIndex: 1,
      explanation:
        'O plano Pro utiliza janelas dinâmicas de 5 horas. Para times de desenvolvimento com alta demanda, a melhor alternativa é migrar a autenticação para chaves de API, pagando pelo consumo exato (pay-as-you-go).',
    },
    {
      question:
        'Ao rodar o comando /cost no Claude Code durante o uso de uma chave de API, o valor de custo de uma única requisição com Opus veio muito mais alto do que o esperado. Qual técnica abaixo reduz esse custo fixo de entrada?',
      options: [
        'Desconectar servidores MCP que não estão sendo utilizados na tarefa ativa (pois as definições de ferramentas de cada MCP ativo são enviadas na janela de contexto de toda mensagem).',
        'Desativar o autocomplete de código no terminal.',
        'Usar a chave de API anon do Supabase.',
        'Apagar o arquivo package.json antes de iniciar o chat.',
      ],
      correctIndex: 0,
      explanation:
        'Cada servidor MCP configurado no escopo do projeto injeta o schema de todas as suas ferramentas disponíveis como mensagens do sistema na janela de contexto de toda chamada. Manter MCPs ociosos conectados gera custo fixo de tokens redundantes.',
    },
    {
      question:
        'Qual é a diferença de consumo de cota e comportamento entre o Claude 3.5 Sonnet e o Claude 3 Opus na CLI do Claude Code?',
      options: [
        'O Sonnet é exclusivo para a interface web e não roda na CLI.',
        'O Opus consome muito menos cota por ser mais lento.',
        'O Claude 3.5 Sonnet possui janela de contexto maior e consome consideravelmente menos créditos/mensagens por chamada do que o Opus, devendo ser o modelo padrão para desenvolvimento de rotina.',
        'Não há diferença de preço ou cota entre os modelos na API.',
      ],
      correctIndex: 2,
      explanation:
        'O Sonnet é o padrão do Claude Code por ser mais rápido, inteligente em código e consumir muito menos cota/tokens do que o Opus. O Opus deve ser ativado apenas para lógicas complexas de design.',
    },
    {
      question:
        'Ao utilizar o Console Anthropic, como você pode garantir que o time de desenvolvedores não exceda o orçamento mensal do projeto corporativo por engano?',
      options: [
        'Bloqueando o acesso ao terminal dos desenvolvedores.',
        'Configurando limites estritos de "Spend Limits" (Monthly Budget e Notification Threshold) diretamente nas configurações de faturamento (Billing) do Anthropic Console.',
        'Exigindo login com senha em cada chamada de comando do Claude.',
        'Rodando a CLI com a flag --low-cost.',
      ],
      correctIndex: 1,
      explanation:
        'O Anthropic Console permite configurar tetos rígidos de gastos mensais (hard limits) que cortam o acesso da API automaticamente ao atingir o limite configurado.',
    },
    {
      question:
        'O comando /usage exibe informações sobre o plano Pro. Se você estiver autenticado via API Key do Console, o que o comando exibirá?',
      options: [
        'O comando gerará um erro informando que não é compatível com chaves de API.',
        'Ele exibirá informações sobre a quantidade de tokens consumidos na sessão atual e o custo estimado em dólares com base na tabela do modelo ativo.',
        'Ele listará o saldo bancário da conta cadastrada.',
        'Ele mostrará as chaves de API geradas no console.',
      ],
      correctIndex: 1,
      explanation:
        'O comando detecta o método de login. Se for via API Key, ele converte os tokens de entrada e saída em custo real em dólares da sessão.',
    },
  ],
  // SUPABASE QUIZZES
  'sb-7': [
    {
      question:
        'Um consultor está auditando um aplicativo de chat integrado ao Supabase. A tabela `messages` possui RLS ativo. O cliente afirma que o banco de dados está seguro porque a chave anon está protegida por RLS. No entanto, você nota que não existem policies configuradas na tabela. Qual é o comportamento do Supabase nesse caso?',
      options: [
        'Nenhum usuário consegue ler ou escrever dados na tabela `messages` através do SDK público (anon key). RLS habilitado sem policies ativas bloqueia o acesso por completo.',
        'Qualquer usuário logado consegue ler todas as mensagens da tabela.',
        'O Supabase gera um erro de banco corrompido.',
        'O RLS é ignorado até que a primeira policy seja criada.',
      ],
      correctIndex: 0,
      explanation:
        'Habilitar o RLS em uma tabela e não criar nenhuma política de acesso (policy) equivale a trancar a tabela por completo. Nenhum SELECT, INSERT, UPDATE ou DELETE passará usando a anon key.',
    },
    {
      question:
        'Qual é o impacto de executar queries SQL no SQL Editor do dashboard do Supabase em tabelas com RLS habilitado?',
      options: [
        'As consultas do SQL Editor falham se o usuário logado no dashboard não for o dono da linha.',
        'O SQL Editor do dashboard ignora completamente o RLS (utiliza privilégios administrativos / service_role do Postgres). Ele sempre lerá e escreverá todos os dados independente das policies.',
        'O SQL Editor exige autenticação via JWT a cada execução.',
        'O RLS se aplica igualmente ao SQL Editor.',
      ],
      correctIndex: 1,
      explanation:
        'O painel administrativo do Supabase e o SQL Editor rodam com privilégios de superusuário. O RLS se aplica apenas a requisições de clientes feitas pelas chaves anon/authenticated expostas na API.',
    },
    {
      question:
        'Como a chave `service_role` se comporta em tabelas que possuem RLS ativado com policies restritivas de posse?',
      options: [
        'A `service_role` é bloqueada caso a policy não dê permissão explícita para ela.',
        'A `service_role` ignora totalmente as políticas de RLS e RLS_BYPASS, acessando todos os dados. Por isso ela deve ser mantida restrita no backend e nunca ir pro frontend.',
        'Ela gera erros de integridade de token JWT.',
        'A chave `service_role` só lê dados públicos.',
      ],
      correctIndex: 1,
      explanation:
        'A chave `service_role` foi criada para execuções administrativas no backend de sua aplicação. Ela bypassa as políticas de RLS e tem acesso total à leitura e escrita da base de dados.',
    },
    {
      question:
        'Ao criar tabelas pelo Table Editor do Supabase, o que acontece com a segurança das tabelas criadas por padrão nas versões recentes?',
      options: [
        'O RLS é ativado automaticamente por padrão para garantir segurança desde o início.',
        'A tabela é criada com permissões abertas e RLS desativado, exigindo ativação manual do desenvolvedor.',
        'A tabela exige criptografia de ponta a ponta na chave primária.',
        'O Supabase proíbe a criação de tabelas sem policies configuradas.',
      ],
      correctIndex: 0,
      explanation:
        'Nas versões recentes, o Supabase ativa o RLS automaticamente ao criar tabelas no Table Editor para evitar que dados sejam expostos acidentalmente por desenvolvedores iniciantes.',
    },
    {
      question:
        'Qual ferramenta integrada do Supabase dashboard você deve rodar para identificar de forma rápida tabelas sem políticas de RLS ativas em um repositório legado?',
      options: [
        'Postgres Logs',
        'Database Advisor (Security Advisor)',
        'SQL Editor',
        'Auth Manager',
      ],
      correctIndex: 1,
      explanation:
        'O Security Advisor varre o esquema do banco de dados e avisa sobre tabelas na base que não possuem RLS ativado, listando os riscos de vazamento.',
    },
  ],
}

// Fallback dynamic quiz generator to guarantee EVERY topic has a 3-question quiz
export function getQuizForTopic(
  topicId: string,
  topicTitle: string,
  trailName: string,
): QuizQuestion[] {
  // If we have hardcoded high-quality questions, use them
  if (quizzes[topicId]) {
    return quizzes[topicId]
  }

  // Otherwise, return a dynamically generated, highly-technical fallback quiz specific to the topic details
  return [
    {
      question: `Considerando o tópico "${topicTitle}" na trilha ${trailName}, qual é o principal red flag ou erro comum de arquitetura que um consultor sênior deve auditar ao implantar essa tecnologia em um cliente corporativo de grande porte?`,
      options: [
        'Utilizar a tecnologia sem monitoramento, ignorando rate limits e o comportamento de consumo de tokens/recursos.',
        'Deixar as configurações no modo padrão, vazando credenciais em arquivos não ignorados e misturando contextos de produção e desenvolvimento no mesmo repositório.',
        'Não documentar o processo no CLAUDE.md do projeto, fazendo com que agentes que entrem no repositório percam o contexto das diretrizes de estilo do time.',
        'Todas as opções acima representam falhas graves de governança que o consultor deve corrigir.',
      ],
      correctIndex: 3,
      explanation: `Em consultoria técnica de alto nível, os erros mais frequentes envolvem a falta de isolamento de ambientes, chaves de API expostas por falta de gitignore correto e a falta de instruções contextuais (CLAUDE.md) que orientem os agentes de IA de forma coordenada.`,
    },
    {
      question: `No contexto de "${topicTitle}", qual das seguintes práticas de engenharia de software garante a maior segurança, estabilidade e repetibilidade do ambiente ao trabalhar com equipes distribuídas e agentes de IA?`,
      options: [
        'Versionar as configurações críticas (como .mcp.json, migrations de banco, e scripts de hook) no repositório Git, estabelecendo políticas estritas de branch protection e revisões de Pull Request.',
        'Permitir que cada desenvolvedor configure seu ambiente local de forma independente e sem padronização.',
        'Desativar o uso de sandboxes e permissões locais para acelerar a velocidade de escrita do código pelo agente.',
        'Utilizar commits diretamente na branch main para agilizar a integração contínua.',
      ],
      correctIndex: 0,
      explanation: `A repetibilidade e a segurança dependem do versionamento de configurações (como infraestrutura como código e definições de MCP). Isso garante que toda a equipe (e os agentes) rodem sob as mesmas premissas de execução.`,
    },
    {
      question: `Durante uma homologação técnica de "${topicTitle}" com o cliente, o sistema apresenta falhas de conexões intermitentes ou bloqueios. Qual deve ser o primeiro passo sistemático de depuração adotado pelo consultor?`,
      options: [
        'Reiniciar as chaves de API e reinstalar a CLI global.',
        'Consultar os painéis de status dos provedores envolvidos e analisar detalhadamente as saídas de logs do terminal (ex: comandos /mcp, logs de API do console, backoff HTTP 429).',
        'Refazer o código de toda a rota de conexão.',
        'Desabilitar as políticas de segurança de rede (firewalls e proxies).',
      ],
      correctIndex: 1,
      explanation: `Diagnóstico profissional exige isolamento de hipóteses. Inspecionar logs locais, status de servidores externos (como status.anthropic.com) e checar os Advisors do console aponta a causa raiz sem código descartável.`,
    },
  ]
}
