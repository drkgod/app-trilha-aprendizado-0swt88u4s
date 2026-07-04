migrate(
  (app) => {
    const collection = new Collection({
      name: 'user_streaks',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != '' && @request.body.user_id = @request.auth.id",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
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
        { name: 'current_streak', type: 'number', required: true, min: 0 },
        { name: 'longest_streak', type: 'number', required: true, min: 0 },
        { name: 'last_study_date', type: 'text' },
        { name: 'daily_goal', type: 'number', required: true, min: 1 },
        { name: 'today_completed', type: 'number', required: true, min: 0 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_streaks_user ON user_streaks (user_id)'],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('user_streaks')
    app.delete(collection)
  },
)
