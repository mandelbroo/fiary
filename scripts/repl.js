const repl = require('repl')

const replServer = repl.start({
	prompt: 'fiary > ',
})

replServer.context.Record = require('../server/models/record')
