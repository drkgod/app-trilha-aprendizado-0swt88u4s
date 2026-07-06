migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')
    col.createRule = "(@request.auth.role = 'admin') || (@request.body.role = 'consultant')"
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')
    col.createRule = "@request.auth.role = 'admin'"
    app.save(col)
  },
)
