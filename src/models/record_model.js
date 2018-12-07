const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

const RecordSchema = new Schema({
  recordId: Number,
  createAt: {
    type: Date,
    default: Date.now()
  }
})

exports.database = mongoose.model('record', RecordSchema)

exports.getById = async function (recordId) {
  console.log(recordId)
  if (!recordId) return null
  const record = await exports.database.findById(recordId)            
  if (!record) return null
  const {
    ThongSoLayMau, 
    ThongSoChuanHoa,
    ThongSoDongHoa,
    ThongSoThanhTrung,
    signatures,
    isApproved
  } = await TrackingContract.methods.getRecord(String(recordId)).call()    
  const result = Object.assign({
    ThongSoLayMau, ThongSoChuanHoa, ThongSoDongHoa, ThongSoThanhTrung, signatures, isApproved}, 
    record._doc
  )
  return result 
}