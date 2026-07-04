import { Sparkles } from 'lucide-react'
import type { Trail } from './types'

export const trilhaAnthropic: Trail = {
  id: 'anthropic',
  order: 3,
  title: 'Plataforma Anthropic',
  tagline: 'Claude.ai, Projects, conectores e Console — o habitat do cliente não-técnico.',
  color: '#FF9D5C',
  icon: Sparkles,
  nodes: [
    {
      id: 'an-1',
      title: 'Planos, modelos e a pergunta "qual contratar?"',
      kind: 'lesson',
      xp: 60,
      minutes: 30,
      why: 'Toda proposta comercial passa por "qual plano Claude o cliente contrata?" — errar o dimensionamento mina a confiança logo no início.',
      content: [
        'A escada de planos: Free → Pro → Max 5x → Max 20x → Team → Enterprise. O que muda: volume de uso, acesso a recursos e ferramentas de administração/colaboração.',
        'Critérios de decisão: quantas pessoas, intensidade de uso do Claude Code, necessidade de administração central (Team/Enterprise) e sensibilidade a limites.',
        'Modelos: a família Claude tem tiers de capacidade/custo — o topo pra raciocínio pesado, o meio-campo pra rotina, o leve pra volume. Indique por caso de uso, não por hype.',
        'Limites funcionam com resets periódicos; uso intenso de modelos maiores consome mais rápido.',
        'Regra profissional: os detalhes de preço/limite mudam — decore os CONCEITOS e verifique os números em support.claude.com antes de colocar em proposta.',
      ],
      practice: [
        'Monte uma árvore de decisão de 1 página: "qual plano Claude contratar" com 4 perguntas.',
        'Liste os modelos atuais da família Claude e o caso de uso ideal de cada um.',
        'Confira em support.claude.com o que mudou desde a última vez que você olhou.',
      ],
      scope:
        'O dimensionamento de licenças entra em toda proposta. É também a porta de entrada: cliente que confia no seu dimensionamento contrata o projeto.',
      links: [
        { label: 'Central de ajuda — planos', url: 'https://support.claude.com' },
        { label: 'Anthropic Academy', url: 'https://www.anthropic.com/learn' },
      ],
      quiz: [
        {
          q: 'Empresa com 15 pessoas quer gestão central de contas e billing unificado. Qual direção de plano?',
          options: [
            '15 contas Pro individuais',
            'Team/Enterprise, que existem exatamente pra administração centralizada',
            'Free pra todos',
            'Uma conta Max compartilhada',
          ],
          correct: 1,
          explain:
            'Administração central, colaboração e billing unificado são o propósito dos planos organizacionais. Conta compartilhada viola termos e trava limites.',
        },
        {
          q: 'Por que NÃO decorar números de preço/limite pra responder cliente?',
          options: [
            'Porque são segredo',
            'Porque mudam com frequência — o profissional confirma na fonte oficial antes de afirmar',
            'Porque não importam',
            'Porque variam por país apenas',
          ],
          correct: 1,
          explain:
            'Responder com número velho é pior que dizer "deixa eu confirmar na doc" — em 10 segundos você responde com a fonte aberta.',
        },
      ],
    },
    {
      id: 'an-2',
      title: 'Projects e Artifacts a fundo',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'É onde o cliente não-técnico vive. Um Project bem montado muda a percepção de valor do Claude da noite pro dia.',
      content: [
        'Project = espaço de trabalho com memória própria: project knowledge (documentos de referência) + instruções do projeto (como o Claude deve se comportar ali).',
        'Project knowledge tem capacidade limitada: entra o que é referência constante (guia de marca, glossário, processos). Documento pontual vai no chat, não no knowledge.',
        'Instruções do projeto vs preferences: preferences são globais da conta; instruções valem só dentro daquele Project. Regra de negócio específica → instrução de projeto.',
        'Artifacts: conteúdo estruturado que o Claude cria numa janela própria — documentos, código, páginas interativas. Dá pra iterar, versionar e publicar/compartilhar.',
        'Artifacts com IA embutida permitem criar mini-apps que os próprios usuários do cliente usam — demonstração poderosa em reunião.',
        'Sintoma clássico pra diagnosticar: "o Claude ficou lento e burro nesse chat" = conversa longa demais; a solução é chat novo (o Project mantém o conhecimento).',
      ],
      practice: [
        'Monte um Project de cliente fictício: 3 documentos no knowledge + instruções afiadas.',
        'Crie um artifact interativo simples e publique.',
        'Provoque o problema do chat longo e valide o diagnóstico + solução.',
      ],
      scope:
        'Estruturar os Projects do cliente (um por área/processo, com knowledge e instruções corretos) é entregável recorrente dos nossos projetos de adoção.',
      links: [
        { label: 'Central de ajuda — Projects e Artifacts', url: 'https://support.claude.com' },
      ],
      quiz: [
        {
          q: 'Onde deve morar o guia de tom de voz que o cliente usa em TODAS as conversas daquele contexto de trabalho?',
          options: [
            'Colado em cada chat',
            'No project knowledge / instruções do Project',
            'Num e-mail',
            'No CLAUDE.md',
          ],
          correct: 1,
          explain:
            'Referência constante pertence ao Project: entra uma vez, vale pra todos os chats dali.',
        },
        {
          q: '"O chat ficou lento e as respostas pioraram" — diagnóstico mais provável?',
          options: [
            'Servidor caiu',
            'Conversa longa demais: abrir um chat novo no mesmo Project',
            'Plano expirou',
            'Bug do navegador',
          ],
          correct: 1,
          explain:
            'Conversa quilométrica degrada qualidade e velocidade. Chat novo preserva o knowledge do Project e zera o peso.',
        },
      ],
    },
    {
      id: 'an-3',
      title: 'Conectores, memória e recursos do app',
      kind: 'lesson',
      xp: 60,
      minutes: 30,
      why: 'O cliente pergunta "o Claude acessa meu Drive? Lembra do que falamos? Busca na web?" — e você responde mostrando, não achando.',
      content: [
        'Conectores: a interface do Claude.ai permite adicionar integrações (MCP remoto) como Google Drive e outros — o Claude passa a buscar e agir nessas ferramentas.',
        'Cada conector pede autorização OAuth e tem escopo de permissões — mostre ao cliente ONDE revisar e revogar acessos.',
        'Memória: o Claude pode buscar em conversas passadas e manter memória entre chats; é configurável — cliente sensível a privacidade precisa saber ligar/desligar.',
        'Web search e Research: buscas automáticas quando o tema pede, e modo de pesquisa profunda pra investigações longas com fontes.',
        'Upload de arquivos: PDF, imagens, planilhas e docs — cada formato tem o que o Claude enxerga e limites de tamanho; screenshot muitas vezes resolve o que o formato exótico complica.',
        'Recursos que valem demo: ditado no mobile, análise de dados com gráficos, e o Claude in Chrome/Excel/PowerPoint para fluxos específicos.',
      ],
      practice: [
        'Conecte um conector (ex: Google Drive) e faça uma busca real por ele.',
        'Ative e desative a memória; documente o caminho nas configurações.',
        'Rode uma Research profunda num tema do seu nicho e avalie as fontes.',
      ],
      scope:
        'Configurar conectores e política de memória/privacidade faz parte do onboarding corporativo que vendemos — especialmente em clientes com dados sensíveis.',
      links: [
        { label: 'Central de ajuda — conectores e memória', url: 'https://support.claude.com' },
      ],
      quiz: [
        {
          q: 'Cliente jurídico pergunta sobre a memória entre conversas por questão de confidencialidade. Postura correta?',
          options: [
            'Dizer que não existe',
            'Mostrar que é configurável e onde ligar/desligar, deixando a decisão documentada com o cliente',
            'Ignorar',
            'Desinstalar o Claude',
          ],
          correct: 1,
          explain:
            'Transparência + controle: o recurso existe, é configurável, e cliente sensível decide com você documentando.',
        },
        {
          q: 'O que um conector adiciona ao Claude.ai?',
          options: [
            'Mais limite de uso',
            'Acesso a uma ferramenta externa (buscar, ler e agir nela) via integração autorizada',
            'Novos modelos',
            'Tema escuro',
          ],
          correct: 1,
          explain:
            'Conector = ponte autorizada entre o Claude e uma ferramenta externa, com escopo de permissões revisável.',
        },
      ],
    },
    {
      id: 'an-4',
      title: 'Console, API e o vocabulário técnico',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'Quando o cliente constrói produto em cima do Claude, você precisa acompanhar a conversa técnica sem gaguejar.',
      content: [
        'Console (platform.claude.com): onde se criam API keys, acompanha-se consumo/billing e testa-se prompts no Workbench antes de ir pro código.',
        'API Messages: a estrutura básica é uma lista de mensagens (user/assistant) + system prompt + escolha de modelo e max_tokens. Entender isso destrava qualquer conversa com o dev do cliente.',
        'Tool use (function calling): o modelo pode chamar ferramentas definidas pelo dev — é a base de qualquer agente customizado que o cliente queira construir.',
        'Conceitos de custo que o cliente vai ouvir: tokens de entrada/saída, prompt caching (reusar contexto repetido mais barato) e batch (processamento assíncrono com desconto).',
        'API keys são segredo: nunca no frontend, nunca commitadas — se vazou, revoga no Console e gira a chave.',
        'Status e incidentes: antes de debugar "o Claude caiu", cheque a página de status oficial — diagnóstico em 10 segundos.',
      ],
      practice: [
        'Crie uma API key de teste no Console e rode um prompt no Workbench.',
        'Localize onde se acompanha o consumo e o billing.',
        'Explique tool use em 3 frases como se fosse pro gestor do cliente.',
      ],
      scope:
        'Em projetos onde o cliente constrói produto com IA, nosso papel consultivo exige fluência no vocabulário da API — mesmo sem escrever o código final.',
      links: [
        { label: 'Docs da plataforma Anthropic', url: 'https://docs.claude.com' },
        { label: 'Central de ajuda', url: 'https://support.claude.com' },
      ],
      quiz: [
        {
          q: 'A API key do cliente vazou num commit público. Primeira ação?',
          options: [
            'Apagar o commit e pronto',
            'Revogar a chave no Console imediatamente e gerar outra',
            'Trocar de repo',
            'Avisar a Anthropic e aguardar',
          ],
          correct: 1,
          explain:
            'Chave exposta = comprometida. Apagar do código não remove do histórico nem de quem já copiou. Revogar primeiro.',
        },
        {
          q: 'O que é tool use na API?',
          options: [
            'Um plugin do VS Code',
            'O modelo chamando ferramentas definidas pelo desenvolvedor — a base de agentes customizados',
            'Um modo do Claude.ai',
            'Uso de MCP no chat',
          ],
          correct: 1,
          explain:
            'Tool use permite que o modelo acione funções externas definidas pelo dev — é assim que se constrói agente em cima da API.',
        },
      ],
    },
    {
      id: 'an-5',
      title: 'BOSS: Kit de adoção Claude',
      kind: 'boss',
      xp: 150,
      minutes: 75,
      why: 'Consolidar a trilha produzindo o material que usamos em toda implantação de Claude em cliente.',
      content: [
        'Você vai montar o kit de adoção: Project-modelo + árvore de decisão de planos + roteiro de configuração de privacidade.',
        'Esse kit encurta em dias o onboarding de qualquer cliente novo.',
      ],
      practice: [],
      scope: 'Entregável real: o kit oficial de implantação Claude da consultoria.',
      links: [{ label: 'Anthropic Academy', url: 'https://www.anthropic.com/learn' }],
      quiz: [],
      checklist: [
        'Project-modelo montado com knowledge e instruções exemplares',
        'Árvore de decisão "qual plano contratar" em 1 página',
        'Roteiro de configuração de privacidade/memória/conectores para cliente corporativo',
        'Um artifact interativo de demonstração publicado',
        'Checklist de troubleshooting: os 5 sintomas mais comuns e diagnósticos',
        'Inscrição feita em pelo menos 1 trilha da Anthropic Academy (rumo à certificação)',
      ],
    },
  ],
}
