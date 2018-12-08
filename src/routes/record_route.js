const Router = require('express').Router()
const RecordController = require('../controller/record_controller')

// Lay tat ca ban ghi
Router.get('/', RecordController.getAll)
// Lay mot ban ghi theo id cua ban ghi do
Router.get('/:id', RecordController.getById)
// Tao mot ban ghi
Router.post('/:actorId', RecordController.create)
// Dien phan lay mau
Router.put('/:recordId/laymau/:actorId', RecordController.editLayMau)
// Dien phan chuan hoa
Router.put('/:recordId/chuanhoa/:actorId', RecordController.editChuanHoa)
// Dien phan dong hoa
Router.put('/:recordId/donghoa/:actorId', RecordController.editDongHoa)
// Dien phan thanh trung
Router.put('/:recordId/thanhtrung/:actorId', RecordController.editThanhTrung)
// Dien phan co dac
Router.put('/:recordId/codac/:actorId', RecordController.editCoDac)

module.exports = Router