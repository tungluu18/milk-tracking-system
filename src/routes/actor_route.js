const Router = require('express').Router()
const ActorController = require('../controller/actor_controller')

Router.get('/', ActorController.getAll)
Router.get('/:id', ActorController.get)
Router.post('/register', ActorController.register)

module.exports = Router