import type { Topic } from './types'

const xpMap = { alta: 30, media: 20, baixa: 10 }

export const claudeAiTopics: Topic[] = [
  {
    id: 'ca-1',
    index: 1,
    title: 'Planos do Claude.ai',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Cotas, preços e resets de limites entre planos.',
    concept:
      'A plataforma Claude.ai oferece acesso via planos Free, Pro, Team e Enterprise. Cada plano possui cotas de mensagens e janelas de resets específicas. O plano Pro dá acesso a 5x mais cota do que o Free, e os planos Team e Enterprise escalam esse teto para acomodar colaboradores de equipes grandes. Entender essas diferenças ajuda a orientar o cliente no melhor custo-benefício.',
    references: [
      { label: 'Preços Oficiais do Claude', url: 'https://www.anthropic.com/claude/pricing' },
      { label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' },
    ],
    practiceSteps: [
      'Compare as funcionalidades dos planos Pro e Team nas páginas oficiais.',
      'Documente as limitações de envio de arquivos e janelas de resets do plano Free.',
      'Monte uma tabela de custos estimada para um time de 10 consultores.',
    ],
    projectContext:
      'Oriente sempre o cliente a criar planos Team para centralizar o faturamento e compartilhar projetos com facilidade na empresa.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-2',
    index: 2,
    title: 'Modelos atuais',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Família de modelos Claude e seus casos de uso.',
    concept:
      'A família de modelos Claude conta com variações: Claude 3.5 Sonnet (inteligência de uso geral e alta velocidade), Claude 3.5 Haiku (velocidade extrema e custo otimizado) e Claude 3 Opus (profundidade analítica avançada). Escolher o modelo adequado evita gastos desnecessários e aumenta a precisão das respostas.',
    references: [
      {
        label: 'Modelos Claude (Docs)',
        url: 'https://docs.anthropic.com/en/docs/about-claude/models',
      },
    ],
    practiceSteps: [
      'Envie o mesmo prompt de lógica ou refatoração nos três modelos e analise o tempo de resposta.',
      'Analise os custos de entrada e saída por milhão de tokens na página da documentação.',
      'Monte um guia indicando qual modelo sugerir por tipo de ticket (ex: Haiku para testes rápidos).',
    ],
    projectContext:
      'Vender consultoria de eficiência de custos de IA envolve saber apontar o modelo mais leve e barato para resolver o gargalo do cliente.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-3',
    index: 3,
    title: 'Projects',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Organizando contextos de projetos e conhecimento.',
    concept:
      'A funcionalidade de Projects permite agrupar conversas e carregar documentos e regras de contexto (Project Knowledge) específicos para um escopo de trabalho (ex: a documentação de um sistema do cliente). O Claude lê todo esse contexto nas conversas do projeto, eliminando a necessidade de reenviar os mesmos arquivos.',
    references: [
      { label: 'Claude para Trabalho', url: 'https://www.anthropic.com/learn/claude-for-work' },
    ],
    practiceSteps: [
      'Crie um Project no painel lateral do Claude.ai.',
      'Faça upload de guias de boas práticas e diagramas da sua empresa na aba "Project Knowledge".',
      'Defina instruções customizadas no projeto e verifique se ele as segue em novas threads.',
    ],
    projectContext:
      'Configure um Project para cada cliente ativo da sua consultoria para centralizar o conhecimento e histórico de chamadas do projeto dele.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-4',
    index: 4,
    title: 'Artifacts',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Criação e edição de código e interfaces ricas.',
    concept:
      'Os Artifacts são painéis laterais interativos criados para exibir e editar blocos extensos de código, esquemas de bancos de dados, fluxogramas Mermaid e até protótipos de interfaces web funcionais (HTML/CSS/JS) diretamente na tela de chat.',
    references: [{ label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Ative a funcionalidade de Artifacts nas configurações do seu perfil.',
      'Peça para o Claude criar um protótipo de dashboard de metas usando Tailwind e HTML.',
      'Clique em "Publish" no canto do painel e gere um link público compartilhável.',
    ],
    projectContext:
      'Use Artifacts para demonstrar protótipos de interfaces rápidas para o cliente na primeira reunião de alinhamento técnico do projeto.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-5',
    index: 5,
    title: 'Gestão de contexto no Claude.ai',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Como chats longos degradam a performance do modelo.',
    concept:
      'Conversar em uma única thread por muito tempo faz o contexto acumular tokens repetidos, aumentando a probabilidade de respostas confusas e alucinações. Limpar o histórico e abrir novos chats é fundamental para manter as respostas precisas.',
    references: [
      {
        label: 'Claude Model Specs',
        url: 'https://docs.anthropic.com/en/docs/about-claude/models',
      },
    ],
    practiceSteps: [
      'Analise a lentidão nas respostas em uma conversa que excedeu 30 interações.',
      'Abra um chat novo com o mesmo assunto e compare a precisão imediata.',
      'Escreva no seu guia as práticas para evitar o inchaço de conversas.',
    ],
    projectContext:
      'Oriente a equipe do cliente a iniciar novas conversas a cada nova tarefa do projeto para economizar créditos e evitar bugs de contexto.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-6',
    index: 6,
    title: 'Upload e análise de arquivos',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Extraindo dados de PDFs, imagens e planilhas.',
    concept:
      'O Claude.ai possui capacidade de processar arquivos complexos (como PDFs contendo tabelas financeiras, planilhas CSV com centenas de linhas e imagens com anotações de layout) extraindo dados e formatando-os.',
    references: [{ label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Faça upload de uma planilha complexa de dados do Excel.',
      'Peça análises de agrupamentos e estatísticas específicas dos dados das colunas.',
      'Solicite a formatação das conclusões in tabelas limpas no chat.',
    ],
    projectContext:
      'Capacite o time do cliente a realizar auditorias rápidas de relatórios e contratos carregando os arquivos no Claude.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-7',
    index: 7,
    title: 'Web search e Research',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Pesquisas automáticas de mercado e concorrência.',
    concept:
      'A pesquisa web integrada permite que o Claude.ai busque informações atualizadas na internet em tempo real. O modo de pesquisa detalhado (Deep Research) aprofunda essa busca de forma a pesquisar e sintetizar grandes relatórios de inteligência de mercado.',
    references: [{ label: 'Pesquisa com Claude (Blog)', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Ative a pesquisa web e faça perguntas sobre notícias recentes da stack.',
      'Dispare uma busca sobre os principais concorrentes do seu cliente e peça a compilação de dados.',
      'Verifique se as fontes citadas nas notas de rodapé correspondem a sites confiáveis.',
    ],
    projectContext:
      'Use a busca web integrada para fazer varreduras iniciais de concorrência e tendências de tecnologia para estruturar propostas de projetos.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-8',
    index: 8,
    title: 'Memória e histórico',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Como a memória entre chats impacta o desenvolvimento.',
    concept:
      'A funcionalidade de memória do Claude.ai permite registrar fatos e preferências do usuário de forma global (ex: "sempre escreva código com TypeScript"). Compreender as políticas de privacidade da Anthropic sobre a retenção destes dados é obrigatório para clientes corporativos.',
    references: [
      { label: 'Privacidade e Confiança na Anthropic', url: 'https://www.anthropic.com/trust' },
    ],
    practiceSteps: [
      'Abra as configurações de memória da sua conta no painel.',
      'Cadastre a preferência de receber respostas curtas e focadas em comandos.',
      'Abra um chat novo e confirme se o Claude segue a preferência sem comandos adicionais.',
    ],
    projectContext:
      'Explique detalhadamente as regras de privacidade de dados para empresas de grande porte que precisam de conformidade LGPD/GDPR.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-9',
    index: 9,
    title: 'Conectores/integrações no Claude.ai',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Conectando o Claude a ferramentas corporativas.',
    concept:
      'Os conectores do Claude.ai permitem buscar dados de pastas do Google Drive, canais do Slack ou caixas de entrada do Gmail diretamente nas conversas do chat, ampliando o leque de ações do assistente.',
    references: [
      { label: 'Claude para Trabalho', url: 'https://www.anthropic.com/learn/claude-for-work' },
    ],
    practiceSteps: [
      'Conecte sua conta do Google Drive no painel de conectores.',
      'Peça análises de um documento do Drive dentro do chat informando o nome dele.',
      'Valide o fluxo de permissões de acesso da organização.',
    ],
    projectContext:
      'Esta integração traz produtividade imediata no dia a dia da empresa, permitindo cruzamento de dados de múltiplos canais sem sair do navegador.',
    xp: xpMap.alta,
  },
  {
    id: 'ca-10',
    index: 10,
    title: 'Styles e preferences',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Personalizando a voz e o tom das respostas.',
    concept:
      'Você pode calibrar as preferências do Claude para que ele adote tom profissional, técnico ou amigável, alinhado à voz de marca da empresa nas produções de e-mails ou relatórios.',
    references: [{ label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Crie um style padrão para comunicação corporativa nas configurações.',
      'Gere um e-mail de aviso de manutenção de sistema usando o style ativo.',
      'Compare a saída com o tom de voz padrão do Claude.',
    ],
    projectContext:
      'Desenvolva estilos de resposta específicos para o time de suporte ou vendas do cliente utilizarem nas interações de rotina.',
    xp: xpMap.media,
  },
  {
    id: 'ca-11',
    index: 11,
    title: 'Claude Console',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Acesso e faturamento da API no painel de controle.',
    concept:
      'O Console da Anthropic é o portal técnico para geração de API Keys, controle de faturamento pay-as-you-go, configurações de rate limits dos endpoints de produção e testes de prompts no Workbench.',
    references: [{ label: 'Anthropic Developer Console', url: 'https://console.anthropic.com' }],
    practiceSteps: [
      'Crie uma conta de teste no Console da Anthropic.',
      'Gere uma chave de API segura.',
      'Estude a tabela de custos de chamadas de tokens dos modelos.',
    ],
    projectContext:
      'O Console é a primeira parada em qualquer projeto de desenvolvimento de produtos próprios de IA que o cliente deseja construir.',
    xp: xpMap.media,
  },
  {
    id: 'ca-12',
    index: 12,
    title: 'API Messages básica',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Conceitos e requisições básicas da API.',
    concept:
      'A API Messages da Anthropic é o endpoint para chamadas síncronas de processamento de texto e imagens. A chamada estruturada exige um array de mensagens contendo as alternâncias de papéis (user/assistant) e o system prompt isolado.',
    references: [
      { label: 'API Messages Reference', url: 'https://docs.anthropic.com/en/api/messages' },
    ],
    practiceSteps: [
      'Instale o SDK de Node da Anthropic no seu ambiente local.',
      'Execute uma requisição messages simples via script JS.',
      'Analise os metadados de tokens da resposta recebida.',
    ],
    projectContext:
      'Saber a sintaxe básica de integração da API Messages é essencial para auditar o trabalho do desenvolvedor no projeto do cliente.',
    xp: xpMap.media,
  },
  {
    id: 'ca-13',
    index: 13,
    title: 'Tool use / function calling',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Habilitando ações e cálculos via chaves API.',
    concept:
      'O recurso de Tool Use (function calling) permite que o modelo decida quando e qual ferramenta externa chamar para resolver problemas específicos (ex: fazer uma query em um banco de dados) mapeando as assinaturas em JSON schema.',
    references: [
      {
        label: 'Guia de Uso de Ferramentas (Tool Use)',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use',
      },
    ],
    practiceSteps: [
      'Mapeie uma ferramenta simples (como obter cotação de moedas) em JSON schema.',
      'Faça uma requisição enviando o objeto da ferramenta na propriedade `tools`.',
      'Inspecione a resposta do modelo retornando a requisição de chamada (`tool_use`).',
    ],
    projectContext:
      'Implementar Tool Use robusto é o que separa um chatbot de IA comum de um agente autônomo conectado aos dados da empresa.',
    xp: xpMap.media,
  },
  {
    id: 'ca-14',
    index: 14,
    title: 'Claude in Chrome / Excel / PowerPoint',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Extensões e suplementos para rotinas de escritório.',
    concept:
      'Utilizar extensões e suplementos oficiais permite que equipes administrativas acelerem rotinas de digitação, montagem de apresentações em slides e análises de fórmulas no Excel.',
    references: [{ label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Instale a extensão do Chrome do Claude na sua máquina.',
      'Use o atalho de leitura em uma página longa de documentação.',
      'Monte um roteiro curto de como a extensão acelera revisões de textos.',
    ],
    projectContext:
      'Ofereça treinamentos das extensões de rotinas de escritório para as equipes não técnicas do cliente para aumentar a produtividade geral da empresa.',
    xp: xpMap.media,
  },
  {
    id: 'ca-15',
    index: 15,
    title: 'Claude Cowork',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Desenvolvimento colaborativo de arquivos.',
    concept:
      'O Claude Cowork é uma interface otimizada para pair-programming e cocriação de código que permite trabalhar cooperativamente no mesmo bloco de texto ou código em tempo real.',
    references: [{ label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Use la interface do Cowork para escrever um script em conjunto.',
      'Analise o histórico de edições do arquivo.',
      'Documente os atalhos de uso do painel.',
    ],
    projectContext:
      'Essa interface diminui a fricção de reuniões de code review na equipe do cliente.',
    xp: xpMap.media,
  },
  {
    id: 'ca-16',
    index: 16,
    title: 'Anthropic Academy',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Certificações e capacitações oficiais.',
    concept:
      'A Anthropic Academy disponibiliza trilhas gratuitas de engenharia de prompt, arquitetura de sistemas com IA e governança corporativa, ideais para obter selos oficiais de competência.',
    references: [
      { label: 'Portal Educacional da Anthropic', url: 'https://anthropic.skilljar.com' },
    ],
    practiceSteps: [
      'Cadastre-se na Anthropic Academy com o e-mail corporativo.',
      'Complete os módulos iniciais de engenharia de prompt.',
      'Valide o certificado obtido.',
    ],
    projectContext:
      'Certificações da Anthropic chancelam a autoridade técnica da consultoria frente a clientes corporativos exigentes.',
    xp: xpMap.media,
  },
  {
    id: 'ca-17',
    index: 17,
    title: 'Apps desktop e mobile',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Diferenças de interface no celular e computador.',
    concept:
      'Os apps nativos oferecem recursos integrados como ditado por voz simplificado e atalhos rápidos de teclado locais no Desktop, úteis para alternância de janelas.',
    references: [{ label: 'Aprenda sobre o Claude', url: 'https://www.anthropic.com/learn' }],
    practiceSteps: [
      'Instale o app de celular do Claude.',
      'Use o ditado por voz para transcrever uma ideia de feature.',
      'Envie o resultado para o computador.',
    ],
    projectContext:
      'Treine os consultores a utilizarem o app mobile para capturar observações rápidas de calls com clientes em tempo real.',
    xp: xpMap.media,
  },
  {
    id: 'ca-18',
    index: 18,
    title: 'Prompt caching e Batch API',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Otimizando custos de grandes volumes de requisição.',
    concept:
      'O Prompt Caching armazena blocos de contexto gigantes (como documentações inteiras) nos servidores da Anthropic por um período determinado. Chamadas consecutivas que carregam o mesmo contexto economizam até 90% em custos de tokens de entrada. A Batch API processa requisições não urgentes de forma assíncrona em até 24 horas por metade do custo normal.',
    references: [
      {
        label: 'Prompt Caching Guide (Docs)',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching',
      },
    ],
    practiceSteps: [
      'Desenhe a chamada de API contendo o bloco de cache nas opções.',
      'Faça requisições consecutivas e compare a propriedade `cached_tokens` nos metadados.',
      'Calcule a economia em escala para 1000 chamadas diárias.',
    ],
    projectContext:
      'Se o cliente possui um robô de RAG com banco de dados fixo grande, implementar Prompt Caching reduz a fatura dele drasticamente.',
    xp: xpMap.baixa,
  },
  {
    id: 'ca-19',
    index: 19,
    title: 'Rate limits da API',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Prevenindo erros de requisições excedidas em produção.',
    concept:
      'A API possui limites rigorosos de chamadas por minuto (RPM) e tokens por minuto (TPM), divididos em Tiers de faturamento (de 1 a 5). Atingir esses limites retorna erros HTTP 429. Implementar tratamento de retry com backoff exponencial no código do backend evita falhas de experiência do usuário.',
    references: [
      { label: 'API Rate Limits and Tiers', url: 'https://docs.anthropic.com/en/api/rate-limits' },
    ],
    practiceSteps: [
      'Verifique seu Tier de uso atual no dashboard do Console.',
      'Simule requisições paralelas rápidas e ateste o erro 429.',
      'Escreva um wrapper de chamada com lógica de backoff exponencial.',
    ],
    projectContext:
      'Antes do go-live do produto do cliente, certifique-se de que a conta dele tem Tier de faturamento adequado ao tráfego estimado de usuários.',
    xp: xpMap.baixa,
  },
  {
    id: 'ca-20',
    index: 20,
    title: 'Privacidade e retenção',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Regras de tratamento de dados corporativos.',
    concept:
      'A Anthropic segue regras de segurança claras. Chaves de API e dados trafegados na API Messages por padrão não são utilizados para treinamento de novos modelos, garantindo conformidade para empresas com restrições rígidas de privacidade de código.',
    references: [
      { label: 'Políticas de Privacidade e Confiança', url: 'https://www.anthropic.com/trust' },
    ],
    practiceSteps: [
      'Estude a documentação de compliance da Anthropic.',
      'Prepare um resumo de privacidade de dados para o setor jurídico de um cliente.',
      'Identifique as diferenças das políticas de planos Free vs API.',
    ],
    projectContext:
      'Ter este material jurídico de privacidade estruturado e pronto resolve reuniões de auditoria com setores jurídicos de grandes empresas na primeira semana de projeto.',
    xp: xpMap.baixa,
  },
  {
    id: 'ca-21',
    index: 21,
    title: 'Agent SDK',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'O framework oficial para agentes autônomos.',
    concept:
      'O Agent SDK da Anthropic é um framework projetado para construir sistemas de agentes robustos com estados de conversação persistentes, gerenciamento de loops de execução e suporte nativo a ferramentas.',
    references: [
      {
        label: 'Anthropic SDK no GitHub',
        url: 'https://github.com/anthropics/anthropic-sdk-typescript',
      },
    ],
    practiceSteps: [
      'Instale o Agent SDK em um repositório node.',
      'Crie um agente simples com 2 ferramentas conectadas.',
      'Monitore o loop de decisões do agente no log do terminal.',
    ],
    projectContext:
      'Para projetos de robôs de atendimento autônomos complexos com tomada de decisão em tempo real, use o SDK oficial para estruturar a engenharia.',
    xp: xpMap.baixa,
  },
  {
    id: 'ca-22',
    index: 22,
    title: 'Status e incidentes',
    priority: 'baixa',
    type: 'quiz',
    shortDescription: 'Diagnóstico rápido de quedas dos serviços.',
    concept:
      'As interrupções de serviço dos servidores da Anthropic ou de provedores de CDN podem causar erros de conexões e travamentos de requisições. O portal de status monitora o status dos endpoints em tempo real.',
    references: [{ label: 'Portal de Status do Endpoint', url: 'https://status.anthropic.com' }],
    practiceSteps: [
      'Acesse status.anthropic.com e verifique o histórico recente de incidentes.',
      'Assine a newsletter de incidentes técnicos.',
      'Escreva um script de monitoramento básico de saúde do endpoint.',
    ],
    projectContext:
      'Se a API de um cliente cair em produção, o primeiro passo antes de alterar qualquer código é conferir a saúde dos servidores da Anthropic.',
    xp: xpMap.baixa,
  },
]
