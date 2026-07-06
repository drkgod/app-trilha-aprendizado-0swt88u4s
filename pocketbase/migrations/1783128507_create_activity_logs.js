migrate(
  (app) => {
    const collection = new Collection({
      name: 'activity_logs',
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
        { name: 'topic_id', type: 'text', required: true },
        { name: 'start_time', type: 'date', required: true },
        { name: 'end_time', type: 'date', required: false },
        { name: 'total_duration_seconds', type: 'number', required: false, min: 0 },
        { name: 'active_duration_seconds', type: 'number', required: false, min: 0 },
        { name: 'visibility_switches', type: 'number', required: false, min: 0 },
        { name: 'is_completed', type: 'bool', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_activity_user ON activity_logs (user_id)',
        'CREATE INDEX idx_activity_trail ON activity_logs (trail_id)',
        'CREATE INDEX idx_activity_topic ON activity_logs (topic_id)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('activity_logs')
    app.delete(collection)
  },
)
