const config = (require('./config')).main

const Web3 = require('web3')
const ethereumjs = require('ethereumjs-tx')

// config web3 to provider
let web3 = new Web3()
const web3Provider = new web3.providers.HttpProvider(config.URL)
web3.setProvider(web3Provider)

// create contract instance
const ABIString = config.ABIString
// const ABIString = '[{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_role","type":"string"}],"name":"regActor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"string"}],"name":"signRecord","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"string"},{"name":"KhoiLuongSua","type":"uint8"},{"name":"KhoiLuongCream","type":"uint8"},{"name":"KhoiLuongSuaCanSx","type":"uint8"},{"name":"KhoiLuongCreamCanSx","type":"uint8"},{"name":"LuongChatBeoBoSung","type":"uint8"},{"name":"LuongSuaGayBoSung","type":"uint8"}],"name":"writeChuanHoa","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"string"},{"name":"NhietDo","type":"uint8"},{"name":"ApSuat","type":"uint8"},{"name":"ChatNhuHoa","type":"string"},{"name":"HamLuongCasein","type":"uint8"},{"name":"KichThuocHatKem","type":"uint8"},{"name":"ThoiGianLytam","type":"uint8"}],"name":"writeDongHoa","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"string"},{"name":"HamLuongChatBeo","type":"uint8"},{"name":"HamLuongProtein","type":"uint8"},{"name":"NhietDoDongBang","type":"uint8"},{"name":"LuongChatKho","type":"uint8"},{"name":"TyTrong","type":"uint8"}],"name":"writeLayMau","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"string"}],"name":"writeRecord","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"string"},{"name":"TongHamLuongChatKho","type":"uint8"},{"name":"HamLuongBeo","type":"uint8"},{"name":"MauThuPhosphatase","type":"uint8"},{"name":"Coliform","type":"uint8"},{"name":"Salmonella","type":"uint8"}],"name":"writeThanhTrung","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getActor","outputs":[{"name":"success","type":"bool"},{"name":"_name","type":"string"},{"name":"_role","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"string"}],"name":"getChuanHoa","outputs":[{"name":"KhoiLuongSua","type":"uint8"},{"name":"KhoiLuongCream","type":"uint8"},{"name":"KhoiLuongSuaCanSx","type":"uint8"},{"name":"KhoiLuongCreamCanSx","type":"uint8"},{"name":"LuongChatBeoBoSung","type":"uint8"},{"name":"LuongSuaGayBoSung","type":"uint8"},{"name":"recorder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"string"}],"name":"getDongHoa","outputs":[{"name":"NhietDo","type":"uint8"},{"name":"ApSuat","type":"uint8"},{"name":"ChatNhuHoa","type":"string"},{"name":"HamLuongCasein","type":"uint8"},{"name":"KichThuocHatKem","type":"uint8"},{"name":"ThoiGianLytam","type":"uint8"},{"name":"recorder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"string"}],"name":"getLayMau","outputs":[{"name":"HamLuongChatBeo","type":"uint8"},{"name":"HamLuongProtein","type":"uint8"},{"name":"NhietDoDongBang","type":"uint8"},{"name":"LuongChatKho","type":"uint8"},{"name":"TyTrong","type":"uint8"},{"name":"recorder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"string"}],"name":"getRecord","outputs":[{"name":"ThongSoLayMau","type":"string"},{"name":"ThongSoChuanHoa","type":"string"},{"name":"ThongSoDongHoa","type":"string"},{"name":"ThongSoThanhTrung","type":"string"},{"name":"signatures","type":"address[]"},{"name":"isApproved","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"string"}],"name":"getThanhTrung","outputs":[{"name":"TongHamLuongChatKho","type":"uint8"},{"name":"HamLuongBeo","type":"uint8"},{"name":"MauThuPhosphatase","type":"uint8"},{"name":"Coliform","type":"uint8"},{"name":"Salmonella","type":"uint8"},{"name":"recorder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]'
// const ABIString = '[{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_role","type":"string"}],"name":"regActor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"signRecord","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"HamLuongChatBeo","type":"uint8"},{"name":"HamLuongProtein","type":"uint8"},{"name":"NhietDoDongBang","type":"uint8"},{"name":"LuongChatKho","type":"uint8"},{"name":"TyTrong","type":"uint8"}],"name":"writeLayMau","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ThongSoLayMau","type":"uint256"}],"name":"writeRecord","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_Record_","outputs":[{"name":"ThongSoLayMau","type":"uint256"},{"name":"isApproved","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getActor","outputs":[{"name":"success","type":"bool"},{"name":"_name","type":"string"},{"name":"_role","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getLayMau","outputs":[{"name":"HamLuongChatBeo","type":"uint8"},{"name":"HamLuongProtein","type":"uint8"},{"name":"NhietDoDongBang","type":"uint8"},{"name":"LuongChatKho","type":"uint8"},{"name":"TyTrong","type":"uint8"},{"name":"recorder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getRecord","outputs":[{"name":"ThongSoLayMau","type":"uint256"},{"name":"signatures","type":"address[]"},{"name":"isApproved","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]'
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