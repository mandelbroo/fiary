const globalConfig = require('./../config.js')
const ENV = process.env.NODE_ENV

function execute(isCreate = true) {

  if (!ENV || ENV == null || ENV.length == 0) {
    console.log('WARNING. Please specify NODE_ENV either for the command or in .env')
    return
  }

  const pg = require('pg')
  const config = globalConfig[process.env.NODE_ENV]
  const dbName = config.database
  config.database = 'postgres' // using postgres db just for connection. Be careful, do not drop it
  const pool = new pg.Pool(config)
  pool.connect(function(err, client, done) {
    if (err) console.log(err)
    let check = `SELECT 1 from pg_database WHERE datname='${dbName}'`
    client.query(check, function(err, res) {
      if (err) console.log(err)
      if (res.rowCount > 0) {
        if (!isCreate)
          client.query('DROP DATABASE ' + dbName)
            .then(() => console.log(`DATABASE '${dbName}' DROPPED SUCESSFULLY!`))
            .catch(err => console.log(err))
        else
          console.log(`DATABASE '${dbName}' ALREADY EXISTS!`)
      }
      else {
        if (isCreate)
          client.query('CREATE DATABASE ' + dbName)
            .then(() => console.log(`DATABASE '${dbName}' SUCCESSFULLY CREATED!`))
            .catch(err => console.log(err))
        else
          console.log(`DATABASE '${dbName}' DOES NOT EXIST!`)
      }
      client.end()
    })
  })
}

exports.create = function() {
  execute(true)
}

exports.drop = function() {
  execute(false)
}
