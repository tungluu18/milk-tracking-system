const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

exports.getById = async function (id) {
  if (!id) return null
  try {
    const Laymau = await TrackingContract.methods.getLayMau(String(id)).call()
    const result = {
      HamLuongChatBeo: Laymau.HamLuongChatBeo,
      HamLuongProtein: Laymau.HamLuongProtein,
      NhietDoDongBang: Laymau.NhietDoDongBang,
      LuongChatKho: Laymau.LuongChatKho,
      TyTrong: Laymau.TyTrong,
    }
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

exports.edit = async function (id, value, privkey) {
  if (!id || !value || !privkey) return null
  try {
    const {HamLuongChatBeo, HamLuongProtein, NhietDoDongBang, LuongChatKho, TyTrong} = value
    const method = TrackingContract.methods.writeLayMau(
      String(id),
      Number(HamLuongChatBeo),
      Number(HamLuongProtein),
      Number(NhietDoDongBang),
      Number(LuongChatKho),
      Number(TyTrong))
    const receipt = await SM.executeMethod(method, privkey)
    return 'Completed'
  } catch (error) {
    return Promise.reject(error)
  }
}