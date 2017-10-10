const express = require('express')
      app = module.exports = express(),
      path = require('path'),
      cors = require('cors'),
      routes = require('./routes'),
      errorHandlers = require('./middleware/error-handlers'),
      compression = require('compression'),
      subdomain = require('express-subdomain')

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
if (process.env.NODE_ENV == 'production')
  app.use(subdomain('api', routes))
else
  app.use('/api', routes)
app.get('/*', (req, res) => {
  console.log('////// went to root path ')
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})
app.use(errorHandlers)


let port = process.env.API_PORT || process.env.PORT || (process.argv[2] || 3000)
if (!module.parent)
  app.listen(port, () => console.log(`Server is listening on port ${port}`))
