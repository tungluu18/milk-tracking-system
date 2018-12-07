const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

module.exports = {
  getById: async function (id) {
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
      return new Promise.reject(error)
    }
  }
}