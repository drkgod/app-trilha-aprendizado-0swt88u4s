import type { Topic } from './types'

const SB = 'https://supabase.com/docs'

export const supabaseTopics: Topic[] = [
  {
    id: 'sb-1',
    index: 1,
    title: 'Criar projeto: org, região e a senha do banco',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'O setup inicial certo — e por que a região importa.',
    concept:
      'Um projeto Supabase nasce numa organização (o agrupador de billing e membros): escolhe-se nome, senha do banco Postgres (guarde num gerenciador — ela não aparece de novo e é a chave da conexão direta) e REGIÃO. A região é a decisão que não muda depois sem migração: escolha perto dos usuários (São Paulo para clientes brasileiros) — latência de banco multiplica em toda requisição. Minutos depois o projeto está de pé com URL própria e o dashboard completo. Para consultoria: um projeto por ambiente (dev/prod no mínimo) e organizações separadas por cliente.',
    deepDive: [
      'A org define o plano (Free/Pro/Team) — projetos herdam; misturar clientes numa org mistura billing e acesso.',
      'A senha do banco ≠ keys de API: ela dá acesso Postgres direto (psql, ferramentas de BI, migrações via CLI).',
      'Naming disciplinado desde o início: cliente-app-dev, cliente-app-prod — o dashboard com 20 projetos agradece.',
    ],
    pitfalls: [
      'Região US para usuários BR — 150ms de latência gratuita em cada query, para sempre.',
      'Perder a senha do banco e descobrir na hora da primeira migração via CLI (dá para resetar, mas quebra o que a usava).',
    ],
    practiceSteps: [
      'Crie um projeto de estudo na região certa e salve a senha no gerenciador do time.',
      'Explore o dashboard inteiro por 15 minutos antes de criar qualquer coisa.',
    ],
    projectContext:
      'O padrão org-por-cliente + projeto-por-ambiente é a estrutura que a consultoria replica em toda implantação.',
    references: [
      { label: 'Docs — primeiros passos', url: SB + '/guides/getting-started', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'sb-2',
    index: 2,
    title: 'O que vem na caixa: o mapa do dashboard',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Database, Auth, Storage, Edge Functions, Realtime — o tour de reconhecimento.',
    concept:
      'Supabase é um Postgres gerenciado vestido de plataforma completa: Database (o Postgres real, com Table Editor visual e SQL Editor), Auth (usuários, logins sociais, sessões), Storage (arquivos em buckets), Edge Functions (código serverless em Deno/TypeScript), Realtime (mudanças do banco por websocket) e os acessórios de operação (Logs, Advisors, API auto-gerada). O insight central para arquitetura: TUDO orbita o Postgres — Auth grava em auth.users, Storage indexa em tabelas, Realtime escuta o WAL do banco. Quem entende Postgres entende Supabase; quem ignora isso trata a plataforma como caixa-preta e sofre.',
    deepDive: [
      'A API REST é auto-gerada das tabelas (PostgREST): criou a tabela, nasceu o endpoint — com filtros, ordenação e joins via query string.',
      'O SQL Editor roda qualquer SQL — a válvula de escape para tudo que a UI não faz; salve queries úteis como snippets.',
      'Free tier generoso para dev/protótipo; a fronteira para Pro aparece em produção (sem pausa, backups, mais recursos).',
    ],
    pitfalls: [
      'Tratar Supabase como "um Firebase" e ignorar que o poder está no Postgres subjacente.',
      'Construir lógica de negócio inteira no frontend porque "a API já existe" — RLS e functions existem para isso.',
    ],
    practiceSteps: [
      'Percorra cada seção do dashboard e escreva 1 linha sobre o que cada uma faz.',
      'Crie uma tabela no Table Editor e consulte-a pela API REST auto-gerada.',
    ],
    projectContext:
      'O pitch de stack para cliente: banco sério + auth + storage + serverless num produto só, com free tier para validar — o argumento de velocidade da consultoria.',
    references: [
      {
        label: 'Docs — visão geral',
        url: SB + '/guides/getting-started/architecture',
        kind: 'doc',
      },
      { label: 'Docs — API auto-gerada', url: SB + '/guides/api', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'sb-3',
    index: 3,
    title: 'Tabelas, tipos e relações',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Table Editor vs SQL, primary keys, foreign keys e o modelo relacional mínimo.',
    concept:
      'Modelagem é onde o projeto ganha ou perde: cada tabela com primary key (o padrão id uuid default gen_random_uuid() serve 95% dos casos), tipos corretos (text, numeric, boolean, timestamptz — SEMPRE timestamptz para datas, nunca timestamp sem fuso), e relações via foreign keys (pedido.cliente_id REFERENCES clientes(id)) — que garantem integridade no banco, não na boa vontade do código. O Table Editor visual serve para começar; SQL (via editor ou migração) é o caminho profissional porque é versionável e reproduzível. Convenções que pagam: snake_case, nomes no plural, created_at/updated_at em tudo.',
    deepDive: [
      'Foreign key com ON DELETE definido conscientemente: cascade (apaga junto), restrict (impede), set null — cada um é uma decisão de negócio.',
      'Índices nas colunas de busca frequente e nas FKs — a diferença entre 5ms e 500ms quando a tabela cresce.',
      'O gerador de tipos (supabase gen types typescript) transforma o schema em tipos TS — o contrato banco↔frontend sincronizado.',
    ],
    pitfalls: [
      'Modelar tudo em uma tabela gigante com colunas JSON — o Postgres é relacional; use-o.',
      'timestamp sem fuso e o bug de 3 horas que aparece em produção.',
    ],
    practiceSteps: [
      'Modele um mini-CRM (clientes, projetos, tarefas) com FKs e ON DELETE explícito.',
      'Gere os tipos TypeScript do schema e importe num projeto.',
    ],
    projectContext:
      'O schema bem modelado é a fundação de todo app que a consultoria entrega — e agentes escrevem código muito melhor sobre schemas limpos e tipados.',
    references: [
      { label: 'Docs — tabelas e dados', url: SB + '/guides/database/tables', kind: 'doc' },
      { label: 'Docs — gerar tipos', url: SB + '/guides/api/rest/generating-types', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'sb-4',
    index: 4,
    title: 'Keys e segurança: anon vs service_role',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'A diferença que evita o vazamento clássico — e onde cada key pode viver.',
    concept:
      'Duas chaves, dois mundos: a anon key (publishable) é PÚBLICA por design — vai no frontend, e toda requisição com ela passa pelo RLS (as policies decidem o que cada usuário vê); a service_role key (secret) IGNORA RLS completamente — acesso total ao banco, e por isso só pode existir em ambiente servidor (Edge Functions, backend, CI), jamais em código que chega ao navegador. O vazamento clássico e devastador: service_role num arquivo do frontend, bundlada, pública — banco inteiro exposto. A regra de bolso: anon = navegador ok; service_role = servidor, ponto.',
    deepDive: [
      'A anon key ser pública não é falha: a segurança do modelo Supabase VEM do RLS — a key só identifica o projeto.',
      'Nomenclatura nova: publishable e secret keys (substituindo anon/service_role) — mesmo modelo, nomes mais claros; rotação disponível no dashboard.',
      'Vazou service_role: rotacionar a key no dashboard AGORA (mesmo protocolo do segredo no Git — revogar primeiro).',
    ],
    pitfalls: [
      'SUPABASE_SERVICE_ROLE_KEY em variável NEXT_PUBLIC_/VITE_ — o prefixo público manda para o bundle.',
      'Usar service_role no backend para "simplificar" e desligar na prática toda a camada RLS.',
    ],
    practiceSteps: [
      'Localize as duas keys no dashboard e teste: mesma query com anon (bloqueada por RLS) e service_role (passa).',
      'Audite um projeto existente: onde cada key vive? Alguma no lugar errado?',
    ],
    projectContext:
      'A auditoria de keys é item de checklist em todo projeto herdado — e o erro é comum o bastante para ser a primeira coisa a checar.',
    references: [{ label: 'Docs — API keys', url: SB + '/guides/api/api-keys', kind: 'doc' }],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'sb-5',
    index: 5,
    title: 'Conectar o app: o cliente supabase-js',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'createClient, variáveis de ambiente e o CRUD básico do dia a dia.',
    concept:
      'A ponte app↔Supabase: npm install @supabase/supabase-js, createClient(url, anonKey) com os valores vindos de variáveis de ambiente (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY no Vite), e o cliente único exportado de um módulo (src/lib/supabase.ts) para o app inteiro importar. O CRUD é fluente: supabase.from("tarefas").select("*").eq("status", "aberta"), .insert(), .update().eq(), .delete().eq() — cada chamada retorna { data, error } e TRATAR o error é obrigatório (o padrão silencioso de ignorá-lo é a fonte nº 1 de "não funciona e não sei por quê").',
    deepDive: [
      'select com joins: .select("*, cliente:clientes(nome)") traz a relação junto — a FK vira join automático.',
      'O cliente gerencia a sessão do usuário automaticamente (token no localStorage, refresh) — auth e dados no mesmo objeto.',
      'Com os tipos gerados (Database), createClient<Database> dá autocomplete e erro de compilação para coluna errada — use sempre.',
    ],
    pitfalls: [
      'Instanciar createClient em cada componente — múltiplos clientes, múltiplos problemas de sessão.',
      'Ignorar o error do retorno e debugar às cegas.',
    ],
    practiceSteps: [
      'Monte o módulo cliente + .env e rode o CRUD completo numa tabela de teste.',
      'Provoque um erro (tabela inexistente) e implemente o tratamento correto.',
    ],
    projectContext:
      'Este é o esqueleto de conexão de todo app entregue — padronizado num template, vira o ponto de partida de qualquer projeto novo.',
    references: [
      {
        label: 'Docs — JavaScript client',
        url: SB + '/reference/javascript/introduction',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'sb-6',
    index: 6,
    title: 'MCP do Supabase: o agente falando com o banco',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Conectar Claude Code/Codex ao projeto, modo read-only e o que liberar.',
    concept:
      'O servidor MCP oficial do Supabase conecta agentes ao projeto: listar tabelas e schemas, executar SQL, aplicar migrações, ler logs e advisors, gerenciar branches — o agente passa a ENXERGAR o banco real em vez de adivinhar o schema. A configuração vai no cliente MCP (Claude Code, Codex, Cursor) com autenticação por token, e o ajuste que define a segurança: o modo read-only e o escopo por projeto. A postura profissional: read-only por padrão (o agente consulta schema e dados para escrever código correto), escrita habilitada conscientemente para sessões de migração — e NUNCA apontado para produção com escrita em sessão exploratória.',
    deepDive: [
      'O ganho imediato: "olhe o schema real e escreva a query" elimina a categoria inteira de código que assume colunas que não existem.',
      'Combine com logs/advisors via MCP: "por que essa query está lenta?" com o agente lendo os dados reais de performance.',
      'Prompt injection vale aqui: dados do banco lidos pelo agente podem conter texto malicioso — mais um argumento para read-only por padrão.',
    ],
    pitfalls: [
      'MCP com escrita apontado para produção numa sessão casual de exploração.',
      'Dar ao agente o token da org inteira quando o projeto de teste bastava.',
    ],
    practiceSteps: [
      'Configure o MCP no seu agente em modo read-only e peça um mapa do schema.',
      'Numa sessão dedicada, habilite escrita e aplique uma migração simples via agente.',
    ],
    projectContext:
      'Agente + MCP read-only do banco do cliente é o setup padrão de desenvolvimento da consultoria — velocidade com trilho de segurança.',
    references: [
      { label: 'Docs — Supabase MCP', url: SB + '/guides/getting-started/mcp', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'sb-7',
    index: 7,
    title: 'RLS: o conceito que define a segurança',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Row Level Security — por que a anon key pública não é um problema.',
    concept:
      'Row Level Security é o Postgres filtrando LINHAS por regra: com RLS habilitado numa tabela, nenhuma linha sai (ou entra) sem que uma policy permita — e a decisão acontece NO BANCO, a última camada, impossível de contornar por frontend malicioso, curl direto ou bug de UI. É isso que torna o modelo Supabase seguro com a anon key pública: a key identifica o projeto; QUEM PODE O QUÊ é decidido pelo RLS por usuário autenticado. A mentalidade correta: RLS habilitado em TODA tabela do schema público desde a criação (tabela sem RLS + API auto-gerada = dados públicos na internet), com policies liberando o mínimo necessário.',
    deepDive: [
      'Deny by default: RLS ligado sem policies = ninguém acessa nada — o ponto de partida seguro; as policies ABREM acessos.',
      'O Security Advisor do dashboard aponta tabelas expostas sem RLS — cheque após cada migração.',
      'RLS vale para a API auto-gerada e conexões com anon/authenticated; service_role e conexão direta de admin passam por cima — por isso a disciplina de onde cada key vive.',
    ],
    pitfalls: [
      'Criar tabela via SQL e esquecer o ALTER TABLE ... ENABLE ROW LEVEL SECURITY — o Table Editor liga por padrão, o SQL cru não.',
      'Confiar a segurança ao frontend ("o app não mostra") — o endpoint REST existe independente do app.',
    ],
    practiceSteps: [
      'Crie uma tabela sem RLS e acesse-a via curl com a anon key — sinta o problema.',
      'Habilite RLS e observe o acesso morrer; entenda o deny by default.',
    ],
    projectContext:
      'RLS é a resposta técnica de vocês para "os dados de cada cliente ficam isolados?" — a pergunta central de qualquer app multi-tenant.',
    references: [
      {
        label: 'Docs — Row Level Security',
        url: SB + '/guides/database/postgres/row-level-security',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'sb-8',
    index: 8,
    title: 'Policies na prática: auth.uid() e os 4 verbos',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Escrever policies de select/insert/update/delete — "cada um vê só o seu".',
    concept:
      'Policy é a regra SQL que abre o RLS: CREATE POLICY "own rows" ON tarefas FOR SELECT USING (auth.uid() = user_id) — a função auth.uid() retorna o id do usuário logado (do JWT da requisição), e a comparação com a coluna user_id implementa o padrão universal "cada um vê só o seu". Os 4 verbos têm anatomias próprias: SELECT e DELETE usam USING (filtra o que existe); INSERT usa WITH CHECK (valida o que entra); UPDATE usa os dois (o que pode tocar + como pode ficar). O conjunto completo dos 4, tabela a tabela, é o trabalho real de segurança do app.',
    deepDive: [
      'user_id uuid default auth.uid() na tabela fecha o ciclo: o insert nem precisa mandar o campo e a policy garante a posse.',
      'Papéis além do dono: policies com subquery em tabela de membros (EXISTS (SELECT 1 FROM projeto_membros WHERE ...)) implementam times e permissões — envolva em function security definer para performance e clareza.',
      'Teste policies com usuários reais de teste (impersonation no dashboard ajuda) — policy não testada é policy quebrada.',
    ],
    pitfalls: [
      'UPDATE só com USING e sem WITH CHECK — o usuário edita a própria linha… transferindo-a para outro user_id.',
      'Policy com subquery pesada sem índice rodando em toda linha de toda query.',
    ],
    practiceSteps: [
      'Escreva o conjunto completo (4 verbos) para uma tabela de tarefas pessoais.',
      'Teste com dois usuários: cada um enxerga e edita SÓ o seu.',
      'Implemente o padrão time/membros com a subquery de pertencimento.',
    ],
    projectContext:
      'O par RLS+policies bem escrito é o que a consultoria audita primeiro em app herdado — e o que garante nos apps que entrega.',
    references: [
      {
        label: 'Docs — policies',
        url: SB + '/guides/database/postgres/row-level-security',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 40,
  },
  {
    id: 'sb-9',
    index: 9,
    title: 'Auth: e-mail/senha e o fluxo de sessão',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'signUp, signIn, confirmação por e-mail e proteger rotas no frontend.',
    concept:
      'O Auth do Supabase entrega o ciclo completo: supabase.auth.signUp({email, password}) cria o usuário (com e-mail de confirmação, se habilitado), signInWithPassword() autentica, signOut() encerra, e onAuthStateChange() é o listener que mantém o app sincronizado com a sessão (o padrão do hook use-auth: guarda o user no estado, mostra login quando null). Usuários vivem em auth.users — que se conecta ao resto do banco via user_id nas suas tabelas + RLS. Rotas protegidas no frontend são UX (redirecionar quem não logou); a SEGURANÇA real é o RLS no banco.',
    deepDive: [
      'O fluxo de confirmação de e-mail e o de reset de senha têm URLs de redirect configuráveis — os templates de e-mail também (com SMTP próprio em produção).',
      'A sessão é JWT + refresh token gerenciados pelo cliente; o JWT expira e renova sozinho — você raramente toca nisso, mas saber explica os "deslogou do nada" (refresh falhou).',
      'Perfis públicos: a tabela profiles espelhando auth.users (criada por trigger no signup) é o padrão para dados de usuário que o app mostra.',
    ],
    pitfalls: [
      'Testar signup em dev sem configurar o redirect e o link de confirmação apontar para localhost errado.',
      'Achar que esconder o botão no frontend protege a rota — sem RLS, o dado continua acessível via API.',
    ],
    practiceSteps: [
      'Implemente o fluxo completo: signup, confirmação, login, logout, sessão persistida no reload.',
      'Crie a tabela profiles com trigger de criação automática no signup.',
    ],
    projectContext:
      'Auth pronto e seguro em horas (não semanas) é um dos maiores argumentos de velocidade do stack que a consultoria propõe.',
    references: [
      { label: 'Docs — Auth', url: SB + '/guides/auth', kind: 'doc' },
      { label: 'Docs — auth com senha', url: SB + '/guides/auth/passwords', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'sb-10',
    index: 10,
    title: 'OAuth: login social e as redirect URLs',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Google/GitHub login e a configuração de URLs que sempre erra na primeira.',
    concept:
      'Login social = signInWithOAuth({provider: "google"}) no código + configuração em dois lugares: no PROVEDOR (criar o OAuth app no console do Google/GitHub, obter client id/secret, registrar a callback do Supabase — https://SEU-PROJETO.supabase.co/auth/v1/callback) e no SUPABASE (colar as credenciais, habilitar o provedor, e configurar Site URL + Redirect URLs permitidas — para onde o usuário pode voltar depois do login). O erro universal da primeira vez: redirect_uri_mismatch ou volta para localhost em produção — sempre alguma URL faltando em uma das duas pontas. Checklist de URLs por ambiente (dev, preview, prod) resolve.',
    deepDive: [
      'A allowlist de Redirect URLs do Supabase aceita wildcards para previews (https://*-projeto.vercel.app) — o que faz deploy previews funcionarem.',
      'Múltiplos provedores com o mesmo e-mail: entenda a política de linking de contas do projeto para evitar usuários duplicados.',
      'O fluxo PKCE é o padrão atual dos SDKs — relevante saber o nome quando o cliente pergunta de segurança do fluxo.',
    ],
    pitfalls: [
      'Configurar só localhost e descobrir em produção que o login social morre.',
      'Client secret do provedor commitado no repo (é secret de servidor — vive só no dashboard).',
    ],
    practiceSteps: [
      'Configure login com Google do zero, documentando cada URL das duas pontas.',
      'Monte o checklist de URLs por ambiente para replicar em projetos de cliente.',
    ],
    projectContext:
      'Login social é requisito de quase todo app B2C entregue — e a configuração documentada transforma 2 horas de tentativa e erro em 15 minutos de checklist.',
    references: [
      { label: 'Docs — social login', url: SB + '/guides/auth/social-login', kind: 'doc' },
      { label: 'Docs — redirect URLs', url: SB + '/guides/auth/redirect-urls', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'sb-11',
    index: 11,
    title: 'Migrations e o CLI: schema versionado',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'supabase migration new, db push e o fim do "mudei na mão no dashboard".',
    concept:
      'Mudança de schema clicada no dashboard funciona — e não deixa rastro, não replica em outro ambiente e não passa por revisão. O caminho profissional é o CLI: supabase migration new nome-da-mudanca cria um arquivo SQL timestampado em supabase/migrations/, você escreve o DDL (CREATE TABLE, ALTER, policies…), e supabase db push aplica no projeto remoto — com o histórico de migrações rastreado. O schema vira código: versionado no Git, revisado em PR, aplicado igual em dev/staging/prod. Com supabase link conectando a pasta local ao projeto, e supabase db diff gerando a migração a partir de mudanças experimentais, o ciclo fecha.',
    deepDive: [
      'Migrações são só-para-frente por disciplina: corrigir = nova migração (não editar a antiga já aplicada — o histórico é imutável).',
      'Policies e functions TAMBÉM vão em migração — segurança versionada e revisável, não configuração perdida no dashboard.',
      'O fluxo com agente: MCP em modo escrita + "crie a migração para X" = o agente escreve o SQL no padrão do projeto; você revisa o arquivo antes do push.',
    ],
    pitfalls: [
      'Metade do schema no dashboard, metade em migração — ambientes divergem e ninguém sabe o estado real.',
      'Editar migração já aplicada e quebrar a sincronia do histórico.',
    ],
    practiceSteps: [
      'Instale o CLI, faça link com o projeto de estudo e aplique 2 migrações reais.',
      'Recrie o projeto do zero só com as migrações — a prova de reprodutibilidade.',
    ],
    projectContext:
      'Schema como código é padrão inegociável nos projetos da consultoria — é o que permite os ambientes dev/prod idênticos e o handover limpo.',
    references: [
      {
        label: 'Docs — migrations',
        url: SB + '/guides/deployment/database-migrations',
        kind: 'doc',
      },
      {
        label: 'Docs — CLI',
        url: SB + '/guides/local-development/cli/getting-started',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'sb-12',
    index: 12,
    title: 'Branches de desenvolvimento',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Testar migração destrutiva sem medo — o banco com branch igual Git.',
    concept:
      'Branching do Supabase cria AMBIENTES paralelos do projeto: uma branch de desenvolvimento tem banco próprio (com as migrações aplicadas), auth próprio e URL própria — você testa a migração perigosa, o refactor de policies ou a feature nova num clone isolado, e faz merge para produção quando validado (as migrações da branch são aplicadas no principal). O pareamento natural com o Git: branch de código ↔ branch de banco, inclusive com integração automática em PRs (preview branches). Para o cenário "essa migração DROP COLUMN me assusta": branch, testa, valida, merge — medo resolvido por processo.',
    deepDive: [
      'Branch nasce do estado das MIGRAÇÕES (mais seed opcional) — mais um motivo para o schema inteiro viver em migração.',
      'Custo: branches são recurso de plano pago e cobram por hora ativa — crie para o ciclo de trabalho, delete ao mergear.',
      'Via MCP, agentes criam/gerenciam branches — o fluxo "crie uma branch, aplique a migração, rode os testes" inteiro delegável.',
    ],
    pitfalls: [
      'Testar migração destrutiva direto em produção porque "era simples".',
      'Branches esquecidas ativas acumulando custo por semanas.',
    ],
    practiceSteps: [
      'Crie uma branch, aplique uma migração que altera estrutura, valide e mergeie.',
      'Simule o desastre: uma migração ruim na branch — e o quão barato foi errar ali.',
    ],
    projectContext:
      'Branch de banco antes de migração arriscada vira regra do playbook — e é a resposta ao cliente traumatizado por "mudança no banco que derrubou o sistema".',
    references: [
      { label: 'Docs — branching', url: SB + '/guides/deployment/branching', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'sb-13',
    index: 13,
    title: 'Storage: buckets, uploads e policies de arquivo',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Bucket público vs privado, upload do frontend e URLs assinadas.',
    concept:
      'O Storage organiza arquivos em buckets: público (qualquer um com a URL lê — avatares, imagens de catálogo) ou privado (todo acesso passa por policies — documentos, contratos, uploads de usuário). Upload direto do frontend: supabase.storage.from("bucket").upload(path, file); leitura em bucket privado via createSignedUrl(path, expiraEmSegundos) — a URL temporária que você entrega ao usuário autorizado. As policies de storage são RLS sobre a tabela storage.objects — mesma mentalidade das tabelas: quem pode subir onde, quem pode ler o quê, tipicamente amarrando o path ao auth.uid() (arquivos do usuário na "pasta" dele: user_id/arquivo.pdf).',
    deepDive: [
      'O padrão de path por dono: policy checando (storage.foldername(name))[1] = auth.uid()::text — cada usuário confinado à sua pasta.',
      'Transformações de imagem on-the-fly (resize por parâmetro de URL) evitam pipeline próprio de thumbnails.',
      'Limites de tamanho de upload e tipos MIME restritos por bucket — configure antes que o primeiro usuário suba um .exe de 2GB.',
    ],
    pitfalls: [
      'Documento sensível em bucket público "porque a URL é difícil de adivinhar" — URL pública é pública.',
      'Esquecer policies de INSERT no bucket privado e o upload falhar silenciosamente para usuários.',
    ],
    practiceSteps: [
      'Crie os dois tipos de bucket; suba e leia arquivos em cada um (signed URL no privado).',
      'Implemente o padrão pasta-por-usuário com as policies correspondentes.',
    ],
    projectContext:
      'Upload de documentos com acesso controlado aparece em quase todo processo mapeado (notas, contratos, anexos) — este é o bloco de construção.',
    references: [{ label: 'Docs — Storage', url: SB + '/guides/storage', kind: 'doc' }],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'sb-14',
    index: 14,
    title: 'SQL vital: o mínimo para não depender de ninguém',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'SELECT/JOIN/WHERE, INSERT/UPDATE/DELETE com cautela, e ler um EXPLAIN.',
    concept:
      'O consultor não precisa ser DBA — precisa de autonomia: SELECT com WHERE, ORDER BY, LIMIT; JOIN para cruzar tabelas (INNER traz só correspondências, LEFT preserva a esquerda); GROUP BY com count/sum para agregações; INSERT/UPDATE/DELETE sempre com WHERE conferido duas vezes (o UPDATE sem WHERE atualiza a tabela INTEIRA — o clássico do terror); e EXPLAIN ANALYZE na frente de query lenta para ver se falta índice (Seq Scan em tabela grande = sinal). Com esse kit, o SQL Editor do dashboard vira sua ferramenta de investigação, relatório rápido e correção pontual — sem esperar dev.',
    deepDive: [
      'Em produção, prática defensiva: SELECT antes do UPDATE/DELETE com o mesmo WHERE — veja o que será afetado; transação (BEGIN/ROLLBACK) para ensaiar.',
      'O agente escreve o SQL, você o LÊ criticamente antes de rodar — a fluência de leitura é o que este tópico constrói.',
      'CREATE INDEX ON tabela(coluna) resolve a maioria das lentidões de WHERE/JOIN em tabelas médias — e o advisor sugere os que faltam.',
    ],
    pitfalls: [
      'UPDATE/DELETE sem WHERE — uma vez na vida, nunca mais (com sorte).',
      'Rodar no projeto de PRODUÇÃO achando que era o de dev — confira o nome no topo do dashboard, sempre.',
    ],
    practiceSteps: [
      'Escreva 10 queries de complexidade crescente no projeto de estudo (até JOIN + GROUP BY).',
      'Rode EXPLAIN ANALYZE numa query, crie o índice e compare os tempos.',
    ],
    projectContext:
      'Autonomia em SQL é o que deixa o consultor investigar dados do cliente em reunião, ao vivo — credibilidade técnica instantânea.',
    references: [
      { label: 'Docs — Postgres no Supabase', url: SB + '/guides/database/overview', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 40,
  },
  {
    id: 'sb-15',
    index: 15,
    title: 'pgvector: o banco vetorial dentro do Postgres',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Habilitar a extensão, coluna vector, operador <=> e busca semântica real.',
    concept:
      'A trilha de Fundamentos deu a teoria; aqui é a prática: pgvector é a extensão que adiciona o tipo vector ao Postgres — habilite no dashboard (Extensions) ou via CREATE EXTENSION vector, crie a coluna (embedding vector(1536), a dimensão do modelo de embedding escolhido) e a busca semântica vira SQL: ORDER BY embedding <=> query_embedding LIMIT 5 (o operador <=> é distância de cosseno). O padrão Supabase completo: tabela documents (conteúdo + embedding + metadados), função match_documents (RPC que recebe o embedding da pergunta e retorna os mais próximos com threshold) e índice HNSW quando o volume cresce.',
    deepDive: [
      'A killer feature vs banco vetorial dedicado: o filtro relacional NA MESMA query — WHERE cliente_id = X AND categoria = Y ORDER BY embedding <=> ... (metadado + semântica juntos, com RLS por cima).',
      'Índices: sem índice = busca exata (ok até dezenas de milhares); HNSW = aproximada e rápida (o padrão para produção; recall levemente menor, latência muito menor).',
      'Embeddings são gerados FORA (API da OpenAI/Voyage/etc., tipicamente numa Edge Function) e gravados — pgvector armazena e busca, não gera.',
    ],
    pitfalls: [
      'Dimensão da coluna diferente da dimensão do modelo de embedding — erro na primeira inserção.',
      'Comparar embeddings de MODELOS diferentes — espaços incompatíveis, similaridade sem sentido.',
    ],
    practiceSteps: [
      'Habilite pgvector, crie a tabela documents e insira 20 chunks com embeddings reais.',
      'Implemente match_documents e teste a busca semântica com perguntas variadas.',
    ],
    projectContext:
      'É a fundação técnica do RAG interno que a missão pj-4 constrói — e o argumento "seu banco vetorial já está no seu Postgres" simplifica a arquitetura vendida.',
    references: [
      { label: 'Docs — AI & vectors', url: SB + '/guides/ai', kind: 'doc' },
      { label: 'Docs — semantic search', url: SB + '/guides/ai/semantic-search', kind: 'doc' },
      { label: 'pgvector (repo)', url: 'https://github.com/pgvector/pgvector', kind: 'tool' },
    ],
    xp: 45,
    estMinutes: 40,
  },
  {
    id: 'sb-16',
    index: 16,
    title: 'Busca híbrida: full-text + semântica',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'tsvector do Postgres + pgvector combinados — o padrão de busca de produção.',
    concept:
      'A trilha de Fundamentos explicou por quê; aqui o como: o Postgres tem full-text search nativo (tsvector/tsquery — busca por palavra com stemming, inclusive dicionário portuguese) que pega os termos exatos que a busca vetorial deixa escapar (códigos, nomes, siglas). Busca híbrida = rodar as duas e fundir os rankings — tipicamente com RRF (reciprocal rank fusion: pontua cada resultado pela posição em cada lista e soma). No Supabase isso vira uma função SQL: full-text com índice GIN + vetorial com HNSW + fusão, tudo numa RPC hybrid_search que o app (ou o agente) chama.',
    deepDive: [
      'Coluna gerada: fts tsvector GENERATED ALWAYS AS (to_tsvector("portuguese", conteudo)) STORED + índice GIN — o full-text se mantém sozinho.',
      'RRF é deliberadamente simples (sem pesos mágicos para calibrar) — comece com ele; ajuste pesos só com evidência de que precisa.',
      'A doc oficial de hybrid search do Supabase traz a função completa — adapte em vez de reinventar.',
    ],
    pitfalls: [
      'Dicionário errado no to_tsvector (english para conteúdo em português) — stemming quebrado e recall ruim.',
      'Otimizar a fusão no achismo sem um conjunto de queries de teste para medir.',
    ],
    practiceSteps: [
      'Adicione full-text à sua tabela documents (coluna gerada + GIN) e teste buscas por termo exato.',
      'Implemente a hybrid_search com RRF a partir da doc e compare com cada busca isolada nos mesmos 10 casos.',
    ],
    projectContext:
      'Busca híbrida é o padrão de produção dos RAGs entregues — a diferença perceptível entre "acha quase sempre" e "acha".',
    references: [
      { label: 'Docs — hybrid search', url: SB + '/guides/ai/hybrid-search', kind: 'doc' },
      {
        label: 'Docs — full-text search',
        url: SB + '/guides/database/full-text-search',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 40,
  },
  {
    id: 'sb-17',
    index: 17,
    title: 'Edge Functions: o servidor que falta no frontend',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Quando precisa, deploy e os segredos — a casa das API keys.',
    concept:
      'Edge Functions são endpoints serverless (Deno/TypeScript) do projeto: supabase functions new nome cria, deploy publica, e o app chama via supabase.functions.invoke(). O critério de "quando preciso de uma": sempre que algo NÃO PODE viver no frontend — chamar APIs com chave secreta (gerar embeddings, chamar o Claude, cobrar no Stripe), lógica que o usuário não pode ver/alterar, webhooks recebidos de terceiros, operações com service_role. Segredos entram via supabase secrets set e chegam como variáveis de ambiente — o padrão que fecha o ciclo de segurança das keys aprendido em sb-4.',
    deepDive: [
      'A function recebe o JWT do usuário chamador — dá para validar quem chamou e aplicar autorização antes de usar poderes de servidor.',
      'Casos recorrentes nos projetos: gerar embedding no insert de documento, proxy para APIs de IA, processar webhook de pagamento, enviar e-mail transacional.',
      'Logs de function no dashboard são o primeiro lugar de debug — console.log aparece lá.',
    ],
    pitfalls: [
      'Pôr a chave da OpenAI no frontend "só para testar" — a Edge Function existe exatamente para isso.',
      'Esquecer que Deno importa por URL/JSR — copiar código Node com require e estranhar o erro.',
    ],
    practiceSteps: [
      'Crie e deploye uma function que recebe texto, chama uma API de embedding (chave via secrets) e grava no pgvector.',
      'Chame-a do frontend com invoke e acompanhe pelos logs.',
    ],
    projectContext:
      'Toda integração com IA dos apps entregues passa por Edge Functions — é onde as chaves vivem e onde a lógica sensível roda.',
    references: [{ label: 'Docs — Edge Functions', url: SB + '/guides/functions', kind: 'doc' }],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'sb-18',
    index: 18,
    title: 'Realtime: o banco avisando o app',
    priority: 'baixa',
    type: 'pratica',
    shortDescription:
      'Assinar mudanças de tabela via websocket — dashboards e colaboração ao vivo.',
    concept:
      'Realtime transmite mudanças do banco por websocket: habilite a publicação na tabela e assine no cliente — supabase.channel("sala").on("postgres_changes", {event: "INSERT", table: "mensagens"}, callback).subscribe() — e cada insert chega ao app sem polling. Os três sabores: Postgres Changes (mudanças de tabela — o mais usado), Broadcast (mensagens efêmeras entre clientes) e Presence (quem está online). Casos que vendem: dashboard operacional atualizando ao vivo, notificação de tarefa atribuída, indicador de "fulano está editando". Importante: RLS vale — o usuário só recebe eventos das linhas que as policies deixam ver.',
    deepDive: [
      'Sempre remova a assinatura no unmount (removeChannel) — vazamento de canal é o bug clássico de Realtime em React.',
      'Para contadores/estados agregados, receba o evento e re-consulte — reconstruir estado só por eventos descarrila fácil.',
      'Escala tem custo: milhares de clientes assinando tabela quente merece desenho (canais segmentados, debounce).',
    ],
    pitfalls: [
      'Esquecer de habilitar a publicação na tabela e debugar o silêncio por uma hora.',
      'Assinar a tabela inteira quando o filtro (filter: "sala_id=eq.42") reduziria o tráfego a 1%.',
    ],
    practiceSteps: [
      'Monte um mini-feed ao vivo: insert numa aba aparece na outra sem refresh.',
      'Adicione Presence mostrando quem está na página.',
    ],
    projectContext:
      'O dashboard ao vivo do processo mapeado é demo de alto impacto — Realtime entrega o efeito com meia dúzia de linhas.',
    references: [{ label: 'Docs — Realtime', url: SB + '/guides/realtime', kind: 'doc' }],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'sb-19',
    index: 19,
    title: 'Logs, Advisors e limites do Free',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'Onde investigar problemas — e a pausa por inatividade que derruba demo.',
    concept:
      'Operação básica: os LOGS do dashboard cobrem cada serviço (API, banco, auth, functions, realtime) com filtros e busca — a primeira parada de todo "não funciona"; os ADVISORS varrem o projeto e apontam problemas de segurança (tabela sem RLS, function insegura) e performance (índice faltando, query lenta) — revise após cada migração. E os limites do Free que pegam consultoria de surpresa: projeto PAUSA após ~1 semana sem atividade (a demo agendada com o cliente acorda fora do ar — despause antes, ou Pro), sem backups automáticos, e tetos de banda/storage/conexões. Free é para desenvolver e validar; produção de cliente é conversa de plano Pro.',
    deepDive: [
      'O Log Explorer aceita queries — dá para investigar padrões (todos os 401 da última hora, latência por endpoint).',
      'Advisors via MCP: o agente lê os apontamentos e propõe as correções — auditoria semiautomática.',
      'Monte o hábito: checklist pós-migração = advisors + smoke test; checklist pré-demo = projeto ativo + dados de exemplo.',
    ],
    pitfalls: [
      'A demo da sexta com o projeto pausado desde segunda — o clássico evitável.',
      'Ignorar advisors por meses e herdar uma lista de 40 pendências de segurança.',
    ],
    practiceSteps: [
      'Explore os logs de cada serviço do seu projeto; ache um erro real e rastreie a causa.',
      'Rode os advisors, corrija um apontamento de segurança e um de performance.',
    ],
    projectContext:
      'Logs + advisors são o kit de suporte pós-entrega — e a política de planos por ambiente (Free dev, Pro prod) entra na proposta comercial.',
    references: [
      { label: 'Docs — logs', url: SB + '/guides/telemetry/logs', kind: 'doc' },
      { label: 'Preços e limites', url: 'https://supabase.com/pricing', kind: 'doc' },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'sb-20',
    index: 20,
    title: 'Backup e recuperação: o agente dropou a tabela',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'Backups diários, PITR e o plano de desastre que se escreve ANTES.',
    concept:
      'O cenário-título é real: um agente com MCP em modo escrita (ou um humano às pressas) roda o SQL errado e uma tabela de produção evapora. O que salva depende do que foi contratado ANTES: plano Pro tem backups diários (restauração para o snapshot — perde-se o que veio depois dele); o add-on PITR (point-in-time recovery) permite voltar o banco para QUALQUER instante (granularidade de segundos) — a diferença entre perder um dia e perder dois minutos. Free não tem backup automático: o plano de desastre do Free é disciplina própria (dumps agendados via pg_dump). A lição de consultoria: recuperação se DESENHA na proposta, não se improvisa no incidente.',
    deepDive: [
      'Camadas de defesa em ordem: MCP read-only por padrão + branch para migração arriscada + backup/PITR — o drop precisa furar três barreiras.',
      'Restauração tem trade-offs: entenda o processo (restore para o mesmo projeto vs novo) e ENSAIE uma vez — o primeiro restore da vida não pode ser no incidente real.',
      'RPO/RTO em português claro para o cliente: "quanto de dado você aceita perder, quanto tempo aceita ficar fora?" — as respostas definem o plano e o preço.',
    ],
    pitfalls: [
      'Descobrir no incidente que o projeto era Free e o backup mais recente não existe.',
      'Ter PITR contratado e ninguém do time saber executar a restauração.',
    ],
    practiceSteps: [
      'Verifique a configuração de backup dos seus projetos ativos AGORA.',
      'Escreva o runbook de recuperação (quem aciona, como restaura, como comunica) e ensaie num projeto de teste.',
    ],
    projectContext:
      'A pergunta "e se der ruim?" do cliente ganha resposta de engenheiro: camadas de prevenção + backup dimensionado + runbook ensaiado — isso fecha contrato.',
    references: [{ label: 'Docs — backups', url: SB + '/guides/platform/backups', kind: 'doc' }],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'sb-boss',
    index: 21,
    title: 'BOSS: Arquiteto do Backend',
    priority: 'alta',
    type: 'boss',
    shortDescription: 'Desafio final — keys, RLS, migrations, pgvector e o plano de desastre.',
    concept:
      'O boss do Supabase testa a espinha dorsal do backend: onde cada key pode viver, RLS e policies que isolam dados, schema versionado em migrações, busca vetorial/híbrida e o plano de recuperação. Acerte 4 de 5 para vencer.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação indica prontidão para desenhar e operar o backend Supabase dos projetos de cliente.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
