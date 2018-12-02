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
  try {
    const actor = await ActorModel.findById(req.params.id)
    if (actor) {
      sendResponse(res, 200, actor)
    } else {
      sendResponse(res, 404, 'Invalid id')
    }
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
    const createdNewActor = await newActor.save()
    const excutingMethod = TrackingContract.methods.regActor(name, role)
    const registerdOnBL = await SM.executeMethod(excutingMethod, privkey)

    sendResponse(res, 200, createdNewActor)
  } catch (error) {
    sendResponse(res, 404, error.message)
  }
}
