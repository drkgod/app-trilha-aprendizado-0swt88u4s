// Correção de respostas discursivas por IA (via gateway $ai do Skip, sem API key).
// Recebe a pergunta, a resposta-modelo e a resposta do consultor; devolve nota,
// veredito e feedback personalizado. Tudo inline (runtime goja, sem helpers de topo).
routerAdd(
  'POST',
  '/backend/v1/grade-answer',
  (e) => {
    const body = e.requestInfo().body || {}
    const question = typeof body.question === 'string' ? body.question : ''
    const expected = typeof body.expected === 'string' ? body.expected : ''
    const answer = typeof body.answer === 'string' ? body.answer : ''

    if (!question || !answer) {
      return e.json(400, {
        code: 'missing_fields',
        hint: 'question e answer são obrigatórios',
      })
    }

    // Resposta vazia ou trivial: reprova sem gastar chamada de IA.
    if (answer.trim().length < 15) {
      return e.json(200, {
        score: 0,
        verdict: 'reprovado',
        feedback:
          'Resposta muito curta. Explique com suas próprias palavras, trazendo o raciocínio e um exemplo concreto do contexto de consultoria.',
      })
    }

    const system =
      'Você é um avaliador técnico rigoroso e justo de uma trilha de formação de consultores de IA da Adapta Labs. ' +
      'Avalie se a resposta do consultor demonstra compreensão real do conceito, com raciocínio próprio — não decoreba. ' +
      'Premie explicações com palavras próprias e exemplos aplicados; penalize respostas genéricas, vagas ou que parecem coladas de uma IA sem contexto. ' +
      'Considere correta uma resposta que capture a ESSÊNCIA do conceito, mesmo com palavras diferentes da referência. ' +
      'Responda SOMENTE com um objeto JSON válido, sem markdown, no formato exato: ' +
      '{"score": <inteiro 0-100>, "verdict": "aprovado" | "parcial" | "reprovado", "feedback": "<2-3 frases em português, diretas e construtivas>"}. ' +
      'Use "aprovado" para score >= 70, "parcial" para 40-69, "reprovado" para < 40.'

    const userMsg =
      'PERGUNTA:\n' +
      question +
      '\n\nRESPOSTA-MODELO (referência do que se espera):\n' +
      (expected || '(sem referência fornecida — avalie pelo mérito técnico)') +
      '\n\nRESPOSTA DO CONSULTOR:\n' +
      answer +
      '\n\nAvalie e retorne apenas o JSON.'

    try {
      const result = $ai.chat({
        model: 'fast',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userMsg },
        ],
        temperature: 0.2,
      })

      const raw =
        result && result.choices && result.choices[0] && result.choices[0].message
          ? result.choices[0].message.content || ''
          : ''

      // O modelo pode devolver cercas de código ou texto ao redor; extrai o objeto JSON.
      let parsed = null
      const start = raw.indexOf('{')
      const end = raw.lastIndexOf('}')
      if (start !== -1 && end !== -1 && end > start) {
        try {
          parsed = JSON.parse(raw.slice(start, end + 1))
        } catch (_) {
          parsed = null
        }
      }

      if (!parsed || typeof parsed.score !== 'number') {
        $app.logger().warn('grade-answer: resposta da IA sem JSON válido', 'raw', raw.slice(0, 300))
        return e.json(200, {
          score: 50,
          verdict: 'parcial',
          feedback:
            'Não foi possível avaliar automaticamente desta vez. Sua resposta foi registrada para revisão.',
        })
      }

      let score = Math.max(0, Math.min(100, Math.round(parsed.score)))
      let verdict =
        parsed.verdict === 'aprovado' ||
        parsed.verdict === 'parcial' ||
        parsed.verdict === 'reprovado'
          ? parsed.verdict
          : score >= 70
            ? 'aprovado'
            : score >= 40
              ? 'parcial'
              : 'reprovado'
      const feedback =
        typeof parsed.feedback === 'string' && parsed.feedback.trim()
          ? parsed.feedback.trim()
          : 'Resposta avaliada.'

      return e.json(200, { score: score, verdict: verdict, feedback: feedback })
    } catch (err) {
      const id = Math.random().toString(36).slice(2, 10)
      $app.logger().error('grade-answer falhou', 'errorId', id, 'error', String(err))
      return e.json(200, {
        score: 50,
        verdict: 'parcial',
        feedback:
          'A avaliação automática está indisponível no momento. Sua resposta foi registrada.',
        errorId: id,
      })
    }
  },
  $apis.requireAuth(),
)
