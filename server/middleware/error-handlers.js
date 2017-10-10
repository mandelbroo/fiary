module.exports = [
  function(err, req, res, next) {
    res.status(400).json({success: false, message: 'Bad request', errors: err.errors})
  },
  function(req, res, next) {
    res.status(404).json({success: false, message: 'Not found', path: req.url})
  },
  function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
]
