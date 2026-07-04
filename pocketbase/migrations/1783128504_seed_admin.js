migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'admin@antigravity.dev')
      return
    } catch (_) {}
    const record = new Record(users)
    record.setEmail('admin@antigravity.dev')
    record.setPassword('Antigravity@2025')
    record.setVerified(true)
    record.set('name', 'Administrador')
    record.set('role', 'admin')
    app.save(record)
  },
  (app) => {
    try {
      app.delete(app.findAuthRecordByEmail('_pb_users_auth_', 'admin@antigravity.dev'))
    } catch (_) {}
  },
)
