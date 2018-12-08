const Router = require('express').Router()
const ActorController = require('../controller/actor_controller')

Router.get('/', ActorController.getAll)
Router.get('/:id', ActorController.get)
Router.post('/register', ActorController.register)
Router.post('/auth', ActorController.auth)
// admin ki ten ban ghi
Router.put('/:actorId/sign/:recordId', ActorController.signRecord)

module.exports = Router