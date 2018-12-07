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
  console.log('register...')
  try {
    const {username, password, name, role, address, privkey} = req.body
    newActor = new ActorModel({
      username: username,
      password: password,
      name: name,
      role: role,
      address: address, 
      privkey: privkey
    })
    const existedActor = await ActorModel.find({username})
    if (existedActor.length > 0) {
      sendResponse(res, 404, {Error: 'Existed username'})
      return
    }
    console.log("name: ", name, " role: ", role)
    const executingMethod = TrackingContract.methods.regActor(name, role)    
    const registerdOnBL = await SM.executeMethod(executingMethod, privkey)    
    const createdNewActor = await newActor.save()    

    sendResponse(res, 200, createdNewActor)
  } catch (error) {
    sendResponse(res, 404, error.message)
  }
}
