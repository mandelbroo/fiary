const express = require('express')
      app = express(),
      path = require('path'),
      cors = require('cors'),
      routes = require('./routes'),
      errorHandlers = require('./middleware/error-handlers'),
      compression = require('compression')

switch (process.env.NODE_ENV) {
  case 'development':
    require('./scripts/dev-setup')(app)
    break
  case 'test':
    require('dotenv').config()
    break
}

app.use('/static', express.static(path.resolve(__dirname, '../build/static')))
app.use(express.static(path.resolve(__dirname, '../build')))
app.disable('x-powered-by')
app.use(compression())
app.use(cors())
app.use(routes)
app.use(errorHandlers)

const port = process.env.API_PORT || process.env.PORT || (process.argv[2] || 3000)
if (!module.parent) {
  app.listen(port, () => console.log(`Server is listening on port ${port}`))
}
module.exports = app
