// Chat tutor por trilha — responde dúvidas sobre o conteúdo da trilha via gateway $ai (streaming).
// O frontend envia o conhecimento serializado da trilha (trailKnowledge) + o histórico da conversa.
// Sem API key: usa o gateway nativo do Skip. Tudo inline (runtime goja).
routerAdd(
  'POST',
  '/backend/v1/tutor-chat',
  (e) => {
    const body = e.requestInfo().body || {}
    const trailName = typeof body.trailName === 'string' ? body.trailName : 'esta trilha'
    const knowledge = typeof body.trailKnowledge === 'string' ? body.trailKnowledge : ''
    const history = Array.isArray(body.messages) ? body.messages : []

    if (history.length === 0) {
      return e.json(400, { code: 'missing_messages', hint: 'messages é obrigatório' })
    }

    // Limita o histórico às últimas 12 mensagens para controlar o tamanho do contexto.
    const recent = history.slice(-12)
    const sanitized = []
    for (let i = 0; i < recent.length; i++) {
      const m = recent[i]
      if (!m || typeof m.content !== 'string') continue
      const role = m.role === 'assistant' ? 'assistant' : 'user'
      sanitized.push({ role: role, content: m.content.slice(0, 4000) })
    }

    const system =
      'Você é um tutor especialista da trilha "' +
      trailName +
      '" de uma formação de consultores de IA da Adapta Labs. ' +
      'Seu papel é tirar dúvidas, explicar conceitos, dar exemplos, debater e aprofundar o conteúdo da trilha. ' +
      'Responda SEMPRE em português do Brasil, de forma clara, didática e direta. ' +
      'Use o CONTEÚDO DA TRILHA abaixo como sua principal base de conhecimento — é o que o consultor está estudando. ' +
      'Você pode complementar com conhecimento geral quando ajudar, mas mantenha a coerência com o material da trilha. ' +
      'Quando fizer sentido, conecte os conceitos ao contexto de consultoria (entregar sistemas com agentes, o Adapta Native). ' +
      'Se perguntarem algo totalmente fora do escopo da trilha, responda brevemente e traga de volta ao tema. ' +
      'Incentive o raciocínio: quando o consultor estiver aprendendo, faça perguntas que o ajudem a pensar, não só entregue a resposta pronta. ' +
      'Seja conciso por padrão; aprofunde quando pedirem.\n\n' +
      '=== CONTEÚDO DA TRILHA ===\n' +
      (knowledge || '(conteúdo não fornecido)')

    const messages = [{ role: 'system', content: system }]
    for (let i = 0; i < sanitized.length; i++) messages.push(sanitized[i])

    try {
      const iter = $ai.chat({
        model: 'reasoning',
        messages: messages,
        temperature: 0.4,
        stream: true,
      })
      e.response.header().set('Content-Type', 'text/event-stream')
      e.response.header().set('Cache-Control', 'no-cache')
      $response.stream(e, iter)
    } catch (err) {
      const id = Math.random().toString(36).slice(2, 10)
      $app.logger().error('tutor-chat falhou', 'errorId', id, 'error', String(err))
      return e.json(200, {
        code: 'ai_unavailable',
        message: 'O tutor está indisponível no momento. Tente novamente em instantes.',
        errorId: id,
      })
    }
  },
  $apis.requireAuth(),
)
