const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

const RecordModel = require('../models/record_model').database
const RecordFunc = require('../models/record_model')

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
  console.log('Creating record...')
  try {
    const {address, privkey} = req.body
    if (!address || !privkey) {
      sendResponse(res, 404, {Error: 'Invalid account'})
      return
    }
    const newRecord = new RecordModel({})
    const result = await newRecord.save()
    // console.log(TrackingContract.methods)
    const recordId = String(result._id)
    const executingMethod = TrackingContract.methods.writeRecord(recordId)
    const receipt = await SM.executeMethod(executingMethod, privkey)
    console.log('result: ', result)
    console.log('receipt: ', receipt)
    sendResponse(res, 200, result)
  } catch (error) {
    console.log(error.message)
    sendResponse(res, 404, error.message)
  }
}

exports.getById = async function(req, res) {
  console.log(`Getting record by id ${req.params.id}...`)
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