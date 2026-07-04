import { GitBranch } from 'lucide-react'
import type { Trail } from './types'

export const trilhaGithub: Trail = {
  id: 'github',
  order: 4,
  title: 'GitHub & Submodules',
  tagline: 'Projeto dentro de projeto: o módulo onde todo mundo se enrola — menos você.',
  color: '#A78BFA',
  icon: GitBranch,
  nodes: [
    {
      id: 'gh-1',
      title: 'Fundamentos que não podem falhar',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'Sem base sólida de Git, tudo que vem depois (submodules, agentes, PRs) desmorona. Aqui não pode haver dúvida.',
      content: [
        'Autenticação: HTTPS com token ou SSH com chave. SSH é o padrão profissional — gere a chave, registre no GitHub e nunca mais digite senha.',
        'O ciclo sagrado: clone → branch → edita → add → commit → push → PR. Cada commit é um checkpoint nomeado.',
        'pull vs fetch: fetch baixa as novidades SEM tocar no seu trabalho; pull = fetch + merge. Quando em dúvida sobre o estado, fetch primeiro e olhe antes de misturar.',
        'Branches: crie uma por tarefa (git switch -c feature/x). Branch local vs remota: o push -u cria o vínculo (upstream).',
        'git status e git log são seus olhos — o consultor roda status compulsivamente, principalmente antes e depois de soltar um agente no repo.',
        'stash guarda trabalho não commitado pra trocar de contexto sem perder nada.',
      ],
      practice: [
        'Configure autenticação SSH do zero (gerar chave, registrar, testar).',
        'Execute o ciclo completo: clone, branch, 2 commits, push, PR de teste.',
        'Pratique: fetch, inspecione o que veio, só então faça o merge.',
      ],
      scope:
        'Todos os projetos que criamos com clientes vivem no GitHub. Este é o alfabeto — sem ele, não há consultoria de criação de projetos.',
      links: [
        { label: 'Documentação do GitHub', url: 'https://docs.github.com' },
        { label: 'Pro Git (livro oficial, grátis)', url: 'https://git-scm.com/book/en/v2' },
      ],
      quiz: [
        {
          q: 'Qual a diferença entre git fetch e git pull?',
          options: [
            'São iguais',
            'fetch baixa sem mexer no seu código; pull baixa E mescla no seu branch',
            'pull é mais seguro',
            'fetch apaga mudanças locais',
          ],
          correct: 1,
          explain: 'fetch é inspeção segura; pull já mistura. Profissional olha antes de misturar.',
        },
        {
          q: 'Você precisa trocar urgente de tarefa mas tem alterações não commitadas que não quer perder nem commitar. O que usar?',
          options: [
            'git reset --hard',
            'git stash',
            'Copiar os arquivos pro Desktop',
            'git push direto',
          ],
          correct: 1,
          explain:
            'stash guarda o trabalho em andamento numa gaveta e deixa o diretório limpo pra trocar de contexto.',
        },
      ],
    },
    {
      id: 'gh-2',
      title: 'Conflitos e a arte de desfazer',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'O momento de pânico do cliente: conflito de merge ou "apaguei tudo". Quem resolve com calma vira referência.',
      content: [
        'Conflito de merge: o Git marca o arquivo com <<<<<<<, ======= e >>>>>>>. Sua versão em cima, a que chegou embaixo — edite, remova os marcadores, add e commit.',
        'git merge --abort cancela o merge e volta ao estado anterior — a saída de emergência quando o conflito assustou.',
        'Desfazer é uma escada: git restore (descarta mudança não commitada em arquivo) → git reset soft/mixed (volta commits mantendo o trabalho) → reset --hard (DESTRÓI o trabalho local) → git revert (cria commit que desfaz outro, seguro pra histórico compartilhado).',
        'Regra de ouro: em branch compartilhado, revert; reset --hard só quando você tem CERTEZA do que está jogando fora.',
        'Agentes resolvem conflitos bem quando você dá contexto ("preserve a lógica do branch X, aplique a formatação do Y") — mas você revisa o resultado.',
        'reflog é o seguro de vida: quase nada se perde de verdade no Git, mesmo depois de um reset errado.',
      ],
      practice: [
        'Fabrique um conflito de propósito (dois branches editando a mesma linha) e resolva na mão.',
        'Pratique a escada: restore, reset --soft, revert — um cenário pra cada.',
        'Use git reflog pra recuperar um commit "perdido" após um reset.',
      ],
      scope:
        'Suporte a cliente em pânico é serviço recorrente. Resolver conflito com serenidade em call compartilhada é marketing ao vivo.',
      links: [
        { label: 'Pro Git — ferramentas de desfazer', url: 'https://git-scm.com/book/en/v2' },
      ],
      quiz: [
        {
          q: 'Commit errado já foi enviado pro branch compartilhado do time. Como desfazer com segurança?',
          options: [
            'git reset --hard e push force',
            'git revert, criando um commit que desfaz sem reescrever o histórico',
            'Apagar o repositório',
            'Editar direto no GitHub',
          ],
          correct: 1,
          explain:
            'Reescrever histórico compartilhado quebra o repo dos colegas. revert desfaz preservando a linha do tempo.',
        },
        {
          q: 'O que git merge --abort faz?',
          options: [
            'Apaga o branch',
            'Cancela o merge em conflito e restaura o estado anterior',
            'Força o merge',
            'Deleta os marcadores',
          ],
          correct: 1,
          explain:
            'É a saída de emergência: conflito complicado demais agora? Aborta, respira, planeja.',
        },
      ],
    },
    {
      id: 'gh-3',
      title: 'Submodules: o que são de verdade',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'Nossos projetos terão repos dentro de repos. Quem não entende o modelo mental do submodule vive apagando incêndio.',
      content: [
        'Um submodule NÃO é uma cópia da outra repo: é um PONTEIRO para um commit específico de outro repositório, gravado no repo pai.',
        'git submodule add <url> <pasta> cria o vínculo e o arquivo .gitmodules (o registro de quais submodules existem e de onde vêm).',
        'O repo pai versiona apenas: o .gitmodules + o hash do commit apontado. O conteúdo do submodule vive no repositório dele.',
        'Clonar repo com submodules: git clone --recurse-submodules. Esqueceu? git submodule update --init --recursive resolve depois.',
        'Consequência do modelo: o pai "congela" o submodule num commit. Atualizações do submodule NÃO chegam sozinhas — alguém precisa mover o ponteiro.',
        'Por que usar: compartilhar uma lib/base entre vários projetos de clientes com versionamento independente e controle exato de qual versão cada projeto usa.',
      ],
      practice: [
        'Crie um repo "lib" e um repo "app"; adicione a lib como submodule do app.',
        'Inspecione o .gitmodules e o que o git diff do pai mostra sobre o submodule.',
        'Clone o app SEM --recurse-submodules, observe a pasta vazia, e conserte.',
      ],
      scope:
        'A arquitetura "projeto dentro de projeto" dos nossos clientes usa exatamente isso: módulos compartilhados como submodules com versão travada por projeto.',
      links: [
        {
          label: 'Pro Git — capítulo definitivo de Submodules',
          url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
        },
      ],
      quiz: [
        {
          q: 'O que o repositório pai efetivamente versiona sobre um submodule?',
          options: [
            'Todo o código do submodule',
            'O .gitmodules e o HASH do commit apontado',
            'Só a URL',
            'Um zip do submodule',
          ],
          correct: 1,
          explain:
            'Submodule é ponteiro: o pai guarda "qual repo" (.gitmodules) e "qual commit" (o hash). O código vive no repo do submodule.',
        },
        {
          q: 'Você atualizou a lib (submodule) no repositório dela. O que acontece nos projetos que a usam?',
          options: [
            'Atualizam sozinhos',
            'Nada — cada projeto continua no commit congelado até alguém mover o ponteiro',
            'Quebram na hora',
            'Recebem um PR automático',
          ],
          correct: 1,
          explain:
            'O congelamento é a feature: cada projeto decide QUANDO adotar a nova versão, movendo o ponteiro conscientemente.',
        },
      ],
    },
    {
      id: 'gh-4',
      title: 'Submodules: a operação diária',
      kind: 'lesson',
      xp: 60,
      minutes: 45,
      why: 'O fluxo dos 2 commits é onde 90% dos times erram — e onde o cliente vai te ligar.',
      content: [
        'Editar código DENTRO do submodule = trabalhar num repositório completo: entre na pasta, crie branch, commite e PUSHE no repo do submodule.',
        'Depois, no repo PAI: o git status mostra o submodule modificado (novo commit apontado). Commite no pai pra mover o ponteiro. TOTAL: 2 commits, 2 pushes, nessa ordem.',
        'Ordem importa: push do submodule ANTES do push do pai. Se o pai aponta pra um commit que só existe na sua máquina, o time inteiro quebra no update.',
        'Puxar atualização do submodule: dentro dele, git fetch + checkout da versão desejada (ou git submodule update --remote), e então commit do novo ponteiro no pai.',
        'Colega deu pull no pai e o submodule "não mudou"? O pull do pai atualiza o PONTEIRO, não o conteúdo: rode git submodule update --init --recursive após o pull.',
        'Automatize com o time: git config submodule.recurse true reduz esquecimentos no dia a dia.',
      ],
      practice: [
        'Execute o fluxo completo dos 2 commits: mudança na lib → push da lib → ponteiro no pai → push do pai.',
        'Simule o erro clássico: pai apontando pra commit não pushado — e veja o clone quebrar.',
        'No papel de "colega": dê pull no pai e sincronize o submodule corretamente.',
      ],
      scope:
        'Este fluxo é literalmente o dia a dia dos projetos multi-repo dos nossos clientes. Dominá-lo é pré-requisito pra operar os projetos que criamos.',
      links: [
        {
          label: 'Pro Git — Submodules (trabalhando em)',
          url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
        },
      ],
      quiz: [
        {
          q: 'Você alterou código dentro do submodule. Quantos commits o fluxo correto exige e onde?',
          options: [
            '1 commit no pai',
            '2 commits: um no repo do submodule e um no pai movendo o ponteiro',
            '1 commit no submodule',
            'Nenhum, é automático',
          ],
          correct: 1,
          explain:
            'Mudança de conteúdo (repo do submodule) + mudança de ponteiro (repo pai). Sempre dois.',
        },
        {
          q: 'Por que o push do submodule deve vir ANTES do push do pai?',
          options: [
            'Por convenção estética',
            'Porque o pai apontará para um commit que precisa existir no remoto — senão o time quebra ao atualizar',
            'Porque o GitHub exige',
            'Não faz diferença',
          ],
          correct: 1,
          explain:
            'Pai apontando pra commit que só existe na sua máquina = update falhando pra todo o time. Ordem é segurança.',
        },
      ],
    },
    {
      id: 'gh-5',
      title: 'Submodules: as 4 pegadinhas clássicas',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'São os 4 chamados de suporte que você VAI receber. Melhor resolvê-los aqui primeiro.',
      content: [
        'Pegadinha 1 — pasta vazia pós-clone: clone sem --recurse-submodules deixa a pasta do submodule vazia. Cura: git submodule update --init --recursive.',
        'Pegadinha 2 — detached HEAD: o submodule é checado num commit, não num branch. Commitar ali sem criar branch = commit órfão fácil de perder. Cura: git switch -c meu-branch ANTES de trabalhar (e reflog se já perdeu).',
        'Pegadinha 3 — submodule desatualizado no time: pull no pai não atualiza conteúdo do submodule. Sintoma: "funciona pra mim, quebra pra ele". Cura: submodule update após pull (ou submodule.recurse true).',
        'Pegadinha 4 — remoção errada: apagar a pasta NÃO remove o submodule. O jeito certo: git submodule deinit <pasta> → git rm <pasta> → commit (e limpar .git/modules se quiser o purge completo).',
        'Bônus CI: pipelines quebram porque o checkout do CI esqueceu submodules — configure o passo de checkout com recursão.',
        'Diagnóstico universal: git submodule status mostra o estado de cada submodule (hash, se está fora de sync, se não foi inicializado).',
      ],
      practice: [
        'Reproduza e resolva as 4 pegadinhas, documentando os comandos de cada cura.',
        'Perca um commit em detached HEAD de propósito e recupere com reflog.',
        'Remova um submodule do jeito certo e confirme que .gitmodules ficou limpo.',
      ],
      scope:
        'Este é o conteúdo do nosso playbook interno de suporte: cada pegadinha vira uma resposta pronta de 2 minutos pro cliente.',
      links: [
        {
          label: 'Pro Git — armadilhas de Submodules',
          url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
        },
      ],
      quiz: [
        {
          q: 'Cliente clonou o projeto e a pasta do submodule está vazia. Comando da cura?',
          options: [
            'git pull --force',
            'git submodule update --init --recursive',
            'git clone de novo',
            'rm -rf e recomeça',
          ],
          correct: 1,
          explain:
            'O clone sem recursão não inicializa submodules. O update --init --recursive baixa e posiciona tudo.',
        },
        {
          q: 'Por que commitar num submodule sem criar branch é perigoso?',
          options: [
            'Não é',
            'O submodule fica em detached HEAD: o commit não pertence a branch nenhum e se perde fácil',
            'O GitHub bloqueia',
            'Corrompe o pai',
          ],
          correct: 1,
          explain:
            'Detached HEAD = commit órfão. Um checkout depois e ele some da vista (reflog salva, mas prevenir é melhor).',
        },
      ],
    },
    {
      id: 'gh-6',
      title: 'Agentes em repos com submodules',
      kind: 'lesson',
      xp: 60,
      minutes: 40,
      why: 'A interseção que quase ninguém domina — e exatamente onde nossos projetos vivem: Claude Code e Codex operando em repo pai + submodules.',
      content: [
        'Instruções por nível: CLAUDE.md/AGENTS.md no repo PAI descrevem a arquitetura geral e o protocolo de submodules; arquivos nos SUBMODULES descrevem as regras locais da lib.',
        'Escreva explicitamente no arquivo do pai: "a pasta X é um submodule; mudanças ali exigem commit no repo dela E atualização do ponteiro aqui; push da lib antes do push do pai".',
        'O agente enxerga os arquivos do submodule normalmente (estão no disco) — o risco não é visão, é PROTOCOLO: sem instrução, ele pode commitar tudo junto errado.',
        'Fluxo seguro com agente: peça o trabalho em etapas explícitas ("1: commit e push no submodule; 2: atualize o ponteiro no pai e commite") e revise o git status dos DOIS níveis.',
        'Worktrees são a alternativa pra paralelismo de agentes: múltiplos diretórios do MESMO repo, um por agente/tarefa — sem a burocracia de ponteiros dos submodules.',
        'Decisão de arquitetura pra aconselhar cliente: monorepo (tudo junto, simples, cresce pesado) vs multi-repo (independência total, integração manual) vs submodules (compartilhar com versão travada) vs worktrees (paralelismo local).',
      ],
      practice: [
        'Escreva a seção "protocolo de submodules" do CLAUDE.md/AGENTS.md do repo pai.',
        'Peça a um agente uma mudança que atravessa pai + submodule e audite os commits gerados.',
        'Rode dois agentes em worktrees paralelos do mesmo repo e observe a independência.',
      ],
      scope:
        'É o coração técnico dos nossos projetos: criar projetos com IA em arquitetura multi-repo. Este conhecimento é nosso diferencial competitivo direto.',
      links: [
        {
          label: 'Pro Git — Submodules',
          url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
        },
        { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      ],
      quiz: [
        {
          q: 'Qual instrução é ESSENCIAL no CLAUDE.md/AGENTS.md de um repo pai com submodules?',
          options: [
            'A lista de cores do design',
            'O protocolo: pasta X é submodule, commit lá + ponteiro aqui, push da lib antes do pai',
            'O nome do cliente',
            'Proibir o agente de ler a pasta',
          ],
          correct: 1,
          explain:
            'O agente vê os arquivos; o que ele precisa receber é o protocolo de commits em dois níveis.',
        },
        {
          q: 'Para rodar dois agentes em paralelo no MESMO projeto sem conflito de arquivos, a ferramenta natural é:',
          options: [
            'Submodules',
            'Git worktrees — diretórios paralelos do mesmo repo',
            'Dois clones em pastas aleatórias',
            'Um agente só, revezando',
          ],
          correct: 1,
          explain:
            'Worktree cria ambientes paralelos do mesmo repositório — cada agente no seu, histórico unificado.',
        },
      ],
    },
    {
      id: 'gh-7',
      title: 'Segredos, .gitignore e PRs de agente',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'O erro mais caro do cliente iniciante com IA: API key commitada. E o novo normal: revisar PR que um agente escreveu.',
      content: [
        '.gitignore ANTES do primeiro commit: .env, node_modules, builds, credenciais. Arquivo já commitado não sai com .gitignore — precisa de git rm --cached + commit.',
        'API key vazou no histórico: REVOGAR a chave é a ação real (no provedor). Apagar do código não apaga do histórico nem de quem já clonou. Limpeza de histórico (git-filter-repo/BFG) é o passo extra, não o principal.',
        'PR bem-feito: título claro, descrição do que/porquê, diff pequeno. PR de 3.000 linhas não é revisável — é ato de fé.',
        'Revisando PR de agente, os red flags: mudanças fora do escopo pedido, dependências novas injustificadas, testes deletados ou afrouxados, segredos ou URLs hardcoded, e refactors que ninguém pediu.',
        'Merge strategies: merge commit preserva tudo; squash compacta a sujeira do agente num commit limpo (ótimo padrão pra PRs de agente); rebase lineariza o histórico.',
        'Proteção mínima da main em projeto de cliente: branch protection exigindo PR + revisão — inclusive (principalmente!) para commits de agentes.',
      ],
      practice: [
        'Monte o .gitignore padrão da consultoria pra projetos com IA.',
        'Simule o vazamento: commite uma chave falsa, "remova", e prove que ela segue no histórico.',
        'Revise um PR gerado por agente usando a lista de red flags — anote o que pegou.',
      ],
      scope:
        'Governança de repositório (proteções, revisão de PRs de agente, política de segredos) é capítulo fixo dos projetos corporativos que entregamos.',
      links: [
        { label: 'Docs do GitHub — proteção e PRs', url: 'https://docs.github.com' },
        { label: 'GitHub CLI', url: 'https://cli.github.com' },
      ],
      quiz: [
        {
          q: 'API key foi commitada ontem no repo do cliente. A ação MAIS importante é:',
          options: [
            'Apagar o arquivo e commitar',
            'Revogar a chave no provedor imediatamente — o histórico e os clones já a expuseram',
            'Fazer squash dos commits',
            'Tornar o repo privado',
          ],
          correct: 1,
          explain:
            'A chave está comprometida onde quer que o histórico exista. Revogação mata o risco; limpeza de histórico é complemento.',
        },
        {
          q: 'Num PR gerado por agente, qual sinal exige investigação imediata?',
          options: [
            'Commits com mensagens claras',
            'Testes deletados/afrouxados e mudanças fora do escopo pedido',
            'Diff pequeno',
            'Descrição detalhada',
          ],
          correct: 1,
          explain:
            'Agente que "resolve" o teste apagando o teste é o clássico. Escopo extra não pedido idem. Red flags primários.',
        },
      ],
    },
    {
      id: 'gh-8',
      title: 'BOSS: Laboratório dos 4 desastres',
      kind: 'boss',
      xp: 150,
      minutes: 120,
      why: 'O desafio mais importante do programa: montar o laboratório multi-repo, quebrar tudo de propósito e consertar documentando.',
      content: [
        'Você vai criar um repo pai com 2 submodules, provocar os 4 desastres clássicos e resolver cada um.',
        'Depois, colocar agentes pra operar nessa estrutura com o protocolo certo.',
        'O laboratório vira nosso ambiente de treinamento e o playbook vira material de suporte.',
      ],
      practice: [],
      scope:
        'Entregável real: o laboratório de treino + playbook de suporte de submodules da consultoria.',
      links: [
        {
          label: 'Pro Git — Submodules',
          url: 'https://git-scm.com/book/en/v2/Git-Tools-Submodules',
        },
      ],
      quiz: [],
      checklist: [
        'Repo pai + 2 submodules criados e clonáveis com --recurse-submodules',
        'Desastre 1 resolvido e documentado: pasta vazia pós-clone',
        'Desastre 2 resolvido e documentado: commit perdido em detached HEAD (recuperado via reflog)',
        'Desastre 3 resolvido e documentado: ponteiro desatualizado no time',
        'Desastre 4 resolvido e documentado: remoção correta de um submodule',
        'CLAUDE.md e AGENTS.md com protocolo de submodules nos dois níveis',
        'Uma mudança atravessando pai + submodule executada por agente e auditada',
        'Playbook de 1 página: sintoma → diagnóstico → cura para cada desastre',
      ],
    },
  ],
}
