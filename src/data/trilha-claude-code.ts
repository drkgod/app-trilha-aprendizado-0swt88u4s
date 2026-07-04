import { Terminal } from 'lucide-react'
import type { Trail } from './types'

export const trilhaClaudeCode: Trail = {
  id: 'claude-code',
  order: 1,
  title: 'Claude Code',
  tagline: 'O coração da stack: do primeiro npm install ao repo-modelo de cliente.',
  color: '#17E06A',
  icon: Terminal,
  nodes: [
    {
      id: 'cc-1',
      title: 'Superfícies e instalação',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'Cliente novo pergunta: "instalo onde? Terminal, app ou VS Code?" — sua resposta define a primeira impressão da consultoria.',
      content: [
        'Claude Code existe em 4 superfícies: CLI no terminal, app Desktop, extensão para VS Code e acesso remoto pelo app mobile/web. Todas usam o mesmo agente por baixo.',
        'Instalação da CLI: npm install -g @anthropic-ai/claude-code (requer Node 18+) ou installer nativo. No Windows, funciona nativo, mas WSL dá experiência mais próxima de produção Linux.',
        'CLI: máxima flexibilidade, roda em qualquer terminal e servidores. Desktop: gestão visual de sessões e projetos. Extensão VS Code: agente ao lado do código, ideal pra quem vive no editor.',
        'Recomendação por perfil: dev raiz → CLI; cliente que quer visual e organização → Desktop; time que já usa VS Code → extensão.',
        'Atualização: a CLI avisa quando há versão nova; manter atualizado importa porque recursos mudam rápido.',
        'Primeiro comando de diagnóstico com o cliente: claude --version e claude doctor para validar o ambiente.',
      ],
      practice: [
        'Instale a CLI e o app Desktop na sua máquina (se ainda não tem os dois).',
        'Abra o mesmo projeto nas duas superfícies e note as diferenças de fluxo.',
        'Escreva em 3 linhas qual superfície você indicaria para: um dev backend, um gestor não-técnico e um time de produto.',
      ],
      scope:
        'Todo projeto de cliente começa com o setup do ambiente. Errar aqui gera fricção nos primeiros 30 minutos — acertar gera confiança imediata.',
      links: [
        { label: 'Docs oficiais do Claude Code', url: 'https://code.claude.com/docs' },
        {
          label: 'Curso Claude Code in Action',
          url: 'https://anthropic.skilljar.com/claude-code-in-action',
        },
      ],
      quiz: [
        {
          q: 'Um cliente gestor, não-técnico, quer acompanhar e disparar tarefas do agente com organização visual. Qual superfície indicar primeiro?',
          options: ['CLI no terminal', 'App Desktop', 'Extensão VS Code', 'API direto'],
          correct: 1,
          explain:
            'O Desktop oferece gestão visual de sessões e projetos — a menor curva pra quem não vive no terminal.',
        },
        {
          q: 'Qual é o requisito de ambiente para instalar a CLI via npm?',
          options: ['Python 3.10+', 'Node 18 ou superior', 'Docker instalado', 'Apenas navegador'],
          correct: 1,
          explain:
            'A CLI distribuída via npm exige Node 18+. Sem isso, a instalação falha — checagem número 1 no setup de cliente.',
        },
      ],
    },
    {
      id: 'cc-2',
      title: 'Planos, limites e consumo',
      kind: 'lesson',
      xp: 60,
      minutes: 30,
      why: '"Acabou meu limite no meio da sprint" é a reclamação mais comum de quem paga a conta. Você precisa explicar o porquê e o que fazer.',
      content: [
        'Dois caminhos de acesso: assinatura Claude (Pro / Max 5x / Max 20x) ou API key do Console (pagamento por token). Assinatura = previsível; API = elástico.',
        'O uso da assinatura funciona por janelas de 5 horas + um teto semanal. Bater o teto pausa o Claude Code até o reset.',
        'Opus consome o limite muito mais rápido que Sonnet. Pra maioria das tarefas de rotina, Sonnet resolve — reserve Opus para arquitetura e problemas difíceis.',
        'Comandos de auditoria: /usage mostra consumo do plano; /cost mostra custo da sessão quando usando API.',
        'Sinais de desperdício: sessões gigantes sem /clear, MCPs conectados sem uso (as definições de ferramentas consomem contexto) e uso de Opus em tarefa trivial.',
        'Números exatos de limite mudam com frequência: a resposta profissional é conceito + onde verificar (support.claude.com), nunca número decorado.',
      ],
      practice: [
        'Rode /usage agora e registre seu consumo atual.',
        'Faça a mesma tarefa pequena com Sonnet e depois com Opus e compare o consumo.',
        'Monte uma resposta de 5 linhas para: "cliente Pro reclamando que o limite acaba rápido".',
      ],
      scope:
        'Dimensionar plano é parte da proposta comercial: recomendar Max 20x pra quem precisa de Pro (ou o contrário) queima credibilidade e orçamento.',
      links: [
        { label: 'Central de ajuda — planos e limites', url: 'https://support.claude.com' },
        { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      ],
      quiz: [
        {
          q: 'Cliente Pro diz que o Claude Code "trava toda tarde". Qual a causa mais provável?',
          options: [
            'Bug na CLI',
            'Bateu a janela de 5h ou o teto semanal do plano',
            'Internet lenta',
            'Projeto grande demais',
          ],
          correct: 1,
          explain:
            'Limites de assinatura operam em janela de 5h + teto semanal. Uso intenso com Opus acelera muito o consumo.',
        },
        {
          q: 'Qual atitude reduz consumo SEM perder qualidade na maioria das tarefas de rotina?',
          options: [
            'Usar sempre Opus',
            'Usar Sonnet como padrão e Opus só em problemas difíceis',
            'Desligar o /compact',
            'Abrir uma sessão única gigante',
          ],
          correct: 1,
          explain:
            'Sonnet dá conta da rotina com fração do consumo. Escalar pra Opus é decisão pontual, não padrão.',
        },
      ],
    },
    {
      id: 'cc-3',
      title: 'Janela de contexto na prática',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'A dúvida crônica número 1: "por que meu contexto acaba tão rápido e o agente fica burro no fim?" — você vai responder isso toda semana.',
      content: [
        'Tudo entra na janela: cada arquivo lido, cada output de comando bash, o histórico da conversa e as definições de ferramentas de TODO MCP conectado (mesmo sem usar).',
        '/context é o raio-X: mostra o que está ocupando espaço agora. Primeiro comando ao diagnosticar "contexto acabando".',
        '/compact resume a conversa preservando o essencial — útil no meio de uma tarefa longa, mas compactar demais degrada: detalhes se perdem no resumo.',
        '/clear zera tudo e mantém só o CLAUDE.md — ideal ao trocar de tarefa. Sessão nova = contexto novo.',
        'Auto-compact dispara sozinho quando o contexto enche; se o agente "esqueceu" algo do início, provavelmente foi compactado.',
        'Estratégia profissional: tarefas curtas e verificáveis, /clear entre tarefas distintas, desconectar MCPs ociosos e evitar pedir pro agente ler pastas inteiras sem necessidade.',
        'Regra de bolso pra explicar ao cliente: contexto é a mesa de trabalho do agente — quanto mais papel em cima, menos espaço pra pensar.',
      ],
      practice: [
        'Numa sessão ativa, rode /context e identifique os 3 maiores consumidores.',
        'Conecte um MCP, rode /context de novo e meça o custo fixo das definições de ferramentas.',
        'Simule: use /compact no meio de uma tarefa e verifique o que o agente ainda lembra.',
      ],
      scope:
        'Em projetos reais, gestão de contexto é a diferença entre um agente que entrega e um que alucina no arquivo 40. É o primeiro diagnóstico em qualquer suporte.',
      links: [{ label: 'Docs — gerenciando contexto', url: 'https://code.claude.com/docs' }],
      quiz: [
        {
          q: 'O cliente conectou 6 MCPs "pra deixar pronto" e reclama que o contexto acaba rápido. Qual a relação?',
          options: [
            'Nenhuma, MCP não afeta contexto',
            'As definições de ferramentas de cada MCP conectado ocupam contexto mesmo sem uso',
            'MCP só afeta velocidade',
            'MCP aumenta o limite do plano',
          ],
          correct: 1,
          explain:
            'Cada servidor conectado injeta suas definições de ferramentas na janela. MCP ocioso é custo fixo de contexto.',
        },
        {
          q: 'Terminou uma tarefa e vai começar outra completamente diferente. O que fazer?',
          options: [
            '/compact para economizar',
            '/clear (ou sessão nova) para começar com contexto limpo',
            'Continuar na mesma sessão',
            'Desinstalar MCPs',
          ],
          correct: 1,
          explain:
            'Entre tarefas distintas, /clear evita arrastar lixo de contexto. /compact é pra CONTINUAR a mesma tarefa longa.',
        },
      ],
    },
    {
      id: 'cc-4',
      title: 'CLAUDE.md e memória do projeto',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'A diferença entre projeto de cliente caótico e projeto redondo geralmente é um CLAUDE.md bem escrito.',
      content: [
        'CLAUDE.md é lido automaticamente no início de toda sessão — é a memória permanente do projeto.',
        'Hierarquia: ~/.claude/CLAUDE.md (preferências globais suas) → CLAUDE.md na raiz do repo (regras do projeto) → CLAUDE.md em subpastas (regras locais). O mais específico complementa o geral.',
        'O que escrever: comandos de build/test/lint, arquitetura em 5 linhas, convenções de código, o que NUNCA tocar, fluxo de branch/PR do time.',
        'O que NÃO escrever: romance. CLAUDE.md gigante consome contexto em toda sessão — cada linha precisa pagar o próprio custo.',
        '/init gera um rascunho analisando o repo — ótimo ponto de partida, mas revise: ele não conhece as regras do negócio.',
        'Atalho #: digitar # durante a sessão adiciona uma instrução à memória sem abrir editor.',
        'CLAUDE.local.md serve para notas pessoais que não vão pro repo (entra no .gitignore).',
      ],
      practice: [
        'Rode /init num projeto real e compare o rascunho com o que você escreveria.',
        'Enxugue o resultado para no máximo 40 linhas de alto valor.',
        'Crie um CLAUDE.md global em ~/.claude com suas 5 preferências pessoais de trabalho.',
      ],
      scope:
        'Em toda entrega de projeto, o CLAUDE.md faz parte do pacote: é o que garante que o cliente continua tendo bons resultados depois que a consultoria termina.',
      links: [{ label: 'Docs — memória e CLAUDE.md', url: 'https://code.claude.com/docs' }],
      quiz: [
        {
          q: 'Onde ficam as regras que valem para TODOS os seus projetos (estilo pessoal de trabalho)?',
          options: [
            'CLAUDE.md na raiz de cada repo',
            '~/.claude/CLAUDE.md (global)',
            'CLAUDE.local.md',
            'No .gitignore',
          ],
          correct: 1,
          explain:
            'O arquivo global em ~/.claude vale pra todas as sessões suas. O da raiz do repo é do projeto e vai pro time.',
        },
        {
          q: 'Por que um CLAUDE.md de 400 linhas é um problema?',
          options: [
            'O agente ignora arquivos grandes',
            'Ele é lido toda sessão e consome contexto permanente',
            'Quebra o git',
            'Não é problema',
          ],
          correct: 1,
          explain:
            'Ele entra na janela em TODA sessão. Instrução que não paga o próprio custo de contexto deve sair.',
        },
      ],
    },
    {
      id: 'cc-5',
      title: 'Permissões e Plan Mode',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'Cliente iniciante deixa o agente rodar solto e quebra o próprio projeto. Consultor que domina permissões evita o desastre — e o chamado às 22h.',
      content: [
        'Três modos: default (pede permissão por ação), auto-accept (shift+tab, executa edições sem perguntar) e plan mode (só planeja, não executa nada).',
        'Plan mode é a ferramenta de ouro pra tarefas grandes: o agente apresenta o plano, você revisa e só então libera a execução.',
        '/permissions configura allowlist e denylist: pré-aprovar comandos seguros (testes, lint, gh) e bloquear os perigosos (rm -rf, push force).',
        '--dangerously-skip-permissions desliga TODAS as barreiras. Uso legítimo: ambiente isolado/descartável (container de CI). Em máquina de cliente: nunca.',
        'Recomendação padrão de consultoria: default no início, allowlist crescendo conforme confiança, plan mode obrigatório pra refactors e migrações.',
        'Checkpoint de segurança: commit antes de soltar o agente em tarefa grande — desfazer vira um git reset em vez de uma tragédia.',
      ],
      practice: [
        'Configure /permissions com allowlist para seus comandos de teste e lint.',
        'Execute uma tarefa média inteira em plan mode e avalie o plano antes de liberar.',
        'Escreva a política de permissões que você recomendaria como padrão para um cliente novo.',
      ],
      scope:
        'Definir a política de permissões é entregável de consultoria: entra no documento de setup de todo projeto que criamos com o cliente.',
      links: [{ label: 'Docs — permissões e modos', url: 'https://code.claude.com/docs' }],
      quiz: [
        {
          q: 'Cliente vai fazer um refactor grande num sistema em produção. Qual configuração você recomenda?',
          options: [
            'auto-accept pra ir rápido',
            'plan mode + revisão do plano + commit de checkpoint antes',
            '--dangerously-skip-permissions',
            'Deixar o padrão e torcer',
          ],
          correct: 1,
          explain:
            'Tarefa grande e arriscada = planejar antes de executar, com ponto de restauração no git.',
        },
        {
          q: 'Quando --dangerously-skip-permissions é aceitável?',
          options: [
            'Sempre que quiser velocidade',
            'Em ambiente isolado e descartável, como um container de CI',
            'Na máquina do cliente com supervisão',
            'Nunca existe caso válido',
          ],
          correct: 1,
          explain:
            'A flag remove todas as barreiras — só faz sentido onde um erro não destrói nada de valor.',
        },
      ],
    },
    {
      id: 'cc-6',
      title: 'MCP: conectar, escopar e debugar',
      kind: 'lesson',
      xp: 60,
      minutes: 45,
      why: 'MCP é o que transforma o agente de "editor de código" em "membro do time com acesso às ferramentas". E é onde o suporte mais recebe chamado.',
      content: [
        'MCP (Model Context Protocol) conecta o agente a ferramentas externas: Supabase, GitHub, Slack, bancos, APIs internas.',
        'claude mcp add registra um servidor. Três escopos: local (só você, só este projeto), project (vai no .mcp.json versionado — o time todo herda) e user (só você, todos os projetos).',
        'Servidores locais (stdio) rodam na sua máquina; remotos (HTTP/SSE) rodam na nuvem e geralmente autenticam via OAuth no primeiro uso.',
        'Pro time do cliente: escopo project com .mcp.json commitado é o padrão-ouro — setup zero pra quem clona o repo.',
        'Debug em ordem: 1) /mcp mostra status e ferramentas de cada servidor; 2) checar se o comando/URL do servidor está certo; 3) reautenticar OAuth; 4) olhar logs.',
        'Custo oculto: cada MCP conectado injeta definições de ferramentas no contexto. Regra: conectar o que a tarefa usa, desconectar o resto.',
      ],
      practice: [
        'Adicione o MCP do Supabase em escopo project num repo de teste e confirme o .mcp.json gerado.',
        'Rode /mcp e liste quais ferramentas cada servidor expõe.',
        'Quebre de propósito (URL errada) e pratique o fluxo de diagnóstico.',
      ],
      scope:
        'Em quase todo projeto que criamos, o MCP do Supabase e do GitHub entram no setup inicial. Saber escopar certo evita o clássico "na minha máquina funciona".',
      links: [
        { label: 'Docs — MCP no Claude Code', url: 'https://code.claude.com/docs' },
        { label: 'Site do Model Context Protocol', url: 'https://modelcontextprotocol.io' },
      ],
      quiz: [
        {
          q: 'O time inteiro do cliente precisa do mesmo servidor MCP no projeto. Qual escopo usar?',
          options: ['local', 'user', 'project (.mcp.json versionado no repo)', 'Tanto faz'],
          correct: 2,
          explain:
            'Escopo project versiona a configuração no repo: quem clona já herda o servidor. Zero setup manual.',
        },
        {
          q: 'Ferramentas do MCP sumiram no meio do trabalho. Primeiro passo de diagnóstico?',
          options: [
            'Reinstalar o Claude Code',
            'Rodar /mcp e checar o status do servidor',
            'Trocar de modelo',
            'Apagar o .mcp.json',
          ],
          correct: 1,
          explain:
            '/mcp é o painel de status dos servidores conectados — mostra o que caiu e o que está autenticado.',
        },
      ],
    },
    {
      id: 'cc-7',
      title: 'Sessões, comandos e produtividade',
      kind: 'lesson',
      xp: 60,
      minutes: 30,
      why: 'A fluência nos comandos do dia a dia é o que faz o cliente olhar pra você e pensar "essa pessoa domina a ferramenta".',
      content: [
        'Retomar trabalho: claude --continue reabre a última sessão do diretório; claude --resume deixa escolher qual sessão retomar.',
        '/model troca o modelo no meio da sessão — desça pra Sonnet na rotina, suba pra Opus no problema cabeludo.',
        'Esc interrompe o agente no meio da ação; Esc duplo navega o histórico pra refazer a partir de um ponto. /rewind desfaz alterações no código.',
        '! na frente executa bash direto sem passar pelo agente — rápido pra checagens (git status, ls).',
        'Imagens: cole um screenshot direto na conversa — debugar UI e replicar design ficam triviais.',
        'Git integrado: o agente escreve commits decentes, abre PR com gh e resolve conflito. Peça mensagens de commit no padrão do time (defina no CLAUDE.md).',
        'Boas práticas de sessão: uma tarefa por vez, verificável, com critério de pronto explícito no prompt.',
      ],
      practice: [
        'Feche o terminal no meio de uma tarefa e retome com claude --continue.',
        'Use Esc duplo para voltar a um ponto anterior da conversa e seguir por outro caminho.',
        'Cole um screenshot de uma UI e peça pro agente replicar o componente.',
      ],
      scope:
        'Consultoria é demonstração ao vivo: fluência nesses comandos é o seu palco. É também o conteúdo dos treinamentos que damos pro time do cliente.',
      links: [
        { label: 'Docs — comandos e fluxo de trabalho', url: 'https://code.claude.com/docs' },
      ],
      quiz: [
        {
          q: 'Você fechou o terminal ontem no meio de uma tarefa. Como retomar exatamente de onde parou?',
          options: [
            'Impossível, começa do zero',
            'claude --continue no mesmo diretório',
            'Copiar e colar o histórico',
            '/compact',
          ],
          correct: 1,
          explain:
            '--continue reabre a última sessão do diretório com todo o histórico preservado.',
        },
        {
          q: 'O agente começou a editar o arquivo errado AGORA. Reação imediata?',
          options: [
            'Esperar terminar e reverter',
            'Esc para interromper na hora',
            'Fechar o terminal',
            'Desligar o wifi',
          ],
          correct: 1,
          explain:
            'Esc interrompe a ação em andamento — reflexo básico de quem opera agente com segurança.',
        },
      ],
    },
    {
      id: 'cc-8',
      title: 'Automação: commands, subagents, skills e hooks',
      kind: 'lesson',
      xp: 60,
      minutes: 50,
      why: 'É o que separa "usar o Claude Code" de "construir um sistema de trabalho com o Claude Code" — e é o que vendemos como consultoria avançada.',
      content: [
        'Custom slash commands: arquivos em .claude/commands/ viram comandos do projeto (ex: /revisar-pr). Aceitam $ARGUMENTS pra parametrizar.',
        'Subagents (/agents): agentes especializados com prompt e ferramentas próprias, rodando com contexto ISOLADO — o resultado volta resumido, sem inflar sua janela.',
        'Padrão poderoso: agente executor + subagent revisor. O revisor crítica com contexto limpo, sem o viés de quem escreveu.',
        'Skills: pastas com SKILL.md que ensinam procedimentos ao agente (ex: "como gerar nosso relatório padrão"). Diferença: skill = conhecimento/procedimento; MCP = acesso a ferramenta externa; command = atalho de prompt.',
        'Hooks: gatilhos em eventos (PreToolUse, PostToolUse, Stop). Exemplos reais: rodar lint após cada edição, bloquear comandos numa pasta protegida, notificar no fim da tarefa.',
        'Kit de consultoria: um pacote de commands + skills + hooks reutilizável que instalamos em todo cliente — padronização que vira ativo da empresa.',
      ],
      practice: [
        'Crie um custom command /revisar que pede análise de segurança e qualidade do diff atual.',
        'Crie um subagent "revisor" e use-o para criticar um código que o agente principal escreveu.',
        'Configure um hook PostToolUse que roda o lint do projeto após edições.',
      ],
      scope:
        'Este é o produto premium: montar o sistema de automação do cliente (commands, skills e hooks personalizados pro fluxo dele) é escopo de projeto faturável.',
      links: [{ label: 'Docs — sub-agents, skills e hooks', url: 'https://code.claude.com/docs' }],
      quiz: [
        {
          q: 'Qual a vantagem de revisar código com um SUBAGENT em vez do agente principal?',
          options: [
            'É mais rápido',
            'Contexto isolado: revisão sem o viés de quem escreveu e sem inflar sua janela',
            'Usa outro modelo obrigatoriamente',
            'Não há vantagem',
          ],
          correct: 1,
          explain:
            'O subagent roda em contexto próprio e devolve só o resultado — revisão limpa e janela principal preservada.',
        },
        {
          q: 'O cliente quer que TODO procedimento de gerar o relatório mensal seja conhecido pelo agente. Qual mecanismo?',
          options: [
            'Um MCP',
            'Uma skill com SKILL.md descrevendo o procedimento',
            'Um hook',
            'Aumentar o contexto',
          ],
          correct: 1,
          explain:
            'Skill = pacote de conhecimento procedural que o agente carrega quando relevante. MCP é acesso a ferramenta; hook é gatilho.',
        },
      ],
    },
    {
      id: 'cc-9',
      title: 'BOSS: Repo-modelo de cliente',
      kind: 'boss',
      xp: 150,
      minutes: 90,
      why: 'O desafio que consolida a trilha: montar do zero o repositório que usaremos como template de onboarding de todo cliente novo.',
      content: [
        'Você vai montar um repositório de demonstração com o setup completo que nossa consultoria entrega: memória, permissões, MCP e automação.',
        'Esse repo vira ativo da empresa: é o que apresentamos na primeira semana de projeto com cliente.',
        'Capriche no CLAUDE.md — ele é a vitrine do nosso padrão de qualidade.',
      ],
      practice: [],
      scope: 'Entregável real: o template oficial de onboarding da consultoria.',
      links: [{ label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' }],
      quiz: [],
      checklist: [
        'Repo criado no GitHub com README explicando o propósito',
        'CLAUDE.md na raiz com até 40 linhas de alto valor (build, testes, convenções, proibições)',
        '.mcp.json em escopo project com pelo menos 1 servidor configurado',
        'Custom command /revisar funcionando em .claude/commands/',
        'Hook de lint pós-edição configurado e testado',
        'Política de permissões documentada (allowlist + denylist recomendadas)',
        'Vídeo de 5 min (estilo resposta a cliente) demonstrando o setup',
      ],
    },
  ],
}
