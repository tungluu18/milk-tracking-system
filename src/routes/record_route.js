const Router = require('express').Router()
const RecordController = require('../controller/record_controller')

Router.get('/', RecordController.getAll)
Router.get('/:id', RecordController.getById)
Router.post('/', RecordController.create)

module.exports = Router