const config = (require('./config')).main

const Web3 = require('web3')
const ethereumjs = require('ethereumjs-tx')

// config web3 to provider
let web3 = new Web3()
const web3Provider = new web3.providers.HttpProvider(config.URL)
web3.setProvider(web3Provider)

// create contract instance
const ABIString = config.ABIString
const ABI = JSON.parse(ABIString)
const TrackingContract = new web3.eth.Contract(ABI, config.ContractAddress)

module.exports = {
  executeMethod: async function (method, privkey) {
    try {
      const account = web3.eth.accounts.privateKeyToAccount(privkey)
      const estimatedGas = await method.estimateGas({from: account.address})
      console.log('Estimated Gas: ', estimatedGas)
      let tx = {
        to: config.ContractAddress,
        gasLimit: estimatedGas * 4,
        gasPrice: 1000000000,
        data: method.encodeABI()
      }
      const signedTx = await web3.eth.accounts.signTransaction(tx, privkey)

      return new Promise((resolve, reject) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', result => {
          resolve(result)
        })
        .on('error', result => {
          reject(result)
        })
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },

  callMethod: async function(method, address) {
    console.log('Called method: ', method)
    console.log('Caller address: ', address)
    if (!address) {
      console.log('a')
      method.call()
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error))
    } else {
      method.call({from: address})
      .then(result => Promise.resolve(result))
      .catch(error => Promise.reject(error))
    }
  },

  SmartContract: TrackingContract
}