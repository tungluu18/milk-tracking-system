const Router = require('express').Router()
const ActorController = require('../controller/actor_controller')

// lay thong tin tat ca nguoi dung
Router.get('/', ActorController.getAll)
// xac thuc tai khoan thong qua username password => cap id cho nguoi dung vao he thong
Router.get('/auth', ActorController.auth)
// lay thong tin mot nguoi dung thong qua id
Router.get('/:id', ActorController.get)
// dang ki nguoi dung moi tren he thong
Router.post('/register', ActorController.register)
// admin ki ten ban ghi
Router.put('/:actorId/sign/:recordId', ActorController.signRecord)

module.exports = Router