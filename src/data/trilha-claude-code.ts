import type { Topic } from './types'

const D = 'https://code.claude.com/docs/en'
const ACAD = 'https://anthropic.skilljar.com'

export const claudeCodeTopics: Topic[] = [
  {
    id: 'cc-1',
    index: 1,
    title: 'Instalação e atualização em todas as plataformas',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'npm global vs installer nativo, Node 18+, Windows (nativo/WSL), macOS e Linux.',
    concept:
      'O Claude Code roda no terminal e tem dois caminhos de instalação: o installer nativo (curl no macOS/Linux, PowerShell no Windows) e o npm install -g @anthropic-ai/claude-code, que exige Node 18+. No Windows há suporte nativo, mas times com stack Linux costumam preferir WSL2 — e aí vale a regra de ouro: clone os repositórios DENTRO do filesystem do WSL (~/projects), nunca em /mnt/c, para evitar problemas de permissão e I/O lento. Consultor que instala a ferramenta no cliente precisa dominar os três sistemas e o diagnóstico básico (claude doctor, claude --version).',
    deepDive: [
      'Atualização: o CLI se auto-atualiza por padrão; claude update força. Em instalação npm, npm update -g resolve. Verifique a versão com claude --version antes de reportar qualquer bug.',
      'Erros EACCES no npm global: nunca use sudo — configure prefixo npm no home ou use nvm.',
      'claude doctor audita o ambiente: Node, gh CLI, permissões — rode como primeiro passo de qualquer troubleshooting em máquina de cliente.',
    ],
    pitfalls: [
      'Instalar com sudo e criar um problema de permissões permanente.',
      'No Windows+WSL, trabalhar em /mnt/c e sofrer com lentidão e symlinks quebrados.',
    ],
    practiceSteps: [
      'Instale via installer nativo numa máquina e via npm em outra; compare o processo.',
      'Rode claude doctor e resolva qualquer aviso.',
      'Documente o passo a passo de instalação por SO no playbook do time.',
    ],
    projectContext:
      'Onboarding de cliente começa com instalação padronizada — um roteiro por SO evita perder a primeira hora da consultoria com ambiente.',
    references: [
      { label: 'Docs — instalação do Claude Code', url: D + '/setup', kind: 'doc' },
      {
        label: 'Claude Code 101 — Anthropic Academy',
        url: ACAD + '/claude-code-101',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-2',
    index: 2,
    title: 'As 4 superfícies: CLI, Desktop, VS Code e mobile/web',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'O que cada superfície oferece, o que falta em cada e qual indicar por perfil de cliente.',
    concept:
      'O mesmo agente vive em quatro lugares: o CLI no terminal (superfície original, mais completa e scriptável), o app Desktop (sessões paralelas com interface gráfica, ideal para quem não vive no terminal), a extensão VS Code/JetBrains (diffs inline no editor) e o acesso remoto via app mobile/web (acompanhar e dirigir sessões de longe). A recomendação por perfil é decisão de consultoria: dev hardcore → CLI; dev que vive no editor → extensão; gestor técnico ou perfil híbrido → Desktop; todo mundo → mobile para acompanhar tarefas longas.',
    deepDive: [
      'O CLI é a base: tudo que existe nas outras superfícies existe nele; o inverso não é verdade. Automação e CI usam o CLI.',
      'Desktop facilita paralelismo: várias sessões em abas, cada uma com seu diretório — bom para o padrão "vários agentes em worktrees".',
      'A extensão brilha no code review do dia a dia: ver o diff no próprio editor reduz fricção de aceitar/rejeitar mudanças.',
    ],
    pitfalls: [
      'Ensinar o cliente na superfície errada para o perfil dele e gerar rejeição da ferramenta.',
      'Assumir paridade de recursos entre superfícies sem verificar na doc a feature específica.',
    ],
    practiceSteps: [
      'Use as 4 superfícies na mesma semana e anote diferenças percebidas.',
      'Monte uma matriz perfil-de-usuário × superfície recomendada para usar em treinamentos de cliente.',
    ],
    projectContext:
      'Na implantação, a matriz de superfícies define o rollout: quem recebe o quê no time do cliente e qual treinamento cada grupo precisa.',
    references: [
      { label: 'Docs — visão geral do Claude Code', url: D + '/overview', kind: 'doc' },
      { label: 'Docs — Claude Code no VS Code', url: D + '/vs-code', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-3',
    index: 3,
    title: 'Login e planos: conta Claude.ai vs API key',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Pro, Max 5x e Max 20x vs cobrança por token no Console — e quando cada um compensa.',
    concept:
      'Existem dois caminhos de autenticação com modelos de cobrança opostos: logar com a conta Claude.ai (assinatura Pro/Max — custo fixo mensal, limites de uso que resetam em janelas) ou usar API key do Console (pré-pago por token, sem teto de assinatura, custo variável). Para uso individual intenso, Max costuma ser mais barato que API; para automações, CI e produtos, API é o caminho. O consultor precisa saber fazer essa conta com o cliente: volume estimado × modelo × superfície define o plano certo.',
    deepDive: [
      'Pro dá acesso ao Claude Code com limites menores; Max 5x e Max 20x multiplicam a capacidade — quem roda Opus o dia todo precisa de Max 20x ou API.',
      'A mesma instalação alterna: /login troca a conta; variável ANTHROPIC_API_KEY força o modo API (atenção para não deixar setada sem querer e gerar cobrança inesperada).',
      'Em empresas: Team/Enterprise trazem gestão central de assentos; API via Console traz billing por workspace — governança de custo é parte da proposta.',
    ],
    pitfalls: [
      'Deixar ANTHROPIC_API_KEY no ambiente e consumir crédito de API achando que está no plano.',
      'Dimensionar plano pelo preço e não pelo padrão de uso (modelo preferido + horas/dia).',
    ],
    practiceSteps: [
      'Verifique com /status qual autenticação sua sessão está usando.',
      'Simule o custo mensal de um dev usando Sonnet 6h/dia em API vs Max — apresente a conta.',
    ],
    projectContext:
      'Toda proposta de implantação inclui a seção "licenciamento e custos" — dominar esses dois caminhos evita surpresa de fatura no cliente.',
    references: [
      { label: 'Docs — planos e setup', url: D + '/setup', kind: 'doc' },
      { label: 'Planos e preços do Claude', url: 'https://claude.com/pricing', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-4',
    index: 4,
    title: 'Limites de uso na prática: janelas, /usage e /cost',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Janela de 5h, limite semanal, o que consome mais rápido e o que fazer ao bater o teto.',
    concept:
      'Assinaturas funcionam com janelas: um limite que reseta a cada 5 horas e um teto semanal adicional para os planos maiores. O que consome não é "número de mensagens", é tokens processados — então sessões com contexto inchado, MCPs pesados e Opus queimam o limite muito mais rápido que sessões enxutas com Sonnet. Os comandos /usage (quanto do plano foi consumido, quando reseta) e /cost (custo da sessão em modo API) são o painel de controle. Cliente que "bateu o teto" é chamado de suporte clássico: a resposta certa quase sempre é higiene de contexto + modelo adequado, não upgrade de plano.',
    deepDive: [
      'Ordem de consumo: Opus > Sonnet > Haiku por token, e cada token do contexto conta em CADA turno — contexto de 100k tokens torna cada interação cara.',
      'Estratégia de teto: trocar para Sonnet nas tarefas rotineiras, compactar sessões, desconectar MCPs ociosos e agendar tarefas pesadas para depois do reset.',
      'Auto-compact dispara perto do limite de contexto, mas não do limite do plano — são tetos diferentes; /usage mostra o do plano.',
    ],
    pitfalls: [
      'Diagnosticar "limite atingido" como problema de plano quando é sessão de 200k tokens com 5 MCPs conectados.',
      'Rodar Opus para renomear variáveis.',
    ],
    practiceSteps: [
      'Rode /usage agora e interprete cada linha.',
      'Compare o consumo de uma mesma tarefa em Opus vs Sonnet.',
      'Escreva as 3 regras de economia de limite do seu time.',
    ],
    projectContext:
      'Governança de uso vira slide no treinamento de cliente: times que aprendem higiene de contexto gastam 3-5x menos para o mesmo resultado.',
    references: [
      { label: 'Docs — custos e uso', url: D + '/costs', kind: 'doc' },
      {
        label: 'Central de ajuda — limites de uso',
        url: 'https://support.claude.com/',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-5',
    index: 5,
    title: 'Janela de contexto no Claude Code: /context e sintomas',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'O que ocupa espaço (arquivos, bash, MCPs), como auditar e como reconhecer contexto cheio.',
    concept:
      'Dentro de uma sessão do Claude Code, o contexto acumula: system prompt, CLAUDE.md, definições de ferramentas de cada MCP conectado, cada arquivo lido, cada output de comando bash e todo o histórico da conversa. O comando /context abre o raio-x: mostra quanto cada categoria ocupa. Os sintomas de contexto cheio são comportamentais antes de serem erros: o agente esquece instruções do começo, relê arquivos que já leu, mistura tarefas ou fica visivelmente mais lento. Auditar contexto é a habilidade de debug nº 1 do usuário avançado.',
    deepDive: [
      'MCPs são os vilões silenciosos: um servidor com 30 tools pode injetar dezenas de milhares de tokens de definição — visíveis no /context como "tool definitions".',
      'Outputs de bash gigantes (logs, builds) entram inteiros no contexto; redirecione para arquivo e peça para o agente ler só o relevante.',
      'CLAUDE.md conta em toda sessão: mantenha-o denso e curto; detalhe vai para arquivos referenciados sob demanda.',
    ],
    pitfalls: [
      'Pedir "leia o projeto todo" num monorepo — o agente navega melhor lendo sob demanda.',
      'Ignorar os sintomas e culpar o modelo pela degradação.',
    ],
    practiceSteps: [
      'Rode /context no início e no fim de uma sessão de trabalho; compare.',
      'Identifique seu MCP mais pesado e avalie se ele paga o custo.',
      'Provoque um contexto cheio de propósito e observe os sintomas.',
    ],
    projectContext:
      'Ao entregar um setup de agente para o cliente, inclua o "orçamento de contexto": MCPs permitidos, tamanho alvo do CLAUDE.md e o ritual de auditoria.',
    references: [
      { label: 'Docs — como o Claude Code funciona', url: D + '/overview', kind: 'doc' },
      {
        label: 'Context engineering (Anthropic Engineering)',
        url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'cc-6',
    index: 6,
    title: '/compact vs /clear vs sessão nova',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'O que cada um preserva e perde, auto-compact e quando compactar degrada a qualidade.',
    concept:
      '/compact resume a conversa e substitui o histórico pelo resumo — libera espaço mantendo a essência, mas resumos perdem detalhes (decisões sutis, valores exatos). /clear zera o histórico da sessão mantendo o diretório e o CLAUDE.md. Sessão nova recomeça tudo. O auto-compact dispara sozinho perto do limite, muitas vezes no pior momento — usuário avançado compacta proativamente em pontos de pausa natural (fim de uma feature) e passa instruções do que preservar: /compact focando nas decisões de arquitetura. Regra prática: mudou de tarefa → /clear ou sessão nova; mesma tarefa longa → /compact nos marcos.',
    deepDive: [
      'Compactar no meio de um raciocínio complexo degrada: o resumo pode achatar exatamente a nuance que importava. Compacte em fronteiras de tarefa.',
      'Antes de /clear, peça ao agente para gravar o estado num arquivo (PROGRESS.md) — a próxima sessão retoma lendo o arquivo, não a memória.',
      'O histórico de sessões persiste em disco: claude --resume recupera conversas antigas mesmo depois de fechar o terminal.',
    ],
    pitfalls: [
      'Deixar o auto-compact decidir por você no meio de uma migração delicada.',
      'Usar /compact como solução para sessão que já misturou 4 tarefas — nesse ponto, sessão nova com resumo em arquivo é melhor.',
    ],
    practiceSteps: [
      'Numa sessão longa, rode /compact com instrução de foco e avalie o que sobreviveu.',
      'Crie o hábito: fim de tarefa → estado em arquivo → /clear.',
    ],
    projectContext:
      'O ritual de sessão (quando compactar, quando limpar, o que persistir em arquivo) entra no playbook operacional entregue ao time do cliente.',
    references: [
      { label: 'Docs — fluxos comuns', url: D + '/common-workflows', kind: 'doc' },
      {
        label: 'Best practices de Claude Code (Anthropic)',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-7',
    index: 7,
    title: 'CLAUDE.md: a memória em camadas do agente',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Hierarquia global → repo → subpasta, /init, atalho # e CLAUDE.local.md.',
    concept:
      'CLAUDE.md é o arquivo de instruções que o agente lê automaticamente ao iniciar — a memória durável do projeto. Ele é hierárquico: ~/.claude/CLAUDE.md vale para tudo (suas preferências pessoais), o da raiz do repo vale para o projeto (comandos de build/test, convenções, arquitetura), e CLAUDE.md em subpastas adiciona regras locais quando o agente trabalha ali. /init gera um esqueleto analisando o repo; o atalho # durante a conversa adiciona uma memória na hora ("# sempre rode pnpm lint antes de commitar"). CLAUDE.local.md guarda instruções pessoais fora do versionamento.',
    deepDive: [
      'O que escrever em cada nível: global = estilo pessoal e ferramentas da máquina; repo = comandos, arquitetura, convenções, o que NUNCA tocar; subpasta = regras do módulo.',
      'CLAUDE.md bom é denso e verificável: "rode pnpm test, cobertura mínima 80%" > "escreva código de qualidade". Cada linha custa contexto em toda sessão.',
      'Trate como código: versionado, revisado em PR, atualizado quando o agente erra por falta de instrução — errou duas vezes pelo mesmo motivo, vira linha no CLAUDE.md.',
    ],
    pitfalls: [
      'CLAUDE.md de 500 linhas que ninguém mantém — vira ruído caro.',
      'Colocar segredos ou dados sensíveis no arquivo (ele entra no contexto e no repo).',
    ],
    practiceSteps: [
      'Rode /init num repo real e edite o resultado até ficar enxuto e verificável.',
      'Use # três vezes hoje para capturar regras que você repetiria.',
      'Crie um template de CLAUDE.md padrão da consultoria para novos projetos de cliente.',
    ],
    projectContext:
      'O CLAUDE.md é entregável: um repo de cliente bem instruído continua produtivo depois que a consultoria sai — é conhecimento institucionalizado.',
    references: [
      { label: 'Docs — memória (CLAUDE.md)', url: D + '/memory', kind: 'doc' },
      {
        label: 'Best practices (Anthropic Engineering)',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'cc-8',
    index: 8,
    title: 'Configurar MCP: escopos, .mcp.json e servidores remotos',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'claude mcp add, escopos local/project/user, stdio vs remoto e OAuth.',
    concept:
      'claude mcp add conecta servidores MCP ao agente em três escopos: local (só você, só este projeto), project (gravado em .mcp.json, versionado no repo — todo o time ganha o servidor ao clonar) e user (todas as suas sessões). Servidores stdio rodam localmente como processo (ex: um servidor de filesystem); servidores remotos (HTTP/SSE) vivem na nuvem e autenticam via OAuth no primeiro uso (ex: Supabase, Sentry, Linear). O escopo project é o segredo da padronização em consultoria: o .mcp.json commitado transforma "configurar ambiente" em "clonar e usar".',
    deepDive: [
      'Sintaxe típica: claude mcp add --scope project nome -- npx -y pacote-servidor (stdio) ou claude mcp add --transport http nome URL (remoto).',
      'OAuth em remoto: o /mcp lista servidores e permite autenticar/reautenticar quando o token expira.',
      'Envs e segredos: servidores stdio recebem variáveis de ambiente na configuração — segredos ficam fora do .mcp.json versionado (use referências a env).',
    ],
    pitfalls: [
      'Commitar tokens no .mcp.json — versione a configuração, nunca as credenciais.',
      'Adicionar no escopo user um servidor que só faz sentido num projeto — e pagar o contexto dele em toda sessão.',
    ],
    practiceSteps: [
      'Adicione um servidor em cada escopo e observe onde a config foi gravada.',
      'Configure o MCP do Supabase (remoto, OAuth) e liste tabelas de um projeto de teste.',
      'Monte o .mcp.json padrão dos projetos da consultoria.',
    ],
    projectContext:
      'Em cada projeto de cliente, o .mcp.json versionado define a "camada de integração" oficial do agente — auditável e reproduzível.',
    references: [
      { label: 'Docs — MCP no Claude Code', url: D + '/mcp', kind: 'doc' },
      { label: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'cc-9',
    index: 9,
    title: 'Debugar MCP: conexão, logs e inchaço de contexto',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Servidor que não conecta, /mcp para status, e quando desconectar é a resposta.',
    concept:
      'MCP quebrado tem três famílias de problema: não conecta (comando errado, dependência ausente, porta/URL errada), conecta mas falha nas chamadas (auth expirada, permissões) e conecta mas piora o agente (contexto inchado, tools demais confundindo a seleção). O /mcp é o painel: status de cada servidor, tools expostas e reautenticação. Para stdio, rodar o comando do servidor manualmente no terminal revela o erro real; claude --debug mostra o handshake. E existe o diagnóstico contra-intuitivo: às vezes o melhor debug é desconectar — servidor que injeta 20k tokens e é usado uma vez por semana custa mais do que entrega.',
    deepDive: [
      'Checklist stdio: o comando roda sozinho no terminal? O binário está no PATH? As envs necessárias existem na config?',
      'Checklist remoto: URL correta? OAuth válido (reautentique via /mcp)? O serviço está de pé?',
      'Inchaço: compare /context com e sem o servidor; alguns servidores permitem expor subconjunto de tools — prefira isso a tudo-ligado.',
    ],
    pitfalls: [
      'Debugar dentro do agente o que é erro de ambiente — teste o servidor isolado primeiro.',
      'Manter 5 MCPs conectados "por via das dúvidas" em toda sessão.',
    ],
    practiceSteps: [
      'Quebre um MCP de propósito (env faltando) e pratique o diagnóstico completo.',
      'Meça no /context o custo de cada servidor que você usa e corte um.',
    ],
    projectContext:
      'Suporte pós-implantação em cliente é 50% isso: dominar o fluxo de diagnóstico transforma chamados de horas em minutos.',
    references: [
      { label: 'Docs — MCP (troubleshooting)', url: D + '/mcp', kind: 'doc' },
      {
        label: 'MCP — debugging (spec oficial)',
        url: 'https://modelcontextprotocol.io/docs/tools/debugging',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'cc-10',
    index: 10,
    title: 'Permissões: default, auto-accept, allowlists e a flag perigosa',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Shift+Tab, /permissions, allowlist/denylist e por que quase nunca usar --dangerously-skip-permissions.',
    concept:
      'Por padrão o agente pede aprovação para ações com efeito colateral (editar arquivos, rodar comandos). Shift+Tab alterna os modos: default → auto-accept (edições aprovadas automaticamente) → plan mode (só planeja, não executa). O /permissions configura regras finas: allowlist de comandos sempre permitidos (ex: Bash(pnpm test:*)), denylist do que nunca pode (ex: Bash(rm -rf:*)). A flag --dangerously-skip-permissions remove TODAS as guardas — só é aceitável em containers descartáveis sem acesso a nada importante, nunca na máquina com as credenciais do cliente.',
    deepDive: [
      'Filosofia: permissões são o "contrato de autonomia" — comece restritivo, libere o que o agente provou fazer bem (testes, lint, git status).',
      'Regras vivem no settings.json (projeto ou global) — versionadas, o time inteiro herda a mesma política.',
      'Auto-accept ≠ sem revisão: você ainda revisa o diff no fim; só elimina os cliques intermediários.',
    ],
    pitfalls: [
      'Rodar --dangerously-skip-permissions no laptop com AWS creds, SSH keys e o banco do cliente acessível.',
      'Allowlist genérica demais (Bash(*)) que anula o sistema.',
    ],
    practiceSteps: [
      'Configure allowlist para seus comandos de teste/lint e denylist para destrutivos.',
      'Trabalhe um dia em auto-accept com revisão final de diff e avalie o ganho.',
    ],
    projectContext:
      'A política de permissões versionada é parte da governança que a consultoria entrega — é a resposta à pergunta "e se a IA fizer besteira?" do cliente.',
    references: [
      { label: 'Docs — settings e permissões', url: D + '/settings', kind: 'doc' },
      { label: 'Docs — segurança', url: D + '/security', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'cc-11',
    index: 11,
    title: 'Plan mode a fundo',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Forçar planejamento, revisar o plano antes de executar e quando isso paga.',
    concept:
      'Plan mode (Shift+Tab duas vezes ou claude --permission-mode plan) trava o agente em modo somente-leitura: ele explora o código, pensa e produz um plano — sem editar nada até você aprovar. É a ferramenta de maior alavancagem para tarefas grandes: revisar um plano de 20 linhas custa 2 minutos; reverter uma implementação errada de 40 arquivos custa uma tarde. O fluxo profissional para qualquer mudança não-trivial: plan mode → ler o plano de verdade → corrigir o plano (não o código) → aprovar → executar.',
    deepDive: [
      'O plano é o ponto de intervenção barato: peça alternativas ("proponha 2 abordagens com trade-offs") antes de aprovar.',
      'Saída do plan mode: ao aprovar, o agente executa o plano; você pode voltar ao plan mode a qualquer momento para replanejar.',
      'Combina com "pensar mais": para problemas difíceis, pedir raciocínio estendido no planejamento melhora a qualidade da arquitetura proposta.',
    ],
    pitfalls: [
      'Aprovar planos sem ler — o modo só protege quem revisa.',
      'Usar plan mode para trocar uma string (overhead sem ganho).',
    ],
    practiceSteps: [
      'Execute uma feature média inteira via plan mode e conte quantas correções você fez no plano.',
      'Defina no time o critério: acima de X arquivos ou tocando módulo crítico → plan mode obrigatório.',
    ],
    projectContext:
      'Em código de cliente, plan mode é a diferença entre "a IA mexeu no sistema" e "aprovamos um plano e a IA executou" — auditabilidade que fecha contratos.',
    references: [
      { label: 'Docs — modos de permissão', url: D + '/settings', kind: 'doc' },
      {
        label: 'Best practices (plan first)',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-12',
    index: 12,
    title: 'Slash commands e atalhos do dia a dia',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      '/model, /resume, /rewind, /init, /agents, /hooks, Esc, Esc duplo e ! para bash.',
    concept:
      'Fluência no Claude Code é muscle memory de meia dúzia de atalhos: /model troca o modelo na hora; /resume lista sessões antigas; /rewind volta o estado do código e da conversa a um checkpoint anterior (o desfazer do agente); /init gera CLAUDE.md; /agents gerencia subagentes; /hooks configura automações. Esc interrompe o agente no meio da ação (sem matar a sessão); Esc duplo abre o histórico para voltar a uma mensagem anterior e bifurcar dali; ! na frente de um texto roda bash direto, sem gastar turno do agente.',
    deepDive: [
      '/rewind é subestimado: checkpoints automáticos permitem experimentar com coragem — se a direção deu errado, volta em segundos.',
      '! serve para você inspecionar (git status, ls) sem poluir o fluxo do agente com pedidos triviais.',
      'Esc no momento certo economiza tokens e tempo: viu que o agente entendeu errado no segundo 5, interrompa no segundo 5.',
    ],
    pitfalls: [
      'Não conhecer /rewind e refazer manualmente o que um checkpoint resolveria.',
      'Deixar o agente terminar 10 minutos de trabalho errado por não usar Esc.',
    ],
    practiceSteps: [
      'Pratique deliberadamente: interrompa com Esc, bifurque com Esc duplo, volte com /rewind.',
      'Liste seus 8 comandos mais usados e cole no monitor por uma semana.',
    ],
    projectContext:
      'No treinamento de cliente, uma sessão de 30 minutos só de atalhos multiplica a adoção — fluência percebida vira confiança na ferramenta.',
    references: [
      { label: 'Docs — modo interativo', url: D + '/interactive-mode', kind: 'doc' },
      { label: 'Docs — comandos e slash commands', url: D + '/commands', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'cc-13',
    index: 13,
    title: 'Retomar trabalho: --continue, --resume e persistência',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'O que persiste entre sessões e como voltar exatamente de onde parou.',
    concept:
      'claude --continue reabre a última sessão do diretório atual; claude --resume lista todas as sessões anteriores para escolher. O histórico completo persiste em disco — fechar o terminal não perde nada. Mas atenção ao que NÃO persiste automaticamente: o estado mental "do que falta fazer" fica muito mais robusto num arquivo (TODO.md/PROGRESS.md) do que no histórico da conversa, porque arquivo sobrevive a compactações e é legível por qualquer sessão nova. O padrão profissional combina os dois: --resume para contexto, arquivo de progresso como fonte de verdade.',
    deepDive: [
      'Sessões são por diretório: o mesmo repo acumula um histórico navegável — nomeie tarefas claramente na primeira mensagem para achá-las depois.',
      'Ao retomar dias depois, primeiro peça: "resuma onde paramos e o que falta" — valida se o contexto retomado ainda condiz com o repo.',
      'Para handover entre consultores: arquivo de progresso + CLAUDE.md transferem o trabalho; histórico de sessão é pessoal.',
    ],
    pitfalls: [
      'Confiar no histórico como única memória de um projeto de semanas.',
      'Retomar sessão antiga depois que o repo mudou muito por fora — o contexto mente.',
    ],
    practiceSteps: [
      'Encerre uma tarefa no meio, feche tudo, e retome no dia seguinte com --resume + arquivo de progresso.',
      'Padronize o PROGRESS.md nos projetos do time.',
    ],
    projectContext:
      'Consultoria troca de contexto o dia todo (3 clientes/dia) — o ritual de retomada é o que mantém a produtividade real.',
    references: [
      { label: 'Docs — fluxos comuns (resume)', url: D + '/common-workflows', kind: 'doc' },
      { label: 'Docs — referência CLI', url: D + '/cli-reference', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'cc-14',
    index: 14,
    title: 'Custom slash commands',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Criar comandos em .claude/commands/, $ARGUMENTS e comandos de consultoria.',
    concept:
      'Qualquer prompt que você repete merece virar comando: arquivos markdown em .claude/commands/ (projeto) ou ~/.claude/commands/ (pessoal) aparecem como /nome no agente. O placeholder $ARGUMENTS injeta o que você digitar depois do comando. É a forma mais barata de padronizar qualidade: /review roda o checklist de revisão da consultoria, /deploy-check valida a lista pré-deploy, /handover gera o documento de passagem. Comandos de projeto são versionados — o padrão do time viaja com o repo.',
    deepDive: [
      'Anatomia: o arquivo é o prompt; pode referenciar arquivos do repo, exigir formato de saída e encadear passos.',
      'Comando bom é checklist executável: "verifique X, Y, Z e reporte em tabela" — determinístico o suficiente para confiar.',
      'Diferença para skills: comando é atalho manual de prompt; skill é capacidade que o agente ativa sozinho quando relevante.',
    ],
    pitfalls: [
      'Comandos genéricos ("/melhore") que não padronizam nada.',
      'Esquecer de versionar os comandos de projeto e perder o padrão no próximo clone.',
    ],
    practiceSteps: [
      'Crie /review com o checklist real de code review do time.',
      'Crie /deploy-check com $ARGUMENTS recebendo o ambiente alvo.',
      'Compartilhe via repo e valide que outro consultor consegue usar.',
    ],
    projectContext:
      'Uma biblioteca de comandos da consultoria (review, kickoff, handover, security-check) é ativo reutilizável que padroniza entregas entre projetos.',
    references: [
      { label: 'Docs — comandos e skills customizados', url: D + '/commands', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'cc-15',
    index: 15,
    title: 'Subagents: especialistas com contexto isolado',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      '/agents, criar subagente com prompt e ferramentas próprias, revisor + executor.',
    concept:
      'Subagentes são agentes filhos com system prompt próprio, ferramentas restritas e — o mais importante — contexto isolado: eles trabalham em separado e devolvem só o resultado, mantendo a sessão principal limpa. O /agents cria e gerencia (arquivos em .claude/agents/). O padrão mais valioso em consultoria é executor + revisor: um subagente implementa, outro (só leitura) revisa contra o checklist — vieses diferentes, contexto separado, qualidade percebida muito maior. Outros clássicos: agente de pesquisa (varre o codebase e devolve resumo) e agente de testes.',
    deepDive: [
      'Isolamento é o superpoder: uma pesquisa que leria 50 arquivos no contexto principal acontece no contexto do subagente — a sessão mãe recebe 20 linhas de conclusão.',
      'Restrinja ferramentas por papel: revisor sem permissão de escrita É estruturalmente incapaz de "consertar rapidinho" (e esconder o problema).',
      'Delegação explícita ("use o agente code-reviewer nisto") ou automática pela descrição do subagente.',
    ],
    pitfalls: [
      'Criar 12 subagentes hiperespecíficos que ninguém lembra que existem.',
      'Subagente revisor com as mesmas instruções do executor — mesmos vieses, revisão de fachada.',
    ],
    practiceSteps: [
      'Crie um code-reviewer somente-leitura com o checklist do time.',
      'Rode uma feature com executor + revisor e compare com o fluxo normal.',
    ],
    projectContext:
      'Nos projetos de cliente, o par executor/revisor vira política: nenhum PR de agente sem passar pelo subagente revisor — controle de qualidade automatizado.',
    references: [
      { label: 'Docs — subagents', url: D + '/sub-agents', kind: 'doc' },
      { label: 'Introduction to Subagents — Anthropic Academy', url: ACAD + '/', kind: 'curso' },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'cc-16',
    index: 16,
    title: 'Skills: capacidades que o agente ativa sozinho',
    priority: 'media',
    type: 'conceito',
    shortDescription:
      'Anatomia do SKILL.md, skills pessoais/projeto/plugins e skill vs MCP vs comando.',
    concept:
      'Uma skill é uma pasta com SKILL.md (nome + descrição + instruções) e arquivos de apoio opcionais (scripts, templates). Diferente do slash command (você invoca) e do MCP (conecta sistemas externos), a skill é conhecimento processual que o agente ativa sozinho quando a descrição bate com a tarefa — só o nome/descrição ficam no contexto até serem necessários (progressive disclosure), então skills escalam sem inchar. A tríade de decisão: preciso conectar um sistema? MCP. Preciso de um atalho manual? Comando. Preciso ensinar COMO fazer algo do nosso jeito? Skill.',
    deepDive: [
      'A descrição é o gatilho: escreva quando usar E quando não usar — descrições vagas fazem a skill disparar errado ou nunca.',
      'Skills carregam arquivos: um template de proposta, um script de scaffold, o guia de estilo do cliente — o agente usa como material.',
      'Distribuição: pessoais (~/.claude/skills), de projeto (versionadas no repo) e via plugins para o time todo.',
    ],
    pitfalls: [
      'Fazer da skill um depósito de tudo — skill boa faz UMA coisa bem definida.',
      'Duplicar no CLAUDE.md o que a skill já ensina (paga contexto duas vezes).',
    ],
    practiceSteps: [
      'Crie uma skill "relatorio-semanal-cliente" com template e instruções de tom.',
      'Faça o curso de Skills da Anthropic Academy.',
      'Converta um processo repetitivo do time em skill versionada.',
    ],
    projectContext:
      'Skills empacotam a metodologia da consultoria: o "jeito de fazer" vira artefato instalável em qualquer projeto de cliente.',
    references: [
      {
        label: 'Docs — Agent Skills',
        url: 'https://code.claude.com/docs/en/skills',
        kind: 'doc',
      },
      { label: 'Curso de Skills — Anthropic Academy', url: ACAD + '/', kind: 'curso' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'cc-17',
    index: 17,
    title: 'Hooks: automação determinística no ciclo do agente',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'PreToolUse/PostToolUse/Stop, lint automático pós-edição e bloqueio de comandos.',
    concept:
      'Hooks são scripts que rodam automaticamente em eventos do ciclo do agente: PreToolUse (antes de uma ferramenta — pode BLOQUEAR a ação), PostToolUse (depois — ex: rodar lint/format em todo arquivo editado) e Stop (quando o agente termina — ex: notificação, validação final). A diferença crucial para instruções no CLAUDE.md: instrução é probabilística (o agente geralmente segue), hook é determinístico (SEMPRE roda). Regra que não pode falhar nunca → hook; preferência → CLAUDE.md.',
    deepDive: [
      'PreToolUse como guarda-corpo: bloquear qualquer Bash que contenha padrões perigosos ou toque em pastas proibidas — segurança que não depende do humor do modelo.',
      'PostToolUse como qualidade: prettier + eslint após cada Edit garante que todo código que o agente produz já sai formatado.',
      'Configuração via /hooks ou settings.json; hooks de projeto são versionados e valem para o time.',
    ],
    pitfalls: [
      'Hook lento em PostToolUse de edição — roda dezenas de vezes por sessão e trava o fluxo.',
      'Reimplementar em hook o que /permissions já resolve com uma regra.',
    ],
    practiceSteps: [
      'Configure lint automático pós-edição no seu stack.',
      'Crie um PreToolUse que bloqueia comandos com "rm -rf" e teste.',
    ],
    projectContext:
      'Hooks são o enforcement da governança prometida ao cliente: as regras críticas do contrato viram código, não boa vontade.',
    references: [
      { label: 'Docs — hooks', url: D + '/hooks', kind: 'doc' },
      { label: 'Docs — guia de hooks', url: D + '/hooks-guide', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'cc-18',
    index: 18,
    title: 'Seleção de modelo: Opus, Sonnet e Haiku no dia a dia',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'Trocar com /model no meio da sessão e o impacto real no consumo do plano.',
    concept:
      'O /model troca o cérebro do agente sem perder a sessão — e usar o modelo certo por tarefa é a alavanca de custo mais simples que existe. Heurística de campo: Opus para arquitetura, debugging cabeludo e decisões com muitas restrições; Sonnet para 80% do trabalho (features, refactors, testes) com excelente custo-benefício; Haiku para tarefas mecânicas em volume. O consumo do plano escala com o modelo: a mesma tarefa em Opus pode custar várias vezes o limite que custaria em Sonnet — quem opera perto do teto vive de /model.',
    deepDive: [
      'Padrão "planeja caro, executa barato": Opus no plan mode para desenhar, troca para Sonnet para implementar o plano.',
      'O modelo padrão da sessão pode ser configurado (settings/env) — times definem Sonnet como default e Opus como exceção consciente.',
      'Fluência real inclui saber ONDE ver qual modelo está ativo e quanto já consumiu (/status, /usage).',
    ],
    pitfalls: [
      'Rodar tudo em Opus "para garantir" e bater o teto na quarta-feira.',
      'Usar Haiku em refactor sutil e gastar mais em correções do que economizou.',
    ],
    practiceSteps: [
      'Rode a mesma feature média em Sonnet e Opus; compare qualidade e consumo.',
      'Escreva a matriz tarefa→modelo do time em 6 linhas.',
    ],
    projectContext:
      'A matriz de modelos entra no treinamento do cliente — é a diferença entre um rollout que estoura o orçamento e um que cabe no plano contratado.',
    references: [
      {
        label: 'Docs — visão geral de modelos',
        url: 'https://platform.claude.com/docs/en/about-claude/models/overview',
        kind: 'doc',
      },
      { label: 'Docs — custos', url: D + '/costs', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 20,
  },
  {
    id: 'cc-19',
    index: 19,
    title: 'Trabalhando com imagens: screenshots e design',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Colar screenshot, arrastar arquivo e os fluxos de debugar UI e replicar design.',
    concept:
      'O Claude Code enxerga imagens: cole um screenshot direto no terminal (Ctrl+V / Cmd+V conforme o terminal) ou arraste o arquivo. Isso habilita dois fluxos matadores: debugar UI ("aqui está o print do bug — encontre a causa no código") e replicar design ("implemente este mockup em React"). O loop avançado fecha o ciclo: o agente implementa, tira screenshot do resultado (via MCP de browser/Playwright ou script), compara com o alvo e itera sozinho até bater — visão transforma o agente de "gerador de código" em "verificador visual".',
    deepDive: [
      'Anote a imagem antes de enviar: setas e círculos no print direcionam a atenção e melhoram muito a precisão.',
      'Mockup + tokens de design (cores, fontes, espaçamentos) no prompt aproxima o resultado do pixel-perfect.',
      'Prints de erro (stack trace na tela, gráfico de monitoramento) funcionam como contexto de debugging tão bem quanto texto.',
    ],
    pitfalls: [
      'Mandar um print de página inteira e reclamar que o agente focou no lugar errado.',
      'Esperar pixel-perfect de uma imagem borrada de WhatsApp.',
    ],
    practiceSteps: [
      'Debug um problema visual real usando só screenshot + código.',
      'Pegue um design (Dribbble/Figma export) e peça a implementação; itere com prints do resultado.',
    ],
    projectContext:
      'Em projetos com stakeholders não-técnicos, o fluxo "print do problema → correção" encurta drasticamente o ciclo de feedback com o cliente.',
    references: [
      { label: 'Docs — fluxos comuns (imagens)', url: D + '/common-workflows', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'cc-20',
    index: 20,
    title: 'Git pelo Claude Code: commits, PRs e conflitos',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Commits com boa mensagem, criar PR, resolver conflito com o agente e gh integrado.',
    concept:
      'O agente é um operador de Git competente: pede "commite isso" e ele analisa o diff, escreve mensagem descritiva no padrão do repo e commita; pede "abra um PR" e ele usa o gh CLI para criar com título e descrição decentes. Em conflitos de merge, ele lê os dois lados, entende a intenção de cada mudança e propõe a resolução — melhor que muito humano com pressa. O pré-requisito é o gh autenticado (gh auth login). A disciplina que fica com o humano: revisar o que está sendo commitado e manter commits atômicos.',
    deepDive: [
      'Ensine o padrão no CLAUDE.md: conventional commits, idioma das mensagens, template de PR — o agente segue religiosamente.',
      'Conflitos: peça explicitamente "explique cada lado antes de resolver" — a explicação é sua chance de pegar resolução errada.',
      'git log/blame via agente: "quando e por que essa função mudou?" vira pergunta de linguagem natural.',
    ],
    pitfalls: [
      '"Commite tudo" com arquivos de debug e .env sujando o stage.',
      'Aceitar resolução de conflito sem entender os dois lados.',
    ],
    practiceSteps: [
      'Configure o padrão de commit no CLAUDE.md e faça 5 commits via agente.',
      'Crie um conflito artificial entre duas branches e resolva com o agente explicando cada lado.',
      'Abra um PR completo (título, descrição, checklist) via agente.',
    ],
    projectContext:
      'Histórico de Git limpo é entregável de consultoria: o cliente herda um repo cuja evolução se explica sozinha.',
    references: [
      { label: 'Docs — fluxos comuns (Git)', url: D + '/common-workflows', kind: 'doc' },
      { label: 'GitHub CLI', url: 'https://cli.github.com/', kind: 'tool' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'cc-21',
    index: 21,
    title: 'Worktrees + múltiplos agentes em paralelo',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Rodar 2+ instâncias no mesmo repo sem colisão usando git worktree.',
    concept:
      'git worktree add cria um segundo diretório de trabalho do MESMO repositório, em outra branch — e é isso que permite rodar dois ou mais Claude Codes em paralelo sem que um pise no arquivo do outro: cada agente vive no seu worktree, com sua branch, seu contexto e sua tarefa. O padrão de produtividade sênior: agente A implementa a feature no worktree A, agente B corrige um bug no worktree B, você orquestra os dois e mergeia quando prontos. Custo de disco mínimo (o .git é compartilhado), ganho de throughput real.',
    deepDive: [
      'Fluxo: git worktree add ../repo-feature-x feature-x → cd → claude. Terminar: git worktree remove.',
      'Cada worktree precisa do seu setup (node_modules, .env) — inclua isso no ritual ou num script.',
      'Não abra dois agentes na MESMA branch/diretório: as edições colidem e o histórico vira loteria.',
    ],
    pitfalls: [
      'Esquecer worktrees órfãos acumulando (git worktree list para auditar).',
      'Paralelizar tarefas no mesmo módulo — o merge vira o gargalo que você tentou evitar.',
    ],
    practiceSteps: [
      'Rode duas tarefas independentes em dois worktrees com dois agentes simultâneos.',
      'Crie um script new-agent.sh que cria worktree + instala deps + abre o claude.',
    ],
    projectContext:
      'Em sprints de entrega, paralelizar agentes por worktree é como a consultoria multiplica capacidade sem multiplicar consultores.',
    references: [
      { label: 'Docs — fluxos comuns (worktrees)', url: D + '/common-workflows', kind: 'doc' },
      {
        label: 'git worktree (documentação Git)',
        url: 'https://git-scm.com/docs/git-worktree',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'cc-22',
    index: 22,
    title: 'Boas práticas de sessão: o método de quem extrai o máximo',
    priority: 'media',
    type: 'conceito',
    shortDescription:
      'Tarefas pequenas e verificáveis, plano antes de código grande, quando recomeçar.',
    concept:
      'A diferença entre quem acha o Claude Code mágico e quem acha inconsistente raramente é o modelo — é o método. Os princípios que se repetem em todos os times de alta performance: tarefas pequenas com critério de sucesso verificável ("os testes X passam") em vez de épicos vagos; explorar → planejar → executar → verificar como ciclo padrão; dar ao agente uma forma de checar o próprio trabalho (testes, lint, screenshot); e a coragem de matar a sessão que entrou em espiral — recomeçar com um prompt melhor é quase sempre mais rápido que remendar 15 turnos de mal-entendido.',
    deepDive: [
      'Prompt bom é especificação: contexto + objetivo + restrições + critério de aceite. O agente não adivinha o que você não disse.',
      'Sinal de espiral: você corrigiu a mesma coisa 3 vezes. Pare, extraia o aprendizado para o prompt/CLAUDE.md, sessão nova.',
      'Feedback loop: agente com acesso a testes que rodam é ordens de magnitude melhor — invista no harness antes de cobrar resultado.',
    ],
    pitfalls: [
      '"Refatore o app" como prompt — épico vago gera épico errado.',
      'Insistir em sessão contaminada por teimosia ("já investi tanto nela").',
    ],
    practiceSteps: [
      'Reescreva seu último prompt ruim no formato contexto/objetivo/restrições/aceite.',
      'Adote por uma semana: nenhuma tarefa sem critério verificável definido antes.',
    ],
    projectContext:
      'Este método É o produto do treinamento que vocês vendem: times de cliente que o adotam relatam o dobro de aproveitamento da ferramenta.',
    references: [
      {
        label: 'Claude Code best practices (Anthropic)',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        kind: 'artigo',
      },
      {
        label: 'Claude Code in Action — Anthropic Academy',
        url: ACAD + '/claude-code-in-action',
        kind: 'curso',
      },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'cc-23',
    index: 23,
    title: 'Modo headless: claude -p em scripts e CI',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'Prompt único, saída em JSON e o agente como bloco de automação.',
    concept:
      'claude -p "prompt" roda o agente sem interface: executa, imprime o resultado e sai — o que transforma o Claude Code em bloco de construção de pipelines. Com --output-format json a saída vira estrutura parseável (resultado, custo, turnos), perfeita para scripts. Casos reais: triagem automática de issues, geração de changelog no release, verificação de convenções em pre-commit, processamento em lote de arquivos. Em CI, autentica-se via ANTHROPIC_API_KEY e restringem-se as ferramentas permitidas por flags — autonomia mínima necessária.',
    deepDive: [
      'Flags-chave: --output-format json, --allowedTools para restringir capacidades, --max-turns para limitar o loop.',
      'Headless em CI = ambiente descartável: é o único cenário onde pular permissões é aceitável, porque não há nada a proteger no runner.',
      'Custos escalam silenciosamente em automação — monitore o custo por execução desde o primeiro dia.',
    ],
    pitfalls: [
      'Dar bash irrestrito a um job de CI que só precisava ler arquivos.',
      'Parsear a saída de texto em vez de usar JSON e quebrar a cada mudança de formato.',
    ],
    practiceSteps: [
      'Rode claude -p "resuma as mudanças do último commit" --output-format json e inspecione a estrutura.',
      'Monte um script que processa 10 arquivos em lote com o agente.',
    ],
    projectContext:
      'Automações headless são upsell natural: depois do rollout interativo, o cliente quer o agente rodando sozinho nos processos mapeados.',
    references: [
      {
        label: 'Docs — rodar Claude Code programaticamente (headless)',
        url: D + '/headless',
        kind: 'doc',
      },
      { label: 'Docs — referência CLI', url: D + '/cli-reference', kind: 'doc' },
    ],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'cc-24',
    index: 24,
    title: 'settings.json avançado',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'Permissões finas por ferramenta, env vars e configuração projeto vs global.',
    concept:
      'O settings.json é onde a operação vira política: ~/.claude/settings.json (global), .claude/settings.json (projeto, versionado) e .claude/settings.local.json (pessoal, fora do Git) se sobrepõem nessa ordem. Dentro dele: regras de permissão por ferramenta (allow/deny com padrões), variáveis de ambiente injetadas nas sessões, modelo padrão, hooks. Para consultoria, o arquivo de projeto versionado é o mecanismo de padronização: todo consultor que clona o repo herda as mesmas permissões, o mesmo modelo default e os mesmos hooks.',
    deepDive: [
      'Precedência importa: local > projeto > global — útil para exceções pessoais sem tocar no padrão do time.',
      'Env no settings evita "funciona na minha máquina": a URL do staging, o registry interno, tudo declarado.',
      'Audite o efetivo com /config e /permissions — o que o agente realmente pode fazer nesta sessão.',
    ],
    pitfalls: [
      'Configurar tudo no global e descobrir que cada projeto precisava de política diferente.',
      'Segredos no settings versionado.',
    ],
    practiceSteps: [
      'Monte o settings.json de projeto padrão da consultoria (permissões + hooks + modelo).',
      'Teste a precedência criando uma exceção no local.json.',
    ],
    projectContext:
      'O settings versionado é a materialização da governança: auditável, revisável em PR, igual para todos — argumento forte em clientes corporativos.',
    references: [{ label: 'Docs — settings', url: D + '/settings', kind: 'doc' }],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'cc-25',
    index: 25,
    title: 'Proxy corporativo, telemetria e opt-outs',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'Claude Code atrás de rede corporativa e as perguntas de TI do cliente.',
    concept:
      'Em cliente corporativo, antes do primeiro prompt vem a reunião com a TI — e você precisa das respostas: o Claude Code respeita HTTP(S)_PROXY padrão, suporta gateways corporativos (LLM gateways, Bedrock/Vertex como backends alternativos) e tem variáveis para desabilitar telemetria e tráfego não-essencial. Os domínios que precisam de liberação no firewall estão documentados. Saber configurar proxy + responder "quais dados saem da rede e para onde" com base na documentação oficial destrava implantações que morreriam na segurança.',
    deepDive: [
      'Variáveis: HTTPS_PROXY/HTTP_PROXY para rede; CLAUDE_CODE_USE_BEDROCK/VERTEX para rodar via nuvem do cliente; flags de telemetria documentadas em settings.',
      'Rodar via Bedrock/Vertex muda a conversa de compliance: o tráfego fica no perímetro de nuvem que o cliente já aprovou.',
      'Documento pronto para a TI: domínios, portas, dados trafegados, política de retenção — prepare uma vez, use em todo cliente.',
    ],
    pitfalls: [
      'Prometer "nada sai da rede" sem entender a arquitetura — credibilidade não volta.',
      'Debugar horas de erro de conexão que era certificado SSL corporativo interceptando.',
    ],
    practiceSteps: [
      'Leia a página de configuração corporativa e monte seu doc de respostas para TI.',
      'Simule um proxy local e configure o Claude Code através dele.',
    ],
    projectContext:
      'Em enterprise, quem responde a TI com precisão na primeira reunião ganha o projeto; quem enrola entra na fila do compliance por 3 meses.',
    references: [
      {
        label: 'Docs — configuração de rede corporativa (proxy/CA/mTLS)',
        url: D + '/network-config',
        kind: 'doc',
      },
      { label: 'Docs — Bedrock e Vertex', url: D + '/third-party-integrations', kind: 'doc' },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'cc-26',
    index: 26,
    title: 'GitHub Actions: @claude em issues e PRs',
    priority: 'baixa',
    type: 'pratica',
    shortDescription:
      'O agente respondendo menções no repositório e trabalhando sem ninguém no terminal.',
    concept:
      'Com a GitHub Action oficial instalada (/install-github-app configura em minutos), mencionar @claude numa issue ou PR aciona o agente no próprio GitHub: ele lê o contexto, implementa a mudança pedida e abre/atualiza o PR — ou responde a revisão de código diretamente. É o Claude Code operando de forma assíncrona e colaborativa: qualquer pessoa do time do cliente (até quem nunca abriu um terminal) delega tarefas pelo fluxo que já conhece. Segredos ficam nos secrets do repo; permissões e custo são configurados no workflow.',
    deepDive: [
      'Casos com melhor ROI: "@claude corrija este bug" em issue bem descrita, "@claude aplique as sugestões da revisão" em PR, triagem automática de issues novas.',
      'O workflow YAML define modelo, ferramentas permitidas e gatilhos — trate como código de produção, com revisão.',
      'Custo: cada menção é uma execução via API — monitore e defina quem pode acionar.',
    ],
    pitfalls: [
      'Habilitar no repo sem combinar com o time — @claude surpresa gera resistência.',
      'Issues vagas ("@claude melhora isso") gerando PRs vagos.',
    ],
    practiceSteps: [
      'Instale via /install-github-app num repo de teste e acione @claude numa issue.',
      'Ajuste o workflow: modelo, limites e quem pode acionar.',
    ],
    projectContext:
      'É o passo 2 clássico da implantação: depois dos consultores, o agente entra no fluxo do TIME do cliente via GitHub — escala sem treinamento de terminal.',
    references: [
      { label: 'Docs — GitHub Actions', url: D + '/github-actions', kind: 'doc' },
      {
        label: 'claude-code-action no GitHub',
        url: 'https://github.com/anthropics/claude-code-action',
        kind: 'tool',
      },
    ],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'cc-boss',
    index: 27,
    title: 'BOSS: Comandante do Claude Code',
    priority: 'alta',
    type: 'boss',
    shortDescription: 'Desafio final — contexto, permissões, MCP, subagentes e método sob pressão.',
    concept:
      'O boss desta trilha testa o que separa usuário de operador: gestão de contexto e limites, arquitetura de permissões, MCP nos escopos certos, subagentes e o método de sessão. Acerte 4 de 5 e leve o título — e a confiança de implantar Claude Code em qualquer cliente.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação aqui indica prontidão para liderar implantação e treinamento de Claude Code em cliente.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
