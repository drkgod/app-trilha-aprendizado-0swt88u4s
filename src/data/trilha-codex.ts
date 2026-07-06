import type { Topic } from './types'

const CX = 'https://developers.openai.com/codex'

export const codexTopics: Topic[] = [
  {
    id: 'cx-1',
    index: 1,
    title: 'Instalação da CLI',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'npm vs installer standalone (macOS/Linux/Windows), atualizar e verificar versão.',
    concept:
      'A Codex CLI instala de dois jeitos: o script oficial (curl no macOS/Linux, PowerShell no Windows) ou npm install -g @openai/codex — além de brew no macOS. Depois é só rodar codex no diretório do projeto. O ritmo de release é agressivo (versões novas toda semana), então codex --version e o autoupdate fazem parte da rotina: muita "falha misteriosa" relatada por cliente é simplesmente versão de um mês atrás. O changelog oficial é leitura recorrente de quem dá suporte.',
    deepDive: [
      'O binário é Rust — rápido e sem dependência de Node quando instalado pelo script standalone; via npm, o Node é só o veículo de instalação.',
      'Windows tem suporte nativo com sandbox próprio; em times Linux-first, WSL2 continua sendo escolha comum (mesma regra do Claude Code: repo dentro do filesystem Linux).',
      'codex --help e o reference oficial listam flags globais; aprender a ler o reference economiza horas de tentativa e erro.',
    ],
    pitfalls: [
      'Reportar bug sem atualizar — metade dos problemas já foi corrigida na versão da semana.',
      'Instalar com sudo via npm e criar problema de permissão (mesma lição do ecossistema Node).',
    ],
    practiceSteps: [
      'Instale pelo script oficial e pelo npm em máquinas diferentes; compare.',
      'Rode codex --version e localize a versão no changelog oficial.',
      'Adicione o passo a passo de instalação ao playbook do time.',
    ],
    projectContext:
      'Implantação em cliente começa com instalação reproduzível — e com a orientação de manter autoupdate ligado.',
    references: [
      { label: 'Codex CLI — visão geral', url: CX + '/cli', kind: 'doc' },
      { label: 'Repositório openai/codex', url: 'https://github.com/openai/codex', kind: 'tool' },
      { label: 'Changelog do Codex', url: CX + '/changelog', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'cx-2',
    index: 2,
    title: 'Instalação do app desktop',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Download por plataforma (Apple Silicon/Intel/Windows) e primeiro setup.',
    concept:
      'O Codex App é o desktop do agente: interface gráfica com threads, diff visual e worktrees nativos. Baixa-se do site oficial (atenção ao binário certo: Apple Silicon vs Intel no macOS; Windows tem instalador próprio) ou, com a CLI instalada, codex app abre/instala o app. O primeiro setup pede login (conta ChatGPT ou API key) e a escolha da pasta de projeto. Para perfis que não vivem no terminal — e todo cliente tem vários — o app é a porta de entrada com menor fricção.',
    deepDive: [
      'App e CLI compartilham a mesma engine e configuração (~/.codex) — o que você configura num vale no outro.',
      'Projeto no app = pasta local; a sidebar organiza threads por projeto, o que mapeia bem para "um cliente = um projeto".',
      'O terminal embutido do app permite rodar comandos sem sair — útil para validar o que o agente fez.',
    ],
    pitfalls: [
      'Baixar binário Intel em Mac M-series e sofrer com Rosetta sem perceber.',
      'Tratar o app como produto separado da CLI e configurar tudo em dobro.',
    ],
    practiceSteps: [
      'Instale o app, conecte uma pasta de projeto e rode uma primeira tarefa.',
      'Confirme que uma config feita na CLI (ex: modelo default) aparece no app.',
    ],
    projectContext:
      'No rollout, o app é o que você instala para gestores técnicos e devs que rejeitam TUI — mesma engine, curva de adoção menor.',
    references: [
      { label: 'Codex — página oficial', url: 'https://openai.com/codex/', kind: 'doc' },
      { label: 'Docs — Codex (todas as superfícies)', url: CX, kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'cx-3',
    index: 3,
    title: 'Extensão IDE: VS Code, Cursor e Windsurf',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Onde o painel aparece, mover para a direita e o fluxo dentro do editor.',
    concept:
      'A extensão oficial do Codex roda em VS Code e forks (Cursor, Windsurf): instala pela marketplace, loga com a conta e o painel do agente aparece na sidebar — a primeira coisa que todo mundo faz é arrastá-lo para a direita, deixando a esquerda para o explorer. O valor da extensão é contexto implícito: o agente enxerga o arquivo aberto e a seleção, então "explique isto" e "refatore esta função" funcionam sem colar nada. Diffs aparecem inline no editor, no fluxo de revisão que o dev já domina.',
    deepDive: [
      'Seleção como contexto: selecionar um trecho e acionar o Codex é o gesto de maior frequência — ensine isso primeiro no treinamento.',
      'A extensão compartilha login e config com CLI/app; threads iniciadas no editor podem continuar em outra superfície.',
      'Em Cursor/Windsurf, conviver com o agente nativo da IDE é possível — defina qual ferramenta é padrão para quê, ou o time se perde.',
    ],
    pitfalls: [
      'Manter o painel na esquerda brigando com o explorer — fricção boba que mata adoção.',
      'Usar a extensão para tarefas de repositório inteiro que a CLI/app fariam melhor.',
    ],
    practiceSteps: [
      'Instale no seu editor, mova o painel para a direita e rode 3 tarefas baseadas em seleção.',
      'Compare a mesma tarefa na extensão e na CLI; anote quando cada uma vence.',
    ],
    projectContext:
      'Para o dev do cliente, a extensão é o menor passo de adoção — começa ali e migra para CLI/app conforme a confiança cresce.',
    references: [{ label: 'Docs — Codex no IDE', url: CX + '/ide', kind: 'doc' }],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'cx-4',
    index: 4,
    title: 'Login e planos: ChatGPT vs API key',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'O que muda em funcionalidade e cobrança; o que Plus/Pro/Business/Enterprise incluem.',
    concept:
      'Dois caminhos de autenticação, dois modelos de cobrança: login com conta ChatGPT (Plus/Pro/Business/Enterprise — o uso do Codex sai da franquia do plano, com créditos/limites que variam por tier) ou API key da plataforma (paga por token, sem franquia). Plus dá acesso com limites modestos; Pro multiplica; Business/Enterprise adicionam gestão central e controles. A conta que o consultor faz com o cliente é idêntica à do Claude Code: volume × modelo × superfícies define se assinatura ou API — e times mistos frequentemente usam os dois (assinatura para uso interativo, API para automação).',
    deepDive: [
      'codex login abre o fluxo OAuth do ChatGPT; a API key entra via variável de ambiente ou config — cuidado com a key esquecida no ambiente cobrando por fora.',
      'Codex Cloud e recursos como o code review em PR consomem do mesmo plano — dimensione contando o uso assíncrono.',
      'Enterprise: SSO, retenção configurável e admin de workspaces — os pontos que a TI do cliente vai perguntar.',
    ],
    pitfalls: [
      'Assumir que o plano do ChatGPT "é ilimitado" — todo tier tem franquia e ela acaba.',
      'Misturar billing pessoal e do cliente na mesma conta.',
    ],
    practiceSteps: [
      'Faça login pelos dois caminhos e identifique nos status qual está ativo.',
      'Monte a tabela de decisão assinatura vs API para apresentar em proposta.',
    ],
    projectContext:
      'Licenciamento é seção obrigatória da proposta — e responder "quanto custa por dev/mês" com precisão diferencia a consultoria.',
    references: [
      { label: 'Docs — autenticação', url: CX + '/auth', kind: 'doc' },
      { label: 'Preços OpenAI', url: 'https://openai.com/pricing/', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cx-5',
    index: 5,
    title: 'App vs CLI vs extensão vs Cloud: o mapa das superfícies',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Diff visual e worktrees no app; TUI na CLI; Cloud rodando no servidor da OpenAI.',
    concept:
      'Quatro superfícies, um agente: a CLI é a TUI completa e scriptável; o app desktop adiciona diff visual, threads organizadas e worktrees nativos com um clique; a extensão traz o agente para dentro do editor; e o Codex Cloud executa tarefas em containers nos servidores da OpenAI — você delega pelo site/CLI/GitHub e recebe um PR pronto, sem usar sua máquina. A distinção que orienta tudo: local (CLI/app/extensão) usa SEU ambiente e SEUS arquivos; Cloud usa um ambiente configurado por você nos servidores deles — com implicações de setup, segredos e compliance.',
    deepDive: [
      'Cloud brilha em paralelismo massivo (delegar 5 tarefas e revisar depois) e em quem não quer/pode rodar local; apanha quando o ambiente é difícil de reproduzir em container.',
      'App = melhor experiência de revisão (diff lado a lado, staging seletivo); CLI = melhor automação; extensão = melhor microfluxo.',
      'Tudo compartilha AGENTS.md e config — o investimento em instruções vale para as quatro superfícies.',
    ],
    pitfalls: [
      'Indicar Cloud para cliente com código que não pode sair do perímetro — pergunta de compliance vem antes da técnica.',
      'Ensinar as 4 superfícies de uma vez no treinamento — escolha 1 por perfil e aprofunde.',
    ],
    practiceSteps: [
      'Faça a mesma tarefa nas 4 superfícies e cronometre o ciclo completo (pedido → revisão → merge).',
      'Escreva a matriz perfil × superfície da consultoria.',
    ],
    projectContext:
      'O desenho de rollout por perfil (dev sênior, dev júnior, gestor, analista) é entregável do projeto de implantação.',
    references: [
      { label: 'Docs — Codex (hub)', url: CX, kind: 'doc' },
      { label: 'Docs — Codex Cloud', url: CX + '/cloud', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cx-6',
    index: 6,
    title: 'Conceitos do app: projetos, threads e o terminal embutido',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Projeto = pasta local, thread = sessão de agente, sidebar de histórico.',
    concept:
      'O vocabulário do app organiza o trabalho: um projeto é uma pasta local (tipicamente um repo); uma thread é uma sessão de agente dentro do projeto — cada tarefa vive na sua thread, com histórico próprio, navegável pela sidebar. Essa separação é o antídoto natural contra a sessão-épica-que-mistura-tudo: feature nova, thread nova. O terminal embutido completa o ciclo: você valida o trabalho do agente (rodar testes, subir o dev server) sem sair do app. Dominar esse modelo mental é o que faz o app render.',
    deepDive: [
      'Threads são retomáveis: a de ontem continua de onde parou, e o histórico da sidebar é a linha do tempo do projeto.',
      'Uma thread por tarefa também melhora o agente: contexto focado = respostas focadas (mesma lição de contexto de sempre).',
      'Projetos múltiplos abertos = consultoria multi-cliente organizada: cada cliente na sua caixa, sem vazamento de contexto.',
    ],
    pitfalls: [
      'Uma thread gigante para o projeto inteiro — o anti-padrão clássico.',
      'Abrir a pasta errada como projeto (ex: a home) e dar ao agente um universo desnecessário.',
    ],
    practiceSteps: [
      'Estruture: 1 projeto por repo, 1 thread por tarefa, por uma semana.',
      'Use o terminal embutido para validar cada entrega do agente antes de aceitar.',
    ],
    projectContext:
      'O modelo projeto/thread vira convenção de time no cliente: rastreável, auditável e fácil de ensinar.',
    references: [{ label: 'Docs — Codex App', url: CX + '/app', kind: 'doc' }],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'cx-7',
    index: 7,
    title: 'AGENTS.md: hierarquia, override e o que escrever',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Global no CODEX_HOME → raiz → subpasta (mais próximo vence) e AGENTS.override.md.',
    concept:
      'AGENTS.md é o CLAUDE.md do Codex — e virou padrão aberto adotado por dezenas de agentes (hoje stewarded pela Linux Foundation). A hierarquia: ~/.codex/AGENTS.md (global) → AGENTS.md na raiz do projeto → AGENTS.md em subpastas, concatenados da raiz para baixo, com o mais próximo do diretório de trabalho prevalecendo. AGENTS.override.md, quando existe, substitui o AGENTS.md do mesmo nível — útil para exceções temporárias ou regras de submódulo. Conteúdo que paga: comandos de build/test, convenções, arquitetura em 10 linhas, o que nunca tocar, e o que verificar antes de declarar a tarefa concluída.',
    deepDive: [
      'Limite de bytes: o Codex trunca a combinação em ~32KiB por padrão — mais um motivo para escrever denso; o limite e nomes alternativos são configuráveis no config.toml.',
      'Por ser padrão aberto, o MESMO AGENTS.md serve Codex, Cursor, Jules e outros — escreva uma vez, use em todo o ecossistema do cliente.',
      '/init dentro da sessão gera um esqueleto a partir do repo — ótimo começo, edição obrigatória.',
    ],
    pitfalls: [
      'Instrução vaga ("escreva código limpo") — o agente precisa de regra verificável.',
      'Esquecer um AGENTS.override.md antigo no caminho e caçar por que o agente ignora o arquivo principal.',
    ],
    practiceSteps: [
      'Rode /init num repo e lapide o resultado para menos de 60 linhas úteis.',
      'Teste a precedência: regra conflitante na raiz e numa subpasta; veja qual vence.',
      'Padronize o template AGENTS.md da consultoria.',
    ],
    projectContext:
      'Um AGENTS.md bem escrito no repo do cliente instrui QUALQUER agente que o time use — entregável com meia-vida longa.',
    references: [
      { label: 'Docs — AGENTS.md no Codex', url: CX + '/guides/agents-md', kind: 'doc' },
      { label: 'agents.md — o padrão aberto', url: 'https://agents.md/', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'cx-8',
    index: 8,
    title: 'Permissões e sandbox',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Default vs full access, workspace-write, e quando o cliente NÃO deve liberar tudo.',
    concept:
      'O Codex roda dentro de um sandbox de sistema operacional: por padrão, escrita restrita ao workspace e rede bloqueada ou limitada, com aprovações pedidas para sair disso. Os níveis (read-only → workspace-write → full access) combinados com a política de aprovação (perguntar sempre / on-request / nunca) formam a matriz de autonomia. A regra de consultoria: full access é exceção justificada e documentada, nunca o default do time — o modo "work locally" com escrita no workspace cobre a imensa maioria do trabalho com risco contido.',
    deepDive: [
      'Sandbox é tecnologia real de SO (Seatbelt no macOS, Landlock/seccomp no Linux, sandbox nativo no Windows) — não é só um prompt pedindo licença.',
      'Rede desligada por padrão protege contra exfiltração via prompt injection; ligue por tarefa quando necessário, não globalmente.',
      '--add-dir concede diretórios extras específicos — sempre preferível a escalar para full access.',
    ],
    pitfalls: [
      'Liberar full access + rede no laptop com credenciais de produção do cliente.',
      'Nunca revisitar as permissões: autonomia deve crescer com o histórico, não nascer máxima.',
    ],
    practiceSteps: [
      'Rode a mesma tarefa em read-only, workspace-write e full; observe o que muda.',
      'Escreva a política de sandbox padrão do time (e as exceções válidas).',
    ],
    projectContext:
      'A matriz sandbox × aprovação é a resposta técnica ao medo nº 1 do cliente ("e se a IA destruir algo?") — mostre, não prometa.',
    references: [
      {
        label: 'Docs — aprovações e segurança do agente',
        url: CX + '/agent-approvals-security',
        kind: 'doc',
      },
      {
        label: 'Docs — referência CLI (flags de sandbox)',
        url: CX + '/cli/reference',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'cx-9',
    index: 9,
    title: 'Pré-aprovar comandos: o agente rodando sem parar',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Regras finas para gh, testes e lint — menos interrupção, mesma segurança.',
    concept:
      'Cada pedido de aprovação interrompe o fluxo — e a maioria é para comandos que você aprovaria sempre: rodar testes, lint, gh pr view, git status. O Codex permite pré-aprovar padrões de comando via regras de permissão na configuração: o agente executa a lista confiável sem perguntar e continua pedindo para todo o resto. O efeito composto é enorme: sessões que rodavam 2 minutos e paravam passam a trabalhar 15+ minutos autônomas, porque o ciclo editar→testar→corrigir não trava em cliques.',
    deepDive: [
      'Construa a allowlist empiricamente: uma semana anotando o que você aprova sem pensar = sua lista inicial.',
      'Granularidade importa: aprovar "pnpm test" é diferente de aprovar "pnpm" inteiro — prefixos específicos.',
      'A denylist complementa: destrutivos (rm -rf, drops, force push) explicitamente bloqueados, independente do resto.',
    ],
    pitfalls: [
      'Allowlist genérica que vira full access disfarçado.',
      'Pré-aprovar comandos com efeitos externos (deploy, publish) por conveniência.',
    ],
    practiceSteps: [
      'Configure pré-aprovação para testes, lint e leitura de git/gh no seu stack.',
      'Meça: tempo médio de autonomia do agente antes e depois.',
    ],
    projectContext:
      'Regras de permissão versionadas por projeto são parte do pacote de governança entregue — produtividade com trilho.',
    references: [
      {
        label: 'Docs — aprovações e segurança do agente',
        url: CX + '/agent-approvals-security',
        kind: 'doc',
      },
      { label: 'Docs — configuração (básico)', url: CX + '/config-basic', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cx-10',
    index: 10,
    title: 'O fluxo básico de tarefa: prompt → plano → diff → aceitar',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'O ciclo completo com checkpoint de Git antes e depois.',
    concept:
      'O ciclo saudável de qualquer tarefa no Codex: (1) working tree limpa — commit ou stash antes; (2) prompt com contexto, objetivo e critério de aceite; (3) para tarefas médias+, plano primeiro — revise a abordagem antes do código; (4) execução; (5) revisão do diff arquivo a arquivo — o app torna isso agradável, aceite/rejeite por partes; (6) validação real (testes, rodar o app); (7) commit atômico. O Git como checkpoint é inegociável: com working tree limpa, qualquer desastre se resolve com git checkout — a rede de segurança que permite ousadia.',
    deepDive: [
      'Nunca deixe o agente trabalhar sobre mudanças suas não commitadas — o diff mistura autorias e a revisão vira arqueologia.',
      'Rejeitar parcialmente é habilidade: aceite os 80% bons, rejeite o resto com feedback específico, itere.',
      'O critério de aceite no prompt ("testes X passam, lint limpo") permite ao agente se autoverificar antes de te entregar.',
    ],
    pitfalls: [
      'Aceitar diffs por cansaço no arquivo 14 de 20 — se a revisão cansa, a tarefa era grande demais.',
      'Pular a validação real porque "o diff parecia certo".',
    ],
    practiceSteps: [
      'Execute 5 tarefas seguindo o ciclo completo à risca, sem atalhos.',
      'Pratique rejeição parcial com feedback num diff multi-arquivo.',
    ],
    projectContext:
      'Este ciclo É o slide central do treinamento de cliente — método simples que transforma a percepção de risco em processo controlado.',
    references: [
      { label: 'Docs — primeiros passos', url: CX + '/quickstart', kind: 'doc' },
      { label: 'Docs — features da CLI', url: CX + '/cli/features', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'cx-11',
    index: 11,
    title: '/model e reasoning: escolher o cérebro por tarefa',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Trocar modelo na sessão, subir reasoning para o difícil e o custo de cada tier.',
    concept:
      'O /model na sessão troca o modelo e o nível de reasoning — o esforço de raciocínio que o modelo dedica antes de responder. A mecânica de custo: reasoning alto = mais tokens de pensamento = mais qualidade em problemas difíceis E mais custo/latência. Heurística de campo: reasoning padrão para o dia a dia; alto para arquitetura, bugs profundos e migrações delicadas; baixo/mini para tarefas mecânicas em volume. Igual ao Claude Code: quem opera perto do teto do plano vive dessa alavanca.',
    deepDive: [
      'O padrão "pensa caro, executa barato" vale aqui: reasoning alto no planejamento, normal na execução do plano aprovado.',
      'Modelos evoluem rápido (a família GPT-5.x-codex tem tiers) — cheque o docs/changelog em vez de decorar nomes.',
      'Defina o default do time no config.toml e trate o tier alto como decisão consciente, não hábito.',
    ],
    pitfalls: [
      'Reasoning máximo para renomear variáveis — queima franquia sem retorno.',
      'Culpar o modelo por falhar num problema difícil rodado em reasoning mínimo.',
    ],
    practiceSteps: [
      'Rode o mesmo bug difícil em reasoning baixo e alto; compare o diagnóstico.',
      'Escreva a matriz tarefa → modelo/reasoning do time.',
    ],
    projectContext:
      'Gestão de custo por tarefa entra no playbook do cliente — franquia bem gasta é adoção que se sustenta.',
    references: [{ label: 'Docs — modelos do Codex', url: CX + '/models', kind: 'doc' }],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'cx-12',
    index: 12,
    title: 'Codex Cloud: environments e delegação',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Conectar GitHub, configurar setup do ambiente e acompanhar tasks pelos logs.',
    concept:
      'O Codex Cloud executa tarefas em containers na infra da OpenAI: você conecta o GitHub, configura o environment do repo (imagem, setup script que instala dependências, variáveis/segredos) e delega — o agente clona, trabalha, roda verificações e propõe um PR. O environment é onde os projetos vivem ou morrem: setup que não reproduz o build do repo gera agente trabalhando às cegas. Logs de execução acompanham cada task; várias tasks rodam em paralelo, e é aí que o Cloud paga: fila de tarefas pequenas despachadas de manhã, PRs revisados à tarde.',
    deepDive: [
      'Setup script é a alma: instale deps, prepare o banco de teste, garanta que a suíte roda — invista aqui antes de delegar qualquer coisa.',
      'Segredos entram como variáveis do environment, nunca no prompt; acesso à internet do container é configurável (e restrito por padrão).',
      'Da CLI dá para delegar e puxar o diff do Cloud para o working tree local — o híbrido local/nuvem.',
    ],
    pitfalls: [
      'Delegar para um environment que nunca rodou os testes com sucesso — valide o setup primeiro.',
      'Mandar tarefa que exige decisões de produto para execução assíncrona sem contexto.',
    ],
    practiceSteps: [
      'Configure o environment de um repo de teste até a suíte passar no container.',
      'Delegue 3 tarefas pequenas em paralelo e revise os PRs resultantes.',
    ],
    projectContext:
      'Cloud é a resposta para o backlog de tarefas pequenas do cliente: dezenas de fixes delegados sem ocupar máquina de consultor.',
    references: [
      { label: 'Docs — Codex Cloud', url: CX + '/cloud', kind: 'doc' },
      { label: 'Docs — Codex na nuvem (environments)', url: CX + '/cloud', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'cx-13',
    index: 13,
    title: '@codex em PRs: delegar direto do GitHub',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Acionar o agente por comentário em PR e issue.',
    concept:
      'Com a integração GitHub instalada, um comentário mencionando @codex numa PR ou issue aciona o agente no Cloud: "@codex corrija os testes que falharam", "@codex aplique as sugestões desta revisão", "@codex implemente esta issue". O agente responde no próprio thread com o resultado e atualiza/abre o PR. É o Codex operando no fluxo que o time do cliente JÁ usa — sem terminal, sem app, sem treinamento novo. Combinado com o code review automático de PRs, fecha o ciclo: o agente escreve, revisa e corrige dentro do GitHub.',
    deepDive: [
      'Qualidade da menção = qualidade do resultado: comentário com contexto e critério supera "@codex arruma isso".',
      'Governança: defina quem pode acionar e em quais repos — cada menção consome franquia/créditos.',
      'O review automático do Codex em PRs (habilitável por repo) pega bugs reais antes do revisor humano — configure os dois juntos.',
    ],
    pitfalls: [
      'Habilitar em todos os repos sem comunicar o time — agente surpresa em PR alheio gera atrito.',
      'Usar em PRs gigantes onde nem humano consegue revisar direito.',
    ],
    practiceSteps: [
      'Instale a integração num repo de teste e acione @codex numa issue simples.',
      'Habilite o code review automático e avalie os apontamentos em 3 PRs.',
    ],
    projectContext:
      'É o mecanismo de escala da implantação: o time inteiro do cliente delegando pelo GitHub enquanto só os power users usam CLI.',
    references: [
      { label: 'Docs — integração GitHub', url: CX + '/integrations/github', kind: 'doc' },
      { label: 'Docs — code review no GitHub', url: CX + '/integrations/github', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'cx-14',
    index: 14,
    title: 'Code review integrado: diff, staging seletivo e revert',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Painel de diff do app, corrigir clicando na linha e o botão de voltar.',
    concept:
      'O painel de revisão do app desktop é o melhor argumento visual do Codex: diff lado a lado por arquivo, staging seletivo (aceite este arquivo, rejeite aquele, aceite metade deste), clique na linha problemática para pedir correção pontual ("use early return aqui") e revert de mudanças com um botão. Isso transforma revisão de código de agente — a atividade nova mais importante do fluxo — numa experiência de apontar e corrigir, acessível até para quem revisaria com preguiça no terminal.',
    deepDive: [
      'Revisar por arquivo com aceite parcial cria o hábito certo: nada entra em bloco por inércia.',
      'O comentário na linha vira instrução cirúrgica — feedback específico ensina o agente melhor que reprovação genérica.',
      'Revert integrado + Git limpo = experimentação barata: teste a abordagem do agente sabendo que voltar custa um clique.',
    ],
    pitfalls: [
      'Aceitar tudo em bloco — o painel existe exatamente para evitar isso.',
      'Revisar só o diff e nunca rodar o código.',
    ],
    practiceSteps: [
      'Numa tarefa multi-arquivo, pratique: aceitar 1 arquivo, rejeitar 1, corrigir 1 via comentário na linha.',
      'Use o revert para descartar uma abordagem inteira e re-prompte melhor.',
    ],
    projectContext:
      'No treinamento, esta é a tela que converte céticos: mostra que o humano segue no controle de cada linha.',
    references: [{ label: 'Docs — Codex App (review)', url: CX + '/app', kind: 'doc' }],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'cx-15',
    index: 15,
    title: 'Worktrees no app: agentes paralelos sem colisão',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Clonar branch em worktree paralelo e gerenciar pela sidebar.',
    concept:
      'O app desktop tem worktrees como recurso nativo: ao iniciar uma thread, você escolhe rodá-la num worktree — o app cria o diretório paralelo na branch indicada e o agente trabalha isolado, sem tocar no seu checkout principal. A sidebar mostra e gerencia os worktrees ativos. É o mesmo padrão do Claude Code (dois+ agentes no mesmo repo sem colisão), mas com a mecânica de git worktree abstraída em cliques — o que o torna ensinável para perfis que nunca digitariam o comando.',
    deepDive: [
      'Padrão de uso: thread A (feature) em worktree + thread B (hotfix) em worktree + seu checkout principal intocado para revisar.',
      'Cada worktree ainda precisa do setup de deps — o terminal embutido resolve sem sair do app.',
      'Finalizou: mergeie a branch e remova o worktree pela própria interface; sem órfãos acumulando.',
    ],
    pitfalls: [
      'Duas threads na mesma branch sem worktree — a colisão clássica que o recurso existe para evitar.',
      'Worktrees demais simultâneos: revisar 5 frentes vira o gargalo.',
    ],
    practiceSteps: [
      'Rode duas threads em worktrees paralelos e mergeie as duas ao final.',
      'Ensine o fluxo para alguém do time só com a interface do app.',
    ],
    projectContext:
      'Paralelismo com segurança é o que permite à consultoria prometer throughput: N tarefas simultâneas por consultor, sem bagunça de repo.',
    references: [
      { label: 'Docs — Codex App (worktrees)', url: CX + '/app', kind: 'doc' },
      {
        label: 'git worktree (referência)',
        url: 'https://git-scm.com/docs/git-worktree',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'cx-16',
    index: 16,
    title: 'Limites e consumo: créditos, medição e teto',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'Franquia por plano, ver quanto gastou e o que fazer quando acaba.',
    concept:
      'Cada plano ChatGPT traz uma franquia de uso do Codex (com créditos adicionais compráveis conforme o tier); o consumo aparece nas configurações da conta/status da sessão. O que acelera o gasto é o mesmo trio de sempre: modelo/reasoning alto, contexto inchado e tarefas em loop sem critério de parada. Quando o cliente bate o teto: primeiro higiene (modelo certo, threads focadas, MCPs enxutos), depois redistribuição (tarefas em lote para horários/keys de API), e só então upgrade — na ordem inversa você vende plano para pagar desperdício.',
    deepDive: [
      'Uso local e Cloud saem da mesma conta — times que adotam Cloud pesado precisam re-dimensionar.',
      'API key como válvula: automações e picos vão para pay-per-token, preservando a franquia interativa.',
      'Monitore padrões, não só totais: um dev gastando 5x a média geralmente tem um hábito corrigível (sessão épica, reasoning sempre no máximo).',
    ],
    pitfalls: [
      'Responder "compre mais créditos" antes de auditar higiene de uso.',
      'Não perceber que o review automático de PRs também consome.',
    ],
    practiceSteps: [
      'Localize e interprete seu consumo do ciclo atual.',
      'Audite seu maior consumidor de tokens da semana e corrija o hábito.',
    ],
    projectContext:
      'Relatório mensal de consumo × valor entregue é ferramenta de renovação de contrato — torna o ROI visível.',
    references: [
      { label: 'Docs — planos e uso', url: CX + '/pricing', kind: 'doc' },
      { label: 'Central de ajuda OpenAI', url: 'https://help.openai.com/', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 20,
  },
  {
    id: 'cx-17',
    index: 17,
    title: 'Slash commands e atalhos da TUI',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Os comandos do dia a dia dentro da CLI.',
    concept:
      'Fluência na TUI do Codex: /model (modelo/reasoning), /init (gera AGENTS.md), /status (sessão, auth, consumo), /diff (mudanças pendentes), /review (aciona revisão do trabalho), /compact (resume o histórico), /mcp (servidores conectados), /skills (habilidades disponíveis), além de Esc para interromper e o histórico de prompts navegável. São 30 minutos de prática deliberada que mudam permanentemente a velocidade de operação — e o /help lista tudo quando a memória falhar.',
    deepDive: [
      '/review antes de encerrar a tarefa: o agente revisa o próprio diff contra o pedido — pega esquecimentos baratos.',
      '/diff a qualquer momento mantém você ancorado no que realmente mudou, não no que a conversa diz que mudou.',
      'Interromper cedo (Esc) quando a direção está errada é a economia de tokens mais subestimada.',
    ],
    pitfalls: [
      'Operar meses sem nunca abrir o /help e descobrir os comandos.',
      'Deixar o agente concluir 10 minutos de caminho errado por não interromper.',
    ],
    practiceSteps: [
      'Percorra o /help e teste cada comando uma vez.',
      'Incorpore /diff + /review ao ritual de fim de tarefa por uma semana.',
    ],
    projectContext:
      'A sessão de atalhos é módulo fixo do treinamento — fluência visível gera confiança do cliente na ferramenta.',
    references: [
      { label: 'Docs — slash commands', url: CX + '/cli/slash-commands', kind: 'doc' },
      { label: 'Docs — referência CLI', url: CX + '/cli/reference', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 20,
  },
  {
    id: 'cx-18',
    index: 18,
    title: 'Retomar threads e o que persiste',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Histórico, continuar tarefa de dias atrás e resume/fork de sessões.',
    concept:
      'Sessões do Codex persistem: codex resume lista e retoma conversas anteriores (a mais recente com --last), e dá até para bifurcar uma sessão antiga em nova thread preservando o transcript. No app, a sidebar é o histórico navegável. As mesmas leis do Claude Code se aplicam: o histórico recupera contexto conversacional, mas a fonte de verdade de estado de trabalho deve viver em arquivos (PROGRESS.md) e no Git — porque repo muda por fora e resumo de conversa envelhece. Retome com "resuma onde paramos e valide contra o estado atual do repo".',
    deepDive: [
      'Nomeie tarefas claramente na primeira mensagem — é o que você vai procurar na lista daqui a duas semanas.',
      'Fork de sessão é ótimo para "e se": explore uma alternativa a partir do ponto X sem poluir a thread original.',
      'Handover entre consultores = arquivos + AGENTS.md; histórico de thread é pessoal e não transfere.',
    ],
    pitfalls: [
      'Retomar uma thread de 2 semanas e confiar cegamente no contexto dela sobre um repo que mudou.',
      'Usar o histórico como documentação do projeto.',
    ],
    practiceSteps: [
      'Interrompa uma tarefa, feche tudo e retome no dia seguinte com resume + validação.',
      'Bifurque uma sessão para testar uma abordagem alternativa.',
    ],
    projectContext:
      'O ritual de retomada padronizado mantém a produtividade num contexto multi-cliente com interrupções constantes.',
    references: [{ label: 'Docs — CLI (sessões)', url: CX + '/cli', kind: 'doc' }],
    xp: 45,
    estMinutes: 20,
  },
  {
    id: 'cx-19',
    index: 19,
    title: 'Codex para não-código',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Organizar arquivos, limpar datasets e comparar documentos — para o cliente não-dev.',
    concept:
      'Codex é um agente de COMPUTADOR, não só de código: aponte-o para uma pasta e ele organiza arquivos por regra, renomeia em lote, converte formatos, limpa um CSV bagunçado (encoding, duplicatas, colunas), compara duas versões de contrato e resume as diferenças, extrai dados de dezenas de documentos para uma planilha. Para consultoria de mapeamento de processos, esse é o caso de uso que impressiona o cliente operacional — a automação de esteira administrativa sem escrever um sistema.',
    deepDive: [
      'O padrão vencedor: peça um script reutilizável em vez de ação única — a limpeza do CSV de hoje vira a rotina de todo mês.',
      'Sandbox ajuda aqui: workspace-write na pasta de trabalho limita o raio de ação sobre arquivos pessoais.',
      'Sempre com backup/cópia: operações em lote sobre arquivos não têm o undo natural do Git.',
    ],
    pitfalls: [
      'Rodar renomeação em massa direto na pasta original sem cópia.',
      'Esquecer que dados sensíveis em arquivos processados seguem as mesmas regras de compliance do código.',
    ],
    practiceSteps: [
      'Dê ao agente uma pasta de downloads caótica e peça organização por regra explícita.',
      'Limpe um CSV real (encoding, duplicatas, normalização) e transforme em script reutilizável.',
    ],
    projectContext:
      'Demonstração matadora no discovery: pegar uma dor administrativa real do cliente e resolvê-la ao vivo em 10 minutos.',
    references: [
      { label: 'Docs — casos de uso', url: CX, kind: 'doc' },
      { label: 'OpenAI Academy', url: 'https://academy.openai.com/', kind: 'curso' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'cx-20',
    index: 20,
    title: 'MCP no Codex',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'codex mcp add, conectar servidores e as diferenças para o MCP do Claude Code.',
    concept:
      'O Codex fala MCP como cliente: codex mcp add nome -- comando conecta servidores stdio, e servidores remotos/HTTP entram via configuração — com codex mcp list/remove/login gerenciando o conjunto. Os servidores são os MESMOS do ecossistema (Supabase, GitHub, filesystem, Playwright…): o investimento em MCP transfere entre agentes, mudando só a camada de configuração (config.toml aqui, .mcp.json lá). Diferença notável: o Codex também roda como SERVIDOR MCP (codex mcp-server), permitindo que outros agentes o orquestrem — peça avançada para arquiteturas multi-agente.',
    deepDive: [
      'A config vive no config.toml — versionável via dotfiles/template para padronizar o time.',
      'Mesma economia de contexto: cada servidor injeta definições de tools; conecte por necessidade da sessão.',
      'Auth de servidores remotos: codex mcp login nome renova OAuth expirado.',
    ],
    pitfalls: [
      'Reaprender tudo como se fosse outro protocolo — é o mesmo MCP; muda a sintaxe de registro.',
      'Carregar no Codex os 5 MCPs que você usava noutro agente sem reavaliar necessidade.',
    ],
    practiceSteps: [
      'Conecte o mesmo servidor (ex: Supabase) no Codex e no Claude Code; compare o registro.',
      'Explore codex mcp-server e descreva um caso onde Codex-como-servidor faria sentido.',
    ],
    projectContext:
      'A camada MCP desenhada para o cliente é agnóstica de agente — argumento de arquitetura que protege o investimento dele.',
    references: [
      { label: 'Docs — MCP no Codex', url: CX + '/mcp', kind: 'doc' },
      { label: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'cx-21',
    index: 21,
    title: 'Hooks no Codex',
    priority: 'baixa',
    type: 'pratica',
    shortDescription:
      'Eventos de lifecycle — e o truque de pedir ao próprio Codex para escrever o hook.',
    concept:
      'Assim como no Claude Code, o Codex expõe hooks em eventos do ciclo de vida do agente — pontos de intervenção determinística para validar, bloquear ou reagir a ações (formatar após edição, notificar ao concluir, barrar comandos proibidos). A configuração vive no config.toml, e o meta-truque que economiza uma hora de documentação: peça ao próprio Codex "leia a documentação de hooks e configure um hook que rode o lint após cada edição de arquivo" — o agente escreve e testa a própria automação.',
    deepDive: [
      'Mesma regra de ouro: garantia inegociável = hook; preferência = AGENTS.md.',
      'Hooks lentos em eventos frequentes degradam toda a sessão — meça antes de adotar.',
      'Combine com regras de permissão: hook valida conteúdo, permissão controla capacidade.',
    ],
    pitfalls: [
      'Duplicar em hook o que a permissão/sandbox já garante.',
      'Hook silencioso que falha sem log — sempre registre o que foi bloqueado e por quê.',
    ],
    practiceSteps: [
      'Peça ao Codex para configurar um hook de lint pós-edição e valide funcionando.',
      'Crie um hook de notificação de fim de tarefa.',
    ],
    projectContext:
      'Hooks empacotam o enforcement das regras do cliente no ambiente — governança que roda sozinha.',
    references: [{ label: 'Docs — hooks', url: CX + '/hooks', kind: 'doc' }],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'cx-22',
    index: 22,
    title: 'config.toml avançado e instalação não-interativa',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'CODEX_HOME, CODEX_API_KEY, perfis e provisionamento de máquinas.',
    concept:
      'O ~/.codex/config.toml centraliza tudo: modelo default, sandbox, regras de permissão, MCPs, hooks, perfis nomeados (conjuntos de config chaveáveis por --profile) e knobs como os nomes alternativos de AGENTS.md. CODEX_HOME redireciona o diretório inteiro — a chave para perfis isolados (um por cliente!) e para automação; CODEX_API_KEY autentica sem fluxo interativo. Com esses dois, o provisionamento de máquina nova vira script: copiar config, setar envs, pronto — o setup da consultoria reproduzido em minutos.',
    deepDive: [
      'Perfis: profile "cliente-x" com modelo, permissões e MCPs próprios — troca de contexto sem editar config.',
      'Overrides pontuais com -c chave=valor na linha de comando vencem o arquivo — bom para exceções sem tocar no padrão.',
      'Versione um config.toml template (sem segredos) no repositório de dotfiles do time.',
    ],
    pitfalls: [
      'Segredos no config versionado.',
      'Um único perfil global para 4 clientes com políticas diferentes.',
    ],
    practiceSteps: [
      'Crie dois perfis (padrão e cliente-restrito) e alterne entre eles.',
      'Escreva o script de provisionamento: instala CLI + aplica config + valida com codex --version.',
    ],
    projectContext:
      'Setup-como-código é maturidade operacional: onboarding de consultor novo (ou máquina nova) em 10 minutos.',
    references: [
      { label: 'Docs — config básica', url: CX + '/config-basic', kind: 'doc' },
      { label: 'Docs — config avançada', url: CX + '/config-advanced', kind: 'doc' },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'cx-23',
    index: 23,
    title: 'Codex em CI e headless',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'codex exec, saída JSON e o agente como etapa de pipeline.',
    concept:
      'codex exec "prompt" é o modo não-interativo: roda a tarefa e sai, com --json emitindo progresso estruturado e --output-last-message capturando o resultado final — o formato que pipelines consomem. Combinado com CODEX_API_KEY, aprovação never e sandbox adequado ao runner, o Codex vira etapa de CI: gerar changelog no release, auditar convenções em PR, atualizar documentação quando o código muda, triagem de issues. A regra de segurança espelha o Claude Code: autonomia total só em ambiente descartável.',
    deepDive: [
      'Runner de CI é o habitat natural do bypass de aprovações — não há nada pessoal para proteger; ainda assim restrinja rede e escopo.',
      'Custo por execução monitorado desde o dia 1: automação esquecida rodando a cada push é fatura surpresa.',
      'Idempotência: desenhe jobs que podem re-rodar sem efeito colateral duplicado.',
    ],
    pitfalls: [
      'Parsear texto livre em vez de --json.',
      'Job com poder de push direto na main sem revisão humana no caminho.',
    ],
    practiceSteps: [
      'Rode codex exec com --json localmente e inspecione a estrutura de eventos.',
      'Monte um job de CI que comenta um resumo das mudanças em cada PR.',
    ],
    projectContext:
      'Automações headless são a fase 2 do contrato: os processos mapeados na consultoria viram pipelines que rodam sozinhos.',
    references: [
      { label: 'Docs — CLI (codex exec e flags)', url: CX + '/cli/reference', kind: 'doc' },
      { label: 'Docs — referência CLI', url: CX + '/cli/reference', kind: 'doc' },
    ],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'cx-24',
    index: 24,
    title: 'Codex vs Claude Code: o comparativo honesto',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'Forças de cada um e como responder "qual eu uso?" sem religião.',
    concept:
      'A pergunta que todo cliente faz merece resposta de engenheiro, não de torcedor. O quadro honesto: os dois são agentes de primeira linha com paridade conceitual quase total (instruções em arquivo, MCP, sandbox/permissões, subagentes/paralelismo, execução em nuvem, integração GitHub). As diferenças práticas estão em ecossistema e ergonomia: qual assinatura o cliente já paga, qual modelo rende melhor NO CÓDIGO DELE (teste, não assuma), qual superfície o time prefere (app desktop do Codex vs terminal-first do Claude Code), e requisitos de compliance de cada provedor. A resposta profissional frequentemente é "os dois": padronize AGENTS.md/CLAUDE.md e MCPs agnósticos e deixe a escolha por tarefa/preferência.',
    deepDive: [
      'Critérios objetivos de decisão: custo no plano existente, desempenho num piloto de 2 semanas no repo real, integrações necessárias, política de dados aceita pelo jurídico.',
      'O lock-in real não é o agente, é o conhecimento operacional — que este programa transfere para ambos.',
      'Modelos e recursos mudam a cada trimestre: mantenha o comparativo datado e revisitado, nunca "definitivo".',
    ],
    pitfalls: [
      'Responder com preferência pessoal apresentada como fato técnico.',
      'Comparar por benchmark público em vez de piloto no código do cliente.',
    ],
    practiceSteps: [
      'Rode as mesmas 5 tarefas reais nos dois agentes e monte o comparativo com evidências.',
      'Escreva a resposta padrão de 1 página da consultoria para "qual eu uso?".',
    ],
    projectContext:
      'O comparativo com piloto é entregável de discovery — transforma opinião em decisão embasada e cobra-se por isso.',
    references: [
      { label: 'Docs Codex', url: CX, kind: 'doc' },
      {
        label: 'Docs Claude Code',
        url: 'https://code.claude.com/docs/en/overview',
        kind: 'doc',
      },
    ],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'cx-boss',
    index: 25,
    title: 'BOSS: Operador do Codex',
    priority: 'alta',
    type: 'boss',
    shortDescription: 'Desafio final — superfícies, AGENTS.md, sandbox, Cloud e o comparativo.',
    concept:
      'O boss do Codex cobre o que um consultor precisa dominar para implantar a ferramenta: o mapa de superfícies, a hierarquia do AGENTS.md, a matriz sandbox × aprovação, delegação para o Cloud e a resposta madura ao "Codex ou Claude Code?". Acerte 4 de 5 para vencer.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação indica prontidão para conduzir implantação de Codex em cliente, incluindo a conversa de licenciamento.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
