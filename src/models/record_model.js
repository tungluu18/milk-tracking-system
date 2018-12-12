const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

const ActorModel = require('./actor_model')
const LayMau = require('./laymau_model')
const ChuanHoa = require('./chuanhoa_model')
const DongHoa = require('./donghoa_model')
const ThanhTrung = require('./thanhtrung_model')
const CoDac = require('./codac_model')

const RecordSchema = new Schema({
  title: String,
  note: String,
  createAt: {
    type: Date,
    default: Date.now()
  }
})

exports.database = mongoose.model('record', RecordSchema)

exports.getById = async function (recordId) {
  if (!recordId) return null

  // const record_DB = await exports.database.findById(recordId)
  // if (!record_DB) return null
  // const record_BL  = await TrackingContract.methods.getRecord(String(recordId)).call()
  const [record_DB, record_BL] = await Promise.all([
    exports.database.findById(recordId),
    TrackingContract.methods.getRecord(String(recordId)).call()
  ])

  let result = {}
  result.ThongSoLayMau = (record_BL.ThongSoLayMau == 2) ? await LayMau.getById(recordId) : null
  result.ThongSoChuanHoa = (record_BL.ThongSoChuanHoa == 2) ? await ChuanHoa.getById(recordId) : null
  result.ThongSoDongHoa = (record_BL.ThongSoDongHoa == 2) ? await DongHoa.getById(recordId) : null
  result.ThongSoThanhTrung = (record_BL.ThongSoThanhTrung == 2) ? await ThanhTrung.getById(recordId) : null
  result.ThongSoCoDac = (record_BL.ThongSoCoDac == 2) ? await CoDac.getById(recordId) : null
  result.signatures = []
  for (var s of record_BL.signatures) {
    const actor = await ActorModel.findOne({address: s})
    if (actor) result.signatures.push({
      _id: actor._id,
      name: actor.name,
      username: actor.username,
      role: actor.role})
  }
  result.isApproved = record_BL.isApproved

  result = Object.assign({}, result, record_DB._doc)
  return result
}
