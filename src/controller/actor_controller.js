const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

const ActorModel = require('../models/actor_model')

const sendResponse = function (res, status, payload) {
  res.status(status)
  res.send({
    success: (status == 200 ? "true" : "false"),
    payload
  })
}

exports.get = async function (req, res) {
  console.log(`Getting actor by id ${req.params.id}...`)
  try {
    const actor = await ActorModel.findById(req.params.id)
    if (actor) {
      sendResponse(res, 200, actor)
    } else {
      sendResponse(res, 404, 'Invalid id')
    }
  } catch (error) {
    console.log(error.message)
    sendResponse(res, 404, 'Invalid id')
  }
}

exports.auth = async function (req, res) {
  try {
    const {username, password} = req.query
    const actor = await ActorModel.find({username, password})
    if (!actor.length) 
      sendResponse(res, 404, {Error: 'Invalid username or password'})
    else sendResponse(res, 200, actor)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.getAll = async function (req, res) {
  try {
    const listActors = await ActorModel.find()
    sendResponse(res, 200, listActors)
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error.message)
  }
}

exports.register = async function (req, res) {
  console.log(`LOG[${Date(Date.now()).toString()}] register...`)
  try {
    const {username, password, name, role, address, privkey} = req.body
    const actor = await ActorModel.findOne({$or: [
      {'username': username}, {'name': name}, {'address': address}, {'privkey': privkey}
    ]})

    if (actor) {
      sendResponse(res, 403, 'username, name, privekey or address has been used')
      return
    }
    console.log("name: ", name, " role: ", role)
    newActor = new ActorModel({
      username: username,
      password: password,
      name: name,
      role: role,
      address: address,
      privkey: privkey
    })
    const executingMethod = TrackingContract.methods.regActor(name, role)
    const registerdOnBL = await SM.executeMethod(executingMethod, privkey)
    const createdNewActor = await newActor.save()

    sendResponse(res, 200, createdNewActor)
  } catch (error) {
    sendResponse(res, 404, error.message)
  }
}

exports.signRecord = async function (req, res) {
  const {actorId, recordId} = req.params
  if (!actorId || !recordId) {
    sendResponse(res, 403, 'Bad request')
    return
  }
  console.log(`LOG[${Date(Date.now()).toString()}] Actor ${actorId} signing on record ${recordId}...`)
  try {
    const actor = await ActorModel.findById(actorId)
    if (!actor || actor.role != 'admin') {
      sendResponse(res, 403, 'Only admin can sign for records')
      return
    }
    const method = TrackingContract.methods.signRecord(String(recordId))
    const recreipt = await SM.executeMethod(method, actor.privkey)
    sendResponse(res, 200, 'Completed')
  } catch (error) {
    console.log(error)
    sendResponse(res, 404, error)
  }
}