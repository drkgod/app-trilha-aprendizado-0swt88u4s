migrate(
  (app) => {
    // 1) eval_attempts — uma tentativa de avaliação (checkpoint ou exame) com tracking de integridade.
    const attempts = new Collection({
      name: 'eval_attempts',
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
        { name: 'trail_id', type: 'text', required: true },
        { name: 'kind', type: 'text', required: true },
        { name: 'checkpoint_key', type: 'text', required: false },
        { name: 'question_count', type: 'number', required: true, min: 0 },
        { name: 'correct_count', type: 'number', required: false, min: 0 },
        { name: 'score_percent', type: 'number', required: false, min: 0 },
        { name: 'passed', type: 'bool', required: false },
        { name: 'attempt_number', type: 'number', required: false, min: 1 },
        { name: 'total_duration_seconds', type: 'number', required: false, min: 0 },
        { name: 'active_duration_seconds', type: 'number', required: false, min: 0 },
        { name: 'visibility_switches', type: 'number', required: false, min: 0 },
        { name: 'paste_blocks', type: 'number', required: false, min: 0 },
        { name: 'copy_blocks', type: 'number', required: false, min: 0 },
        { name: 'integrity_seal', type: 'text', required: false },
        { name: 'started_at', type: 'date', required: false },
        { name: 'finished_at', type: 'date', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_eval_attempts_user ON eval_attempts (user_id)',
        'CREATE INDEX idx_eval_attempts_trail ON eval_attempts (trail_id)',
        'CREATE INDEX idx_eval_attempts_kind ON eval_attempts (kind)',
      ],
    })
    app.save(attempts)

    // 2) eval_answers — cada resposta individual (tempo por questão + avaliação da IA nas discursivas).
    const attemptsId = app.findCollectionByNameOrId('eval_attempts').id
    const answers = new Collection({
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
          collectionId: attemptsId,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'question_id', type: 'text', required: true },
        { name: 'question_type', type: 'text', required: true },
        { name: 'question_text', type: 'text', required: false },
        { name: 'answer_text', type: 'text', required: false },
        { name: 'answer_index', type: 'number', required: false },
        { name: 'is_correct', type: 'bool', required: false },
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
    app.save(answers)
  },
  (app) => {
    // Rollback: remove answers primeiro (tem a FK), depois attempts.
    try {
      app.delete(app.findCollectionByNameOrId('eval_answers'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('eval_attempts'))
    } catch (_) {}
  },
)
