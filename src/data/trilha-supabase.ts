import { Database } from 'lucide-react'
import type { Trail } from './types'

export const trilhaSupabase: Trail = {
  id: 'supabase',
  order: 5,
  title: 'Supabase',
  tagline: 'O backend dos projetos com IA — e onde a segurança do cliente se decide.',
  color: '#34D399',
  icon: Database,
  nodes: [
    {
      id: 'sb-1',
      title: 'Projeto, tabelas e as keys sagradas',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'É a fundação de quase todo MVP que criamos com cliente — e o lugar onde um descuido com keys vira incidente de segurança.',
      content: [
        'Supabase = Postgres gerenciado + Auth + Storage + Edge Functions + Realtime. Quando indicar: MVPs e apps que precisam de backend completo rápido, sem time de infra.',
        'Setup: criar organização e projeto (região próxima do usuário!), guardar a senha do banco, conhecer o dashboard (Table Editor, SQL Editor, Auth, Logs).',
        'Tabelas: Table Editor pro visual, SQL Editor pro controle. Sempre com primary key; relacionamentos via foreign key; tipos corretos poupam dor futura.',
        'As keys: a anon/publishable é a pública, feita pro frontend, protegida pelas policies. A service_role/secret IGNORA todas as policies — é a chave-mestra e NUNCA vai pro frontend nem pro repo.',
        'Conexão do app: client JS com URL do projeto + chave pública, ambas em variáveis de ambiente (nunca hardcoded).',
        'Limites do plano free que assustam cliente: projeto pausa por inatividade ("meu app sumiu!") e cotas de storage/bandwidth — saiba explicar e quando indicar upgrade.',
      ],
      practice: [
        'Crie um projeto do zero e faça o tour completo do dashboard.',
        'Crie 2 tabelas relacionadas (ex: clientes e pedidos) com FK.',
        'Localize as duas keys e escreva em 3 linhas por que a service_role nunca vai pro frontend.',
      ],
      scope:
        'Criar o projeto Supabase é o primeiro passo prático de quase todo projeto de criação com IA que vendemos.',
      links: [{ label: 'Docs do Supabase', url: 'https://supabase.com/docs' }],
      quiz: [
        {
          q: 'Qual a diferença crítica entre a chave pública (anon) e a service_role?',
          options: [
            'Velocidade',
            'A service_role ignora TODAS as policies de segurança — é chave-mestra e jamais pode ir pro frontend',
            'A anon é paga',
            'Nenhuma',
          ],
          correct: 1,
          explain:
            'A anon é protegida pelas policies (RLS). A service_role passa por cima de tudo: no frontend, é o banco inteiro exposto.',
        },
        {
          q: 'Cliente free reclama: "meu app parou de funcionar do nada". Suspeita número 1?',
          options: [
            'Hack',
            'Projeto pausado por inatividade no plano free',
            'Postgres corrompido',
            'RLS ativou sozinho',
          ],
          correct: 1,
          explain:
            'Projetos free pausam após inatividade. Restaurar no dashboard resolve — e a conversa de upgrade começa aí.',
        },
      ],
    },
    {
      id: 'sb-2',
      title: 'RLS: a falha número 1 do app vibe-coded',
      kind: 'lesson',
      xp: 60,
      minutes: 45,
      why: 'O app do cliente "funciona perfeitamente" — e qualquer usuário lê os dados de todos os outros. Detectar isso salva o cliente de um vazamento.',
      content: [
        'RLS (Row Level Security) = regras no próprio banco definindo quem pode ler/escrever cada LINHA. Sem RLS, a chave pública dá acesso à tabela inteira.',
        'A falha clássica de app gerado por IA: tabelas criadas sem RLS, tudo funcionando em demo, dados de todos expostos em produção. É o primeiro item da nossa auditoria.',
        'Ativar RLS sem criar policy = tabela tranca completamente (ninguém lê). O par é indissociável: ativa RLS E escreve as policies.',
        'Policy básica de posse: cada operação (SELECT/INSERT/UPDATE/DELETE) com regra comparando auth.uid() com a coluna user_id da linha — "cada um vê e mexe só no que é seu".',
        'Teste de verdade: com dois usuários diferentes, confirme que A não enxerga os dados de B — teste com a chave pública, não no SQL Editor (que bypassa).',
        'O Security Advisor do dashboard aponta tabelas sem RLS — rode em toda auditoria de projeto herdado.',
      ],
      practice: [
        'Crie uma tabela com user_id, ative RLS e escreva as 4 policies de posse.',
        'Crie 2 usuários de teste e prove o isolamento entre eles.',
        'Rode o Security Advisor num projeto existente e liste o que ele acusa.',
      ],
      scope:
        'A auditoria de RLS é serviço de prateleira nosso: todo cliente que "vibe-codou" um app precisa dela antes de ir pra produção.',
      links: [
        {
          label: 'Guia oficial de RLS',
          url: 'https://supabase.com/docs/guides/database/postgres/row-level-security',
        },
      ],
      quiz: [
        {
          q: 'App do cliente funciona, mas qualquer usuário logado vê os dados de todos. Diagnóstico mais provável?',
          options: [
            'Bug no frontend',
            'Tabelas sem RLS (ou sem policies de posse por auth.uid())',
            'Chave errada',
            'Falta de índice',
          ],
          correct: 1,
          explain:
            'Sem RLS, a chave pública lê a tabela inteira. É a falha número 1 de apps gerados sem revisão de segurança.',
        },
        {
          q: 'Você ativou RLS numa tabela e o app parou de ler QUALQUER dado. Por quê?',
          options: [
            'Bug do Supabase',
            'RLS sem policies bloqueia tudo — falta escrever as regras de acesso',
            'A tabela corrompeu',
            'Precisa reiniciar o projeto',
          ],
          correct: 1,
          explain:
            'RLS ligado sem policy = negação total. Ativar RLS e escrever policies são um ato só.',
        },
      ],
    },
    {
      id: 'sb-3',
      title: 'Auth na prática',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'Login é o pedido número 1 em projeto de cliente — e a redirect URL errada é o bug número 1 do OAuth.',
      content: [
        'E-mail/senha: signup, login, confirmação de e-mail e recuperação já vêm prontos; os templates de e-mail são personalizáveis no dashboard.',
        'OAuth (Google e afins): configurar o provider no dashboard + as redirect URLs corretas. O erro clássico: funciona em localhost e quebra em produção porque a URL de produção não foi cadastrada.',
        'Sessões e JWT: o login emite um token com validade; o client renova automaticamente. "Usuário deslogando sozinho" geralmente é armazenamento de sessão mal configurado ou relógio/expiração.',
        'auth.uid() dentro das policies conecta o login ao RLS: a identidade do token vira a régua de acesso às linhas.',
        'Dados de perfil: a tabela auth.users é do sistema; crie uma tabela profiles (com RLS!) ligada por FK pro que for dado de aplicação.',
        'Logs de Auth no dashboard mostram cada tentativa — primeiro lugar pra investigar "não consigo logar".',
      ],
      practice: [
        'Implemente e-mail/senha num app de teste (pode pedir pro agente construir — você audita).',
        'Configure login com Google e provoque o erro de redirect URL pra reconhecer o sintoma.',
        'Crie a tabela profiles com RLS e o vínculo com auth.users.',
      ],
      scope:
        'Auth + RLS formam o esqueleto de segurança de todo app que criamos. É também onde o agente mais precisa da nossa auditoria.',
      links: [{ label: 'Docs — Auth', url: 'https://supabase.com/docs/guides/auth' }],
      quiz: [
        {
          q: 'Login com Google funciona em localhost mas falha no domínio de produção. Causa clássica?',
          options: [
            'Google fora do ar',
            'Redirect URL de produção não cadastrada na configuração do provider',
            'Falta de RLS',
            'Plano free',
          ],
          correct: 1,
          explain:
            'O OAuth só redireciona para URLs autorizadas. Esquecer a URL de produção é o bug mais comum do go-live.',
        },
        {
          q: 'Onde devem morar os dados de perfil editáveis do usuário (nome, avatar, bio)?',
          options: [
            'Direto na auth.users',
            'Numa tabela profiles própria, com RLS, ligada por FK ao usuário',
            'No localStorage',
            'Num JSON no frontend',
          ],
          correct: 1,
          explain:
            'auth.users é do sistema. Dados de aplicação vivem em tabela sua — com as mesmas regras de segurança de sempre.',
        },
      ],
    },
    {
      id: 'sb-4',
      title: 'MCP do Supabase com agentes',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'Une as duas pontas da stack: o agente criando tabelas, rodando SQL e migrations direto no banco — com você segurando a rédea.',
      content: [
        'O MCP oficial do Supabase conecta Claude Code/Codex ao projeto: listar tabelas, executar SQL, aplicar migrations, consultar logs e advisors.',
        'Setup: adicionar o servidor MCP com autenticação do projeto — no Claude Code, preferencialmente escopo project pro time herdar.',
        'Modo read-only existe e é o padrão prudente: o agente consulta e analisa sem poder destruir. Escrita se libera conscientemente, por tarefa.',
        'Riscos do acesso de escrita: um prompt ambíguo e o agente altera schema em produção. Regra da casa: escrita só em projeto/branch de desenvolvimento, nunca direto em produção.',
        'Fluxo profissional: agente propõe a migration → você revisa o SQL → aplica em dev → valida → promove pra produção.',
        'Combine com os advisors: peça ao agente pra rodar o Security/Performance Advisor e explicar cada apontamento — auditoria semiautomática.',
      ],
      practice: [
        'Conecte o MCP do Supabase no Claude Code em modo read-only e explore um projeto.',
        'Peça ao agente uma análise de segurança usando os advisors.',
        'Em um projeto de teste, libere escrita e conduza o fluxo: migration proposta → revisão → aplicação.',
      ],
      scope:
        'É o setup padrão dos nossos projetos: agente com acesso ao banco em dev, protocolo de revisão antes de produção. Diferencial técnico direto da consultoria.',
      links: [
        {
          label: 'Guia oficial — MCP do Supabase',
          url: 'https://supabase.com/docs/guides/getting-started/mcp',
        },
      ],
      quiz: [
        {
          q: 'Qual configuração do MCP do Supabase é o padrão prudente ao conectar um agente?',
          options: [
            'Acesso total em produção',
            'Read-only — escrita liberada conscientemente, por tarefa e em ambiente de dev',
            'Sem autenticação',
            'Somente via service_role no frontend',
          ],
          correct: 1,
          explain:
            'Read-only elimina o risco de destruição acidental. Escrita é decisão explícita, em ambiente que tolera erro.',
        },
        {
          q: 'O agente propôs uma migration. Qual o fluxo profissional?',
          options: [
            'Aplicar direto em produção',
            'Revisar o SQL → aplicar em dev → validar → só então promover a produção',
            'Ignorar migrations',
            'Pedir pro cliente aplicar',
          ],
          correct: 1,
          explain:
            'Migration é mudança estrutural: revisão humana + ambiente de teste antes de produção, sempre.',
        },
      ],
    },
    {
      id: 'sb-5',
      title: 'Migrations, logs e o plano B',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: '"O agente dropou uma tabela" não pode ser o fim do mundo — se você montou o projeto do jeito certo.',
      content: [
        'Por que não editar produção na mão: mudanças sem registro tornam o banco irreproduzível. Migration = mudança de schema versionada e repetível.',
        'CLI do Supabase: desenvolvimento local, geração de migrations e db push pra aplicar — o histórico de migrations vira a biografia do banco.',
        'Branches de desenvolvimento: ambiente isolado pra testar migrations e features; validou, faz merge pra produção. É o "git pro banco".',
        'Logs no dashboard: API, Auth e Postgres separados — o caminho mais curto entre "tá dando erro" e a causa real.',
        'O plano B: backups automáticos nos planos pagos e point-in-time recovery — volte o banco para minutos antes do desastre. Saiba ONDE fica antes de precisar.',
        'Kit anti-desastre da consultoria: migrations versionadas + branch de dev + backup configurado = o agente pode errar sem ninguém chorar.',
      ],
      practice: [
        'Instale a CLI e gere uma migration real de mudança de schema.',
        'Crie um branch de desenvolvimento, aplique a migration nele e faça o merge.',
        'Localize backup/restore no dashboard e documente o passo a passo de recuperação.',
      ],
      scope:
        'A disciplina de migrations + ambientes é o que diferencia projeto profissional de protótipo — e é padrão em tudo que entregamos.',
      links: [{ label: 'Docs — migrations e ambientes', url: 'https://supabase.com/docs' }],
      quiz: [
        {
          q: 'Por que mudanças de schema devem ser migrations e não edições manuais em produção?',
          options: [
            'Manual é mais lento apenas',
            'Migrations são versionadas e repetíveis: o banco vira reproduzível e auditável',
            'O dashboard proíbe',
            'Migrations são grátis',
          ],
          correct: 1,
          explain:
            'Sem registro versionado, ninguém sabe como o banco chegou ao estado atual — nem consegue recriá-lo.',
        },
        {
          q: 'O agente dropou uma tabela importante em produção. O recurso que salva o dia é:',
          options: [
            'Ctrl+Z',
            'Backup/point-in-time recovery — restaurar o banco a um momento antes do desastre',
            'Recriar na mão de memória',
            'RLS',
          ],
          correct: 1,
          explain:
            'PITR/backup devolve o banco no tempo. Por isso configurar (e saber onde fica) ANTES é parte do setup.',
        },
      ],
    },
    {
      id: 'sb-6',
      title: 'BOSS: Mini-SaaS seguro',
      kind: 'boss',
      xp: 150,
      minutes: 120,
      why: 'Provar domínio construindo o que vendemos: um app com banco, auth e segurança de gente grande — com agente no volante e você na auditoria.',
      content: [
        'Você vai montar um mini-SaaS de teste: 2 tabelas relacionadas, auth funcionando, RLS correto e agente conectado via MCP.',
        'O checklist de segurança que você produzir vira o nosso padrão de entrega.',
      ],
      practice: [],
      scope: 'Entregável real: o checklist de segurança Supabase oficial da consultoria.',
      links: [{ label: 'Docs do Supabase', url: 'https://supabase.com/docs' }],
      quiz: [],
      checklist: [
        'Projeto com 2 tabelas relacionadas (FK) criado via migrations',
        'Auth e-mail/senha funcionando + tabela profiles com RLS',
        'RLS ativo com policies de posse nas 4 operações, testado com 2 usuários',
        'MCP do Supabase conectado ao agente (read-only) e auditoria via advisors executada',
        'Uma migration proposta pelo agente, revisada e aplicada em branch de dev',
        'Passo a passo de backup/restore documentado',
        'Checklist de segurança de meia página: o que verificar antes de entregar pro cliente',
      ],
    },
  ],
}
