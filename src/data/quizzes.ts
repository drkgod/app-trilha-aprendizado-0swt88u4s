import type { QuizQuestion } from './types'

const quizzes: Record<string, QuizQuestion[]> = {
  'fu-boss': [
    {
      question: 'Por que um chat muito longo faz o modelo "ficar burro" no final?',
      options: [
        'O modelo aprende com a conversa e fica confuso',
        'Todo o histórico é reprocessado a cada turno e a atenção se dilui no contexto inchado',
        'O servidor limita a velocidade de contas que falam demais',
        'Tokens antigos são apagados automaticamente',
      ],
      correctIndex: 1,
      explanation:
        'Modelos são stateless: cada resposta reprocessa a janela inteira. Contexto grande e desorganizado dilui a atenção — por isso a disciplina de sessões focadas.',
    },
    {
      question: 'O que um embedding representa?',
      options: [
        'Uma compressão sem perdas do texto original',
        'A tradução do texto para tokens',
        'Um vetor numérico que captura o SIGNIFICADO do texto, permitindo comparar semelhança semântica',
        'Um hash único usado para deduplicar documentos',
      ],
      correctIndex: 2,
      explanation:
        'Embedding é a posição do texto num espaço de significado: textos semanticamente próximos ficam próximos no espaço — a base da busca semântica e do RAG.',
    },
    {
      question:
        'Num RAG, a resposta veio errada. O chunk com a informação correta NÃO estava entre os recuperados. Onde está o problema?',
      options: [
        'No prompt final — falta pedir mais atenção',
        'No modelo de linguagem — é fraco demais',
        'Na etapa de retrieval (chunking/busca) — o gerador nunca viu a informação',
        'No banco de dados — Postgres não serve para isso',
      ],
      correctIndex: 2,
      explanation:
        'RAG se debuga por etapas: se a busca não trouxe o chunk certo, o problema é retrieval (chunking, embeddings, busca) — nenhum prompt salva o que o modelo não recebeu.',
    },
    {
      question: 'Quando busca HÍBRIDA supera a busca vetorial pura?',
      options: [
        'Quando as perguntas usam sinônimos e paráfrases',
        'Quando os usuários buscam termos exatos como códigos, siglas e nomes próprios',
        'Quando o corpus é pequeno',
        'Nunca — vetorial sempre vence',
      ],
      correctIndex: 1,
      explanation:
        'Vetorial entende paráfrase mas escorrega em termos exatos (NF-4532, nomes, siglas); o full-text pega esses. A híbrida (com fusão tipo RRF) une os dois mundos.',
    },
    {
      question: 'O que o MCP padroniza?',
      options: [
        'O formato dos pesos dos modelos',
        'A forma como modelos são treinados',
        'O protocolo pelo qual agentes descobrem e usam ferramentas/dados externos',
        'A sintaxe dos prompts',
      ],
      correctIndex: 2,
      explanation:
        'MCP é o contrato aberto entre agentes (clientes) e servidores de ferramentas/dados — o mesmo servidor Supabase serve Claude Code, Codex e outros.',
    },
  ],
  'cc-boss': [
    {
      question: 'Qual a hierarquia de leitura do CLAUDE.md?',
      options: [
        'Apenas o arquivo da raiz do repositório é lido',
        'Global (~/.claude) → raiz do projeto → subpastas, com o mais específico prevalecendo',
        'Somente o global do usuário vale',
        'A ordem é aleatória a cada sessão',
      ],
      correctIndex: 1,
      explanation:
        'Os arquivos se somam em camadas: global, projeto e subpastas — instruções mais próximas do código em edição têm precedência prática.',
    },
    {
      question: 'Quando usar um HOOK em vez de uma instrução no CLAUDE.md?',
      options: [
        'Quando a regra é uma preferência de estilo',
        'Quando a garantia precisa ser determinística — instrução pode ser esquecida; hook SEMPRE executa',
        'Hooks e instruções são equivalentes',
        'Quando se quer economizar tokens',
      ],
      correctIndex: 1,
      explanation:
        'Instrução é probabilística (o modelo pode não seguir); hook é código que roda sempre no evento. Regra inegociável (bloquear comando, rodar formatter) = hook.',
    },
    {
      question: 'Para rodar dois agentes em paralelo no mesmo repositório sem colisão, o padrão é:',
      options: [
        'Dois clones completos do repositório',
        'Os dois na mesma pasta, em branches diferentes',
        'git worktree — um diretório de trabalho isolado por agente/branch',
        'Rodar um de cada vez',
      ],
      correctIndex: 2,
      explanation:
        'Worktrees dão checkouts paralelos do mesmo repo (compartilhando o .git): cada agente na sua pasta e branch, sem colisão de working tree.',
    },
    {
      question: 'O modo plan (planejar antes de codar) serve principalmente para:',
      options: [
        'Economizar tokens em qualquer tarefa',
        'Revisar e corrigir a ABORDAGEM antes de o agente tocar em arquivos — barato errar no plano, caro errar no código',
        'Deixar o modelo mais rápido',
        'Evitar o uso de ferramentas',
      ],
      correctIndex: 1,
      explanation:
        'Em tarefas médias e grandes, aprovar o plano primeiro evita a categoria mais cara de retrabalho: execução perfeita da abordagem errada.',
    },
    {
      question: '--dangerously-skip-permissions é aceitável em qual cenário?',
      options: [
        'No laptop pessoal, para agilizar',
        'Em qualquer repositório privado',
        'Em ambiente isolado e descartável (container/CI) sem credenciais sensíveis',
        'Nunca, em hipótese alguma',
      ],
      correctIndex: 2,
      explanation:
        'Autonomia total é para ambientes onde o pior caso é descartar o container. Na máquina com credenciais de cliente, as permissões são o cinto de segurança.',
    },
  ],
  'cx-boss': [
    {
      question: 'No Codex, o AGENTS.override.md serve para:',
      options: [
        'Traduzir o AGENTS.md para outro idioma',
        'Substituir o AGENTS.md do mesmo nível — útil para exceções sem editar o arquivo principal',
        'Acelerar o carregamento das instruções',
        'Nada — é um arquivo ignorado',
      ],
      correctIndex: 1,
      explanation:
        'Quando presente, o override substitui o AGENTS.md daquele nível da hierarquia — mecanismo de exceção controlada.',
    },
    {
      question: 'A diferença fundamental entre rodar o Codex local e no Codex Cloud é:',
      options: [
        'O Cloud usa um modelo diferente',
        'Local usa SEU ambiente e arquivos; Cloud executa em containers na infra da OpenAI com um environment que você configura',
        'O Cloud não consegue criar PRs',
        'Não há diferença prática',
      ],
      correctIndex: 1,
      explanation:
        'A distinção define tudo: setup do environment, gestão de segredos e a conversa de compliance sobre onde o código pode rodar.',
    },
    {
      question: 'Pré-aprovar comandos (allowlist de permissões) serve para:',
      options: [
        'Dar full access de forma disfarçada',
        'Deixar o agente rodar sem parar os comandos confiáveis (testes, lint, leitura de git), mantendo aprovação para o resto',
        'Desligar o sandbox',
        'Acelerar o download de dependências',
      ],
      correctIndex: 1,
      explanation:
        'A allowlist granular elimina interrupções de baixo risco e multiplica o tempo de autonomia útil — sem abrir mão do controle sobre o perigoso.',
    },
    {
      question: 'Um comentário "@codex corrija os testes" numa PR do GitHub:',
      options: [
        'Não faz nada — é só convenção',
        'Aciona o agente no Cloud, que trabalha e responde no próprio fluxo do GitHub',
        'Roda o Codex na máquina de quem comentou',
        'Fecha a PR automaticamente',
      ],
      correctIndex: 1,
      explanation:
        'Com a integração instalada, a menção delega a tarefa ao Codex Cloud — o agente opera dentro do fluxo que o time já usa.',
    },
    {
      question: 'A resposta profissional para "Codex ou Claude Code?" é:',
      options: [
        'Sempre Codex — é mais novo',
        'Sempre Claude Code — é mais popular',
        'Piloto com tarefas reais no código do cliente + critérios (custo no plano atual, desempenho, perfil do time, compliance) — frequentemente os dois convivem',
        'Tanto faz, são idênticos',
      ],
      correctIndex: 2,
      explanation:
        'Paridade conceitual é alta; a decisão certa sai de evidência no contexto do cliente — e instruções/MCPs padronizados protegem o investimento em qualquer cenário.',
    },
  ],
  'ca-boss': [
    {
      question: 'Qual a diferença entre Project knowledge e anexar um arquivo num chat?',
      options: [
        'Nenhuma — é o mesmo recurso',
        'Knowledge do Project fica disponível para TODAS as conversas do projeto; o anexo vale só naquele chat',
        'Anexos são mais seguros',
        'Project knowledge não consome contexto',
      ],
      correctIndex: 1,
      explanation:
        'Material recorrente vai para o Project (uma vez, todas as conversas); material pontual vai de anexo. Os dois consomem contexto — cure o essencial.',
    },
    {
      question: 'Por que a fatura de uma API de chat cresce conforme a conversa fica longa?',
      options: [
        'O preço por token sobe com o tempo',
        'A API é stateless: cada chamada reenvia (e cobra) o histórico inteiro como tokens de entrada',
        'O modelo fica mais lento e cobra por tempo',
        'Não cresce — o custo é fixo por mensagem',
      ],
      correctIndex: 1,
      explanation:
        'Cada turno reprocessa a conversa toda. É também por isso que prompt caching (prefixos estáveis) derruba o custo de assistentes com contexto grande.',
    },
    {
      question: 'No tool use (function calling), quem executa a ação real?',
      options: [
        'O modelo executa diretamente no servidor da Anthropic',
        'A SUA aplicação — o modelo apenas PEDE a chamada com parâmetros estruturados',
        'O navegador do usuário',
        'Ninguém — é simulação',
      ],
      correctIndex: 1,
      explanation:
        'O modelo decide e pede; seu código executa e devolve o resultado. Esse loop é a base de todos os agentes — e o motivo de existirem camadas de aprovação.',
    },
    {
      question:
        'Cliente pergunta: "vocês treinam modelos com os nossos dados?" A postura correta do consultor é:',
      options: [
        'Garantir de memória que nunca acontece',
        'Dizer que é impossível saber',
        'Distinguir plano consumidor de comercial e responder com a política vigente e o Trust Center abertos, citando a fonte',
        'Mudar de assunto',
      ],
      correctIndex: 2,
      explanation:
        'Políticas evoluem e diferem por tipo de conta. A resposta profissional cita a fonte oficial atual — nunca a memória.',
    },
    {
      question:
        'Para 100 mil classificações que podem esperar até amanhã, a arquitetura de menor custo usa:',
      options: [
        'Opus em chamadas síncronas',
        'Batch API (50% de desconto, prazo de até 24h) com o modelo mais barato que resolve, ex: Haiku',
        'O chat do Claude.ai em loop',
        'Streaming com temperatura zero',
      ],
      correctIndex: 1,
      explanation:
        'Volume + tolerância a espera = Batch API; tarefa mecânica = tier econômico. As duas alavancas juntas definem o piso de custo.',
    },
  ],
  'gh-boss': [
    {
      question: 'O que o repositório PAI realmente guarda sobre um submodule?',
      options: [
        'Uma cópia completa dos arquivos do submodule',
        'Um PONTEIRO para um commit específico do submodule (mais a URL no .gitmodules)',
        'Apenas o nome da pasta',
        'A branch mais recente do submodule',
      ],
      correctIndex: 1,
      explanation:
        'O pai pina um commit exato — não acompanha o submodule automaticamente. Esse modelo mental explica pasta vazia, detached HEAD e o fluxo de 2 commits.',
    },
    {
      question: 'Você alterou código dentro do submodule. A ordem CORRETA é:',
      options: [
        'Commit no pai primeiro, depois no submodule',
        'Commit + PUSH dentro do submodule primeiro; só então commit do ponteiro no pai',
        'Um único commit no pai resolve os dois',
        'Tanto faz a ordem',
      ],
      correctIndex: 1,
      explanation:
        'Se o pai apontar para um commit não publicado do submodule, o clone/update de todo o resto do time quebra. push do filho antes do push do pai — sempre.',
    },
    {
      question: 'Um segredo foi commitado e pushado. O PRIMEIRO passo é:',
      options: [
        'Deletar o arquivo e commitar "remove secret"',
        'REVOGAR a credencial no provedor imediatamente — só depois pensar em limpar o histórico',
        'Fazer force push da branch',
        'Tornar o repositório privado',
      ],
      correctIndex: 1,
      explanation:
        'O histórico, forks e clones já carregam o segredo — e bots varrem o GitHub em segundos. Revogar primeiro; limpeza de histórico (filter-repo) é etapa posterior e opcional.',
    },
    {
      question: 'Para desfazer um commit que JÁ está na main compartilhada, use:',
      options: [
        'git reset --hard e force push',
        'git revert — cria um commit inverso sem reescrever a história pública',
        'Deletar a branch e recriar',
        'git stash',
      ],
      correctIndex: 1,
      explanation:
        'Reescrever história compartilhada quebra o repo dos outros. revert desfaz o efeito ADICIONANDO história — o único caminho seguro em branch pública.',
    },
    {
      question:
        'O CI passa local mas falha no GitHub Actions com "arquivos faltando" num projeto com submodules. A causa provável:',
      options: [
        'O runner está sem memória',
        'O actions/checkout não traz submodules por padrão — falta with: submodules: recursive',
        'O Node está desatualizado',
        'A branch está protegida',
      ],
      correctIndex: 1,
      explanation:
        'O checkout padrão deixa as pastas de submodule vazias no runner. Declarar submodules: recursive (e token com acesso, se privado) resolve o clássico.',
    },
  ],
  'sb-boss': [
    {
      question: 'Onde a service_role key PODE viver?',
      options: [
        'No frontend, desde que ofuscada',
        'Em variável NEXT_PUBLIC_/VITE_ para facilitar',
        'Apenas em ambiente servidor (Edge Functions, backend, CI) — ela ignora RLS e dá acesso total',
        'Em qualquer lugar, pois o RLS protege',
      ],
      correctIndex: 2,
      explanation:
        'A service_role passa por cima de todo RLS. No navegador ela expõe o banco inteiro — o vazamento clássico. Frontend usa a anon/publishable key.',
    },
    {
      question: 'Por que a anon key ser pública NÃO é uma falha de segurança?',
      options: [
        'Porque ela é criptografada',
        'Porque a segurança do modelo vem do RLS: as policies decidem o que cada usuário autenticado pode ver/fazer',
        'Porque ninguém consegue descobri-la',
        'É uma falha, sim',
      ],
      correctIndex: 1,
      explanation:
        'A anon key só identifica o projeto. Com RLS habilitado e policies corretas, o banco decide linha a linha — na última camada, impossível de contornar pelo cliente.',
    },
    {
      question: 'Numa policy de UPDATE, para que serve o WITH CHECK além do USING?',
      options: [
        'É redundante — os dois fazem o mesmo',
        'USING filtra o que pode ser tocado; WITH CHECK valida como a linha pode FICAR — sem ele, o usuário pode editar a própria linha transferindo-a para outro dono',
        'WITH CHECK só vale para SELECT',
        'Melhora a performance do índice',
      ],
      correctIndex: 1,
      explanation:
        'UPDATE tem duas pontas: o estado atual (USING) e o estado final (WITH CHECK). Esquecer o segundo abre a brecha da "transferência" de posse.',
    },
    {
      question:
        'A vantagem decisiva do pgvector sobre um banco vetorial separado, em apps Supabase:',
      options: [
        'É sempre mais rápido que qualquer alternativa',
        'Filtro relacional + busca semântica NA MESMA query (com RLS por cima) — sem sincronizar dois bancos',
        'Não precisa de índice nunca',
        'Gera os embeddings sozinho',
      ],
      correctIndex: 1,
      explanation:
        'WHERE cliente_id = X AND ... ORDER BY embedding <=> q — metadados, permissões e semântica juntos no Postgres que você já opera.',
    },
    {
      question:
        'Migração destrutiva (DROP COLUMN) precisa ir para produção. O fluxo profissional é:',
      options: [
        'Rodar direto no SQL Editor de produção, rápido',
        'Testar numa BRANCH de desenvolvimento do banco, validar, e só então mergear/aplicar — com backup/PITR dimensionado por trás',
        'Pedir para o agente rodar via MCP com escrita',
        'Evitar migrações para sempre',
      ],
      correctIndex: 1,
      explanation:
        'Branch de banco torna o erro barato; backup/PITR é a rede final. As camadas de defesa se desenham antes do incidente, não durante.',
    },
  ],
  'pj-boss': [
    {
      question: 'No discovery, a fonte mais confiável sobre como o processo REALMENTE funciona é:',
      options: [
        'O organograma da empresa',
        'A descrição do gestor',
        'Quem EXECUTA o processo no dia a dia — validando o mapa com essa pessoa',
        'O manual de procedimentos de 2019',
      ],
      correctIndex: 2,
      explanation:
        'O as-is real vive na operação. Mapa validado por quem executa é o que passa no teste do "é exatamente assim".',
    },
    {
      question: 'A decisão mais crítica de um blueprint de automação com agente é:',
      options: [
        'A cor da interface',
        'Quais ações o agente executa direto vs quais exigem aprovação humana — e o desenho do fluxo de erro',
        'O nome do agente',
        'Usar o modelo mais caro disponível',
      ],
      correctIndex: 1,
      explanation:
        'Humano-no-loop e tratamento de exceção definem o risco real do sistema. Produção é 80% exceção — o blueprint que só descreve o caminho feliz falha.',
    },
    {
      question: 'Antes de construir o RAG, a prática que protege contra "otimização no achismo" é:',
      options: [
        'Escolher o modelo mais novo',
        'Montar ANTES o conjunto de teste: perguntas reais + onde está cada resposta — e medir cada mudança contra ele',
        'Usar chunks os maiores possíveis',
        'Pular o full-text search',
      ],
      correctIndex: 1,
      explanation:
        'O eval de bolso (10-20 perguntas com gabarito) transforma "parece melhor" em número — e orienta chunking, busca e prompt com evidência.',
    },
    {
      question: 'Num PR grande gerado por agente, os testes devem ser lidos PRIMEIRO porque:',
      options: [
        'São mais curtos',
        'Revelam o que o agente ENTENDEU do pedido — desalinho de intenção aparece ali antes do código',
        'Testes nunca mentem',
        'É a ordem alfabética dos arquivos',
      ],
      correctIndex: 1,
      explanation:
        'Código de agente é sintaticamente limpo; o risco é semântico. Os testes contam a interpretação da tarefa — e denunciam asserts de fachada.',
    },
    {
      question: 'O pacote de entrega profissional de um projeto inclui, além do código:',
      options: [
        'Apenas um e-mail de encerramento',
        'Release taggeada + README de operação + runbook de incidentes + docs de arquitetura + handover com offboarding de acessos',
        'Um vídeo institucional',
        'O histórico de chats com o agente',
      ],
      correctIndex: 1,
      explanation:
        'Entrega que sustenta contrato recorrente: o cliente opera sem você de plantão, os acessos morrem limpos, e as decisões estão documentadas.',
    },
  ],
  'ce-boss': [
    {
      question: 'Qual frase captura a filosofia central do Compound Engineering?',
      options: [
        'Escrever código mais rápido usando IA como autocomplete',
        'Cada unidade de trabalho entregue deve tornar a PRÓXIMA mais fácil, não mais difícil',
        'Substituir todos os desenvolvedores por agentes autônomos',
        'Combinar vários modelos num único sistema composto',
      ],
      correctIndex: 1,
      explanation:
        'Compound engineering inverte a dívida técnica: cada bug corrigido, padrão criado e lição de review vira capacidade permanente que acelera o trabalho futuro. Não é digitar mais rápido — é ensinar o sistema.',
    },
    {
      question: 'No loop plan-work-review-compound, qual é o papel da fase COMPOUND?',
      options: [
        'Executar o plano aprovado o mais rápido possível',
        'Revisar a sintaxe e o estilo do código gerado',
        'Transformar cada lição do review em regra permanente (CLAUDE.md, hook, teste, subagente)',
        'Compor vários agentes num sistema único',
      ],
      correctIndex: 2,
      explanation:
        'A fase compound é o que dá nome e poder ao método: sem ela, você corrige o mesmo erro pra sempre; com ela, cada erro morre na origem e o sistema fica mais inteligente a cada iteração.',
    },
    {
      question: 'Segundo a escada de 5 estágios de adoção de IA, qual é o erro fatal?',
      options: [
        'Começar escrevendo código sem IA no estágio 1',
        'Pular estágios — cada degrau constrói os modelos mentais que o próximo exige',
        'Usar mais de um agente ao mesmo tempo',
        'Permitir que o agente execute sem permissão',
      ],
      correctIndex: 1,
      explanation:
        'Pular degraus não funciona: quem tenta ir direto ao estágio 5 (agentes autônomos, review multi-agente) sem a base se sente desconfortável, não confia na ferramenta e desiste. Diagnostique onde cada um está e construa a partir dali.',
    },
    {
      question: 'Na fase REVIEW madura do compound engineering, o revisor humano deve focar em:',
      options: [
        'Sintaxe, estilo e vulnerabilidades de segurança',
        'Intenção e arquitetura — "isto corresponde ao que combinamos construir?"',
        'Reescrever o código do agente do zero',
        'Contar quantas linhas foram alteradas',
      ],
      correctIndex: 1,
      explanation:
        'Quando os agentes de review já pegaram bugs, segurança e estilo, o olho humano vira insubstituível no alto nível: alinhamento com a intenção e decisões de arquitetura. Corrigir vírgula manualmente é sinal de rede de segurança incompleta.',
    },
    {
      question: 'O que significa "a pasta é o agente"?',
      options: [
        'Cada agente precisa de um servidor dedicado',
        'Uma pasta com CLAUDE.md, skills e contexto acumulado transforma um modelo genérico em especialista naquele domínio',
        'Os agentes só funcionam dentro de pastas versionadas no Git',
        'Cada arquivo do projeto vira um agente independente',
      ],
      correctIndex: 1,
      explanation:
        'O composto vive na pasta: o contexto acumulado em meses de compound engineering (CLAUDE.md, skills, lições) é o que especializa o modelo. Por isso Klaassen roda dezenas de "pastas-agente" — cada uma carrega o conhecimento acumulado.',
    },
  ],
  'sd-boss': [
    {
      question: 'Qual é a inversão central do Spec-Driven Development?',
      options: [
        'O código continua sendo a fonte de verdade, com docs geradas depois',
        'A especificação vira a fonte de verdade, e o código passa a ser a saída gerada que serve a spec',
        'A IA decide sozinha o que construir sem intervenção humana',
        'Testes substituem completamente a especificação',
      ],
      correctIndex: 1,
      explanation:
        'No SDD, a spec deixa de ser doc morta e vira o contrato executável — fonte de verdade que os agentes usam para gerar, testar e validar o código. O código serve a spec, não o contrário.',
    },
    {
      question: 'Quais são as quatro fases do fluxo do Spec Kit, na ordem correta?',
      options: [
        'Plan, Code, Test, Deploy',
        'Specify, Plan, Tasks, Implement',
        'Constitution, Code, Review, Ship',
        'Ideate, Prototype, Build, Launch',
      ],
      correctIndex: 1,
      explanation:
        'Specify (o quê) → Plan (como) → Tasks (quebra em unidades testáveis) → Implement (executa e verifica). Cada fase tem checkpoint: você não avança sem validar a anterior, e cada uma produz um artefato markdown que alimenta a próxima.',
    },
    {
      question: 'Qual o papel da constituição (constitution.md) no SDD?',
      options: [
        'É o arquivo de configuração da CLI',
        'Estabelece os princípios inegociáveis do projeto que guiam TODAS as fases seguintes',
        'Lista as tarefas a implementar',
        'Guarda o histórico de commits do repositório',
      ],
      correctIndex: 1,
      explanation:
        'A constituição é o topo da hierarquia: princípios inegociáveis (qualidade, testes, segurança, compliance, convenções) que spec, plano e tarefas devem respeitar. É onde a governança do cliente vira artefato executável.',
    },
    {
      question: 'Na fase Specify, o que a spec deve conter — e o que deve EVITAR?',
      options: [
        'Deve conter a stack e as bibliotecas; evitar descrever comportamento',
        'Deve conter comportamento, critérios de aceite e casos de borda; evitar decisões de implementação',
        'Deve conter o código pronto; evitar markdown',
        'Deve conter apenas o nome da feature; evitar qualquer detalhe',
      ],
      correctIndex: 1,
      explanation:
        'A spec captura o QUÊ (comportamento, critérios, jornadas, casos de borda) sem vazar o COMO (framework, biblioteca) — isso é fase Plan. Misturar amarra a implementação cedo demais e polui o contrato.',
    },
    {
      question: 'Por que se recomenda rodar /speckit.analyze antes de implementar?',
      options: [
        'Para acelerar a geração de código',
        'Para checar consistência e cobertura entre spec, plano e tarefas, pegando contradições e violações da constituição antes de gerar código',
        'Para escolher automaticamente a melhor linguagem de programação',
        'Para publicar a spec num site externo',
      ],
      correctIndex: 1,
      explanation:
        'O analyze é o gate de consistência: pega contradições entre os artefatos e violações constitucionais antes de qualquer código ser gerado — evita descobrir na implementação que o plano contradizia a spec.',
    },
  ],
}

export function getQuizForTopic(topicId: string): QuizQuestion[] {
  return quizzes[topicId] ?? []
}
