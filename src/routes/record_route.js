const Router = require('express').Router()

Router.get('/', (req, res) => {
  res.send('ahihi, records')
})

module.exports = Router