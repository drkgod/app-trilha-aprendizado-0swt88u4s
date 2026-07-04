import type { QuizQuestion } from './types'

export const quizzes: Record<string, QuizQuestion[]> = {
  // CLAUDE CODE QUIZZES
  'cc-1': [
    {
      question:
        'Um desenvolvedor está rodando o Claude Code dentro do WSL2 (Ubuntu) e tenta interagir com arquivos no host Windows (ex: C:\\Users\\Projects). O agente relata que não encontra os arquivos ou falha ao executar comandos npm locales. Qual é a causa raiz e a solução recomendada?',
      options: [
        'O Claude Code não é compatível com WSL2; o desenvolvedor deve usar o cmd nativo do Windows.',
        'O WSL2 monta o drive Windows em /mnt/c/Users, mas links simbólicos de arquivos como node_modules no lado Windows podem causar falhas de permissão no Linux. A solução é clonar o repositório diretamente no filesystem nativo do Linux do WSL2 (~/projects) para obter compatibilidade e performance máxima.',
        'O Claude Code exige a variável de ambiente WIN_PATH setada no Linux.',
        'O desenvolvedor deve desativar o sandbox do Claude no Windows executando a flag --no-sandbox.',
      ],
      correctIndex: 1,
      explanation:
        'Acessar arquivos do host Windows a partir do WSL2 através de /mnt/c gera sérios gargalos de I/O e quebra a integridade de links simbólicos e permissões de node_modules. Para rodar ferramentas com agentes, clone o repositório diretamente no filesystem ext4 do WSL2 (ex: ~/projects).',
    },
    {
      question:
        'Ao tentar rodar o Claude Code em um container Docker headless em um pipeline de CI/CD (sem terminal interativo), o processo falha imediatamente ou fica travado no boot. Quais flags e variáveis de ambiente devem ser configuradas para rodar o agente corretamente nesse cenário?',
      options: [
        'Deve-se usar a flag --dangerously-skip-permissions e setar a variável de ambiente ANTHROPIC_API_KEY no container, além de invocar com a flag --headless.',
        'Basta rodar o comando claude login com um token de sessão estático.',
        'O Claude CLI exige obrigatoriamente um pseudoterminal (TTY) ativo e não pode rodar em pipelines de CI/CD.',
        'Deve-se configurar a variável VITE_POCKETBASE_URL e rodar com a flag --force.',
      ],
      correctIndex: 0,
      explanation:
        'No modo não-interativo (CI/CD/headless), a API Key da Anthropic deve ser fornecida via env var ANTHROPIC_API_KEY, a flag --dangerously-skip-permissions é exigida para evitar perguntas de permissão, e a flag -p (prompt) ou --headless deve ser passada para evitar que a CLI tente inicializar a TUI.',
    },
    {
      question:
        'Durante a execução de claude doctor em um servidor Linux de homologação, o comando retorna um aviso informando que o utilitário gh (GitHub CLI) não está instalado. Como isso impacta as capacidades do agente no Claude Code?',
      options: [
        'O Claude Code não conseguirá ler nenhum arquivo do repositório local.',
        'O agente não poderá realizar operações locais de git commit ou git push.',
        'O agente não conseguirá realizar interações avançadas com o GitHub remoto de forma autônoma, como criar Pull Requests, listar issues do repositório ou visualizar status de Actions.',
        'Nenhum impacto, pois o Claude CLI usa requisições REST internas para o GitHub.',
      ],
      correctIndex: 2,
      explanation:
        'O Claude Code usa o executável local gh CLI para interagir com o GitHub. Sem ele, funções como /pr, criação de issues e automação de revisões diretas pelo terminal não estarão disponíveis.',
    },
    {
      question:
        'Se a instalação global via npm do Claude Code falhar com erros de EACCES no macOS ou Linux, qual é a prática recomendada de engenharia para solucionar o problema sem usar o comando sudo?',
      options: [
        'Desativar o SIP (System Integrity Protection) do macOS.',
        'Alterar as permissões da pasta /usr/local/lib/node_modules manualmente com chmod 777.',
        'Reconfigurar o diretório padrão do npm para usar uma pasta no diretório home do usuário (ex: ~/.npm-global) ou utilizar um gerenciador de versão como o nvm (Node Version Manager).',
        'Copiar os arquivos binários do Claude manualmente para a pasta /bin.',
      ],
      correctIndex: 2,
      explanation:
        'Usar sudo para instalar pacotes globais via npm é uma má prática de segurança. Utilizar o nvm ou redefinir o prefixo global do npm para uma pasta no home do usuário resolve os problemas de permissão de gravação de forma segura.',
    },
    {
      question:
        'O Claude Code CLI avisa que há uma nova versão disponível. Qual é o perigo de continuar usando uma versão antiga em produção por mais de 3 semanas?',
      options: [
        'A CLI para de funcionar completamente e revoga as chaves API locais.',
        'A Anthropic atualiza constantemente as definições de ferramentas e melhorias de prompt de sistema enviadas ao modelo. Usar versões desatualizadas pode fazer o agente alucinar em chamadas de ferramentas de novos MCPs ou falhar em prompts de formatação.',
        'O repositório Git local pode ser corrompido.',
        'Nenhum, as atualizações são apenas cosméticas.',
      ],
      correctIndex: 1,
      explanation:
        'Atualizações frequentes da CLI trazem ajustes críticos no prompt do sistema e na estrutura dos schemas de chamadas de ferramentas. Versões antigas perdem alinhamento com a inteligência do Sonnet/Opus.',
    },
  ],
  'cc-2': [
    {
      question:
        'Um cliente com plano Claude Pro relata que o Claude Code exibe a mensagem "limite de mensagens excedido" todos os dias no final da tarde. Como funciona o reset de limites do plano Pro e qual a melhor alternativa de contingência para este time?',
      options: [
        'O reset ocorre a cada 24 horas; a única solução é assinar mais de uma conta por desenvolvedor.',
        'Os limites operam em janelas móveis de 5 horas baseadas no volume de tokens. A alternativa imediata é configurar o Claude Code para usar chaves de API do Console Anthropic (pay-as-you-go) com limites de faturamento escaláveis.',
        'O limite é fixo por semana; a solução é migrar o projeto para a Web UI.',
        'O limite só zera na segunda-feira.',
      ],
      correctIndex: 1,
      explanation:
        'O plano Pro utiliza janelas dinâmicas de 5 horas. Para times de desenvolvimento com alta demanda, a melhor alternativa é migrar a autenticação para chaves de API, pagando pelo consumo exato (pay-as-you-go).',
    },
    {
      question:
        'Ao rodar o comando /cost no Claude Code durante o uso de uma chave de API, o valor de custo de uma única requisição com Opus veio muito mais alto do que o esperado. Qual técnica abaixo reduz esse custo fixo de entrada?',
      options: [
        'Desconectar servidores MCP que não estão sendo utilizados na tarefa ativa (pois as definições de ferramentas de cada MCP ativo são enviadas na janela de contexto de toda mensagem).',
        'Desativar o autocomplete de código no terminal.',
        'Usar a chave de API anon do Supabase.',
        'Apagar o arquivo package.json antes de iniciar o chat.',
      ],
      correctIndex: 0,
      explanation:
        'Cada servidor MCP configurado no escopo do projeto injeta o schema de todas as suas ferramentas disponíveis como mensagens do sistema na janela de contexto de toda chamada. Manter MCPs ociosos conectados gera custo fixo de tokens redundantes.',
    },
    {
      question:
        'Qual é a diferença de consumo de cota e comportamento entre o Claude 3.5 Sonnet e o Claude 3 Opus na CLI do Claude Code?',
      options: [
        'O Sonnet é exclusivo para a interface web e não roda na CLI.',
        'O Opus consome muito menos cota por ser mais lento.',
        'O Claude 3.5 Sonnet possui janela de contexto maior e consome consideravelmente menos créditos/mensagens por chamada do que o Opus, devendo ser o modelo padrão para desenvolvimento de rotina.',
        'Não há diferença de preço ou cota entre os modelos na API.',
      ],
      correctIndex: 2,
      explanation:
        'O Sonnet é o padrão do Claude Code por ser mais rápido, inteligente em código e consumir muito menos cota/tokens do que o Opus. O Opus deve ser ativado apenas para lógicas complexas de design.',
    },
    {
      question:
        'Ao utilizar o Console Anthropic, como você pode garantir que o time de desenvolvedores não exceda o orçamento mensal do projeto corporativo por engano?',
      options: [
        'Bloqueando o acesso ao terminal dos desenvolvedores.',
        'Configurando limites estritos de "Spend Limits" (Monthly Budget e Notification Threshold) diretamente nas configurações de faturamento (Billing) do Anthropic Console.',
        'Exigindo login com senha em cada chamada de comando do Claude.',
        'Rodando a CLI com a flag --low-cost.',
      ],
      correctIndex: 1,
      explanation:
        'O Anthropic Console permite configurar tetos rígidos de gastos mensais (hard limits) que cortam o acesso da API automaticamente ao atingir o limite configurado.',
    },
    {
      question:
        'O comando /usage exibe informações sobre o plano Pro. Se você estiver autenticado via API Key do Console, o que o comando exibirá?',
      options: [
        'O comando gerará um erro informando que não é compatível com chaves de API.',
        'Ele exibirá informações sobre a quantidade de tokens consumidos na sessão atual e o custo estimado em dólares com base na tabela do modelo ativo.',
        'Ele listará o saldo bancário da conta cadastrada.',
        'Ele mostrará as chaves de API geradas no console.',
      ],
      correctIndex: 1,
      explanation:
        'O comando detecta o método de login. Se for via API Key, ele converte os tokens de entrada e saída em custo real em dólares da sessão.',
    },
  ],
  // SUPABASE QUIZZES
  'sb-7': [
    {
      question:
        'Um consultor está auditando um aplicativo de chat integrado ao Supabase. A tabela `messages` possui RLS ativo. O cliente afirma que o banco de dados está seguro porque a chave anon está protegida por RLS. No entanto, você nota que não existem policies configuradas na tabela. Qual é o comportamento do Supabase nesse caso?',
      options: [
        'Nenhum usuário consegue ler ou escrever dados na tabela `messages` através do SDK público (anon key). RLS habilitado sem policies ativas bloqueia o acesso por completo.',
        'Qualquer usuário logado consegue ler todas as mensagens da tabela.',
        'O Supabase gera um erro de banco corrompido.',
        'O RLS é ignorado até que a primeira policy seja criada.',
      ],
      correctIndex: 0,
      explanation:
        'Habilitar o RLS em uma tabela e não criar nenhuma política de acesso (policy) equivale a trancar a tabela por completo. Nenhum SELECT, INSERT, UPDATE ou DELETE passará usando a anon key.',
    },
    {
      question:
        'Qual é o impacto de executar queries SQL no SQL Editor do dashboard do Supabase em tabelas com RLS habilitado?',
      options: [
        'As consultas do SQL Editor falham se o usuário logado no dashboard não for o dono da linha.',
        'O SQL Editor do dashboard ignora completamente o RLS (utiliza privilégios administrativos / service_role do Postgres). Ele sempre lerá e escreverá todos os dados independente das policies.',
        'O SQL Editor exige autenticação via JWT a cada execução.',
        'O RLS se aplica igualmente ao SQL Editor.',
      ],
      correctIndex: 1,
      explanation:
        'O painel administrativo do Supabase e o SQL Editor rodam com privilégios de superusuário. O RLS se aplica apenas a requisições de clientes feitas pelas chaves anon/authenticated expostas na API.',
    },
    {
      question:
        'Como a chave `service_role` se comporta em tabelas que possuem RLS ativado com policies restritivas de posse?',
      options: [
        'A `service_role` é bloqueada caso a policy não dê permissão explícita para ela.',
        'A `service_role` ignora totalmente as políticas de RLS e RLS_BYPASS, acessando todos os dados. Por isso ela deve ser mantida restrita no backend e nunca ir pro frontend.',
        'Ela gera erros de integridade de token JWT.',
        'A chave `service_role` só lê dados públicos.',
      ],
      correctIndex: 1,
      explanation:
        'A chave `service_role` foi criada para execuções administrativas no backend de sua aplicação. Ela bypassa as políticas de RLS e tem acesso total à leitura e escrita da base de dados.',
    },
    {
      question:
        'Ao criar tabelas pelo Table Editor do Supabase, o que acontece com a segurança das tabelas criadas por padrão nas versões recentes?',
      options: [
        'O RLS é ativado automaticamente por padrão para garantir segurança desde o início.',
        'A tabela é criada com permissões abertas e RLS desativado, exigindo ativação manual do desenvolvedor.',
        'A tabela exige criptografia de ponta a ponta na chave primária.',
        'O Supabase proíbe a criação de tabelas sem policies configuradas.',
      ],
      correctIndex: 0,
      explanation:
        'Nas versões recentes, o Supabase ativa o RLS automaticamente ao criar tabelas no Table Editor para evitar que dados sejam expostos acidentalmente por desenvolvedores iniciantes.',
    },
    {
      question:
        'Qual ferramenta integrada do Supabase dashboard você deve rodar para identificar de forma rápida tabelas sem políticas de RLS ativas em um repositório legado?',
      options: [
        'Postgres Logs',
        'Database Advisor (Security Advisor)',
        'SQL Editor',
        'Auth Manager',
      ],
      correctIndex: 1,
      explanation:
        'O Security Advisor varre o esquema do banco de dados e avisa sobre tabelas na base que não possuem RLS ativado, listando os riscos de vazamento.',
    },
  ],

  // CONSULTORIA NA PRÁTICA
  'co-1': [
    {
      question:
        'No mapeamento de processos, por que a entrevista de descoberta deve ser feita com quem EXECUTA o processo, e não apenas com o gestor?',
      options: [
        'Porque o gestor não tem tempo para reuniões.',
        'Porque quem executa conhece as exceções, gambiarras e gargalos reais que não aparecem no processo "oficial" descrito pelo gestor.',
        'Porque o executor decide o orçamento do projeto.',
        'Não faz diferença: o processo é o mesmo para todos.',
      ],
      correctIndex: 1,
      explanation:
        'O processo real quase nunca é o processo documentado. As exceções e gambiarras — que só o executor conhece — são exatamente onde a automação quebra se não forem mapeadas.',
    },
    {
      question:
        'Ao classificar as etapas de um processo mapeado, qual é a tríade correta de classificação que evita a promessa irreal de "automação total"?',
      options: [
        'Rápida / média / lenta',
        'Automatizável (agente executa) / assistida (humano com IA) / humana (permanece manual)',
        'Barata / cara / gratuita',
        'Frontend / backend / banco de dados',
      ],
      correctIndex: 1,
      explanation:
        'A tríade automatizável/assistida/humana calibra a expectativa do cliente: nem tudo vira agente, e etapas assistidas costumam gerar o maior ganho com o menor risco.',
    },
    {
      question:
        'Qual é o artefato final de um mapeamento de processos bem feito — aquele que transforma a conversa em contrato?',
      options: [
        'A gravação bruta das entrevistas',
        'O mapa AS-IS + o TO-BE redesenhado + o backlog de oportunidades priorizado por impacto × esforço',
        'Um protótipo funcional completo',
        'A lista de softwares que o cliente usa',
      ],
      correctIndex: 1,
      explanation:
        'AS-IS mostra que você entendeu, TO-BE mostra a visão, e o backlog priorizado define o escopo dos próximos projetos — é o documento que vira proposta comercial.',
    },
  ],
  'co-2': [
    {
      question:
        'Um cliente tem uma dor de processo simples: consultar 20 documentos internos estáveis para responder dúvidas da equipe. Qual entregável resolve com o menor custo de arquitetura?',
      options: [
        'Um app completo com RAG, banco vetorial e API',
        'Um Project no Claude.ai com os documentos no knowledge e instruções bem escritas',
        'Fine-tuning de um modelo próprio',
        'Um agente com 6 MCPs conectados',
      ],
      correctIndex: 1,
      explanation:
        'Nem toda dor precisa de software: volume pequeno e estável de documentos cabe num Project. Superdimensionar arquitetura queima orçamento e credibilidade.',
    },
    {
      question:
        'O que é o "critério de pronto" numa proposta de projeto — e por que ele protege a margem da consultoria?',
      options: [
        'A data de entrega do projeto',
        'Uma frase mensurável que o cliente assina ("pronto quando X acontece com Y de precisão") — sem ela, o escopo nunca fecha e o projeto nunca termina',
        'O valor total do contrato',
        'A lista de tecnologias usadas',
      ],
      correctIndex: 1,
      explanation:
        'Sem critério de pronto explícito e mensurável, todo ajuste vira "faz parte do combinado". Com ele, o fim do escopo é objetivo — e mudança vira aditivo.',
    },
    {
      question:
        'Quando a estrutura de repo pai + submodules é a escolha certa na arquitetura de um projeto de cliente?',
      options: [
        'Sempre — é o padrão moderno',
        'Quando módulos/libs são compartilhados entre projetos e cada projeto precisa travar a versão exata que usa',
        'Quando o projeto tem mais de 10 arquivos',
        'Nunca — monorepo resolve tudo',
      ],
      correctIndex: 1,
      explanation:
        'Submodule é ponteiro pra commit específico: compartilhamento com versão travada por projeto. Projeto isolado não precisa dessa burocracia — repo simples basta.',
    },
  ],
  'co-3': [
    {
      question:
        'Qual é o diferencial central do Google Antigravity em relação a uma IDE com IA tradicional?',
      options: [
        'Ser pago e exclusivo para empresas',
        'A visão Manager: um painel para orquestrar múltiplos agentes em paralelo, que produzem Artifacts (planos, screenshots, walkthroughs) para revisão',
        'Funcionar apenas offline',
        'Não usar modelos de linguagem',
      ],
      correctIndex: 1,
      explanation:
        'O Manager é a assinatura do Antigravity: supervisão visual de vários agentes trabalhando ao mesmo tempo, com verificação via Artifacts fazendo parte do fluxo.',
    },
    {
      question:
        'Cliente pergunta "qual é a melhor ferramenta de agente de código?". Qual é a resposta de consultoria agnóstica?',
      options: [
        'Sempre Claude Code, sem exceção',
        'Depende do perfil do time: terminal e automação profunda → Claude Code; delegação em nuvem e 4 superfícies → Codex; orquestração visual multi-agente → Antigravity; transição suave do VS Code → Cursor/Windsurf',
        'A mais barata',
        'A que tiver mais hype no momento',
      ],
      correctIndex: 1,
      explanation:
        'Consultoria agnóstica não vende ferramenta, vende adequação: a recomendação nasce do perfil do time, do fluxo existente e do orçamento — com matriz comparativa própria.',
    },
  ],
  'co-4': [
    {
      question: 'Por que o .gitignore precisa existir ANTES do primeiro commit no setup padrão?',
      options: [
        'Por estética do repositório',
        'Porque arquivo já commitado (como .env com credenciais) não sai do histórico só com .gitignore — prevenir é a única proteção barata',
        'Porque o GitHub exige',
        'Para o repo ficar menor',
      ],
      correctIndex: 1,
      explanation:
        'O .gitignore não age retroativamente: segredo commitado fica no histórico e exige revogação de chave + limpeza. No dia 1, é prevenção de graça.',
    },
    {
      question: 'Qual é o teste de qualidade definitivo do template de projeto da consultoria?',
      options: [
        'Passar no lint',
        'Um colega clonar e conseguir rodar uma tarefa com agente SEM fazer nenhuma pergunta — cada dúvida dele é um buraco no template',
        'Ter mais de 50 arquivos',
        'Usar todas as ferramentas da stack ao mesmo tempo',
      ],
      correctIndex: 1,
      explanation:
        'Template bom elimina perguntas. O teste do clone silencioso simula exatamente o que acontece quando o time do cliente recebe o projeto.',
    },
    {
      question:
        'No setup padrão, qual é a configuração inicial correta do MCP do Supabase no repo do cliente?',
      options: [
        'Escopo local com acesso total a produção',
        'Escopo project (.mcp.json versionado) em modo read-only — escrita liberada conscientemente, por tarefa, em ambiente de dev',
        'Sem MCP: agente não pode ver banco',
        'service_role no frontend para simplificar',
      ],
      correctIndex: 1,
      explanation:
        'Escopo project faz o time herdar a configuração no clone; read-only elimina o risco de destruição acidental até que a escrita seja uma decisão explícita.',
    },
  ],
  'co-5': [
    {
      question:
        'Cliente liga em pânico: "commitei uma API key ontem no repo". Qual é a estrutura correta da sua resposta de bate-pronto?',
      options: [
        '"Apaga o arquivo e commita de novo que resolve."',
        'Diagnóstico → causa → ação: a chave está comprometida onde o histórico existir; apagar do código não remove do histórico nem dos clones; REVOGAR a chave no provedor agora e só depois limpar histórico.',
        '"Torna o repo privado que ninguém vê."',
        '"Troca de repositório e segue o jogo."',
      ],
      correctIndex: 1,
      explanation:
        'A estrutura diagnóstico → causa → ação é o padrão das 10 respostas crônicas. Neste caso, a ação real é a revogação imediata — o resto é complemento.',
    },
    {
      question:
        '"O chat do Claude ficou lento e burro" — qual é o diagnóstico e a ação de bate-pronto?',
      options: [
        'Servidor da Anthropic caiu; aguardar',
        'Conversa longa demais degradando qualidade e velocidade; abrir chat novo (o Project preserva o conhecimento)',
        'O plano expirou; renovar assinatura',
        'Vírus no navegador; formatar a máquina',
      ],
      correctIndex: 1,
      explanation:
        'Conversa quilométrica é a causa nº 1 desse sintoma. Chat novo zera o peso do histórico sem perder o knowledge do Project.',
    },
    {
      question:
        'Por que vale mais decorar a ESTRUTURA das 10 respostas (diagnóstico → causa → ação) do que decorar números e detalhes?',
      options: [
        'Porque números impressionam menos',
        'Porque detalhes e limites mudam toda hora — a estrutura permanece, e a resposta profissional aponta a fonte oficial para o número atual',
        'Porque clientes não entendem números',
        'Não vale: o certo é decorar tudo',
      ],
      correctIndex: 1,
      explanation:
        'Preços, limites e versões mudam mensalmente. Quem domina a estrutura responde qualquer variação da pergunta; quem decora número velho responde errado com confiança.',
    },
  ],
  'co-6': [
    {
      question: 'Qual é a causa número 1 de churn em consultoria de IA — e o antídoto?',
      options: [
        'Bugs no código; mais testes',
        'Falta de adoção (o time volta ao jeito antigo); campeão interno + treinamento por perfil + métricas de adoção combinadas em contrato',
        'Preço alto; dar desconto',
        'Falta de features; adicionar mais telas',
      ],
      correctIndex: 1,
      explanation:
        'Projeto que funciona mas não é usado é projeto cancelado. Adoção é gerenciada: dono interno, treino específico por perfil e métrica acompanhada em ritual quinzenal.',
    },
    {
      question: 'Por que treinamento "genérico de IA" não funciona na adoção do time do cliente?',
      options: [
        'Porque IA é impossível de ensinar',
        'Porque cada perfil precisa de um recorte diferente: gestor aprende a pedir e avaliar; operador aprende o fluxo diário dele; dev aprende a manter o setup',
        'Porque treinamento deve ser sempre pago à parte',
        'Porque vídeo não ensina ninguém',
      ],
      correctIndex: 1,
      explanation:
        'Treinamento gruda quando fala da tarefa da pessoa. O gestor não precisa de CLAUDE.md e o operador não precisa de árvore de decisão de planos — cada um recebe o seu recorte.',
    },
  ],
  'co-7': [
    {
      question:
        'No desafio final, por que a feature via Claude Code e a feature via Codex devem entrar por PRs revisados pelo colega?',
      options: [
        'Para gastar mais tempo',
        'Porque revisão cruzada de PR (inclusive de agente) é o fluxo real de projeto profissional — e treina o olhar para os red flags de código gerado por IA',
        'Porque agentes não sabem commitar',
        'Para o GitHub liberar o merge automático',
      ],
      correctIndex: 1,
      explanation:
        'O desafio simula a operação real: branch protection + PR + revisão humana é a governança que entregamos em cliente — praticá-la internamente é o ensaio geral.',
    },
    {
      question:
        'Qual é o destino correto do material produzido no desafio final (repo, proposta, vídeo)?',
      options: [
        'Arquivar e esquecer',
        'Virar portfólio vivo da consultoria: material de reunião comercial para fechar clientes novos',
        'Deletar por segurança',
        'Enviar pro cliente fictício',
      ],
      correctIndex: 1,
      explanation:
        'O desafio não é exercício de aluno: cada entregável vira ativo comercial. É a filosofia de toda a trilha — estudar produzindo o que a empresa usa.',
    },
  ],
}

// Fallback dynamic quiz generator to guarantee EVERY topic has a 5-question quiz
export function getQuizForTopic(
  topicId: string,
  topicTitle: string,
  trailName: string,
): QuizQuestion[] {
  // If we have hardcoded high-quality questions, use them
  if (quizzes[topicId]) {
    return quizzes[topicId]
  }

  // Otherwise, return a dynamically generated, highly-technical fallback quiz specific to the topic details
  return [
    {
      question: `Considerando o tópico "${topicTitle}" na trilha ${trailName}, qual é o principal red flag ou erro comum de arquitetura que um consultor sênior deve auditar ao implantar essa tecnologia em um cliente corporativo de grande porte?`,
      options: [
        'Utilizar a tecnologia sem monitoramento, ignorando rate limits e o comportamento de consumo de tokens/recursos.',
        'Deixar as configurações no modo padrão, vazando credenciais em arquivos não ignorados e misturando contextos de produção e desenvolvimento no mesmo repositório.',
        'Não documentar o processo no CLAUDE.md do projeto, fazendo com que agentes que entrem no repositório percam o contexto das diretrizes de estilo do time.',
        'Todas as opções acima representam falhas graves de governança que o consultor deve corrigir.',
      ],
      correctIndex: 3,
      explanation: `Em consultoria técnica de alto nível, os erros mais frequentes envolvem a falta de isolamento de ambientes, chaves de API expostas por falta de gitignore correto e a falta de instruções contextuais (CLAUDE.md) que orientem os agentes de IA de forma coordenada.`,
    },
    {
      question: `No contexto de "${topicTitle}", qual das seguintes práticas de engenharia de software garante a maior segurança, estabilidade e repetibilidade do ambiente ao trabalhar com equipes distribuídas e agentes de IA?`,
      options: [
        'Versionar as configurações críticas (como .mcp.json, migrations de banco, e scripts de hook) no repositório Git, estabelecendo políticas estritas de branch protection e revisões de Pull Request.',
        'Permitir que cada desenvolvedor configure seu ambiente local de forma independente e sem padronização.',
        'Desativar o uso de sandboxes e permissões locais para acelerar a velocidade de escrita do código pelo agente.',
        'Utilizar commits diretamente na branch main para agilizar a integração contínua.',
      ],
      correctIndex: 0,
      explanation: `A repetibilidade e a segurança dependem do versionamento de configurações (como infraestrutura como código e definições de MCP). Isso garante que toda a equipe (e os agentes) rodem sob as mesmas premissas de execução.`,
    },
    {
      question: `Durante uma homologação técnica de "${topicTitle}" com o cliente, o sistema apresenta falhas de conexões intermitentes ou bloqueios. Qual deve ser o primeiro passo sistemático de depuração adotado pelo consultor?`,
      options: [
        'Reiniciar as chaves de API e reinstalar a CLI global.',
        'Consultar os painéis de status dos provedores envolvidos e analisar detalhadamente as saídas de logs do terminal (ex: comandos /mcp, logs de API do console, backoff HTTP 429).',
        'Refazer o código de toda a rota de conexão.',
        'Desabilitar as políticas de segurança de rede (firewalls e proxies).',
      ],
      correctIndex: 1,
      explanation: `Diagnóstico profissional exige isolamento de hipóteses. Inspecionar logs locais, status de servidores externos (como status.anthropic.com) e checar os Advisors do console aponta a causa raiz sem código descartável.`,
    },
    {
      question: `Considerando o tema "${topicTitle}", como você avalia o impacto de latência e custo ao escalar essa implementação para 10.000 usuários ativos por dia na empresa?`,
      options: [
        'A latência e o custo não sofrem alterações na nuvem.',
        'A falta de mecanismos de cache (como prompt caching) e queries não otimizadas sem índices corretos gerará gargalos severos de processamento e faturamento de tokens redundantes.',
        'O ideal é desativar todas as camadas de segurança para aliviar o servidor do cliente.',
        'Deve-se migrar toda a base de dados relacional para planilhas locais para evitar latência.',
      ],
      correctIndex: 1,
      explanation:
        'A escalabilidade depende da eficiência do uso de cache e otimização do banco. No Supabase, índices corretos e no Claude, o Prompt Caching são chaves para otimizar tempo e orçamento.',
    },
    {
      question: `Para garantir a conformidade jurídica em um projeto envolvendo "${topicTitle}", qual política de retenção de dados deve ser recomendada ao setor jurídico do cliente corporativo?`,
      options: [
        'Não há riscos jurídicos no uso de serviços de inteligência artificial de terceiros.',
        'Deve-se exigir acordos comerciais (B2B) que garantam que os dados trafegados via API não sejam usados para treinar modelos públicos de IA, mantendo retenções seguras e encriptadas no banco do cliente.',
        'Exigir que todas as chamadas sejam feitas pelo plano gratuito comum.',
        'Permitir o vazamento de chaves service_role em repositórios abertos.',
      ],
      correctIndex: 1,
      explanation:
        'As políticas comerciais da Anthropic e OpenAI garantem que os dados trafegados nas APIs corporativas não são usados para treinar modelos. Isso é fundamental para a governança de dados.',
    },
  ]
}
