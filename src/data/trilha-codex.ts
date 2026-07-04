import { Bot } from 'lucide-react'
import type { Trail } from './types'

export const trilhaCodex: Trail = {
  id: 'codex',
  order: 2,
  title: 'Codex',
  tagline:
    'O agente da OpenAI nas 4 superfícies — e a resposta honesta pra "qual dos dois eu uso?".',
  color: '#5EA0FF',
  icon: Bot,
  nodes: [
    {
      id: 'cx-1',
      title: 'As 4 superfícies do Codex',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'Primeira pergunta de todo cliente: "por onde eu começo com o Codex?" — app, CLI, extensão ou nuvem mudam completamente a experiência.',
      content: [
        'Codex existe em 4 formas: app desktop (macOS/Windows), CLI no terminal, extensão de IDE (VS Code, Cursor, Windsurf) e Codex Cloud (roda na infraestrutura da OpenAI).',
        'O app desktop é um ambiente visual: sidebar de projetos, threads, terminal embutido, diff visual com staging seletivo e worktrees nativos — forte pra quem quer interface.',
        'Conceitos do app: projeto = uma pasta do computador; thread = uma sessão de agente dentro do projeto. Histórico fica na sidebar.',
        'A CLI é uma TUI open source em Rust: leve, roda em servidor, ideal pra dev de terminal.',
        'A extensão coloca o painel do Codex dentro do editor — começa em Agent mode, com permissão pra ler, rodar e editar no diretório do projeto.',
        'Codex Cloud: você delega a tarefa, fecha o laptop e ela roda no servidor da OpenAI. Exige GitHub conectado e um environment configurado.',
        'Indicação por perfil: visual e paralelismo → app; terminal e servidores → CLI; vive no editor → extensão; tarefas longas e delegáveis → Cloud.',
      ],
      practice: [
        'Instale a CLI e o app desktop.',
        'Crie um projeto no app, abra uma thread e rode uma tarefa pequena.',
        'Compare o painel de diff do app com o fluxo da CLI na mesma tarefa.',
      ],
      scope:
        'Definir a superfície certa para cada perfil do time do cliente faz parte do desenho de adoção que entregamos no início do projeto.',
      links: [
        {
          label: 'Quickstart oficial do Codex',
          url: 'https://developers.openai.com/codex/quickstart',
        },
        {
          label: 'Guia de primeiros passos (OpenAI Academy)',
          url: 'https://openai.com/academy/codex-how-to-start/',
        },
      ],
      quiz: [
        {
          q: 'No app desktop do Codex, o que é uma "thread"?',
          options: [
            'Um branch do git',
            'Uma sessão de agente dentro de um projeto',
            'Um processo do sistema',
            'Um arquivo de configuração',
          ],
          correct: 1,
          explain: 'Projeto = pasta; thread = sessão de agente. É o modelo mental básico do app.',
        },
        {
          q: 'Cliente quer disparar uma tarefa longa e fechar o laptop. Qual superfície?',
          options: ['CLI', 'Extensão VS Code', 'Codex Cloud', 'App desktop offline'],
          correct: 2,
          explain:
            'O Cloud executa na infraestrutura da OpenAI — a tarefa continua rodando com a máquina desligada.',
        },
      ],
    },
    {
      id: 'cx-2',
      title: 'Login, planos e créditos',
      kind: 'lesson',
      xp: 60,
      minutes: 25,
      why: 'A segunda pergunta de todo cliente: "isso já vem no meu ChatGPT ou pago à parte?"',
      content: [
        'Dois caminhos de autenticação: conta ChatGPT (Plus, Pro, Business, Edu, Enterprise incluem Codex) ou API key da OpenAI (cobrança por uso).',
        'Logando com ChatGPT, o consumo debita dos créditos do plano; com API key, é billing medido — e algumas funcionalidades podem não estar disponíveis.',
        'Planos maiores = mais créditos de Codex. O consumo varia com o modelo e o nível de reasoning escolhidos.',
        'Diagnóstico de "acabou o Codex": checar o plano, o consumo do período e considerar reduzir modelo/reasoning nas tarefas de rotina.',
        'Preços e cotas mudam com frequência — a resposta profissional aponta pra página oficial de pricing, nunca pra número decorado.',
      ],
      practice: [
        'Autentique a CLI com sua conta ChatGPT e verifique o que seu plano inclui.',
        'Descubra onde ver o consumo de créditos do período.',
        'Escreva a resposta-padrão para: "preciso pagar Codex à parte do meu ChatGPT?"',
      ],
      scope:
        'Dimensionamento de plano OpenAI entra na mesma proposta comercial que o plano Claude: o cliente espera que a consultoria desenhe o custo total da stack.',
      links: [
        {
          label: 'Quickstart — autenticação',
          url: 'https://developers.openai.com/codex/quickstart',
        },
      ],
      quiz: [
        {
          q: 'Qual a diferença central entre logar com conta ChatGPT e com API key?',
          options: [
            'Nenhuma',
            'ChatGPT debita dos créditos do plano; API key é cobrança medida por uso',
            'API key é grátis',
            'ChatGPT só funciona no app',
          ],
          correct: 1,
          explain:
            'São dois modelos de cobrança distintos — e com API key algumas funcionalidades podem ficar de fora.',
        },
        {
          q: 'Cliente com ChatGPT Plus pergunta se tem acesso ao Codex. Resposta correta?',
          options: [
            'Não, só Enterprise',
            'Sim — planos ChatGPT incluem Codex, com créditos conforme o plano',
            'Só com API key',
            'Só no navegador',
          ],
          correct: 1,
          explain:
            'Os planos do ChatGPT incluem Codex; o que varia entre planos é a quantidade de créditos.',
        },
      ],
    },
    {
      id: 'cx-3',
      title: 'AGENTS.md e a hierarquia de instruções',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'É o CLAUDE.md do mundo Codex — e nossos projetos precisam funcionar bem nos DOIS agentes.',
      content: [
        'AGENTS.md carrega as instruções permanentes do projeto para o Codex: estrutura, convenções, comandos, restrições de segurança.',
        'Hierarquia: um AGENTS.md global no CODEX_HOME → um na raiz do projeto → outros em subpastas. O mais PRÓXIMO do arquivo em edição vence.',
        'AGENTS.override.md no CODEX_HOME, quando existe, substitui o global — útil pra alternar perfis de trabalho.',
        'O formato AGENTS.md virou padrão aberto adotado por várias ferramentas de agente — escrever um bom AGENTS.md beneficia mais que só o Codex.',
        'Estratégia agnóstica da consultoria: manter CLAUDE.md e AGENTS.md alinhados em conteúdo (ou um apontando para o outro) para o projeto ser portável entre agentes.',
        'Assim como no CLAUDE.md: curto e denso. Instrução que não muda comportamento é ruído pago em contexto.',
      ],
      practice: [
        'Escreva o AGENTS.md do seu repo-modelo (do boss da trilha Claude Code).',
        'Crie um AGENTS.md numa subpasta com uma regra local e confirme que ela vence a da raiz.',
        'Defina sua estratégia para manter CLAUDE.md e AGENTS.md sincronizados.',
      ],
      scope:
        'Projetos que entregamos precisam ser agnósticos: o cliente pode trocar de agente amanhã. AGENTS.md + CLAUDE.md alinhados é requisito de entrega.',
      links: [
        {
          label: 'Docs do Codex — AGENTS.md e guias',
          url: 'https://developers.openai.com/codex/quickstart',
        },
      ],
      quiz: [
        {
          q: 'Há um AGENTS.md na raiz e outro na subpasta onde o agente está editando. Qual vale em caso de conflito?',
          options: [
            'O da raiz',
            'O da subpasta (mais próximo vence)',
            'Nenhum',
            'O global do CODEX_HOME',
          ],
          correct: 1,
          explain:
            'A regra da hierarquia: o arquivo mais próximo do código em edição tem precedência.',
        },
        {
          q: 'Por que mantemos AGENTS.md E CLAUDE.md nos projetos de cliente?',
          options: [
            'Redundância inútil',
            'Portabilidade: o projeto funciona bem em Codex e Claude Code, honrando nossa posição agnóstica',
            'Exigência do GitHub',
            'Um é backup do outro',
          ],
          correct: 1,
          explain:
            'Somos agnósticos de ferramenta: o setup do cliente não pode prender ele a um único agente.',
        },
      ],
    },
    {
      id: 'cx-4',
      title: 'Sandbox, permissões e segurança',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: '"Dá full access pra ir mais rápido?" — a pergunta que separa o consultor responsável do estagiário do caos.',
      content: [
        'Por padrão o Codex trabalha em sandbox: opera apenas na pasta do projeto ("work locally"), com aprovações para ações sensíveis.',
        'Full access dá mais autonomia ao agente — só se justifica quando o operador entende exatamente o que está rodando e o ambiente tolera erro.',
        'Permissões finas: pré-aprovar comandos obviamente seguros (gh, testes, lint) para o agente rodar mais tempo sem parar pra pedir — autonomia com guarda-corpo.',
        'Fluxo seguro de tarefa: prompt claro → plano → execução → revisar diff → aceitar/rejeitar. Checkpoint de git ANTES e DEPOIS de cada tarefa.',
        'Resposta padrão pro cliente: "default permissions até você conseguir explicar o que o agente está fazendo; full access só em ambiente que pode quebrar".',
      ],
      practice: [
        'Rode uma tarefa em modo default e observe o que pede aprovação.',
        'Configure pré-aprovação para os comandos de teste do projeto.',
        'Simule o desastre: crie um checkpoint de git, deixe o agente errar e reverta.',
      ],
      scope:
        'A política de segurança de agentes (Claude Code + Codex) é um capítulo do documento de governança que entregamos em projetos corporativos.',
      links: [
        { label: 'Docs — CLI e boas práticas', url: 'https://developers.openai.com/codex/cli' },
      ],
      quiz: [
        {
          q: 'Cliente iniciante pede full access "pra agilizar". Recomendação profissional?',
          options: [
            'Liberar, velocidade importa',
            'Manter default, pré-aprovar comandos seguros e criar checkpoints de git',
            'Proibir o Codex',
            'Rodar tudo como root',
          ],
          correct: 1,
          explain:
            'Autonomia com guarda-corpo: permissões finas dão velocidade sem abrir mão do controle.',
        },
        {
          q: 'Qual hábito torna qualquer erro do agente reversível em segundos?',
          options: [
            'Backup semanal',
            'Checkpoint de git antes e depois de cada tarefa',
            'Print da tela',
            'Rodar duas vezes',
          ],
          correct: 1,
          explain: 'Com checkpoints, desfazer vira git reset. Sem eles, vira arqueologia.',
        },
      ],
    },
    {
      id: 'cx-5',
      title: 'Modelos e níveis de reasoning',
      kind: 'lesson',
      xp: 60,
      minutes: 25,
      why: 'Escolher modelo e reasoning errado = ou queimar crédito à toa, ou resultado medíocre em problema difícil.',
      content: [
        '/model troca o modelo e ajusta o nível de reasoning no meio da sessão — também dá pra definir no lançamento da tarefa.',
        'Regra de bolso: modelo padrão + reasoning normal pra rotina; subir reasoning (ou de modelo) para arquitetura, bugs difíceis e revisões críticas.',
        'Reasoning mais alto = mais qualidade em problemas complexos, porém mais lento e mais caro. É um dial, não um "sempre no máximo".',
        'Modelos mini/menores servem bem para tarefas mecânicas em volume (renomear, formatar, migrações repetitivas).',
        'A lineup de modelos muda rápido: consulte a página oficial de modelos antes de recomendar configuração pra cliente.',
      ],
      practice: [
        'Rode a mesma tarefa média com reasoning baixo e alto; compare tempo e qualidade.',
        'Defina sua matriz pessoal: que tipo de tarefa merece cada nível.',
        'Localize a página oficial de modelos do Codex e salve nos favoritos.',
      ],
      scope:
        'Otimização de custo por tarefa é argumento de venda: mostrar ao cliente onde ele gasta reasoning à toa paga a consultoria sozinho.',
      links: [{ label: 'Docs do Codex — modelos', url: 'https://developers.openai.com/codex/cli' }],
      quiz: [
        {
          q: 'Tarefa: renomear uma função em 80 arquivos. Configuração sensata?',
          options: [
            'Modelo topo + reasoning máximo',
            'Modelo menor/padrão com reasoning baixo — tarefa mecânica',
            'Fazer na mão',
            'Codex Cloud obrigatório',
          ],
          correct: 1,
          explain:
            'Tarefa mecânica de volume não precisa de reasoning caro. Guarde o dial alto pro que é difícil.',
        },
        {
          q: 'O que aumentar o nível de reasoning custa, em troca de mais qualidade em problemas complexos?',
          options: ['Nada', 'Mais tempo e mais consumo', 'Menos segurança', 'Perda de contexto'],
          correct: 1,
          explain:
            'Reasoning é um trade-off explícito: qualidade × tempo × custo. Ajuste por tarefa.',
        },
      ],
    },
    {
      id: 'cx-6',
      title: 'Codex Cloud e @codex em PRs',
      kind: 'lesson',
      xp: 60,
      minutes: 35,
      why: 'Delegar pra nuvem é o fluxo que mais cresce — e o que mais impressiona em demonstração pra cliente.',
      content: [
        'Setup do Cloud: conectar o repositório do GitHub e configurar um environment (passos de setup, dependências) em chatgpt.com/codex.',
        'Com o environment pronto, você lança tarefas pela interface, acompanha logs em tempo real ou deixa rodando em background.',
        'O resultado volta como mudanças prontas pra virar PR — o fluxo inteiro é orientado a GitHub.',
        'Atalho matador: comentar @codex numa issue ou PR do GitHub delega a tarefa direto dali, sem abrir o app.',
        'Review integrado (app/Cloud): diff visual, staging seletivo, clicar numa linha e pedir correção, botão de revert — o agente itera sobre o seu feedback.',
        'Worktrees no app: o Codex clona o branch em worktrees paralelos — dois agentes no mesmo repo sem pisar um no arquivo do outro.',
      ],
      practice: [
        'Configure um environment do Codex Cloud para um repo de teste.',
        'Delegue uma tarefa, feche o laptop e volte pra revisar o resultado.',
        'Teste o @codex num comentário de PR.',
      ],
      scope:
        'Fluxos de delegação assíncrona (tarefa vai pra nuvem, PR volta pronto pra review) são exatamente o tipo de processo que desenhamos no mapeamento de processos do cliente.',
      links: [{ label: 'Docs — Codex Cloud', url: 'https://developers.openai.com/codex/cloud' }],
      quiz: [
        {
          q: 'O que precisa existir ANTES de delegar tarefas pro Codex Cloud?',
          options: [
            'Nada',
            'GitHub conectado e um environment configurado',
            'Uma API key da Anthropic',
            'Full access local',
          ],
          correct: 1,
          explain:
            'O Cloud roda no servidor da OpenAI: sem repo conectado e environment com as dependências, não há onde executar.',
        },
        {
          q: 'Como delegar uma correção direto de um Pull Request no GitHub?',
          options: [
            'Impossível',
            'Comentar @codex no PR',
            'Abrir chamado na OpenAI',
            'Dar merge primeiro',
          ],
          correct: 1,
          explain:
            'Mencionar @codex em comentário de PR/issue dispara a tarefa — fluxo nativo do GitHub.',
        },
      ],
    },
    {
      id: 'cx-7',
      title: 'BOSS: Duelo de agentes',
      kind: 'boss',
      xp: 150,
      minutes: 90,
      why: 'Todo cliente pergunta "Codex ou Claude Code?". Depois deste desafio, você responde com experiência própria, não com opinião de Twitter.',
      content: [
        'Você vai executar A MESMA feature no mesmo repositório duas vezes: uma com Claude Code, outra com Codex.',
        'Documente com honestidade: onde cada um brilhou, onde travou, como cada um lidou com o AGENTS.md/CLAUDE.md, diff, permissões e custo.',
        'O comparativo vira nossa resposta oficial e material de venda — consultoria agnóstica prova que conhece os dois lados.',
      ],
      practice: [],
      scope:
        'Entregável real: o comparativo oficial da consultoria para a pergunta mais frequente do mercado.',
      links: [
        { label: 'Quickstart do Codex', url: 'https://developers.openai.com/codex/quickstart' },
        { label: 'Docs do Claude Code', url: 'https://code.claude.com/docs' },
      ],
      quiz: [],
      checklist: [
        'Mesma feature especificada por escrito antes de começar (critério de pronto claro)',
        'Execução completa no Claude Code com checkpoint de git',
        'Execução completa no Codex (branch separado) com checkpoint de git',
        'Tabela comparativa: qualidade do resultado, nº de intervenções, tempo, consumo',
        'Análise de 10 linhas: forças de cada um e recomendação por cenário',
        'Compartilhado com o time no Slack',
      ],
    },
  ],
}
