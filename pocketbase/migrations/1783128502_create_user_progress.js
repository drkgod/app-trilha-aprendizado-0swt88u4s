migrate(
  (app) => {
    const collection = new Collection({
      name: 'user_progress',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != '' && @request.body.user_id = @request.auth.id",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'topic_id', type: 'text', required: true },
        { name: 'trail_id', type: 'text', required: true },
        { name: 'xp_earned', type: 'number', required: true, min: 0 },
        { name: 'completed_at', type: 'date', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_progress_user_topic ON user_progress (user_id, topic_id)',
        'CREATE INDEX idx_progress_user ON user_progress (user_id)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('user_progress')
    app.delete(collection)
  },
)
