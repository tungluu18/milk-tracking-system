const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

exports.getById = async function (id) {
  if (!id) return null
  try {
    const ThanhTrung = await TrackingContract.methods.getThanhTrung(String(id)).call()
    const result = {
      TongHamLuongChatKho: ThanhTrung.TongHamLuongChatKho,
      HamLuongBeo: ThanhTrung.HamLuongBeo,
      MauThuPhosphatase: ThanhTrung.MauThuPhosphatase,
      Coliform: ThanhTrung.Coliform,
      Salmonella: ThanhTrung.Salmonella
    }
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

exports.edit = async function (id, value, privkey) {
  if (!id || !value || !privkey) return null
  try {
    const {
      TongHamLuongChatKho,
      HamLuongBeo,
      MauThuPhosphatase,
      Coliform,
      Salmonella
    } = value
    const method = TrackingContract.methods.writeThanhTrung(
      String(id),
      Number(TongHamLuongChatKho),
      Number(HamLuongBeo),
      Number(MauThuPhosphatase),
      Number(Coliform),
      Number(Salmonella))
    const receipt = await SM.executeMethod(method, privkey)
    return 'Completed'
  } catch (error) {
    return Promise.reject(error)
  }
}