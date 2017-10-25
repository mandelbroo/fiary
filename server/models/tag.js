const Base = require('./base')

class Tag extends Base {
  get tableName() {return 'tags'}
}
module.exports = Tag
