const express = require('express')
      app = module.exports = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      routes = require('./routes'),
      errorHandlers = require('./middleware/error-handlers'),
      compression = require('compression')

switch (process.env.NODE_ENV) {
  case 'development':
    require('./scripts/dev-setup')
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
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  routes
)
app.get('/*', (req, res) => {
  console.log('////// went to root path ')
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})
app.use(errorHandlers)


let port = process.env.API_PORT || process.env.PORT || (process.argv[2] || 3000)
if (!module.parent)
  app.listen(port, () => console.log(`Server is listening on port ${port}`))
