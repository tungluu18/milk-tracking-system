const config = (require('./web3module/config')).main
// ahihi
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

// TrackingContract.methods.call('5c0aa8c06477421c543b8f11')
//   .call()
//   .then(result => {
//     console.log(result)
//   })
//   .catch(error => {
//     console.log(error)
//   })

const executeMethod = async function () {
  const privkey = '0x2da54f8ae6f84209a348d88665172d2f9896c7ed46e179c4cf61f05228897127'
  const method = TrackingContract.methods.writeLayMau(
    '5c0aa7986936d61b79de529f',
    3, 4, 5, 2, 1)
  try {
    // const estimatedGas = 100000
    const account = web3.eth.accounts.privateKeyToAccount(privkey)
    const estimatedGas = await method.estimateGas({from: account.address})
    console.log('Estimated Gas: ', estimatedGas)
    let tx = {
      to: config.ContractAddress,
      gasLimit: estimatedGas * 4,
      gasPrice: 1000000000,
      data: TrackingContract.methods.writeLayMau(
        '5c0aa7986936d61b79de529f',
        3, 4, 5, 2, 1).encodeABI()
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
}

executeMethod()
