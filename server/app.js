const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const routes = require('./routes')
const errorHandlers = require('./middleware/error-handlers')
const compression = require('compression')

if (process.env.NODE_ENV !== 'production') {
  require('./scripts/dev-setup')(app)
  require('dotenv').config()
}

app.use(compression())
app.use('/static', express.static(path.resolve(__dirname, '../build/static')))
app.use(express.static(path.resolve(__dirname, '../build')))
app.disable('x-powered-by')
app.use(cors())
app.use(routes)
app.use(errorHandlers)

const port =
  process.env.API_PORT || process.env.PORT || (process.argv[2] || 3000)
if (!module.parent) {
  app.listen(port, () => console.log(`Server is listening on port ${port}`))
}
module.exports = app
