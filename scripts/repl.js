const repl = require('repl')

const replServer = repl.start({
  prompt: 'fiary > ',
})

const models = require('../server/models')
Object.assign(replServer.context, models)
