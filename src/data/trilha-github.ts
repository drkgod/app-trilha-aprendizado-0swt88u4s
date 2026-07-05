import type { Topic } from './types'

const GH = 'https://docs.github.com'
const GIT = 'https://git-scm.com'

export const githubTopics: Topic[] = [
  {
    id: 'gh-1',
    index: 1,
    title: 'Setup: Git, identidade e autenticação (token vs SSH)',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Instalar, configurar nome/email e escolher entre HTTPS+token e chave SSH.',
    concept:
      'Antes do primeiro commit: instalar o Git, configurar identidade (git config --global user.name/user.email — é o que assina cada commit) e resolver autenticação com o GitHub. Dois caminhos: HTTPS com token (PAT — fácil de começar, tokens expiram e têm escopos) ou SSH (gerar par de chaves com ssh-keygen -t ed25519, registrar a pública no GitHub — configura uma vez, esquece para sempre). Para máquinas de trabalho, SSH; o atalho moderno que resolve tudo é gh auth login, que configura a autenticação inteira num fluxo interativo.',
    deepDive: [
      'E-mail do config = e-mail da conta GitHub (ou o noreply que o GitHub fornece), senão os commits não linkam ao seu perfil.',
      'Tokens: fine-grained PATs com escopo mínimo e expiração — a prática que a TI do cliente vai exigir.',
      'Teste SSH com ssh -T git@github.com; múltiplas contas (pessoal + cliente) se resolvem com hosts no ~/.ssh/config.',
    ],
    pitfalls: [
      'Commitar semanas com o e-mail errado e "sumir" do histórico do projeto.',
      'Token com escopo total colado num script versionado.',
    ],
    practiceSteps: [
      'Configure identidade global e valide com git config --list.',
      'Configure SSH do zero (gerar, registrar, testar).',
      'Rode gh auth login e entenda o que ele configurou.',
    ],
    projectContext:
      'O checklist de setup por consultor (e por máquina de cliente) elimina a meia-hora perdida de "permission denied" em todo kickoff.',
    references: [
      { label: 'GitHub Docs — autenticação', url: GH + '/en/authentication', kind: 'doc' },
      {
        label: 'Pro Git (livro gratuito) — primeiros passos',
        url: GIT + '/book/en/v2',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'gh-2',
    index: 2,
    title: 'O fluxo essencial: clone, add, commit, push, pull, fetch',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'O ciclo diário — e a diferença entre pull e fetch que separa júnior de pleno.',
    concept:
      'O ciclo de vida diário: git clone traz o repositório; git status é o painel (rode compulsivamente); git add encena mudanças na staging area; git commit grava um snapshot com mensagem; git push envia ao remoto; git fetch BAIXA as novidades do remoto sem tocar no seu trabalho (você olha antes de integrar); git pull = fetch + merge de uma vez (conveniente, mas integra sem você ver). O modelo mental que destrava tudo: working directory → staging → histórico local → remoto — quatro lugares onde uma mudança pode estar; todo comando move coisas entre eles.',
    deepDive: [
      'Staging area é feature, não burocracia: git add -p encena por pedaços e permite commits atômicos mesmo com a working tree bagunçada.',
      'fetch + git log HEAD..origin/main mostra o que vem antes de integrar — o hábito de quem nunca é surpreendido por um pull.',
      'Mensagem de commit responde "por quê", não "o quê" (o diff já mostra o quê) — convenção que o agente segue se o CLAUDE.md mandar.',
    ],
    pitfalls: [
      'git add . cego levando .env, node_modules e arquivos de debug.',
      'pull com trabalho local não commitado gerando conflito evitável.',
    ],
    practiceSteps: [
      'Pratique o ciclo completo num repo de teste, narrando onde cada mudança está.',
      'Use git add -p para dividir uma mudança grande em 2 commits limpos.',
      'Faça fetch + inspeção antes de todo pull por uma semana.',
    ],
    projectContext:
      'Todo trabalho de agente flui por este ciclo — quem o domina revisa e corrige o que o agente faz com Git em vez de só torcer.',
    references: [
      {
        label: 'Pro Git — Git basics',
        url: GIT + '/book/en/v2/Git-Basics-Getting-a-Git-Repository',
        kind: 'curso',
      },
      {
        label: 'GitHub Skills (labs interativos)',
        url: 'https://skills.github.com/',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'gh-3',
    index: 3,
    title: 'Branches: criar, trocar, mergear e limpar',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Branch local vs remota, upstream e o fluxo de feature branch.',
    concept:
      'Branch é um ponteiro barato para um commit — criar custa nada e é o mecanismo de isolamento de todo trabalho: git switch -c feature-x cria e troca; trabalha, commita; git merge feature-x (a partir da main) integra; git branch -d limpa. O par local/remoto: sua branch local ganha um "upstream" no primeiro push (git push -u origin feature-x) e a partir daí push/pull sabem o destino. A disciplina de ouro para trabalhar com agentes: NADA direto na main — cada tarefa (sua ou do agente) nasce numa branch, vira PR, e só entra revisada.',
    deepDive: [
      'git switch e git restore são os comandos modernos que separam as responsabilidades do velho checkout — ensine os novos.',
      'Branch remota deletada no servidor continua aparecendo local até git fetch --prune — configure prune automático.',
      'Nomeie por convenção (feat/, fix/, chore/ + descrição) — agentes e humanos navegam o repo pelo nome das branches.',
    ],
    pitfalls: [
      'Trabalhar semanas numa branch sem integrar a main — o merge final vira arqueologia.',
      'Deletar branch com trabalho não mergeado usando -D sem conferir.',
    ],
    practiceSteps: [
      'Fluxo completo: branch → 3 commits → merge na main → delete local e remota.',
      'Configure fetch.prune true e a convenção de nomes do time.',
    ],
    projectContext:
      'Um agente por branch é a regra que permite paralelismo com segurança — a base dos worktrees e do fluxo de PR que vem adiante.',
    references: [
      {
        label: 'Learn Git Branching (interativo)',
        url: 'https://learngitbranching.js.org/',
        kind: 'curso',
      },
      {
        label: 'Pro Git — branching',
        url: GIT + '/book/en/v2/Git-Branching-Branches-in-a-Nutshell',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'gh-4',
    index: 4,
    title: 'Conflitos: ler, resolver e abortar sem pânico',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Os marcadores <<<<<<<, resolução manual, resolução com agente e o botão de escape.',
    concept:
      'Conflito não é erro — é o Git pedindo uma decisão humana: duas mudanças tocaram as mesmas linhas e ele não vai escolher por você. A anatomia: <<<<<<< HEAD abre o SEU lado, ======= separa, >>>>>>> branch fecha o lado DELES. Resolver = editar o arquivo para a versão final correta (às vezes um lado, às vezes os dois, às vezes algo novo), git add, e concluir o merge. O botão de escape que elimina o pânico: git merge --abort volta tudo ao estado pré-merge. Com agentes, o fluxo bom é pedir "explique cada lado deste conflito antes de propor a resolução" — a explicação é onde você pega resolução semanticamente errada.',
    deepDive: [
      'Conflito resolve-se pela INTENÇÃO das mudanças, não pela sintaxe — por isso "aceitar ambos" cegamente gera código quebrado que compila.',
      'git diff durante o conflito mostra os dois lados; git log --merge lista os commits envolvidos — contexto antes de decidir.',
      'Prevenção > cura: branches curtas, integração frequente da main e módulos bem divididos derrubam a taxa de conflito.',
    ],
    pitfalls: [
      'Aceitar "current" ou "incoming" no editor sem ler o que cada um faz.',
      'Esquecer marcadores no arquivo e commitar <<<<<<< para produção (aconteceu em todo time, uma vez).',
    ],
    practiceSteps: [
      'Fabrique um conflito num repo de teste e resolva manualmente, narrando a decisão.',
      'Resolva o mesmo conflito com o agente explicando os lados; compare.',
      'Pratique o --abort e confirme que nada se perdeu.',
    ],
    projectContext:
      'Com múltiplos agentes em paralelo, conflitos são rotina estatística — o consultor calmo em conflito mantém o trem andando.',
    references: [
      {
        label: 'GitHub Docs — resolver conflitos',
        url: GH + '/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts',
        kind: 'doc',
      },
      {
        label: 'Pro Git — merge conflicts',
        url: GIT + '/book/en/v2/Git-Branching-Basic-Branching-and-Merging',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'gh-5',
    index: 5,
    title: 'Desfazer coisas: restore, reset, revert e stash',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Qual usar em cada situação — sem destruir trabalho (seu ou do agente).',
    concept:
      'O mapa do desfazer, por situação: mudança local indesejada → git restore arquivo (descarta na working tree); saiu do stage → git restore --staged; commits locais que quer refazer → git reset (--soft mantém tudo staged, --mixed mantém na working tree, --hard DESTRÓI — o único perigoso); commit já publicado → git revert (cria um commit inverso, histórico intocado — o único aceitável em branch compartilhada); trabalho no meio e precisa trocar de contexto → git stash guarda e git stash pop devolve. E a rede de segurança que quase ninguém conhece: git reflog registra onde o HEAD esteve — quase tudo "perdido" está lá, recuperável.',
    deepDive: [
      'Regra pública vs privada: reset reescreve histórico (só local/não-pushado); revert adiciona história (seguro publicado).',
      'reset --hard + arquivos nunca commitados = perda real e irrecuperável — o único cenário sem volta; commite cedo, commite sempre.',
      'stash com mensagem (git stash push -m "contexto") e lista auditada — stash anônimo de 3 semanas é trabalho perdido por esquecimento.',
    ],
    pitfalls: [
      'reset --hard como reflexo para "limpar" — com trabalho não commitado junto.',
      'Reescrever histórico de branch compartilhada e quebrar o repo dos colegas.',
    ],
    practiceSteps: [
      'Monte o cenário de cada comando num repo de teste e execute os cinco.',
      '"Perca" um commit com reset --hard e recupere via reflog.',
    ],
    projectContext:
      'Agente tomou direção errada por 4 commits? Quem domina o desfazer trata isso como rotina de 2 minutos — é a confiança que permite dar autonomia.',
    references: [
      {
        label: 'Pro Git — undoing things',
        url: GIT + '/book/en/v2/Git-Basics-Undoing-Things',
        kind: 'curso',
      },
      {
        label: 'GitHub Blog — how to undo (almost) anything',
        url: 'https://github.blog/open-source/git/how-to-undo-almost-anything-with-git/',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 40,
  },
  {
    id: 'gh-6',
    index: 6,
    title: 'Submodules — fundamentos: o ponteiro para um commit',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'O que é de verdade, git submodule add, .gitmodules e clonar com --recurse-submodules.',
    concept:
      'Um submodule é um repositório Git dentro de outro — mas a chave conceitual que evita TODOS os sustos: o repo pai não guarda os arquivos do submodule; ele guarda um PONTEIRO para um commit específico dele (mais a URL, no .gitmodules). "Projeto dentro de projeto" com versão pinada: o pai sempre aponta para um estado exato do filho, não para "a versão mais recente". git submodule add URL pasta cria; o clone de um repo com submodules vem com as pastas VAZIAS a menos que se use git clone --recurse-submodules (ou se rode o init/update depois). Entendeu o ponteiro, entendeu submodules; pulou isso, vai sofrer nos próximos dois tópicos.',
    deepDive: [
      'O .gitmodules (versionado) mapeia pasta → URL; o ponteiro do commit fica gravado como uma entrada especial no índice do pai — git status mostra o submodule como "uma coisa" que muda quando o ponteiro muda.',
      'Por que existir: compartilhar uma lib interna entre N projetos de clientes, cada projeto pinado na versão que testou — atualização é decisão explícita, não surpresa.',
      'Alternativas para comparar depois: subtree (copia o histórico para dentro), monorepo (tudo junto), pacote publicado (npm privado) — submodule é uma das opções, não a única.',
    ],
    pitfalls: [
      'Achar que o pai "acompanha" o submodule automaticamente — ele aponta para um commit fixo até alguém atualizar o ponteiro.',
      'Clonar sem --recurse-submodules e abrir issue de "faltam arquivos".',
    ],
    practiceSteps: [
      'Crie um repo pai + submodule de teste; inspecione .gitmodules e o que o git status do pai mostra.',
      'Clone o pai com e sem --recurse-submodules e compare o estado das pastas.',
      'Explique o modelo do ponteiro em 4 frases para alguém do time.',
    ],
    projectContext:
      'A arquitetura "projeto dentro de projeto" dos clientes de vocês é exatamente isto — o modelo mental do ponteiro é pré-requisito do trabalho diário.',
    references: [
      {
        label: 'Pro Git — submodules (o capítulo)',
        url: GIT + '/book/en/v2/Git-Tools-Submodules',
        kind: 'curso',
      },
      { label: 'Referência — git submodule', url: GIT + '/docs/git-submodule', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 40,
  },
  {
    id: 'gh-7',
    index: 7,
    title: 'Submodules — operação diária: o fluxo de 2 commits',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'update --init --recursive, atualizar para versão nova e commitar dentro E no pai.',
    concept:
      'Os três movimentos do dia a dia: (1) sincronizar — git submodule update --init --recursive materializa/alinha os submodules ao ponteiro que o pai manda (o comando que resolve "pasta vazia" e "submodule dessincronizado"); (2) puxar versão nova — entrar no submodule, git pull da branch desejada (ou git submodule update --remote), e então commitar NO PAI o novo ponteiro; (3) mudar código do submodule — o fluxo de 2 commits que é a essência de trabalhar com submodules: commit + push DENTRO do submodule primeiro, depois commit no PAI atualizando o ponteiro. Pular o primeiro push deixa o pai apontando para um commit que só existe na sua máquina — e quebra o clone de todo o resto do time.',
    deepDive: [
      'A ordem é sagrada: push do submodule ANTES do push do pai. git push --recurse-submodules=check recusa o push do pai se o commit apontado não estiver publicado — ative como proteção.',
      'git status no pai mostra "new commits" no submodule = o ponteiro mudou e precisa de decisão: commitar a atualização ou voltar com update.',
      'git diff --submodule mostra o que mudou entre os ponteiros — a revisão do "o que estou trazendo".',
    ],
    pitfalls: [
      'O clássico absoluto: commitar o ponteiro no pai sem ter dado push no submodule — o time inteiro trava no update.',
      'Rodar update sem --init --recursive em projeto com submodules aninhados e sincronizar pela metade.',
    ],
    practiceSteps: [
      'Execute o fluxo de 2 commits completo no seu repo de teste, na ordem certa.',
      'Simule o erro clássico (pai aponta commit não-pushado) e observe o que o colega veria; conserte.',
      'Configure push.recurseSubmodules check no time.',
    ],
    projectContext:
      'Este fluxo roda várias vezes por semana nos projetos de vocês — automatizá-lo na memória muscular (e no CLAUDE.md dos agentes) elimina a categoria inteira de incidente.',
    references: [
      {
        label: 'Pro Git — trabalhando em submodules',
        url: GIT + '/book/en/v2/Git-Tools-Submodules',
        kind: 'curso',
      },
      { label: 'Referência — git submodule', url: GIT + '/docs/git-submodule', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 45,
  },
  {
    id: 'gh-8',
    index: 8,
    title: 'Submodules — pegadinhas: detached HEAD, pasta vazia e remoção certa',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Os quatro sustos clássicos e a resolução de cada um.',
    concept:
      'As quatro pegadinhas que emboscam todo time: (1) detached HEAD — git submodule update faz checkout do COMMIT apontado, não de uma branch; commitar ali sem criar branch gera commits órfãos (antes de editar dentro do submodule: git switch main ou -c fix-x); (2) pasta vazia pós-clone — faltou --recurse-submodules; resolve com update --init --recursive; (3) o colega "com submodule velho" — ele deu pull no pai mas não rodou o update; o ponteiro novo chegou, os arquivos não; (4) remover submodule NÃO é apagar a pasta — é git submodule deinit -f pasta → git rm -f pasta → apagar .git/modules/pasta, os 3 passos; apagar só a pasta deixa lixo que assombra o repo.',
    deepDive: [
      'Detached HEAD é comportamento correto (o pai pina um commit) — o perigo é só EDITAR nesse estado; o reflog do submodule recupera commits órfãos se acontecer.',
      'Automatize a sincronia do time: hook post-merge rodando submodule update, ou git config submodule.recurse true para pull/checkout arrastarem os submodules juntos.',
      'Diagnóstico rápido: git submodule status — o prefixo (+ ponteiro divergente, - não inicializado) conta o estado de cada um numa linha.',
    ],
    pitfalls: [
      'Perder uma tarde de commits em detached HEAD e achar que "o Git comeu".',
      'Remover submodule apagando a pasta e commitando — o registro meio-morto quebra operações futuras.',
    ],
    practiceSteps: [
      'Provoque o detached HEAD, commite nele, "perca" e recupere via reflog — a vacina definitiva.',
      'Simule o colega dessincronizado e escreva o diagnóstico + fix em 2 linhas.',
      'Remova um submodule pelos 3 passos corretos e valide com git submodule status.',
    ],
    projectContext:
      'Estes quatro cenários são os chamados de suporte reais dos repos com submodule — o consultor que os resolve de cabeça vira a referência do time.',
    references: [
      {
        label: 'Pro Git — submodule pitfalls',
        url: GIT + '/book/en/v2/Git-Tools-Submodules',
        kind: 'curso',
      },
      { label: 'Referência — gitsubmodules', url: GIT + '/docs/gitsubmodules', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 45,
  },
  {
    id: 'gh-9',
    index: 9,
    title: 'Agentes + submodules: instruções e commits nos dois níveis',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Onde pôr CLAUDE.md/AGENTS.md, o que o agente enxerga e o fluxo de 2 commits via agente.',
    concept:
      'Onde agente encontra submodule, nasce confusão — a menos que você desenhe: (1) instruções em camadas — CLAUDE.md/AGENTS.md no repo PAI explica a arquitetura ("a pasta lib/ é um submodule; siga o fluxo de 2 commits; nunca commite ponteiro sem push do filho") e cada submodule tem o SEU arquivo com as regras locais (os agentes leem os arquivos do caminho onde trabalham — a hierarquia cobre os dois níveis); (2) visibilidade — o agente enxerga os arquivos do submodule normalmente (é uma pasta), mas precisa ser INSTRUÍDO de que os commits dali são de outro repositório; (3) o fluxo de 2 commits via agente funciona bem — desde que o pedido seja explícito: "commite e push primeiro dentro de lib/, depois atualize o ponteiro no pai".',
    deepDive: [
      'A instrução que evita 90% dos incidentes, verbatim no CLAUDE.md do pai: "lib/ é um submodule (repo separado). Mudanças ali: commit+push DENTRO de lib/ primeiro; só então commit do ponteiro aqui. Jamais git add lib sem push prévio do submodule".',
      'Sessões separadas para trabalho pesado: agente A dentro do submodule, agente B no pai — contexto limpo e menos chance de commit no repo errado.',
      'Hooks como cinto: PreToolUse bloqueando commit do pai quando o submodule tem commits não-pushados — a regra vira código.',
    ],
    pitfalls: [
      'Deixar o agente descobrir sozinho que a pasta é um submodule — ele vai tratar como pasta comum e o desastre é silencioso.',
      'Pedir "commita tudo" num repo pai com mudanças nos dois níveis.',
    ],
    practiceSteps: [
      'Escreva os CLAUDE.md dos dois níveis do seu repo real com as regras de submodule.',
      'Execute o fluxo de 2 commits inteiro via agente, com o pedido explícito, e audite o resultado.',
      'Crie o hook que bloqueia o commit-do-ponteiro-sem-push e teste.',
    ],
    projectContext:
      'Este tópico é literalmente o dia a dia dos projetos de vocês — o pacote instruções + hook + fluxo documentado é entregável interno prioritário.',
    references: [
      {
        label: 'Docs — memória do Claude Code (hierarquia)',
        url: 'https://docs.claude.com/en/docs/claude-code/memory',
        kind: 'doc',
      },
      {
        label: 'Docs — AGENTS.md (hierarquia)',
        url: 'https://developers.openai.com/codex/guides/agents-md',
        kind: 'doc',
      },
      {
        label: 'Pro Git — submodules',
        url: GIT + '/book/en/v2/Git-Tools-Submodules',
        kind: 'curso',
      },
    ],
    xp: 60,
    estMinutes: 45,
  },
  {
    id: 'gh-10',
    index: 10,
    title: '.gitignore e segredos: a key vazada se revoga',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Patterns, .env fora do repo, ignorar arquivo já commitado e o protocolo do vazamento.',
    concept:
      'O .gitignore lista o que o Git deve fingir que não existe: node_modules/, build/, .env e todo arquivo de credencial — com patterns por pasta, extensão e negação (!manter-este). Duas verdades que todo time aprende do jeito difícil: (1) ignorar não afeta o que JÁ foi commitado — para parar de rastrear um arquivo commitado: git rm --cached arquivo + entrada no ignore + commit; (2) segredo que tocou o histórico está COMPROMETIDO para sempre — deletar do código não deleta dos commits antigos, de forks, de clones. O protocolo do vazamento é inegociável e nesta ordem: REVOGAR a credencial no provedor AGORA → gerar nova → depois (opcional) limpar o histórico.',
    deepDive: [
      'Padrão profissional: .env no ignore + .env.example versionado documentando as variáveis sem valores — o onboarding agradece.',
      'Bots varrem o GitHub público por chaves em segundos — "commitei e apaguei rapidinho" já foi coletado; o secret scanning do GitHub avisa, mas revogar é com você.',
      'Templates prontos por stack: github/gitignore — comece deles, ajuste o específico.',
    ],
    pitfalls: [
      'Deletar a chave do código, commitar "remove secret" e considerar resolvido — a chave vive no histórico.',
      'Agente commitando .env porque ninguém criou o ignore antes da primeira sessão.',
    ],
    practiceSteps: [
      'Monte o .gitignore padrão dos projetos da consultoria a partir do template do stack.',
      'Pratique o git rm --cached num arquivo commitado de teste.',
      'Escreva o protocolo de vazamento em 4 passos e cole no canal do time.',
    ],
    projectContext:
      'O .gitignore correto ANTES da primeira sessão de agente é item de checklist de kickoff — agentes commitam rápido, inclusive o que não deviam.',
    references: [
      {
        label: 'Templates — github/gitignore',
        url: 'https://github.com/github/gitignore',
        kind: 'tool',
      },
      {
        label: 'GitHub Docs — secret scanning',
        url: GH + '/en/code-security/secret-scanning/about-secret-scanning',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'gh-11',
    index: 11,
    title: 'Pull Requests: abrir, revisar e escolher o merge',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Descrever bem, request changes, aprovar — e merge commit vs squash vs rebase.',
    concept:
      'O PR é a unidade de colaboração: propõe a integração de uma branch, com descrição (o quê, por quê, como testar), diff revisável, conversas por linha, request changes/approve e o merge. As três formas de mergear mudam o HISTÓRICO que o projeto carrega para sempre: merge commit preserva tudo (histórico fiel, mais poluído), squash and merge esmaga a branch num commit único (main limpa, um commit por PR — o padrão mais comum em times com agentes, que geram muitos commits intermediários), rebase and merge replaneja os commits na main (linear, sem commit de merge). Defina UMA política por repo e configure o botão para permitir só ela.',
    deepDive: [
      'Descrição de PR é assíncrona por natureza: contexto + decisão + como validar — o revisor (humano ou @claude/@codex) trabalha com o que está escrito.',
      'Revisão boa comenta na linha, distingue "bloqueante" de "sugestão" e aprova quando os bloqueantes morrem — cultura que se ensina no cliente.',
      'PR pequeno é revisável; PR de 3000 linhas é aprovado por exaustão — limite de tamanho é política de qualidade.',
    ],
    pitfalls: [
      'Squash em PR com commits que mereciam história separada (migração + feature juntas).',
      'Aprovar sem rodar — o diff bonito que quebra em runtime.',
    ],
    practiceSteps: [
      'Abra um PR exemplar (descrição completa, como testar) e passe por revisão real.',
      'Compare os 3 tipos de merge num repo de teste e olhe o git log resultante de cada.',
      'Defina a política de merge dos repos da consultoria.',
    ],
    projectContext:
      'Com agentes produzindo o grosso do código, o PR vira o ponto de controle de qualidade central — a política de PR É a política de qualidade.',
    references: [
      { label: 'GitHub Docs — pull requests', url: GH + '/en/pull-requests', kind: 'doc' },
      {
        label: 'GitHub Docs — métodos de merge',
        url:
          GH +
          '/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github',
        kind: 'doc',
      },
    ],
    xp: 60,
    estMinutes: 35,
  },
  {
    id: 'gh-12',
    index: 12,
    title: 'Revisar PR de agente: o checklist e as red flags',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'O que checar num PR gerado por Claude Code/Codex — e os padrões de alerta.',
    concept:
      'PR de agente se revisa diferente: o código vem sintaticamente impecável — o risco mora na SEMÂNTICA e nos efeitos colaterais. O checklist de campo: (1) escopo — mudou algo fora do pedido? (agentes adoram "aproveitar e melhorar"); (2) testes — os novos testam de verdade ou só passam? (asserts triviais, mocks que mockam o próprio teste); (3) red flags clássicas — dependência nova não justificada, try/catch engolindo erro para "passar", deleção de teste que falhava, hardcode de valor que devia ser config, mudança em arquivo de migração antigo; (4) segurança — segredos, inputs sem validação, permissões alargadas. E a meta-regra: se o PR é grande demais para revisar com atenção, a tarefa foi grande demais — devolva e fatie.',
    deepDive: [
      'Leia primeiro os testes: eles contam o que o agente ENTENDEU do pedido — desalinho aparece ali antes do código.',
      'Automatize a primeira passada: subagente revisor / review automático do Codex filtra o grosso; o humano revisa intenção e arquitetura.',
      'git diff main...branch -- pasta-critica primeiro: olhe o que tocou nas áreas sensíveis antes do resto.',
    ],
    pitfalls: [
      'Aprovar por confiança acumulada ("os últimos 10 estavam bons") — a taxa de erro não é zero e o 11º é o caro.',
      'Revisar só o que o resumo do PR DIZ que mudou em vez do diff real.',
    ],
    practiceSteps: [
      'Aplique o checklist em 3 PRs de agente reais e registre o que pegou.',
      'Monte o template de revisão da consultoria como custom command (/review-pr).',
    ],
    projectContext:
      'Este checklist é o produto interno mais valioso da consultoria — é o que garante a qualidade prometida ao cliente na era do código gerado.',
    references: [
      {
        label: 'GitHub Docs — revisão de PRs',
        url:
          GH +
          '/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests',
        kind: 'doc',
      },
      {
        label: 'Claude Code best practices',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        kind: 'artigo',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'gh-13',
    index: 13,
    title: 'Worktrees: paralelismo sem clonar de novo',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'git worktree add, quando usar em vez de submodule e múltiplos agentes.',
    concept:
      'git worktree add ../pasta branch cria um segundo diretório de trabalho do mesmo repositório, em outra branch — checkouts paralelos compartilhando o mesmo .git. Não confunda os papéis: submodule = COMPOR repositórios diferentes (projeto dentro de projeto); worktree = PARALELIZAR o trabalho no MESMO repositório. O caso de uso dominante hoje é rodar N agentes simultâneos sem colisão (um por worktree/branch), mais os clássicos: hotfix urgente sem stashear a feature no meio, e comparar duas versões lado a lado. git worktree list audita; remove limpa.',
    deepDive: [
      'Cada worktree exige o próprio setup (deps, .env) — o script new-worktree.sh que cria + instala + copia configs paga o investimento na primeira semana.',
      'Uma branch só pode estar em um worktree por vez — proteção natural contra dois agentes na mesma branch.',
      'Worktrees são descartáveis por design: terminou a tarefa, merge e remove — não os deixe virar clones permanentes esquecidos.',
    ],
    pitfalls: [
      'Worktrees órfãos acumulando gigabytes de node_modules.',
      'Usar worktree onde a resposta era submodule (ou vice-versa) por não distinguir compor de paralelizar.',
    ],
    practiceSteps: [
      'Rode dois agentes em dois worktrees no mesmo repo e mergeie as duas entregas.',
      'Escreva o script de criação de worktree padronizado do time.',
    ],
    projectContext:
      'Worktree + agente é o multiplicador de throughput da consultoria — e a distinção worktree vs submodule cai em toda conversa de arquitetura com o cliente.',
    references: [
      { label: 'Referência — git worktree', url: GIT + '/docs/git-worktree', kind: 'doc' },
      {
        label: 'Claude Code — fluxos com worktrees',
        url: 'https://docs.claude.com/en/docs/claude-code/common-workflows',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'gh-14',
    index: 14,
    title: 'GitHub CLI (gh): a língua franca dos agentes',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'gh auth login, gh pr create, gh issue — o que os agentes usam o tempo todo.',
    concept:
      'O gh traz o GitHub para o terminal: gh auth login (autenticação completa em um fluxo), gh pr create/view/checkout/merge, gh issue list/create, gh run watch (CI ao vivo), gh repo clone. O motivo de ser tópico desta trilha: é a ferramenta que Claude Code e Codex usam para TODA interação com o GitHub — criar PRs, ler issues, checar Actions. Sem gh autenticado, o agente vira meio-agente. E para o humano, gh pr checkout 42 (revisar o PR localmente em um comando) sozinho já paga a instalação.',
    deepDive: [
      'gh api abre a API inteira do GitHub para scripts e para o agente — automações que a CLI não cobre nativamente.',
      'gh pr view --json + jq = relatórios de PRs scriptáveis; a base de dashboards de esteira baratos.',
      'Instale e autentique gh como parte do setup padrão de máquina — antes da primeira sessão de agente.',
    ],
    pitfalls: [
      'Debugar "o agente não cria PR" por 1h quando era gh não autenticado (claude doctor avisa).',
      'Escopos de token do gh insuficientes para org do cliente (SSO precisa de autorização extra).',
    ],
    practiceSteps: [
      'Autentique e rode o ciclo: gh issue create → gh pr create → gh pr merge num repo de teste.',
      'Use gh pr checkout para revisar o PR de um colega/agente localmente.',
    ],
    projectContext:
      'gh no setup de kickoff é o que habilita todos os fluxos agente↔GitHub prometidos na implantação.',
    references: [
      { label: 'GitHub CLI — manual', url: 'https://cli.github.com/manual/', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'gh-15',
    index: 15,
    title: 'Histórico como ferramenta: log, diff, blame e bisect',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Investigar "quando isso quebrou?" e "por que esse código existe?".',
    concept:
      'O histórico responde perguntas que documentação nenhuma responde: git log --oneline --graph (a forma do projeto), git log -p arquivo (a evolução de um arquivo), git log -S"termo" (quando esse código entrou/saiu — o pickaxe), git diff A..B (o que mudou entre pontos), git blame arquivo (quem/quando/em qual commit cada linha nasceu — para achar o CONTEXTO, não o culpado), e a joia: git bisect — busca binária no histórico que encontra o commit exato que quebrou algo em log2(n) testes; com git bisect run ./teste.sh, encontra SOZINHO. Com agentes, tudo isso vira linguagem natural: "descubra quando e por que essa função mudou de comportamento" — o agente roda a arqueologia por você.',
    deepDive: [
      'blame + o commit + o PR do commit = a decisão original com discussão — a trilha completa do "por quê".',
      'bisect automatizado é o assassino de regressões: script que reproduz o bug + bisect run = commit culpado em minutos, mesmo em 500 commits.',
      'Históricos limpos (commits atômicos, mensagens com porquê) são o que torna tudo isso possível — a recompensa da disciplina dos tópicos anteriores.',
    ],
    pitfalls: [
      'Usar blame para apontar dedo em retrospectiva — mata a cultura antes da ferramenta.',
      'Caçar regressão lendo diffs no olho quando bisect resolvia em 8 passos.',
    ],
    practiceSteps: [
      'Plante um bug num repo de teste com 20 commits e ache-o com bisect (manual e run).',
      'Use log -S para rastrear a origem de uma função num repo real.',
    ],
    projectContext:
      'Em repo herdado de cliente (o cenário padrão da consultoria), a arqueologia de histórico é como se aprende o sistema — e o agente é o arqueólogo.',
    references: [
      {
        label: 'Pro Git — viewing history',
        url: GIT + '/book/en/v2/Git-Basics-Viewing-the-Commit-History',
        kind: 'curso',
      },
      { label: 'Referência — git bisect', url: GIT + '/docs/git-bisect', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'gh-16',
    index: 16,
    title: 'Rebase vs merge: o que cada um faz com a história',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'Rebase interativo básico e a regra de nunca rebasear branch compartilhada.',
    concept:
      'Merge integra criando um commit que une duas linhas — a história fica fiel (e ramificada). Rebase REESCREVE: pega seus commits e os replaneja sobre outra base, como se você tivesse começado dali — história linear e limpa, ao custo de commits novos (hashes mudam). O uso saudável: rebase da main na SUA feature branch para ficar atualizado sem poluir, e rebase interativo (git rebase -i) para lapidar seus commits antes do PR (squash de "fix typo", reordenar, reescrever mensagens). A LEI, sem exceção: nunca rebasear branch que outros já puxaram — os hashes mudam e o repo dos outros quebra; reescrita é para história privada.',
    deepDive: [
      'rebase -i é o editor de história: pick/squash/reword/drop — a diferença entre um PR com 14 commits de rascunho e 3 commits que contam uma história.',
      'Conflitos em rebase aparecem commit a commit (resolve → rebase --continue); --abort desiste e volta ao estado original.',
      'A política de time resolve o debate religioso: ex. "rebase local para atualizar e lapidar; squash-merge no PR; merge commit nunca manual" — consistência > preferência.',
    ],
    pitfalls: [
      'Rebase na branch compartilhada e o time inteiro com histórico divergente na segunda-feira.',
      'push --force pós-rebase em vez de --force-with-lease (que ao menos recusa se alguém pushou no meio).',
    ],
    practiceSteps: [
      'Transforme 6 commits bagunçados em 2 limpos com rebase -i num repo de teste.',
      'Atualize uma feature branch via rebase da main e resolva um conflito no caminho.',
    ],
    projectContext:
      'A política de história do repo entra no CLAUDE.md/AGENTS.md — agentes geram muitos commits; a lapidação antes do PR é parte do fluxo.',
    references: [
      {
        label: 'Pro Git — rebasing',
        url: GIT + '/book/en/v2/Git-Branching-Rebasing',
        kind: 'curso',
      },
      {
        label: 'Learn Git Branching (níveis de rebase)',
        url: 'https://learngitbranching.js.org/',
        kind: 'curso',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'gh-17',
    index: 17,
    title: 'Arquitetura de repos: mono, multi, submodule ou subtree',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'Como decidir a estrutura para o "projeto dentro de projeto" do cliente.',
    concept:
      'A decisão estrutural que define anos de fricção (ou fluidez): monorepo (tudo num repo — refactors atômicos entre módulos, tooling e CI mais exigentes), multi-repo (um por serviço/projeto — autonomia e permissões simples, mudanças cross-repo doloridas), submodules (composição com versão pinada — o modelo dos projetos de vocês; poder + a curva de aprendizado dos tópicos 6-9) e subtree (copia o outro repo PARA DENTRO do histórico — colaborador não precisa saber que existe; sincronizar de volta é o custo). Os critérios de decisão: quem precisa de acesso a quê (permissão é POR REPO no GitHub), com que frequência as partes mudam juntas, maturidade Git do time, e o ciclo de release de cada parte.',
    deepDive: [
      'Permissão decide muito sozinha: código do cliente A não pode ser visível ao cliente B → monorepo já morreu; submodule/multi-repo resolvem.',
      'A quarta opção esquecida: publicar como PACOTE (npm/pip privado) — quando a lib compartilhada é estável, versionamento semântico bate submodule em simplicidade.',
      'Não existe resposta certa universal — existe trade-off documentado; a ADR (architecture decision record) de 1 página protege a decisão de re-litígio eterno.',
    ],
    pitfalls: [
      'Escolher submodule por inércia quando um pacote publicado eliminaria toda a operação dos 2 commits.',
      'Monorepo de 2 clientes "por praticidade" e o vazamento de acesso descoberto tarde.',
    ],
    practiceSteps: [
      'Mapeie um projeto real de cliente nas 4+1 opções e escreva a ADR da recomendação.',
      'Liste os critérios de decisão do time em ordem de peso.',
    ],
    projectContext:
      'É A pergunta de arquitetura que os clientes de vocês fazem — e a resposta estruturada por critérios (não por moda) é o que diferencia a consultoria.',
    references: [
      {
        label: 'Pro Git — submodules e alternativas',
        url: GIT + '/book/en/v2/Git-Tools-Submodules',
        kind: 'curso',
      },
      {
        label: 'GitHub Docs — organizando repositórios',
        url: GH + '/en/repositories',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 35,
  },
  {
    id: 'gh-18',
    index: 18,
    title: 'Tags e releases: versionar entregas',
    priority: 'media',
    type: 'pratica',
    shortDescription:
      'Tags anotadas, SemVer e releases no GitHub como marco de entrega ao cliente.',
    concept:
      'Tag é um nome permanente para um commit — o "entregamos exatamente ISTO": git tag -a v1.2.0 -m "mensagem" cria a anotada (com autor, data e mensagem — sempre prefira à leve), git push --tags publica (tags NÃO sobem no push normal — a pegadinha universal). Por cima, a Release do GitHub transforma a tag em marco navegável: changelog, artefatos anexados, link permanente. Com SemVer dando significado aos números (MAJOR.MINOR.PATCH = quebra.recurso.correção), a entrega para o cliente ganha vocabulário: "a v2.1.0 adiciona X sem quebrar nada; a v3 muda o contrato".',
    deepDive: [
      'gh release create v1.2.0 --generate-notes gera o changelog dos PRs desde a última release — entrega documentada em um comando.',
      'Tag é o alvo do rollback limpo: deploy quebrou → volta para a tag anterior, exata e testada.',
      'Em submodules, o pai apontar para TAGS do filho (não para commits soltos) torna o ponteiro legível: lib@v1.4.2 conta uma história.',
    ],
    pitfalls: [
      'Esquecer o push --tags e o CI/colega não encontrar a versão.',
      'SemVer decorativo (v2.0.0 sem breaking change nenhuma) que destrói a semântica.',
    ],
    practiceSteps: [
      'Crie tag anotada + release com notas geradas num repo de teste.',
      'Defina a política de versionamento das entregas da consultoria.',
    ],
    projectContext:
      'Cada entrega de fase ao cliente vira uma release: rastreável, com changelog, com rollback — profissionalismo que aparece na renovação.',
    references: [
      { label: 'Pro Git — tagging', url: GIT + '/book/en/v2/Git-Basics-Tagging', kind: 'curso' },
      { label: 'Semantic Versioning', url: 'https://semver.org/', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'gh-19',
    index: 19,
    title: 'Branch protection e CODEOWNERS',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'Proteger a main do cliente — de humanos apressados e de agentes autônomos.',
    concept:
      'Branch protection (hoje via rulesets) transforma a política de qualidade em regra imposta pelo servidor: proibir push direto na main, exigir PR com N aprovações, exigir status checks (CI verde) antes do merge, bloquear force push e deleção. CODEOWNERS complementa: um arquivo que mapeia caminhos → donos (/infra/ @time-infra), e o GitHub exige a revisão do dono quando aquele caminho muda. Na era dos agentes, isso deixa de ser burocracia: é o guardrail estrutural — o agente PODE tentar pushar na main; o servidor recusa, sempre, independente de prompt.',
    deepDive: [
      'A configuração mínima de todo repo de cliente: main protegida + PR obrigatório + 1 aprovação + CI verde — 10 minutos que previnem a categoria inteira de incidente.',
      'CODEOWNERS nos caminhos críticos (migrations/, infra/, .github/) garante olho experiente exatamente onde o erro custa caro.',
      'Inclua admins na regra ("do not bypass") — a exceção do dono do repo é como os desastres acontecem.',
    ],
    pitfalls: [
      'Proteção tão pesada num time de 2 que o processo trava e alguém desliga tudo.',
      'CODEOWNERS apontando para gente que saiu do projeto — PRs presos em revisor fantasma.',
    ],
    practiceSteps: [
      'Configure o ruleset mínimo num repo de teste e tente violá-lo (push direto, force).',
      'Escreva o CODEOWNERS de um projeto real com 3 caminhos críticos.',
    ],
    projectContext:
      'Configurar proteção nos repos do cliente é entregável de governança do kickoff — antes do primeiro agente rodar, não depois do primeiro susto.',
    references: [
      {
        label: 'GitHub Docs — rulesets',
        url:
          GH +
          '/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets',
        kind: 'doc',
      },
      {
        label: 'GitHub Docs — CODEOWNERS',
        url:
          GH +
          '/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners',
        kind: 'doc',
      },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'gh-20',
    index: 20,
    title: 'GitHub Actions básico: o workflow e o --recursive que o CI esquece',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'Anatomia de um workflow, testes em PR e o checkout de submodules.',
    concept:
      'Actions é o CI/CD nativo: arquivos YAML em .github/workflows/ declarando gatilhos (on: pull_request), jobs e steps (actions prontas como actions/checkout + comandos seus). O workflow fundamental de todo repo: em cada PR, instalar deps, rodar lint e testes — o status check que a branch protection exige. E a pegadinha titular, que vive nos projetos com submodule: o actions/checkout NÃO traz submodules por padrão — o build passa local e quebra no CI com pasta vazia; a cura é declarar with: submodules: recursive no step de checkout (e token com acesso, se o submodule é privado).',
    deepDive: [
      'Segredos do workflow vêm de Settings → Secrets, referenciados por contexto — nunca literais no YAML.',
      'O ciclo de debug: gh run watch acompanha ao vivo; logs por step; re-run só do job que falhou.',
      'Actions de terceiros são código executando com seus segredos — fixe versões (de preferência por SHA) e prefira as oficiais.',
    ],
    pitfalls: [
      'O clássico do título: CI vermelho misterioso que era submodule não inicializado.',
      'Workflow disparando em todo push de toda branch e queimando minutos à toa.',
    ],
    practiceSteps: [
      'Monte o workflow de lint+teste em PR num repo de teste e veja o check no PR.',
      'Num repo com submodule, quebre o CI (sem recursive) e conserte (com).',
    ],
    projectContext:
      'O workflow padrão da consultoria (com o checkout recursive já embutido) vai em todo repo de cliente no kickoff — e vira o status check da proteção de branch.',
    references: [
      {
        label: 'GitHub Docs — Actions (introdução)',
        url: GH + '/en/actions/get-started/understanding-github-actions',
        kind: 'doc',
      },
      {
        label: 'actions/checkout (opções)',
        url: 'https://github.com/actions/checkout',
        kind: 'tool',
      },
    ],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'gh-21',
    index: 21,
    title: 'Permissões de org e times: vocês no repo do cliente',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'Roles, outside collaborators e o acesso mínimo que funciona.',
    concept:
      'O modelo do GitHub em organizações: roles por repo (read → triage → write → maintain → admin), times agrupando pessoas com permissões herdáveis, e a figura que descreve a consultoria: outside collaborator — acesso a repos específicos sem ser membro da org. O princípio que rege tudo é o menor privilégio que ainda permite trabalhar: consultor que abre PRs precisa de write nos repos do projeto, quase nunca de admin, nunca de owner da org. E o ciclo de vida importa dos dois lados: acesso concedido no kickoff com escopo documentado, acesso REMOVIDO no encerramento — o offboarding limpo é reputação.',
    deepDive: [
      'SSO da org do cliente: seu PAT/SSH precisa ser autorizado para a org — o "403 misterioso" mais comum de colaborador externo.',
      'Peça acesso por TIME (ex: time "consultoria-x" com write nos repos do projeto) — entra/sai gente do projeto sem reconfigurar repo a repo.',
      'Agentes usam SUAS credenciais: o raio de ação do agente = o seu acesso — mais um argumento para o mínimo necessário.',
    ],
    pitfalls: [
      'Aceitar admin "para facilitar" e virar o suspeito de todo incidente.',
      'Encerrar o projeto e deixar os acessos vivos por meses.',
    ],
    practiceSteps: [
      'Desenhe a matriz de acesso padrão de um projeto (quem, qual role, quais repos, até quando).',
      'Escreva o checklist de offboarding de acesso do encerramento de projeto.',
    ],
    projectContext:
      'A proposta de acesso mínimo documentada acalma a TI do cliente no kickoff — e o offboarding limpo abre a porta do próximo contrato.',
    references: [
      {
        label: 'GitHub Docs — roles em organizações',
        url:
          GH +
          '/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization',
        kind: 'doc',
      },
    ],
    xp: 30,
    estMinutes: 20,
  },
  {
    id: 'gh-22',
    index: 22,
    title: 'git-filter-repo e BFG: limpar o histórico quando o estrago já foi feito',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'Apagar segredo/arquivo do histórico inteiro — o procedimento e seus custos.',
    concept:
      'Quando um segredo ou arquivo gigante entrou no histórico e PRECISA sair de todos os commits, a ferramenta é reescrita total: git-filter-repo (a recomendada atual) ou BFG Repo-Cleaner (mais antiga, ainda popular) removem o conteúdo de TODA a história. O procedimento tem cerimônia obrigatória: (1) a credencial já foi REVOGADA (a limpeza NÃO substitui isso — clones e forks existentes ainda têm o dado); (2) backup/clone espelho antes; (3) rodar a remoção; (4) force push coordenado; (5) TODO o time re-clona — os hashes mudaram, repos antigos são incompatíveis; (6) invalidar caches (o GitHub pode reter objetos; o suporte deles ajuda em caso público grave).',
    deepDive: [
      'filter-repo --invert-paths --path arquivo remove um caminho da história toda; --replace-text troca strings (a chave por ***REMOVED***).',
      'É cirurgia de repo parado: janela combinada, PRs mergeados ou salvos, ninguém trabalhando durante — reescrita com trabalho em voo perde trabalho.',
      'O caso "arquivo de 800MB commitado" usa a mesma ferramenta — repos de cliente lentos às vezes carregam esse passado.',
    ],
    pitfalls: [
      'Fazer a limpeza e NÃO revogar a chave — teatro de segurança.',
      'Force push sem coordenar e o time com repos irreconciliáveis na manhã seguinte.',
    ],
    practiceSteps: [
      'Num repo descartável: commite um "segredo", espalhe por 10 commits, remova com filter-repo e verifique com log -S que sumiu.',
      'Escreva o runbook completo do procedimento (com a revogação no passo 1).',
    ],
    projectContext:
      'É o incidente que chega pronto na consultoria ("commitamos a chave da AWS há 3 meses") — ter o runbook testado transforma crise em procedimento.',
    references: [
      { label: 'git-filter-repo', url: 'https://github.com/newren/git-filter-repo', kind: 'tool' },
      {
        label: 'GitHub Docs — remover dado sensível',
        url:
          GH +
          '/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository',
        kind: 'doc',
      },
    ],
    xp: 30,
    estMinutes: 30,
  },
  {
    id: 'gh-boss',
    index: 23,
    title: 'BOSS: Guardião do Repositório',
    priority: 'alta',
    type: 'boss',
    shortDescription:
      'Desafio final — submodules, desfazer, PRs, proteção e o vazamento de segredo.',
    concept:
      'O boss do GitHub testa o que segura projetos reais: o modelo mental de submodules e o fluxo de 2 commits, a escolha certa de desfazer, política de PR e merge, proteção de branch e o protocolo do segredo vazado. Acerte 4 de 5 para vencer.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação indica prontidão para administrar os repositórios de cliente da consultoria — incluindo os com submodules.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
