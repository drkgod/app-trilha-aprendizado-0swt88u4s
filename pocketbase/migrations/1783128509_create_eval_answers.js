migrate(
  (app) => {
    const collection = new Collection({
      name: 'eval_answers',
      type: 'base',
      listRule: '@request.auth.role = "admin" || @request.auth.id = user_id',
      viewRule: '@request.auth.role = "admin" || @request.auth.id = user_id',
      createRule: "@request.auth.id != ''",
      updateRule: '@request.auth.id = user_id',
      deleteRule: null,
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'attempt_id',
          type: 'relation',
          required: true,
          collectionId: 'eval_attempts',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'question_id', type: 'text', required: true },
        // 'mc' (multipla escolha) ou 'open' (discursiva)
        { name: 'question_type', type: 'text', required: true },
        { name: 'question_text', type: 'text', required: false },
        // resposta do consultor: indice (mc) ou texto (open)
        { name: 'answer_text', type: 'text', required: false },
        { name: 'answer_index', type: 'number', required: false },
        { name: 'is_correct', type: 'bool', required: false },
        // avaliacao da IA (discursivas): nota 0-100 + veredito + feedback
        { name: 'ai_score', type: 'number', required: false, min: 0 },
        { name: 'ai_verdict', type: 'text', required: false },
        { name: 'ai_feedback', type: 'text', required: false },
        { name: 'time_spent_seconds', type: 'number', required: false, min: 0 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_eval_answers_user ON eval_answers (user_id)',
        'CREATE INDEX idx_eval_answers_attempt ON eval_answers (attempt_id)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('eval_answers')
    app.delete(collection)
  },
)
