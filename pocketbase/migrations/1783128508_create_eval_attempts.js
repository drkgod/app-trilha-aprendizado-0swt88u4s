migrate(
  (app) => {
    const collection = new Collection({
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
        // 'checkpoint' (a cada 3 blocos) ou 'exam' (modo avaliacao)
        { name: 'kind', type: 'text', required: true },
        // para checkpoint: identifica qual bloco (ex.: 'cc-checkpoint-1')
        { name: 'checkpoint_key', type: 'text', required: false },
        { name: 'question_count', type: 'number', required: true, min: 0 },
        { name: 'correct_count', type: 'number', required: false, min: 0 },
        { name: 'score_percent', type: 'number', required: false, min: 0 },
        { name: 'passed', type: 'bool', required: false },
        { name: 'attempt_number', type: 'number', required: false, min: 1 },
        // tracking de integridade
        { name: 'total_duration_seconds', type: 'number', required: false, min: 0 },
        { name: 'active_duration_seconds', type: 'number', required: false, min: 0 },
        { name: 'visibility_switches', type: 'number', required: false, min: 0 },
        { name: 'paste_blocks', type: 'number', required: false, min: 0 },
        { name: 'copy_blocks', type: 'number', required: false, min: 0 },
        // selo textual calculado: 'limpo' | 'suspeito' | 'alerta'
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
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('eval_attempts')
    app.delete(collection)
  },
)
