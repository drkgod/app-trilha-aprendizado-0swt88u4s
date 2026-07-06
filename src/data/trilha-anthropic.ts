import type { Topic } from './types'

const SUP = 'https://support.claude.com'
const DOCS = 'https://platform.claude.com/docs'
const ACAD = 'https://anthropic.skilljar.com'

export const claudeAiTopics: Topic[] = [
  {
    id: 'ca-1',
    index: 1,
    title: 'Planos: Free, Pro, Max, Team e Enterprise',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'O que cada plano libera, preços e como funciona o reset de limites.',
    concept:
      'A escada de planos do Claude.ai: Free (acesso básico com limites apertados), Pro (mais uso, Projects, Research e acesso ao Claude Code), Max 5x e Max 20x (multiplicadores de uso para power users e mais acesso a Opus), Team (assentos gerenciados, colaboração e mais contexto para empresas) e Enterprise (SSO, auditoria, retenção configurável). Limites funcionam por janela que reseta (e tetos semanais nos planos maiores) — e consomem por tokens processados, então conversas longas com arquivos grandes gastam muito mais que perguntas curtas. Consultor dimensiona plano por padrão de uso, não por cargo.',
    deepDive: [
      'A pergunta de dimensionamento: quantas horas/dia, com que tamanho de contexto, em qual modelo? Um analista que anexa PDFs de 200 páginas consome como três que não anexam.',
      'Team vs várias contas Pro: gestão central, billing único e recursos de colaboração — a partir de ~5 pessoas a conversa muda de plano individual para Team.',
      'Preços e franquias mudam — cite sempre a página oficial de preços na proposta, com data.',
    ],
    pitfalls: [
      'Prometer limites específicos de memória — verifique a página oficial no dia da proposta.',
      'Colocar o time inteiro no Free para "testar" e queimar a primeira impressão com limites.',
    ],
    practiceSteps: [
      'Monte a tabela de decisão perfil → plano da consultoria.',
      'Simule o custo mensal de um time de 10 pessoas em 3 cenários de plano.',
    ],
    projectContext:
      'Licenciamento é a primeira planilha do projeto de implantação — errar o plano mina a adoção antes do primeiro treinamento.',
    references: [
      { label: 'Planos e preços do Claude', url: 'https://claude.com/pricing', kind: 'doc' },
      { label: 'Central de ajuda — planos e limites', url: SUP, kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'ca-2',
    index: 2,
    title: 'A família de modelos e qual indicar',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Opus, Sonnet e Haiku — diferença prática por caso de uso e orçamento.',
    concept:
      'A família Claude se organiza em três tiers com trade-off claro: Opus (máxima capacidade — raciocínio profundo, arquitetura, análises complexas — mais caro e lento), Sonnet (o cavalo de batalha: 80-90% da capacidade por fração do custo, padrão para quase tudo) e Haiku (velocidade e volume — classificação, extração, tarefas mecânicas em escala). No seletor do Claude.ai e via API, a heurística do consultor é a mesma: comece com Sonnet; suba para Opus quando a tarefa comprovadamente exige; desça para Haiku quando o volume domina. Versões evoluem trimestralmente — decore a lógica dos tiers, consulte a doc para os números.',
    deepDive: [
      'Extended thinking: os modelos atuais pensam antes de responder quando a tarefa pede — qualidade extra com custo de latência; saiba quando vale.',
      'Na API, o custo por milhão de tokens difere por ordem de grandeza entre tiers — a escolha de modelo é a principal linha da fatura de qualquer produto.',
      'Indicação por caso: contrato jurídico complexo → Opus; assistente interno → Sonnet; classificar 100k tickets → Haiku.',
    ],
    pitfalls: [
      'Recomendar por benchmark em vez de testar no material do cliente.',
      'Fixar nomes de versão em documento perene — cite tiers e linke a doc.',
    ],
    practiceSteps: [
      'Rode a mesma análise real nos três tiers e compare qualidade × custo.',
      'Escreva o guia de 1 página "qual modelo para quê" do time.',
    ],
    projectContext:
      'A matriz tarefa → modelo entra em todo treinamento e em toda arquitetura de produto que a consultoria desenha.',
    references: [
      {
        label: 'Docs — visão geral de modelos',
        url: DOCS + '/en/about-claude/models/overview',
        kind: 'doc',
      },
      { label: 'Claude 101 — Anthropic Academy', url: ACAD + '/claude-101', kind: 'curso' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'ca-3',
    index: 3,
    title: 'Projects: conhecimento e instruções persistentes',
    priority: 'alta',
    type: 'pratica',
    shortDescription:
      'Project knowledge, instruções do projeto e quando usar Project vs chat solto.',
    concept:
      'Projects são espaços de trabalho persistentes: você anexa conhecimento (documentos que TODA conversa do projeto enxerga) e define instruções (o system prompt do projeto — tom, papel, regras). É a resposta ao problema de recomeçar do zero a cada chat: o contexto do cliente X vive no Project do cliente X. A decisão Project vs chat solto: assunto recorrente com material de referência → Project; pergunta pontual → chat. Para consultoria, um Project por cliente com os documentos-chave e as instruções de contexto é o setup mínimo profissional.',
    deepDive: [
      'Project knowledge consome contexto: documentos anexados entram nas conversas — cure o essencial em vez de despejar 40 arquivos.',
      'Instruções de projeto são onde mora a mágica: "você é analista da empresa X, setor Y, sempre responda considerando os processos do documento Z" transforma a qualidade.',
      'Em Team, Projects compartilhados alinham o time inteiro no mesmo contexto e padrão de resposta.',
    ],
    pitfalls: [
      'Despejar documentos demais e degradar todas as conversas do projeto.',
      'Instruções genéricas ("seja útil") que desperdiçam o recurso.',
    ],
    practiceSteps: [
      'Crie um Project de cliente real: 3-5 documentos essenciais + instruções específicas.',
      'Compare a mesma pergunta no Project e num chat solto.',
    ],
    projectContext:
      'O "Project bem montado por área" é entregável de implantação: RH, jurídico e operações do cliente, cada um com seu espaço curado.',
    references: [
      { label: 'Central de ajuda — Projects', url: SUP, kind: 'doc' },
      { label: 'Claude 101 — Anthropic Academy', url: ACAD + '/claude-101', kind: 'curso' },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ca-4',
    index: 4,
    title: 'Artifacts: de resposta a produto',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Tipos, iteração, publicação e artifacts com IA embutida.',
    concept:
      'Artifacts são saídas que viram objetos editáveis numa janela própria: documentos, código, páginas HTML interativas, diagramas, apps React. Você itera neles ("mude a cor", "adicione um filtro") sem perder a versão, e pode publicar/compartilhar por link. O salto recente: artifacts com IA embutida — o app criado pode ele mesmo chamar o Claude, permitindo construir mini-ferramentas inteligentes (um gerador de propostas, um simulador) sem escrever uma linha de código. Para o consultor, artifacts são a fábrica de protótipos de demonstração.',
    deepDive: [
      'Fluxo de protótipo em reunião: descreva a ferramenta → artifact interativo → itere ao vivo com o feedback do cliente → compartilhe o link no follow-up.',
      'Artifacts com IA embutida usam a conta de quem USA o artifact — dá para distribuir a ferramenta sem pagar o uso dos outros.',
      'Limitações a conhecer: ambiente sandboxed, sem backend próprio — para produto de verdade, o caminho é exportar o código e evoluir com Claude Code.',
    ],
    pitfalls: [
      'Prometer que o artifact é o produto final — é protótipo excelente, não infraestrutura.',
      'Ignorar a publicação por link e mandar screenshot do que poderia ser interativo.',
    ],
    practiceSteps: [
      'Crie um artifact interativo de uma calculadora de ROI para seu serviço.',
      'Crie um artifact com IA embutida (ex: gerador de resumo executivo) e compartilhe.',
    ],
    projectContext:
      'Protótipo em 20 minutos na frente do cliente é a demonstração de valor que fecha a fase de discovery.',
    references: [
      { label: 'Central de ajuda — Artifacts', url: SUP, kind: 'doc' },
      {
        label: 'Anúncio — artifacts com IA',
        url: 'https://www.anthropic.com/news/claude-powered-artifacts',
        kind: 'artigo',
      },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ca-5',
    index: 5,
    title: 'Gestão de contexto no Claude.ai',
    priority: 'alta',
    type: 'conceito',
    shortDescription: 'Por que chat longo degrada, quando abrir chat novo e o custo dos anexos.',
    concept:
      'As leis de contexto valem na interface web: cada mensagem reprocessa a conversa inteira — chats longos ficam lentos, caros (consomem limite mais rápido) e menos precisos, porque o modelo dilui atenção. Arquivos anexados são os maiores ocupantes: um PDF grande entra inteiro e é reprocessado a cada turno. As regras práticas para ensinar a qualquer usuário: um assunto por chat; terminou um tema, chat novo; material recorrente vai para Project knowledge (não re-anexado a cada conversa); e peça um resumo antes de migrar de chat para levar o essencial.',
    deepDive: [
      'Sintoma clássico: "o Claude ficou burro" no fim de um chat de 200 mensagens — não ficou; o contexto afogou.',
      'O limite de conversa existe: chats podem atingir o teto de contexto e travar — o aviso para migrar chegou tarde; o hábito de segmentar chega antes.',
      'Anexo pontual vs Project knowledge: uma vez → anexo; sempre → Project.',
    ],
    pitfalls: [
      'O chat-vida: uma única conversa de 3 meses para tudo.',
      'Re-anexar o mesmo PDF de 100 páginas em 15 chats diferentes.',
    ],
    practiceSteps: [
      'Audite seus chats: quantos misturam 3+ assuntos? Migre para a disciplina um-tema-um-chat.',
      'Mova seus 3 anexos mais repetidos para Project knowledge.',
    ],
    projectContext:
      'Higiene de contexto é o módulo de maior ROI no treinamento de usuários finais do cliente — dobra a qualidade percebida sem custar nada.',
    references: [{ label: 'Central de ajuda — limites e uso', url: SUP, kind: 'doc' }],
    xp: 60,
    estMinutes: 20,
  },
  {
    id: 'ca-6',
    index: 6,
    title: 'Upload e análise de arquivos',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Formatos aceitos, limites de tamanho e o que o Claude enxerga em cada tipo.',
    concept:
      'O Claude.ai aceita PDFs, imagens, documentos de texto, planilhas e código — mas o que ele "enxerga" varia por tipo: PDFs entram com texto e visual das páginas (tabelas e diagramas incluídos); imagens são analisadas visualmente; CSVs/planilhas viram dados que ele pode analisar (e, com o ambiente de análise, executar código sobre eles); documentos escaneados dependem da qualidade do scan. Limites de tamanho e quantidade por conversa existem e variam por plano. O consultor precisa saber diagnosticar o clássico "ele não leu meu arquivo direito" — que quase sempre é scan ruim, arquivo truncado por tamanho ou tabela complexa demais.',
    deepDive: [
      'PDF grande: pergunte primeiro "o que você consegue ver deste documento?" para validar a ingestão antes de confiar na análise.',
      'Planilhas: o modo de análise de dados escreve e executa código sobre o arquivo — resultados verificáveis, não estimados.',
      'Vários arquivos: o Claude cruza documentos ("compare o contrato A com a proposta B") — um dos casos de uso de maior valor em consultoria.',
    ],
    pitfalls: [
      'Subir um scan de fax de 1998 e culpar o modelo.',
      'Anexar 10 arquivos "por contexto" quando a pergunta usa um.',
    ],
    practiceSteps: [
      'Teste os limites: suba um PDF grande, uma planilha e uma imagem; valide o que foi visto em cada.',
      'Faça uma análise cruzada de dois documentos reais.',
    ],
    projectContext:
      'Análise de documentos é o caso de uso nº 1 dos usuários de negócio do cliente — dominar os limites evita frustração na primeira semana.',
    references: [{ label: 'Central de ajuda — uploads', url: SUP, kind: 'doc' }],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'ca-7',
    index: 7,
    title: 'Web search e Research',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Quando o Claude busca sozinho, o modo Research e como pedir bem.',
    concept:
      'O Claude busca na web quando a pergunta pede informação atual — e o modo Research vai além: conduz uma investigação multi-etapa, consultando dezenas de fontes e devolvendo um relatório com citações. A habilidade do usuário está no pedido: research bom recebe escopo ("mercado brasileiro", "últimos 12 meses"), critérios ("priorize fontes oficiais") e formato de saída ("tabela comparativa com fontes"). Para consultoria, Research é o estagiário de pesquisa que entrega em 10 minutos o levantamento que tomava uma tarde — desde que você saiba briefá-lo.',
    deepDive: [
      'Citações são o contrato de confiança: sempre verifique as fontes-chave antes de repassar ao cliente — o modelo resume, você endossa.',
      'Research consome bem mais que chat normal — use para o que vale um relatório, não para uma dúvida pontual.',
      'Combine com Projects: research sobre o setor do cliente dentro do Project que já tem o contexto dele.',
    ],
    pitfalls: [
      'Repassar relatório de research sem checar uma única fonte.',
      'Pedir "pesquise sobre X" sem escopo e reclamar da generalidade.',
    ],
    practiceSteps: [
      'Rode um Research real com briefing completo (escopo, critérios, formato) para um cliente atual.',
      'Verifique 3 fontes citadas e avalie a fidelidade do resumo.',
    ],
    projectContext:
      'Levantamentos de mercado e benchmark de concorrentes viram entregáveis de horas, não semanas — margem direto no bolso da consultoria.',
    references: [
      {
        label: 'Anúncio — Research',
        url: 'https://www.anthropic.com/news/research',
        kind: 'artigo',
      },
      { label: 'Central de ajuda — web search', url: SUP, kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'ca-8',
    index: 8,
    title: 'Memória e histórico entre conversas',
    priority: 'alta',
    type: 'conceito',
    shortDescription:
      'Busca em chats passados, memória entre conversas e o que dizer sobre privacidade.',
    concept:
      'Dois recursos distintos que usuários confundem: a busca no histórico (o Claude consulta suas conversas passadas quando você referencia algo — "continue o plano de ontem") e a memória (o Claude constrói e mantém um resumo do que aprendeu sobre você/seus projetos, aplicado automaticamente). Ambos são configuráveis — dá para ver, editar e desligar a memória, e usar chats incógnitos que não entram em nada. As perguntas de privacidade do cliente têm resposta objetiva: onde ver o que está memorizado, como apagar, e o que a política vigente diz sobre uso de dados — sempre respondidas com a documentação oficial, nunca de memória.',
    deepDive: [
      'Memória em Team/Enterprise tem controles administrativos — a governança que o compliance do cliente vai querer ver.',
      'Memória boa se cura: revise o que foi memorizado e corrija distorções (projetos antigos, contextos que mudaram).',
      'Chat incógnito é a válvula para assuntos sensíveis que não devem influenciar o perfil.',
    ],
    pitfalls: [
      'Afirmar "o Claude lembra de tudo" ou "não lembra de nada" — os dois estão errados; explique os dois mecanismos.',
      'Deixar memória ligada em conta compartilhada de demonstração com dados de vários clientes.',
    ],
    practiceSteps: [
      'Ative, inspecione e edite sua memória; teste uma referência a conversa antiga.',
      'Escreva o parágrafo-padrão de resposta sobre memória/privacidade para clientes.',
    ],
    projectContext:
      'Configurar memória e histórico corretamente por perfil de usuário faz parte do desenho de governança da implantação.',
    references: [
      {
        label: 'Anúncio — memória no Claude',
        url: 'https://www.anthropic.com/news/memory',
        kind: 'artigo',
      },
      { label: 'Central de ajuda — memória e privacidade', url: SUP, kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 25,
  },
  {
    id: 'ca-9',
    index: 9,
    title: 'Conectores: MCP na interface do Claude.ai',
    priority: 'alta',
    type: 'pratica',
    shortDescription: 'Adicionar conectores (Drive, Gmail…), o diretório e o modelo de permissões.',
    concept:
      'Conectores trazem o MCP para o usuário final: pela interface, conecta-se Google Drive, Gmail, Calendar, Slack, Notion, Linear e o diretório crescente de integrações — e o Claude passa a buscar no Drive da empresa, resumir a caixa de entrada, criar eventos. Cada conector pede OAuth e escopos explícitos, e pode ser habilitado/desabilitado por conversa. Este é o recurso que transforma o Claude.ai de "chat esperto" em "assistente que trabalha nos meus sistemas" — e o que abre as conversas de automação de processos com áreas de negócio.',
    deepDive: [
      'Conectores custam contexto como todo MCP: habilite por conversa o que a tarefa usa, não tudo sempre.',
      'Em Team/Enterprise, admins controlam quais conectores o time pode usar — a alavanca de governança.',
      'Conectores remotos customizados: a empresa pode expor seus próprios sistemas via MCP e plugá-los na interface — o projeto de integração que a consultoria vende.',
    ],
    pitfalls: [
      'Conectar o Gmail pessoal numa demo com tela compartilhada.',
      'Ignorar prompt injection: um e-mail malicioso lido pelo conector pode conter instruções — cuidado com fluxos que leem conteúdo externo e agem.',
    ],
    practiceSteps: [
      'Conecte Drive e Calendar; rode 3 tarefas reais cruzando os dois.',
      'Explore o diretório de conectores e liste os 5 mais relevantes para seus clientes.',
    ],
    projectContext:
      'O mapeamento de processos identifica os sistemas; os conectores (nativos ou customizados) são como a IA chega neles — o coração da proposta de automação.',
    references: [
      { label: 'Central de ajuda — conectores', url: SUP, kind: 'doc' },
      { label: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/', kind: 'doc' },
    ],
    xp: 60,
    estMinutes: 30,
  },
  {
    id: 'ca-10',
    index: 10,
    title: 'Styles e preferences',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Personalizar tom e formato; preferences globais vs instruções de projeto.',
    concept:
      'Três camadas de personalização que se somam: preferences globais (valem em tudo — "responda em português, seja direto, evite listas desnecessárias"), styles (perfis de escrita chaveáveis — formal, conciso, explicativo — inclusive treinados a partir de exemplos do SEU texto) e instruções de projeto (contexto específico daquele Project). A ordem de precedência prática: o mais específico vence. Consultor configura as três camadas no onboarding de cada usuário do cliente — dez minutos que eliminam meses de "reescreva isso mais curto".',
    deepDive: [
      'Style a partir de amostra: cole 3 textos seus e o Claude extrai o estilo — o caminho para relatórios que soam como a empresa, não como IA.',
      'Preference boa é regra objetiva ("máximo 3 parágrafos salvo pedido") — não adjetivo ("seja bom").',
      'Documente o conjunto padrão de preferences da consultoria para replicar em cada implantação.',
    ],
    pitfalls: [
      'Instruções conflitantes entre camadas gerando comportamento errático.',
      'Style rebuscado que vira caricatura em respostas técnicas.',
    ],
    practiceSteps: [
      'Configure suas preferences globais com 5 regras objetivas.',
      'Crie um style a partir de 3 relatórios reais e compare a saída.',
    ],
    projectContext:
      'Padronização de voz nas saídas de IA é requisito de marca em clientes maiores — e styles são a resposta nativa.',
    references: [{ label: 'Central de ajuda — styles', url: SUP, kind: 'doc' }],
    xp: 45,
    estMinutes: 20,
  },
  {
    id: 'ca-11',
    index: 11,
    title: 'Claude Console: a porta de entrada da API',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Criar conta, API keys, Workbench para testar prompts, billing e consumo.',
    concept:
      'O Console (console.anthropic.com ou platform.claude.com) é o painel de desenvolvedor: criação de API keys (por workspace, com escopos), o Workbench — playground para testar prompts com controle de modelo, temperatura e system prompt antes de escrever código — e a visão de billing/uso com limites de gasto configuráveis. Mesmo consultor que não programa precisa navegar aqui: é onde se cria a key do projeto do cliente, se define o teto de gasto (SEMPRE defina) e se responde "quanto gastamos este mês e com o quê".',
    deepDive: [
      'Workspaces separam clientes: keys, limites e billing por workspace — a organização mínima de uma consultoria multi-cliente.',
      'O Workbench gera o código da chamada testada — a ponte natural do prompt validado para o produto.',
      'Alertas e tetos de gasto são a diferença entre susto de fatura e operação controlada.',
    ],
    pitfalls: [
      'Uma key global para todos os clientes — sem isolamento de custo nem revogação limpa.',
      'Testar prompt direto no código em vez de iterar barato no Workbench.',
    ],
    practiceSteps: [
      'Crie um workspace de teste, uma key com escopo e um teto de gasto.',
      'Itere um prompt real no Workbench até o resultado desejado e exporte o código.',
    ],
    projectContext:
      'Setup de Console por cliente (workspace + key + teto + alerta) é checklist de kickoff de qualquer projeto com API.',
    references: [
      { label: 'Claude Console', url: 'https://console.anthropic.com/', kind: 'tool' },
      {
        label: 'Docs — primeiros passos na API',
        url: DOCS + '/en/api/getting-started',
        kind: 'doc',
      },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'ca-12',
    index: 12,
    title: 'API Messages: o mínimo essencial',
    priority: 'media',
    type: 'conceito',
    shortDescription:
      'Estrutura de request, system prompt e o vocabulário para acompanhar quem constrói.',
    concept:
      'A Messages API é uma chamada HTTP com: model (qual Claude), system (as instruções permanentes), messages (a conversa — pares user/assistant), max_tokens (teto da resposta) e temperature. A resposta traz o conteúdo e o usage (tokens de entrada e saída — a base da conta de custo). Você não precisa programar para valer ouro numa reunião técnica: precisa ler um request e responder "onde entra a instrução do sistema?", "por que a fatura subiu?" (tokens de entrada crescem com o histórico reenviado) e "o que é streaming?" (a resposta chegando aos pedaços para UX fluida).',
    deepDive: [
      'A API é stateless: cada chamada reenvia a conversa inteira — por isso histórico longo = custo crescente, e por isso existe prompt caching.',
      'System prompt na API = as "instruções de projeto" do mundo dos produtos: é onde vive a persona e as regras do assistente do cliente.',
      'usage na resposta é o medidor: input_tokens × preço + output_tokens × preço = o custo daquela chamada.',
    ],
    pitfalls: [
      'Achar que a API "lembra" da conversa anterior sozinha.',
      'Ignorar max_tokens e ter respostas cortadas em produção.',
    ],
    practiceSteps: [
      'No Workbench, monte uma chamada com system prompt e leia o usage da resposta.',
      'Calcule o custo de 1000 atendimentos/dia do assistente hipotético do cliente.',
    ],
    projectContext:
      'Fluência em ler requests permite ao consultor auditar o que a equipe de dev do cliente construiu — e escopar produtos com custo realista.',
    references: [
      { label: 'Docs — Messages API', url: DOCS + '/en/api/messages', kind: 'doc' },
      {
        label: 'Building with the Claude API — Academy',
        url: ACAD + '/claude-with-the-anthropic-api',
        kind: 'curso',
      },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'ca-13',
    index: 13,
    title: 'Tool use na API: conceito e exemplo',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'Function calling — como o modelo pede para executar ações no mundo.',
    concept:
      'Tool use (function calling) é o mecanismo que transforma o modelo em agente: você declara ferramentas (nome, descrição, parâmetros em JSON Schema), o modelo decide quando usá-las e responde com um pedido estruturado de chamada ("chame consultar_pedido com id=123"); SEU código executa a ação real e devolve o resultado, e o modelo continua com essa informação. O modelo nunca executa nada — ele pede; a aplicação executa. Entender esse loop é entender como TODOS os agentes (Claude Code, conectores, MCP) funcionam por baixo.',
    deepDive: [
      'A descrição da ferramenta é prompt: descrições precisas de quando usar (e quando não) definem a qualidade da decisão do modelo.',
      'O loop: user → modelo pede tool → app executa → resultado volta como mensagem → modelo responde ou pede outra tool. Multi-step agents são esse loop repetido.',
      'MCP é a padronização disso: em vez de cada app declarar ferramentas do seu jeito, o protocolo define o contrato.',
    ],
    pitfalls: [
      'Ferramentas com descrições vagas gerando chamadas erradas — o bug mais comum de agentes caseiros.',
      'Executar ações destrutivas pedidas pelo modelo sem camada de confirmação.',
    ],
    practiceSteps: [
      'Desenhe o diagrama do loop de tool use para um caso do cliente (ex: consultar estoque).',
      'No Workbench/docs, monte uma definição de ferramenta e observe o modelo decidir usá-la.',
    ],
    projectContext:
      'Todo blueprint de automação tem uma tabela "ferramentas do agente": nome, o que faz, riscos, aprovação necessária — este tópico é o alicerce dela.',
    references: [
      {
        label: 'Docs — tool use',
        url: DOCS + '/en/agents-and-tools/tool-use/overview',
        kind: 'doc',
      },
      { label: 'Cursos de API/MCP — Academy', url: ACAD + '/', kind: 'curso' },
    ],
    xp: 45,
    estMinutes: 30,
  },
  {
    id: 'ca-14',
    index: 14,
    title: 'Claude in Chrome, Excel e PowerPoint',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'O que cada agente embarcado faz e para qual perfil de cliente indicar.',
    concept:
      'Três agentes que moram onde o trabalho acontece: Claude in Chrome navega e opera páginas (preenche formulários, pesquisa em sistemas web, executa fluxos no navegador); Claude in Excel trabalha dentro da planilha (fórmulas, análises, limpeza e explicação de modelos existentes); Claude in PowerPoint monta e reformata apresentações no próprio arquivo. A indicação é cirúrgica por perfil: financeiro vive no Excel, comercial vive no PowerPoint, operações vive em sistemas web — cada um recebe o agente do seu habitat, com curva de adoção mínima porque a interface já é conhecida.',
    deepDive: [
      'Chrome é o mais poderoso e o mais sensível: um agente que age em páginas precisa de política clara de sites permitidos e supervisão — prompt injection em página maliciosa é vetor real.',
      'Excel: o caso matador é explicar e auditar planilhas herdadas — a dor universal do financeiro.',
      'Disponibilidade e requisitos variam por plano — confirme na documentação antes de prometer no rollout.',
    ],
    pitfalls: [
      'Liberar o agente de navegador sem política de sites e supervisão.',
      'Demonstrar no Excel genérico em vez de na planilha real (e dolorosa) do cliente.',
    ],
    practiceSteps: [
      'Teste os três com uma tarefa real de cada área.',
      'Mapeie: para cada área do seu cliente, qual agente embarcado atacaria a maior dor?',
    ],
    projectContext:
      'Esses agentes viram frentes do mapeamento de processos: a automação chega onde a área já trabalha, sem migração de ferramenta.',
    references: [
      { label: 'Central de ajuda — Claude nos apps', url: SUP, kind: 'doc' },
      { label: 'Anthropic — novidades', url: 'https://www.anthropic.com/news', kind: 'artigo' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'ca-15',
    index: 15,
    title: 'Claude Cowork',
    priority: 'media',
    type: 'conceito',
    shortDescription: 'O agente de trabalho para não-devs — e a diferença para o Claude Code.',
    concept:
      'Cowork é o Claude Code para trabalho de conhecimento: um app desktop onde o agente opera sobre PASTAS e ARQUIVOS (documentos, planilhas, PDFs) em vez de repositórios — organiza, extrai, cruza, gera relatórios e apresentações, executando tarefas multi-etapa com a mesma mecânica de plano e revisão. O público é o analista, o jurídico, o financeiro: gente que tem processos repetitivos sobre arquivos e nunca vai abrir um terminal. Na prática da consultoria, Cowork é a resposta para "e o resto da empresa?" depois que os devs já adotaram Claude Code.',
    deepDive: [
      'Mesmo DNA: instruções, skills e plugins funcionam no Cowork — o investimento em metodologia transfere.',
      'Caso típico: pasta com 80 currículos → tabela comparativa com critérios; pasta de notas fiscais → planilha consolidada.',
      'A fronteira: automação sobre arquivos locais → Cowork; código e repositórios → Claude Code; os dois convivem no mesmo cliente.',
    ],
    pitfalls: [
      'Apresentar como "Claude Code simplificado" — é outro público e outro caso de uso.',
      'Soltar em dados sensíveis sem as mesmas conversas de governança do resto.',
    ],
    practiceSteps: [
      'Faça o curso introdutório de Cowork na Anthropic Academy.',
      'Automatize uma tarefa real de arquivos sua (organizar propostas, consolidar planilhas).',
    ],
    projectContext:
      'Cowork expande o contrato para as áreas de negócio — o mapeamento de processos administrativo vira implantação, não só relatório.',
    references: [
      { label: 'Introduction to Claude Cowork — Academy', url: ACAD + '/', kind: 'curso' },
      { label: 'Central de ajuda — Cowork', url: SUP, kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 25,
  },
  {
    id: 'ca-16',
    index: 16,
    title: 'Anthropic Academy: trilhas e certificações',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'O catálogo gratuito, a ordem recomendada e os certificados.',
    concept:
      'A Anthropic Academy (anthropic.skilljar.com) é o hub oficial de cursos — gratuitos, com certificado ao passar no quiz final, adicionáveis ao LinkedIn. O catálogo cobre de AI Fluency (fundamentos para qualquer perfil) a Claude Code 101/in Action, Cowork, Subagents, Skills, MCP (introdutório e avançado) e Building with the Claude API. Ordem que recomendamos para consultores: AI Fluency → Claude 101 → Claude Code 101 → Claude Code in Action → MCP → API. Certificados oficiais do fabricante valem sinalização real no mercado — e são a credencial que o cliente reconhece.',
    deepDive: [
      'Os cursos são a extensão natural desta trilha: cada tópico daqui tem um curso oficial para aprofundar — use os links das etapas.',
      'Para o time do cliente, montar a "trilha Academy" por perfil (dev, analista, gestor) é entregável de capacitação pronto.',
      'Conteúdo em inglês; o material é vídeo + quiz, autoguiado.',
    ],
    pitfalls: [
      'Colecionar certificados sem praticar — o quiz passa, o cliente percebe.',
      'Ignorar os cursos de MCP achando que são "só para devs" — consultor de integração precisa deles.',
    ],
    practiceSteps: [
      'Crie sua conta e complete o primeiro curso da ordem recomendada.',
      'Monte a matriz perfil × cursos para o próximo treinamento de cliente.',
    ],
    projectContext:
      'A Academy é o material didático oficial e gratuito que sustenta os treinamentos que a consultoria vende — curadoria é o seu valor agregado.',
    references: [
      { label: 'Anthropic Academy (catálogo)', url: ACAD + '/', kind: 'curso' },
      { label: 'Anthropic Learn', url: 'https://www.anthropic.com/learn', kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 20,
  },
  {
    id: 'ca-17',
    index: 17,
    title: 'Apps desktop e mobile',
    priority: 'media',
    type: 'pratica',
    shortDescription: 'Diferenças para o web, ditado, atalhos e o Claude no bolso.',
    concept:
      'Os apps nativos adicionam o que o navegador não dá: no desktop, atalho global para invocar o Claude de qualquer lugar, captura de tela/janela direto para o chat e integração com o sistema; no mobile, ditado por voz (transformando deslocamentos em sessões de trabalho), câmera para analisar documentos físicos e — o recurso subestimado — acompanhar e dirigir sessões do Claude Code remotamente. Para o consultor em campo, o mobile é ferramenta de trabalho: fotografar o quadro branco da reunião de mapeamento e sair com o processo digitalizado.',
    deepDive: [
      'O atalho global do desktop muda o padrão de uso: o Claude vira reflexo, não destino.',
      'Voz no mobile: reuniões debriefadas por áudio no caminho viram notas estruturadas ao chegar.',
      'Claude Code remoto pelo app: dispare/acompanhe tarefas longas fora da mesa — o recurso favorito de quem opera múltiplos projetos.',
    ],
    pitfalls: [
      'Nunca configurar o atalho global e continuar alt-tabando para o navegador.',
      'Fotografar documentos confidenciais do cliente sem pensar na política de dados combinada.',
    ],
    practiceSteps: [
      'Instale desktop + mobile; configure o atalho global e use por uma semana.',
      'Fotografe um diagrama de quadro branco e transforme em documento estruturado.',
    ],
    projectContext:
      'No rollout, apps nativos aumentam frequência de uso — e frequência é a métrica que sustenta a renovação do contrato.',
    references: [
      { label: 'Downloads — Claude apps', url: 'https://claude.ai/download', kind: 'tool' },
      { label: 'Central de ajuda — apps', url: SUP, kind: 'doc' },
    ],
    xp: 45,
    estMinutes: 15,
  },
  {
    id: 'ca-18',
    index: 18,
    title: 'Prompt caching e Batch API',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'As duas alavancas que derrubam o custo de produção do cliente.',
    concept:
      'Duas otimizações que todo produto sério usa: prompt caching guarda prefixos estáveis do prompt (system prompt gigante, documentos fixos, definições de ferramentas) e cobra uma fração pela releitura — em assistentes com contexto grande e repetido, corta a fatura dramaticamente; a Batch API processa lotes assíncronos (até 24h de prazo) com 50% de desconto — perfeita para o que não precisa de resposta imediata: classificação noturna, relatórios agendados, backfill de análises. Saber que existem e quando aplicar é diferença de milhares de reais/mês na operação do cliente.',
    deepDive: [
      'Caching exige ordenar o prompt: estável primeiro (cacheável), variável no fim — decisão de arquitetura, não flag mágica.',
      'A conta do batch: 100k classificações que podiam esperar até amanhã custando metade — pergunte sempre "isso precisa ser síncrono?".',
      'Os dois combinam: batch com prompts cacheados é o piso de custo por tarefa.',
    ],
    pitfalls: [
      'Prompt com conteúdo variável no início invalidando o cache silenciosamente.',
      'Rodar cargas noturnas na API síncrona por desconhecimento do batch.',
    ],
    practiceSteps: [
      'Leia as docs de caching e batch; identifique no produto de um cliente onde cada um se aplica.',
      'Estime a economia mensal — e leve o número para a reunião.',
    ],
    projectContext:
      '"Reduzi sua fatura de IA em 60% com duas mudanças de arquitetura" é o e-mail de renovação de contrato perfeito.',
    references: [
      {
        label: 'Docs — prompt caching',
        url: DOCS + '/en/build-with-claude/prompt-caching',
        kind: 'doc',
      },
      {
        label: 'Docs — Batch API',
        url: DOCS + '/en/build-with-claude/batch-processing',
        kind: 'doc',
      },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'ca-19',
    index: 19,
    title: 'Rate limits da API',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'Tiers, como escalam e o que fazer com o erro 429.',
    concept:
      'A API limita por requisições/minuto e tokens/minuto, organizados em tiers que sobem automaticamente com o histórico de gasto (depósitos/uso desbloqueiam tiers maiores). O erro 429 é o sintoma: too many requests — e a resposta correta do lado do cliente é retry com backoff exponencial (as SDKs oficiais já fazem), não martelar. Para produção com volume, o planejamento de capacidade entra no desenho: qual tier o lançamento exige, quanto tempo até alcançá-lo, e se picos justificam conversar com a Anthropic sobre limites maiores.',
    deepDive: [
      'Limites são por workspace/organização — mais um motivo para separar clientes em workspaces.',
      'O header da resposta informa o estado dos limites — monitoramento básico de produção.',
      '429 recorrente em produto novo geralmente é falta de fila/batch no design, não limite baixo demais.',
    ],
    pitfalls: [
      'Lançar campanha de marketing que 10x o tráfego sem checar o tier atual.',
      'Tratar 429 como erro fatal para o usuário final em vez de enfileirar e tentar de novo.',
    ],
    practiceSteps: [
      'Localize no Console o tier e os limites atuais do seu workspace.',
      'Escreva o checklist de capacidade pré-lançamento para produtos de cliente.',
    ],
    projectContext:
      'Planejamento de capacidade é parte do go-live de qualquer produto com IA que a consultoria entrega — o 429 no dia do lançamento é evitável.',
    references: [{ label: 'Docs — rate limits', url: DOCS + '/en/api/rate-limits', kind: 'doc' }],
    xp: 30,
    estMinutes: 20,
  },
  {
    id: 'ca-20',
    index: 20,
    title: 'Privacidade e retenção de dados',
    priority: 'baixa',
    type: 'conceito',
    shortDescription:
      'O que a Anthropic guarda, treinamento com dados e as configs de Team/Enterprise.',
    concept:
      'A pergunta que decide contratos corporativos: "o que acontece com os nossos dados?". O mapa de resposta: consumidor (Free/Pro/Max) tem configurações de uso de dados que o usuário controla; comercial (Team/Enterprise/API) segue termos comerciais — por padrão, dados de clientes comerciais não treinam modelos; Enterprise adiciona retenção configurável, SSO, auditoria e o aparato de compliance (SOC 2, certificações no Trust Center). A regra de ouro do consultor: NUNCA responda de memória — políticas evoluem; abra trust.anthropic.com e a política vigente na frente do cliente e responda com a fonte.',
    deepDive: [
      'Distinga os planos na resposta: a política de consumidor ≠ comercial — misturar os dois é o erro que o jurídico do cliente pega.',
      'Trust Center: certificações, subprocessadores, DPA — os documentos que o compliance vai pedir; saiba onde estão.',
      'Zero data retention e residência de dados são conversas de Enterprise/vendas — saiba que existem para encaminhar.',
    ],
    pitfalls: [
      'Afirmar política de dados de memória em proposta escrita.',
      'Não distinguir claude.ai consumidor de API comercial na resposta.',
    ],
    practiceSteps: [
      'Navegue o Trust Center e a política de privacidade; monte seu doc de respostas com links e data.',
      'Simule a reunião: responda as 5 perguntas clássicas de compliance com fontes.',
    ],
    projectContext:
      'A reunião com jurídico/segurança é gate de todo projeto corporativo — quem chega com fontes oficiais passa; quem improvisa espera 3 meses.',
    references: [
      { label: 'Trust Center da Anthropic', url: 'https://trust.anthropic.com/', kind: 'doc' },
      {
        label: 'Política de privacidade',
        url: 'https://www.anthropic.com/legal/privacy',
        kind: 'doc',
      },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'ca-21',
    index: 21,
    title: 'Agent SDK',
    priority: 'baixa',
    type: 'conceito',
    shortDescription: 'O que é, o que resolve e quando um cliente precisaria.',
    concept:
      'O Claude Agent SDK expõe o motor do Claude Code como biblioteca (Python/TypeScript): o loop agêntico completo — ferramentas de arquivo e bash, permissões, MCP, subagentes, gestão de contexto — para construir agentes PRÓPRIOS em produção. A distinção de escopo: a Messages API dá o modelo cru (você constrói o loop); o Agent SDK dá o agente pronto (você customiza ferramentas e políticas). Um cliente precisa dele quando quer um agente de produção com as capacidades do Claude Code dentro do produto/infra dele — não para chatbots simples, onde a API basta.',
    deepDive: [
      'Herda o que este programa ensinou: CLAUDE.md, permissões, hooks e MCP funcionam no SDK — o conhecimento transfere direto.',
      'Casos: agente de suporte que abre PRs de correção, agente de onboarding que configura ambientes, automações internas profundas.',
      'Decisão de arquitetura: API (controle total, mais trabalho) vs Agent SDK (loop pronto, opinião embutida) vs headless CLI (mais simples ainda) — escadinha de complexidade.',
    ],
    pitfalls: [
      'Recomendar SDK para um FAQ bot — bazuca em mosquito.',
      'Esquecer que agente em produção herda TODAS as conversas de permissão e sandbox deste programa.',
    ],
    practiceSteps: [
      'Leia a visão geral do Agent SDK e desenhe um caso de uso real de um cliente seu.',
      'Escreva o critério de 5 linhas: quando API, quando SDK, quando headless.',
    ],
    projectContext:
      'É a fase 3 da maturidade do cliente: depois de usar agentes, ele quer TER agentes — e a consultoria escopa esse projeto.',
    references: [
      { label: 'Docs — Agent SDK', url: DOCS + '/en/api/agent-sdk/overview', kind: 'doc' },
      {
        label: 'Anthropic Engineering — building agents',
        url: 'https://www.anthropic.com/engineering',
        kind: 'artigo',
      },
    ],
    xp: 30,
    estMinutes: 25,
  },
  {
    id: 'ca-22',
    index: 22,
    title: 'Status e incidentes: "é o Claude ou sou eu?"',
    priority: 'baixa',
    type: 'pratica',
    shortDescription: 'status.anthropic.com e o fluxo de diagnóstico em 2 minutos.',
    concept:
      'Quando "o Claude parou", o diagnóstico profissional leva 2 minutos e segue ordem fixa: (1) status.claude.com / status.anthropic.com — incidente ativo? Qual serviço (claude.ai, API, Claude Code)?; (2) é geral ou só um usuário? (outro colega reproduz?); (3) é a conta? (limite atingido — checar /usage ou o indicador do plano); (4) é a rede/ambiente? (proxy corporativo, VPN, extensões). Com incidente confirmado: informar o cliente com o link do status, ETA se houver, e plano B (outro modelo, outra superfície, API). Assine os updates do status por e-mail/RSS e saiba de incidentes antes do cliente.',
    deepDive: [
      'O histórico de incidentes da página dá contexto para conversas de SLA e expectativa em contratos.',
      'Plano B preparado (fallback de modelo/provedor para fluxos críticos) é desenho de arquitetura, não improviso do dia do incidente.',
      'Erros de API têm códigos: 429 é limite, 529 é sobrecarga, 500 é servidor — cada um com resposta própria; a doc de erros é o mapa.',
    ],
    pitfalls: [
      'Debugar 2 horas de "bug" que a página de status explicava.',
      'Comunicar "caiu tudo" ao cliente sem verificar se era só o seu proxy.',
    ],
    practiceSteps: [
      'Assine os updates da página de status agora.',
      'Documente o fluxo de diagnóstico em 4 passos e cole no canal do time.',
    ],
    projectContext:
      'Suporte de implantação com diagnóstico rápido e comunicação transparente é o que constrói a reputação da consultoria em crise.',
    references: [
      { label: 'Status — Anthropic', url: 'https://status.anthropic.com/', kind: 'tool' },
      { label: 'Docs — erros da API', url: DOCS + '/en/api/errors', kind: 'doc' },
    ],
    xp: 30,
    estMinutes: 15,
  },
  {
    id: 'ca-boss',
    index: 23,
    title: 'BOSS: Mestre do Ecossistema Claude',
    priority: 'alta',
    type: 'boss',
    shortDescription:
      'Desafio final — planos, Projects, conectores, API e as respostas corporativas.',
    concept:
      'O boss do ecossistema Claude testa a visão completa: dimensionar planos, montar Projects que funcionam, conectores com governança, o essencial da API e as respostas de privacidade que destravam contratos. Acerte 4 de 5 para vencer.',
    deepDive: [],
    pitfalls: [],
    practiceSteps: [],
    projectContext:
      'Aprovação indica prontidão para desenhar e vender implantações completas do ecossistema Claude.',
    references: [],
    xp: 120,
    estMinutes: 15,
  },
]
