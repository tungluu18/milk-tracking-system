const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

exports.getById = async function (id) {
  if (!id) return null
  try {
    const ChuanHoa = await TrackingContract.methods.getChuanHoa(String(id)).call()
    const result = {
      KhoiLuongSua: ChuanHoa.KhoiLuongSua,
      KhoiLuongCream: ChuanHoa.KhoiLuongCream,
      KhoiLuongSuaCanSx: ChuanHoa.KhoiLuongSuaCanSx,
      KhoiLuongCreamCanSx: ChuanHoa.KhoiLuongCreamCanSx,
      LuongChatBeoBoSung: ChuanHoa.LuongChatBeoBoSung,
      LuongSuaGayBoSung: ChuanHoa.LuongSuaGayBoSung
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
      KhoiLuongSua,
      KhoiLuongCream,
      KhoiLuongSuaCanSx,
      KhoiLuongCreamCanSx,
      LuongChatBeoBoSung,
      LuongSuaGayBoSung} = value
    const method = TrackingContract.methods.writeChuanHoa(
      String(id),
      Number(KhoiLuongSua),
      Number(KhoiLuongCream),
      Number(KhoiLuongSuaCanSx),
      Number(KhoiLuongCreamCanSx),
      Number(LuongChatBeoBoSung),
      Number(LuongSuaGayBoSung))
    const receipt = await SM.executeMethod(method, privkey)
    return 'Completed'
  } catch (error) {
    return Promise.reject(error)
  }
}