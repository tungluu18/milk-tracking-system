const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

const ActorModel = require('../models/actor_model')
const RecordModel = require('../models/record_model').database
const RecordFunc = require('../models/record_model')

const LayMau = require('../models/laymau_model')
const ChuanHoa = require('../models/chuanhoa_model')
const DongHoa = require('../models/donghoa_model')
const ThanhTrung = require('../models/thanhtrung_model')
const CoDac = require('../models/codac_model')

const sendResponse = function (res, status, payload) {
  res.status(status)
  res.send({
    success: (status == 200 ? "true" : "false"),
    payload
  })
}

exports.getAll = async function (req, res) {
  try {
    const listRecords = await RecordModel.find()
    let result = []
    for (var a of listRecords) result.push(await RecordFunc.getById(a._id))
    sendResponse(res, 200, result)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.create = async function (req, res) {
  console.log(`LOG[${Date.now()}] Creating record...`)
  const actorId = req.params.actorId
  if (!actorId) {
    sendResponse(res, 403, 'Bad request')
    return
  }

  try {
    const {address, privkey} = await ActorModel.findById(actorId)
    if (!address || !privkey) {
      sendResponse(res, 403, 'Bad request')
      return
    }
    const newRecord = new RecordModel({})
    const result = await newRecord.save()

    const recordId = String(result._id)
    const executingMethod = TrackingContract.methods.writeRecord(recordId)
    const receipt = await SM.executeMethod(executingMethod, privkey)
    // console.log('result: ', result)
    // console.log('receipt: ', receipt)
    sendResponse(res, 200, result)
  } catch (error) {
    console.log(error.message)
    sendResponse(res, 404, error.message)
  }
}

exports.getById = async function(req, res) {
  console.log(`LOG[${Date.now()}] Getting record by id ${req.params.id}...`)
  if (!req.params.id) {
    sendResponse(res, 403, 'Bad Request')
    return
  }
  try {
    const result = await RecordFunc.getById(req.params.id)
    sendResponse(res, 200, result)
  } catch (error) {
    console.log(error.message)
    sendResponse(res, 404, error.message)
  }
}

exports.editLayMau = async function (req, res) {
  const {recordId, actorId} = req.params
  console.log(`LOG[${Date.now()}] Actor ${actorId}'s editing LayMau on record ${recordId}...`)
  try {
    const actor = await ActorModel.findById(actorId)
    if (!actor) {
      sendResponse(res, 403, 'Bad request')
      return
    }
    const receipt = await LayMau.edit(recordId, req.body, actor.privkey)
    sendResponse(res, 200, receipt)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.editChuanHoa = async function (req, res) {
  const {recordId, actorId} = req.params
  console.log(`LOG[${Date(Date.now()).toString()}] Actor ${actorId}'s editing ChuanHoa on record ${recordId}...`)
  try {
    const actor = await ActorModel.findById(actorId)
    if (!actor) {
      sendResponse(res, 403, 'Bad request')
      return
    }
    const receipt = await ChuanHoa.edit(recordId, req.body, actor.privkey)
    sendResponse(res, 200, receipt)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.editDongHoa = async function (req, res) {
  const {recordId, actorId} = req.params
  console.log(`LOG[${Date(Date.now()).toString()}] Actor ${actorId}'s editing DongHoa on record ${recordId}...`)
  try {
    const actor = await ActorModel.findById(actorId)
    if (!actor) {
      sendResponse(res, 403, 'Bad request')
      return
    }
    const receipt = await DongHoa.edit(recordId, req.body, actor.privkey)
    sendResponse(res, 200, receipt)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.editThanhTrung = async function (req, res) {
  const {recordId, actorId} = req.params
  console.log(`LOG[${Date(Date.now()).toString()}] Actor ${actorId}'s editing ThanhTrung on record ${recordId}...`)
  try {
    const actor = await ActorModel.findById(actorId)
    if (!actor) {
      sendResponse(res, 403, 'Bad request')
      return
    }
    const receipt = await ThanhTrung.edit(recordId, req.body, actor.privkey)
    sendResponse(res, 200, receipt)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.editCoDac = async function (req, res) {
  const {recordId, actorId} = req.params
  console.log(`LOG[${Date(Date.now()).toString()}] Actor ${actorId}'s editing CoDac on record ${recordId}...`)
  try {
    const actor = await ActorModel.findById(actorId)
    if (!actor) {
      sendResponse(res, 403, 'Bad request')
      return
    }
    const receipt = await CoDac.edit(recordId, req.body, actor.privkey)
    sendResponse(res, 200, receipt)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}