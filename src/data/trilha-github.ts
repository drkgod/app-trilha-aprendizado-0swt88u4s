import type { Topic } from './types'

const xpMap = { alta: 30, media: 20, baixa: 10 }

export const githubTopics: Topic[] = [
  {
    id: 'gh-1',
    index: 1,
    title: 'Setup do Git',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Configuração do ambiente Git local e chaves SSH.',
    concept:
      'O Git exige configuração inicial de nome de usuário e e-mail antes do primeiro commit. A autenticação com o GitHub deve preferir o uso de chaves criptográficas SSH sobre chaves HTTPS com tokens. Gerar a chave SSH e registrá-la no painel do GitHub assegura commits validados e elimina a digitação repetida de credenciais nas chamadas de comandos bash locais.',
    references: [
      {
        label: 'Connecting to GitHub with SSH',
        url: 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh',
      },
    ],
    practiceSteps: [
      'Gere uma chave SSH executando `ssh-keygen -t ed25519 -C "seu@email.com"`.',
      'Copie a chave pública e adicione-a no painel de chaves SSH do GitHub.',
      'Configure seu usuário global executando `git config --global user.name "Seu Nome"` e e-mail.',
    ],
    projectContext:
      'Esse é o passo zero no setup de qualquer novo desenvolvedor do cliente. Sem chave SSH configurada, o agente local não conseguirá dar push de alterações.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-2',
    index: 2,
    title: 'Fluxo essencial',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Ciclo básico de commits, push, pull e fetch.',
    concept:
      'O ciclo operacional do Git envolve: `git status` (auditar modificações locais), `git add` (adicionar arquivos ao index), `git commit` (criar um ponto de restauração local) e `git push` (enviar as alterações para o repositório remoto). Compreender a diferença crítica entre `git fetch` (baixa atualizações remotas sem alterar o diretório local) e `git pull` (baixa e faz merge automático das atualizações no branch local) é obrigatório.',
    references: [
      { label: 'Git Basics Tutorial', url: 'https://git-scm.com/book/en/v2/Git-Basics' },
    ],
    practiceSteps: [
      'Crie um repositório Git local e faça o primeiro commit.',
      'Modifique um arquivo e execute `git diff` no terminal para verificar as edições.',
      'Execute `git log` para inspecionar a linha do tempo dos commits.',
    ],
    projectContext:
      'Ensine o time do cliente a lógica de realizar commits pequenos e sequenciais. Commits gigantescos dificultam o code review e inviabilizam reversões de segurança.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-3',
    index: 3,
    title: 'Branches',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Criação e gerenciamento de branches locais e remotos.',
    concept:
      'Branches permitem isolar alterações de código do fluxo de produção principal (main). O comando `git switch -c feature/nome` cria e move a navegação para a nova branch local. Branches remotos são criados com o push indicando a origem remota (upstream) via `git push -u origin feature/nome`.',
    references: [
      {
        label: 'Git Branching Guide',
        url: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell',
      },
    ],
    practiceSteps: [
      'Crie um novo branch e adicione uma linha de comentário num arquivo.',
      'Volte ao branch main e verifique que o comentário não está presente.',
      'Aplique as modificações no branch main usando o comando `git merge`.',
    ],
    projectContext:
      'Mantenha a política rígida de branch-per-feature em todos os projetos de clientes. Isso previne que deploys de emergência arrastem códigos incompletos de outras tarefas.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-4',
    index: 4,
    title: 'Conflitos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Resolução manual e automatizada de conflitos de merge.',
    concept:
      'Um conflito ocorre quando branches distintos alteram a mesma linha de um arquivo de formas diferentes. O Git suspende o merge e adiciona marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`) no código-fonte. O desenvolvedor deve resolver a colisão editando o arquivo manualmente e apagando os marcadores, ou abortando o processo com `git merge --abort`.',
    references: [
      {
        label: 'Resolving Git Conflicts',
        url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts',
      },
    ],
    practiceSteps: [
      'Crie dois branches a partir da main.',
      'Modifique a mesma linha do arquivo `main.css` em ambos com conteúdos diferentes e salve.',
      'Tente mesclar ambos na main para forçar o conflito e realize a resolução manual.',
    ],
    projectContext:
      'Resolução de conflitos é onde desenvolvedores júnior costumam entrar em pânico. Mostre como resolver de forma estruturada no IDE.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-5',
    index: 5,
    title: 'Desfazer coisas',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Escada de ferramentas de reversão do Git.',
    concept:
      'O Git oferece múltiplas ferramentas para reverter ações: `git restore` (descarta alterações locais não commitadas), `git reset` (move o ponteiro de commits local, mantendo alterações no modo soft/mixed ou destruindo tudo no modo hard) e `git revert` (cria um commit de reversão seguro para branches compartilhados, mantendo o histórico intacto).',
    references: [
      {
        label: 'Undoing Changes in Git',
        url: 'https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things',
      },
    ],
    practiceSteps: [
      'Faça edições em um arquivo e descarte as modificações usando `git restore`.',
      'Desfaça o último commit mantendo o código no editor usando `git reset --soft HEAD~1`.',
      'Crie um commit de reversão com `git revert`.',
    ],
    projectContext:
      'Nunca recomende `git reset --hard` em branches públicos com outros desenvolvedores ativos. Isso desorganiza os repositórios dos colegas de equipe.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-6',
    index: 6,
    title: 'Submodules — fundamentos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Conceito e inicialização de submódulos no Git.',
    concept:
      'Um submódulo Git funciona como um ponteiro para um commit específico de outro repositório independente de código dentro de uma pasta do seu projeto principal. O arquivo `.gitmodules` registra a associação de caminhos e URLs dos submódulos clonados.',
    references: [
      {
        label: 'Git Submodules Documentation',
        url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
      },
    ],
    practiceSteps: [
      'Crie um novo repositório e adicione outro repositório de teste como submódulo usando `git submodule add <url>`.',
      'Inspecione o arquivo `.gitmodules` gerado na pasta raiz.',
      'Verifique como o Git diff do repositório pai enxerga a pasta do submódulo.',
    ],
    projectContext:
      'Submódulos são essenciais para projetos que compartilham bibliotecas de componentes ou regras de banco de dados entre repositórios diferentes de frontend e backend.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-7',
    index: 7,
    title: 'Submodules — operação diária',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Ciclo operacional e sincronização de submódulos.',
    concept:
      'Modificar arquivos dentro de um submódulo exige commits em duas etapas: primeiro no repositório do submódulo (e envio de push para o servidor remoto do submódulo), e depois no repositório pai (para atualizar o ponteiro do commit que a pasta referencia).',
    references: [
      {
        label: 'Working on Projects with Submodules',
        url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
      },
    ],
    practiceSteps: [
      'Edite um arquivo de código dentro da pasta do submódulo e envie o push para o remoto do submódulo.',
      'Volte à raiz do repositório pai e execute `git status` para observar o ponteiro modificado.',
      'Commite o novo ponteiro no repositório pai.',
    ],
    projectContext:
      'Sempre exija o push no repositório do submódulo ANTES do commit no repositório pai, evitando referenciar commits locais inexistentes no servidor.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-8',
    index: 8,
    title: 'Submodules — pegadinhas',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Diagnóstico de problemas comuns de submódulos.',
    concept:
      'Problemas comuns de submódulos incluem a pasta vazia após o clone inicial (resolvido executando `git submodule update --init --recursive`) e commits órfãos gerados por edições no modo Detached HEAD dentro da pasta do submódulo.',
    references: [
      {
        label: 'Submodules Pitfalls and Solutions',
        url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
      },
    ],
    practiceSteps: [
      'Clone o projeto em uma nova pasta sem a flag `--recurse-submodules` para verificar a pasta do submódulo vazia.',
      'Execute `git submodule update --init --recursive` para sincronizar os arquivos.',
      'Crie e remova um submódulo do repositório seguindo o fluxo correto de deinit.',
    ],
    projectContext:
      'Essa é a maior fonte de suporte no dia a dia. Escreva um passo a passo curto de diagnóstico e deixe-o disponível no CLAUDE.md do projeto.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-9',
    index: 9,
    title: 'Agentes + submodules',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Orientando agentes em repositórios com submódulos.',
    concept:
      'Como os agentes de IA leem o repositório como arquivos locais de disco, eles precisam de orientações explícitas (no CLAUDE.md/AGENTS.md) de que determinadas pastas são submódulos Git e exigem commits independentes de dois níveis.',
    references: [{ label: 'Claude Code Git Integration', url: 'https://code.claude.com/docs/git' }],
    practiceSteps: [
      'Crie regras claras de controle de submódulos no arquivo `CLAUDE.md`.',
      'Instrua o agente a realizar uma alteração que atinge o submódulo e o repositório pai.',
      'Audite se o agente efetuou os commits de forma correta e separada.',
    ],
    projectContext:
      'Mapear o fluxo de submódulos nas regras do agente impede commits e merges errados causados por edições diretas.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-10',
    index: 10,
    title: '.gitignore e segredos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Prevenindo vazamento de credenciais e chaves API.',
    concept:
      'O arquivo `.gitignore` deve ser configurado antes do primeiro commit do projeto. Arquivos como `.env` e chaves privadas nunca devem ser versionados. Se uma chave de API for commitada por engano, sua revogação no Console do provedor deve ser imediata, pois deletá-la do arquivo não a remove da história dos commits.',
    references: [
      {
        label: 'Ignoring Files in Git',
        url: 'https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_ignoring',
      },
    ],
    practiceSteps: [
      'Crie um arquivo `.gitignore` e ignore pastas de pacotes de build.',
      'Commit uma credencial falsa, remova-a com `git rm --cached` e verifique se ela ainda consta no histórico do git log.',
      'Documente os passos de limpeza de histórico com git-filter-repo.',
    ],
    projectContext:
      'A segurança corporativa do cliente começa com boas regras de .gitignore. Faça da auditoria de segredos a sua prioridade técnica.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-11',
    index: 11,
    title: 'Pull Requests',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Fluxo profissional de revisões e aprovação de código.',
    concept:
      'Pull Requests (PRs) são a base do desenvolvimento colaborativo. Um PR bem descrito explica de forma objetiva o que mudou e o porquê da alteração. A escolha da estratégia de merge (merge commit, squash, rebase) determina a legibilidade final da linha do tempo do repositório.',
    references: [
      {
        label: 'About Pull Requests',
        url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
      },
    ],
    practiceSteps: [
      'Abra um Pull Request de teste no GitHub.',
      'Preencha uma descrição detalhada em markdown indicando as mudanças.',
      'Realize o merge utilizando o método de Squash para mesclar os commits num único registro limpo.',
    ],
    projectContext:
      'Recomende o merge com Squash para branches criados por agentes para limpar o ruído do histórico antes de enviar as alterações para a main.',
    xp: xpMap.alta,
  },
  {
    id: 'gh-12',
    index: 12,
    title: 'Revisar PR de agente',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Auditando a qualidade e segurança do código de IA.',
    concept:
      'Revisar código escrito por agentes exige rigor extra. Sinais comuns de alerta incluem a remoção silenciosa de testes de validação do repositório para contornar falhas de build, uso de dependências de pacotes não autorizados e hardcoding de chaves de acesso.',
    references: [{ label: 'Reviewing Code Written by AI', url: 'https://support.github.com' }],
    practiceSteps: [
      'Crie um check list de revisão estruturada.',
      'Peça a um agente para gerar uma refatoração em um componente.',
      'Audite as alterações buscando por redundâncias de lógica e chaves hardcoded.',
    ],
    projectContext:
      'Crie uma rotina de aprovação de código de agentes com revisões obrigatórias por pares de desenvolvimento humanos antes do deploy.',
    xp: xpMap.media,
  },
  {
    id: 'gh-13',
    index: 13,
    title: 'Worktrees',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Criação de diretórios paralelos para desenvolvimento.',
    concept:
      'Git Worktrees fornecem a capacidade de trabalhar em múltiplas branches de forma independente em pastas locais separadas na máquina de desenvolvimento local.',
    references: [
      { label: 'Git Worktree Documentation', url: 'https://git-scm.com/docs/git-worktree' },
    ],
    practiceSteps: [
      'Rode `git worktree add ../pasta-tarefa branch-tarefa` no terminal.',
      'Verifique que as edições na pasta paralela não alteram a pasta raiz.',
      'Remova o worktree após finalizar a tarefa.',
    ],
    projectContext:
      'Esta alternativa é muito útil para gerenciar tarefas de suporte urgentes sem precisar guardar modificações em andamento no stash.',
    xp: xpMap.media,
  },
  {
    id: 'gh-14',
    index: 14,
    title: 'GitHub CLI (gh)',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Automatizando interações do GitHub via CLI.',
    concept:
      'A ferramenta de linha de comando oficial do GitHub (gh CLI) permite criar issues, realizar login de autenticação rápida, abrir e aprovar Pull Requests de forma programática pelo terminal.',
    references: [{ label: 'GitHub CLI Reference', url: 'https://cli.github.com' }],
    practiceSteps: [
      'Autentique seu usuário executando `gh auth login`.',
      'Crie uma issue com `gh issue create`.',
      'Abra um Pull Request para a issue via terminal.',
    ],
    projectContext:
      'Como os agentes de IA operam através do terminal, configurar a `gh` CLI na máquina de desenvolvimento local viabiliza que eles criem e revisem PRs de forma autônoma.',
    xp: xpMap.media,
  },
  {
    id: 'gh-15',
    index: 15,
    title: 'Histórico: log, diff, blame, bisect',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Ferramentas de auditoria e busca forense do Git.',
    concept:
      'Investigar a linha do tempo do código é necessário ao debugar bugs herdados. O comando `git blame` exibe quem alterou cada linha de um arquivo; o `git bisect` realiza busca binária no histórico de commits para encontrar o commit exato que introduziu o erro.',
    references: [
      {
        label: 'Git Debugging Tools',
        url: 'https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git',
      },
    ],
    practiceSteps: [
      'Inspecione quem editou uma linha do arquivo usando `git blame`.',
      'Inicie um processo de bisect para rastrear um bug simulado no histórico.',
      'Volte ao estado original do repositório.',
    ],
    projectContext:
      'Ter domínio destas ferramentas de busca forense diferencia o consultor sênior de um programador comum na hora de resolver incidentes graves no cliente.',
    xp: xpMap.media,
  },
  {
    id: 'gh-16',
    index: 16,
    title: 'Rebase vs merge',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Estratégias de histórico linear e mescla.',
    concept:
      'O comando `git rebase` reaplica commits de uma branch no topo de outra branch, mantendo o histórico de commits linear e limpo. Conhecer a regra de ouro de nunca rebasear branches públicas é necessário.',
    references: [
      { label: 'Git Rebase Guide', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
    ],
    practiceSteps: [
      'Crie uma branch secundária e adicione dois commits de modificações.',
      'Faça rebase interativo com `git rebase -i` para juntar (squash) os commits.',
      'Analise a linha do tempo linear resultante.',
    ],
    projectContext:
      'Use rebase em branches locais de tarefas pessoais e dê merge com squash nos Pull Requests públicos do time do cliente.',
    xp: xpMap.media,
  },
  {
    id: 'gh-17',
    index: 17,
    title: 'Arquitetura de repos',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Criação de monorepos vs multi-repos de código.',
    concept:
      'Estruturar os repositórios do projeto do cliente envolve escolher entre monorepos (uma única pasta gigante facilitando buscas, mas pesando com o tempo) ou multi-repos independentes (independência e limites claros, integrados por submódulos).',
    references: [{ label: 'Monorepos vs Multi-Repos', url: 'https://github.com' }],
    practiceSteps: [
      'Desenhe a arquitetura de repositórios ideal para um cliente de e-commerce.',
      'Estruture pastas fictícias para demonstrar a modularidade das APIs.',
      'Apresente os prós e contras.',
    ],
    projectContext:
      'Decidir a arquitetura dos repositórios na primeira semana evita custos de refatorações de diretórios inteiros no meio do projeto do cliente.',
    xp: xpMap.media,
  },
  {
    id: 'gh-18',
    index: 18,
    title: 'Tags e releases',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Versionamento semântico de entregas.',
    concept:
      'Criar tags de versionamento (`git tag -a v1.0.0`) e cadastrar releases na interface do GitHub são as formas corretas de demarcar as versões do sistema que foram homologadas e entregues.',
    references: [
      { label: 'Git Tagging', url: 'https://git-scm.com/book/en/v2/Git-Basics-Tagging' },
    ],
    practiceSteps: [
      'Crie uma tag semântica localmente executando `git tag -a v1.0.0 -m "Release v1.0.0"`.',
      'Faça o push da tag para o GitHub executando `git push origin v1.0.0`.',
      'Crie uma release vinculando o histórico de alterações no GitHub.',
    ],
    projectContext:
      'Sempre demarque marcos de entregas de desenvolvimento com releases de versionamento semântico para controle do cliente.',
    xp: xpMap.media,
  },
  {
    id: 'gh-19',
    index: 19,
    title: 'Branch protection e CODEOWNERS',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Protetores de ramificações e donos de arquivos.',
    concept:
      'As regras de branch protection no GitHub garantem a integridade das branches de produção, proibindo merges diretos e exigindo aprovações de Pull Requests e builds de validação de testes contínuos sem erros.',
    references: [
      {
        label: 'About Protected Branches',
        url: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches',
      },
    ],
    practiceSteps: [
      'Ative regras de branch protection no repositório de testes do GitHub.',
      'Configure um arquivo `CODEOWNERS` na pasta `.github/` vinculando proprietários a diretórios.',
      'Tente forçar uma alteração direta na branch protegida e observe o bloqueio.',
    ],
    projectContext:
      'Esta segurança é fundamental ao lidar com muitos desenvolvedores integrando código de forma paralela no mesmo sistema.',
    xp: xpMap.baixa,
  },
  {
    id: 'gh-20',
    index: 20,
    title: 'GitHub Actions básico',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Configuração inicial de pipelines de integração contínua.',
    concept:
      'O GitHub Actions automatiza fluxos de validação de código executando builds, formatações de lints e rodando testes a cada push ou abertura de Pull Request na branch principal.',
    references: [
      {
        label: 'Introduction to GitHub Actions',
        url: 'https://docs.github.com/en/actions/about-github-actions/understanding-github-actions',
      },
    ],
    practiceSteps: [
      'Crie uma Action simples de lint e build em `.github/workflows/main.yml`.',
      'Abra um Pull Request e acompanhe a validação rodando.',
      'Corrija eventuais erros para liberar o merge.',
    ],
    projectContext:
      'Configurar automações de CI/CD básicas garante que alterações propostas por agentes não quebrem o deploy final de produção.',
    xp: xpMap.baixa,
  },
  {
    id: 'gh-21',
    index: 21,
    title: 'Permissões de org e times',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Gerenciando acessos em organizações corporativas.',
    concept:
      'Definir regras de acesso e convidar colaboradores externos com permissões específicas de leitura ou escrita protege a segurança das bases de código e integridade da infraestrutura corporativa.',
    references: [
      {
        label: 'Managing Access to Repositories',
        url: 'https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/managing-member-access-to-your-organizations-repositories',
      },
    ],
    practiceSteps: [
      'Crie um time fictício na sua organização do GitHub.',
      'Configure permissões de escrita específicas em um repositório.',
      'Audite a lista de acessos.',
    ],
    projectContext:
      'Configure acessos corretos e chaves SSH específicas para cada membro externo do projeto do cliente para monitorar alterações.',
    xp: xpMap.baixa,
  },
  {
    id: 'gh-22',
    index: 22,
    title: 'git-filter-repo/BFG',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Remoção definitiva de credenciais vazadas do histórico.',
    concept:
      'O `git-filter-repo` ou `BFG Repo-Cleaner` são utilitários desenvolvidos para reescrever de forma definitiva o histórico dos branches do Git, expurgando arquivos de segredos vazados em commits antigos.',
    references: [
      { label: 'git-filter-repo Documentation', url: 'https://github.com/newren/git-filter-repo' },
    ],
    practiceSteps: [
      'Instale o `git-filter-repo` na sua máquina local.',
      'Execute a remoção definitiva de um arquivo de teste contendo dados confidenciais de todo o histórico do repositório.',
      'Envie o push force para o remoto para consolidar a alteração.',
    ],
    projectContext:
      'Este é o plano B quando credenciais corporativas foram commitadas e expostas. Use com cuidado extremo para não apagar dados legítimos.',
    xp: xpMap.baixa,
  },
]
