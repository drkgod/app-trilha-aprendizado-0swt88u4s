import type { Topic } from './types'

const xpMap = { alta: 30, media: 20, baixa: 10 }

export const supabaseTopics: Topic[] = [
  {
    id: 'sb-1',
    index: 1,
    title: 'Criar projeto no Supabase',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Setup inicial de projetos no Supabase e tour.',
    concept:
      'O Supabase é um backend-as-a-service que encapsula o banco relacional Postgres, serviços de autenticação, armazenamento de arquivos, realtime e edge functions. A criação inicial do projeto exige escolher a região correta (mais próxima dos usuários do cliente) e gerar uma senha forte para o banco de dados Postgres.',
    references: [
      {
        label: 'Supabase Getting Started',
        url: 'https://supabase.com/docs/guides/getting-started',
      },
    ],
    practiceSteps: [
      'Acesse o dashboard do Supabase e clique em "New Project".',
      'Defina as credenciais do banco e selecione a região correta.',
      'Explore as abas do painel lateral.',
    ],
    projectContext:
      'O setup inicial do projeto é a fundação dos MVPs dos nossos clientes. Certifique-se de que a senha do banco esteja salva em local seguro.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-2',
    index: 2,
    title: 'O que vem na caixa',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Análise dos serviços integrados do Supabase.',
    concept:
      'O ecossistema do Supabase entrega de forma integrada um banco de dados relacional Postgres completo com suporte a extensões (como pgvector), autenticação de usuários, buckets de armazenamento de mídia, suporte a conexões WebSocket em tempo real e orquestrador de Edge Functions.',
    references: [
      {
        label: 'Supabase Architecture Overview',
        url: 'https://supabase.com/docs/guides/architecture',
      },
    ],
    practiceSteps: [
      'Liste os 5 principais serviços do painel do Supabase.',
      'Documente quando indicar o uso de Supabase em vez de bancos tradicionais.',
      'Crie um pequeno guia de recomendação técnica.',
    ],
    projectContext:
      'Saber explicar as vantagens e desvantagens de adotar o Supabase no projeto é um diferencial técnico relevante da consultoria.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-3',
    index: 3,
    title: 'Tabelas: criação e relacionamentos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Modelagem de dados e integridade referencial.',
    concept:
      'Modelar o banco relacional exige desenhar tabelas estruturadas com chaves primárias (PK), e definir restrições e relacionamentos através de chaves estrangeiras (FK) para manter a integridade dos dados.',
    references: [
      {
        label: 'Supabase Database Guides',
        url: 'https://supabase.com/docs/guides/database/tables-and-rows',
      },
    ],
    practiceSteps: [
      'Crie uma tabela de usuários e uma de compras vinculando-as por chaves estrangeiras.',
      'Defina tipos de dados corretos e restrições de integridade.',
      'Teste a inserção de dados.',
    ],
    projectContext:
      'Modelagem de dados correta previne gargalos de processamento futuros e simplifica a escrita de policies de segurança no banco.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-4',
    index: 4,
    title: 'Keys: anon vs service_role',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Gerenciando as chaves de acesso com segurança.',
    concept:
      'O Supabase fornece chaves de acesso distintas: a chave pública (`anon`) é feita para rodar no frontend e suas ações são filtradas por regras de RLS. A chave de serviço (`service_role`) ignora qualquer política de segurança do RLS — ela é a chave-mestra e deve viver protegida no backend de forma restrita.',
    references: [
      {
        label: 'API Keys Security and Scopes',
        url: 'https://supabase.com/docs/guides/api#api-keys',
      },
    ],
    practiceSteps: [
      'Localize as chaves `anon` e `service_role` nas configurações da API do projeto.',
      'Faça requisições HTTP usando ambas as chaves e observe os retornos do banco.',
      'Configure chaves de acesso restrito no backend.',
    ],
    projectContext:
      'Vazamento da `service_role` em repositórios públicos ou no frontend compromete a base de dados inteira. Audite estes arquivos sistematicamente.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-5',
    index: 5,
    title: 'Conectar app ao Supabase',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Integrando o SDK JS do Supabase no front-end.',
    concept:
      'A integração com o frontend é feita chamando o SDK do Supabase. A inicialização do client exige a URL do projeto e a chave pública `anon`, que devem ser carregadas a partir de variáveis de ambiente seguras.',
    references: [
      {
        label: 'Supabase Client SDK for JavaScript',
        url: 'https://supabase.com/docs/reference/javascript/initializing',
      },
    ],
    practiceSteps: [
      'Instale o SDK executando `npm install @supabase/supabase-js`.',
      'Crie o arquivo de inicialização do client configurando as variáveis de ambiente.',
      'Realize uma query básica de listagem de dados.',
    ],
    projectContext:
      'Esta integração é a base operacional dos aplicativos. Garanta imports e tratamentos de erros adequados em todas as chamadas de rotas.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-6',
    index: 6,
    title: 'MCP do Supabase',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Conectando agentes ao banco via MCP.',
    concept:
      'O MCP oficial do Supabase conecta o Claude Code ou o Codex diretamente ao banco de dados do projeto, permitindo que o agente liste tabelas e execute queries SQL em modo de desenvolvimento.',
    references: [
      {
        label: 'Database MCP Server Guide',
        url: 'https://supabase.com/docs/guides/getting-started/mcp',
      },
    ],
    practiceSteps: [
      'Conecte o servidor MCP ao seu agente de IA.',
      'Ordene que o agente busque dados em uma tabela de testes.',
      'Revise a eficiência das chamadas realizadas.',
    ],
    projectContext:
      'Esta ferramenta acelera muito a auditoria de banco. Deixe o MCP do Supabase ativo nos setups de dev dos programadores.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-7',
    index: 7,
    title: 'RLS — conceito',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Row Level Security e segurança de tabelas.',
    concept:
      'O Row Level Security (RLS) é a funcionalidade de segurança de dados nativa do Postgres que avalia se a requisição de API atende a critérios específicos antes de liberar leitura ou escrita de linhas. Sem RLS ativo, qualquer usuário externo com a chave anon pode alterar a base de dados.',
    references: [
      {
        label: 'Supabase Row Level Security Guides',
        url: 'https://supabase.com/docs/guides/database/postgres/row-level-security',
      },
    ],
    practiceSteps: [
      'Ative o RLS em uma tabela no dashboard.',
      'Tente fazer requisições externas sem policies ativas e confirme o bloqueio.',
      'Documente os riscos de tabelas com RLS inativo.',
    ],
    projectContext:
      'A auditoria de RLS é a principal tarefa do consultor de backend. Nunca publique uma tabela em produção sem garantir RLS ativo e policies configuradas.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-8',
    index: 8,
    title: 'RLS — policies básicas',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Criando políticas de acesso robustas no RLS.',
    concept:
      'Definir as regras do RLS envolve criar políticas de acesso comparando identidades como `auth.uid()` com colunas de posse da linha, isolando o acesso aos dados para que cada usuário possa ver e editar apenas as suas próprias informações.',
    references: [
      {
        label: 'Writing Postgres Policies',
        url: 'https://supabase.com/docs/guides/database/postgres/row-level-security#writing-policies',
      },
    ],
    practiceSteps: [
      'Crie policies de posse para leitura e inserção de dados.',
      'Crie 2 usuários e verifique se o isolamento funciona no app.',
      'Escreva policies para papéis especiais (ex: admin).',
    ],
    projectContext:
      'Mapeie as regras de posse de todas as tabelas em conjunto com o setor de produto para criar policies precisas.',
    xp: xpMap.alta,
  },
  {
    id: 'sb-9',
    index: 9,
    title: 'Auth e-mail/senha',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Setup do login básico de e-mail e templates.',
    concept:
      'O Supabase gerencia fluxos completos de login por e-mail e senha, disparando confirmações, e-mails de recuperação e renovações de sessões de forma integrada. Os templates destes e-mails de sistema podem ser customizados.',
    references: [
      {
        label: 'Email Password Authentication',
        url: 'https://supabase.com/docs/guides/auth/auth-email',
      },
    ],
    practiceSteps: [
      'Implemente a rota de signup e login no app de testes.',
      'Personalize os templates de e-mail no dashboard.',
      'Teste a redefinição de senhas.',
    ],
    projectContext:
      'Configurar o login básico é a primeira funcionalidade entregue ao cliente. Personalizar os e-mails com a logo do cliente traz profissionalismo imediato.',
    xp: xpMap.media,
  },
  {
    id: 'sb-10',
    index: 10,
    title: 'Auth OAuth',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Configurando provedores de login externos (OAuth).',
    concept:
      'Habilitar login social (como Google ou GitHub) envolve registrar a aplicação nos respectivos consoles de desenvolvedores e cadastrar as redirect URLs de forma precisa nas chaves de faturamento do provedor.',
    references: [
      {
        label: 'Social Login / OAuth Setup',
        url: 'https://supabase.com/docs/guides/auth/social-login',
      },
    ],
    practiceSteps: [
      'Gere credenciais de OAuth no console do Google Cloud.',
      'Configure o provedor do Google nas chaves de Auth do Supabase.',
      'Configure as redirect URLs de localhost e produção.',
    ],
    projectContext:
      'O bug número 1 do go-live de OAuth é esquecer de cadastrar o domínio de produção nas redirect URLs autorizadas. Evite esse erro testando antes.',
    xp: xpMap.media,
  },
  {
    id: 'sb-11',
    index: 11,
    title: 'Sessões e JWT',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Compreendendo o funcionamento de tokens de sessão.',
    concept:
      'Após o login, o Supabase emite tokens JWT contendo a identidade do usuário. Esses tokens possuem tempo de expiração curto para segurança e são renovados automaticamente pelo client via tokens de refresh.',
    references: [
      {
        label: 'Understanding Session Tokens & JWTs',
        url: 'https://supabase.com/docs/guides/auth/sessions',
      },
    ],
    practiceSteps: [
      'Inspecione os cookies de sessão salvos no localStorage do navegador.',
      'Decodifique um token JWT de teste e verifique seus dados.',
      'Monitore o fluxo de refresh automático da sessão.',
    ],
    projectContext:
      'Quedas inesperadas de login costumam ser causadas por relógios locais desregulados ou configurações de expiração mal calibradas. Saiba investigar.',
    xp: xpMap.media,
  },
  {
    id: 'sb-12',
    index: 12,
    title: 'Migrations',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Versionamento do esquema do banco Postgres.',
    concept:
      'Alterar a estrutura do banco Postgres diretamente em produção causa inconsistências. Utilizar a CLI do Supabase para criar e versionar migrations locais e aplicar db push assegura repositórios reproduzíveis.',
    references: [
      {
        label: 'Database Migrations and CLI',
        url: 'https://supabase.com/docs/guides/cli/local-development',
      },
    ],
    practiceSteps: [
      'Instale a CLI localmente.',
      'Inicie a pasta do projeto e gere a primeira migration local.',
      'Faça push das alterações estruturais.',
    ],
    projectContext:
      'Padronize o versionamento do banco via migrations no projeto do cliente. Isso impede modificações ocultas e quebras no deploy final.',
    xp: xpMap.media,
  },
  {
    id: 'sb-13',
    index: 13,
    title: 'Branches de desenvolvimento',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Criação de branches de banco isolados.',
    concept:
      'O Supabase suporta a criação de branches de banco de dados vinculados a repositórios Git, permitindo testar novos esquemas e tabelas de forma isolada antes do merge na branch de produção.',
    references: [
      {
        label: 'Database Branching Guide',
        url: 'https://supabase.com/docs/guides/platform/branching',
      },
    ],
    practiceSteps: [
      'Crie um branch do Supabase associado a uma branch de desenvolvimento.',
      'Faça alterações de schema no banco de testes.',
      'Realize o merge e verifique o push das alterações.',
    ],
    projectContext:
      'Esta é a prática de engenharia padrão em equipes de desenvolvimento maduras, impedindo que testes corrompam a base ativa de usuários.',
    xp: xpMap.media,
  },
  {
    id: 'sb-14',
    index: 14,
    title: 'Storage',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Upload e segurança de mídias e buckets.',
    concept:
      'O serviço de Storage permite hospedar arquivos de mídia (imagens, PDFs, zips) em buckets dedicados. Os buckets podem ser configurados como públicos (acesso livre por URL direta) ou privados (acesso concedido via policies de RLS específicas).',
    references: [
      { label: 'Supabase Storage Reference', url: 'https://supabase.com/docs/guides/storage' },
    ],
    practiceSteps: [
      'Crie um bucket público e um privado no Storage.',
      'Implemente a rota de upload de fotos de perfil no app.',
      'Configure policies RLS restringindo quem pode deletar arquivos do bucket.',
    ],
    projectContext:
      'Deixar buckets privados desprotegidos expõe dados sensíveis de clientes. Certifique-se de aplicar regras de RLS para buckets contendo documentos sigilosos.',
    xp: xpMap.media,
  },
  {
    id: 'sb-15',
    index: 15,
    title: 'SQL na prática',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Consultas, joins e criação de views no Postgres.',
    concept:
      'Dominar a sintaxe básica de SQL é necessário ao auditar o banco Postgres, permitindo criar joins eficientes, views consolidadas de dados e depurar queries ineficientes sem depender exclusivamente dos prompts de IA.',
    references: [
      {
        label: 'SQL Basics in Supabase',
        url: 'https://supabase.com/docs/guides/database/postgres/sql-basics',
      },
    ],
    practiceSteps: [
      'Escreva um script contendo joins entre 3 tabelas relacionadas.',
      'Crie uma View consolidada de métricas de vendas no SQL Editor.',
      'Teste a View no dashboard.',
    ],
    projectContext:
      'Criar Views otimiza a listagem de painéis de métricas do cliente, acelerando a velocidade do app e poupando requisições no front.',
    xp: xpMap.media,
  },
  {
    id: 'sb-16',
    index: 16,
    title: 'Logs e debugging',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Auditoria de erros de API e Postgres.',
    concept:
      'A aba de Logs e advisors do painel do Supabase compila chamadas de APIs falhas, Advisors de segurança de chaves, Advisor de performance Postgres e logs de Auth, servindo como o ponto de partida ideal para solucionar erros de permissões.',
    references: [
      {
        label: 'Debugging and Database Logs',
        url: 'https://supabase.com/docs/guides/platform/logging',
      },
    ],
    practiceSteps: [
      'Acesse os logs da API e simule requisições malformadas.',
      'Identifique os erros de tratamento nos Advisors do painel.',
      'Siga as sugestões de indexação indicadas.',
    ],
    projectContext:
      'Utilize os logs de API para rastrear instâncias com alta latência nos apps de produção dos clientes.',
    xp: xpMap.media,
  },
  {
    id: 'sb-17',
    index: 17,
    title: 'Edge Functions',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Lógica serverless na borda da aplicação.',
    concept:
      'As Edge Functions do Supabase rodam scripts em Deno de forma serverless, ideais para lógicas de backend que não devem rodar no front-end, como processamento de pagamentos com Stripe ou webhooks externos.',
    references: [
      { label: 'Edge Functions Documentation', url: 'https://supabase.com/docs/guides/functions' },
    ],
    practiceSteps: [
      'Instale a CLI e crie uma Edge Function simples em TypeScript.',
      'Faça o deploy da function no projeto do Supabase.',
      'Chame a function a partir de um endpoint do app.',
    ],
    projectContext:
      'Edges Functions resolvem a necessidade de backend próprio em MVPs, reduzindo custos de infra e acelerando entregas.',
    xp: xpMap.baixa,
  },
  {
    id: 'sb-18',
    index: 18,
    title: 'Realtime',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Sincronização em tempo real de tabelas e canais.',
    concept:
      'O serviço de Realtime possibilita escutar atualizações de tabelas específicas no banco e disparar atualizações instantâneas no front-end via canais de WebSocket, ideal para chats ou painéis ao vivo.',
    references: [
      { label: 'Supabase Realtime Quickstart', url: 'https://supabase.com/docs/guides/realtime' },
    ],
    practiceSteps: [
      'Ative o recurso de Realtime em uma tabela do banco.',
      'Subscreva o canal no app front-end usando o client JS.',
      'Atualize uma linha e verifique a renderização síncrona dos dados.',
    ],
    projectContext:
      'Esta funcionalidade viabiliza a criação de painéis operacionais dinâmicos para monitoramento de processos de equipes no cliente.',
    xp: xpMap.baixa,
  },
  {
    id: 'sb-19',
    index: 19,
    title: 'Limites do plano Free',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Gargalos e cotas do plano gratuito.',
    concept:
      'O plano gratuito possui restrições como pausa do banco após uma semana de inatividade, limites baixos de armazenamento (500MB) e de tráfego de dados (2GB/mês).',
    references: [{ label: 'Free Tier Limits and Overages', url: 'https://supabase.com/pricing' }],
    practiceSteps: [
      'Documente todos os limites do plano gratuito.',
      'Prepare um guia indicando os gatilhos e alertas de upgrade.',
      'Compartilhe a documentação.',
    ],
    projectContext:
      'Evite incidentes de interrupção de apps de clientes informando-os sobre a pausa automática de inatividade do plano gratuito antecipadamente.',
    xp: xpMap.baixa,
  },
  {
    id: 'sb-20',
    index: 20,
    title: 'Backup e restore',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Plano de contingência e restauração do banco.',
    concept:
      'Manter rotinas de backups ativas e dominar as ferramentas de restauração (Point-in-Time Recovery) garante a integridade dos dados e continuidade operacional do cliente frente a deleções acidentais.',
    references: [
      {
        label: 'Database Backups and Point-in-Time Recovery',
        url: 'https://supabase.com/docs/guides/platform/backups',
      },
    ],
    practiceSteps: [
      'Localize a aba de backups no console do projeto.',
      'Simule a exclusão de uma linha de teste e elabore um passo a passo de restauração.',
      'Valide a consistência dos dados recuperados.',
    ],
    projectContext:
      'Desenvolver a política de contingência e treinar os consultores de infraestrutura protege o cliente contra eventuais falhas operacionais críticas.',
    xp: xpMap.baixa,
  },
]
