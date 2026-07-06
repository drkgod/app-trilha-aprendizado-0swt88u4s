migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'rodrigo@adapta.org')
      return
    } catch (_) {}
    const record = new Record(users)
    record.setEmail('rodrigo@adapta.org')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Rodrigo')
    record.set('role', 'admin')
    app.save(record)
  },
  (app) => {
    try {
      app.delete(app.findAuthRecordByEmail('_pb_users_auth_', 'rodrigo@adapta.org'))
    } catch (_) {}
  },
)
