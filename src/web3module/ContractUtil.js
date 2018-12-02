const config = require('./config.json').ropsten

const Web3 = require('web3')
const ethereumjs = require('ethereumjs-tx')

// config web3 to provider
let web3 = new Web3()
const web3Provider = new web3.providers.HttpProvider(config.URL)
web3.setProvider(web3Provider)

// create contract instance
const ABIString = '[{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_role","type":"string"}],"name":"regActor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"signRecord","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"HamLuongChatBeo","type":"uint8"},{"name":"HamLuongProtein","type":"uint8"},{"name":"NhietDoDongBang","type":"uint8"},{"name":"LuongChatKho","type":"uint8"},{"name":"TyTrong","type":"uint8"}],"name":"writeLayMau","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ThongSoLayMau","type":"uint256"}],"name":"writeRecord","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_Record_","outputs":[{"name":"ThongSoLayMau","type":"uint256"},{"name":"isApproved","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getActor","outputs":[{"name":"success","type":"bool"},{"name":"_name","type":"string"},{"name":"_role","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getLayMau","outputs":[{"name":"HamLuongChatBeo","type":"uint8"},{"name":"HamLuongProtein","type":"uint8"},{"name":"NhietDoDongBang","type":"uint8"},{"name":"LuongChatKho","type":"uint8"},{"name":"TyTrong","type":"uint8"},{"name":"recorder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getRecord","outputs":[{"name":"ThongSoLayMau","type":"uint256"},{"name":"signatures","type":"address[]"},{"name":"isApproved","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]'
const ABI = JSON.parse(ABIString)
const TrackingContract = new web3.eth.Contract(ABI, config.ContractAddress)

module.exports = {  
  executeMethod: async function (method, privkey) {
    try {
      const estimatedGas = await method.estimateGas()      
      let tx = {
        to: config.ContractAddress,
        gasLimit: Math.round(estimatedGas * 1.1),
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

  SmartContract: TrackingContract
}