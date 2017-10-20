const models = require('../models')

module.exports = (req, res) => {
  res.send([
    {"date": "07.07", "expences":[
      {"amount": 150, "tags": ["Andriy"]},
      {"amount": 100, "tags": ["medicines", "Yara", "helped"]},
    ], "income": [
      {"amount": 150, "tags": ["Pavlo"]},
    ]},
    {"date": "06.07", "expences":[
      {"amount": 130, "tags": ["internet"]},
      {"amount": 20, "tags": ["Yara"]},
      {"amount": 24, "tags": ["free","sousages"]},
      {"amount": 11, "tags": ["icecream"]},
    ]}
  ])
}
