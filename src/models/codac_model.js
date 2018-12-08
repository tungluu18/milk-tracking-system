const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

exports.getById = async function (id) {
  if (!id) return null
  try {
    const CoDac = await TrackingContract.methods.getCoDac(String(id)).call()
    const result = {
      NhietDoLamLanh: CoDac.NhietDoLamLanh,
      ThoiGianLamLanh: CoDac.ThoiGianLamLanh,
      Lactose: CoDac.Lactose,
      NongDoChatBeo: CoDac.NongDoChatBeo,
      NongDoChatKho: CoDac.NongDoChatKho
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
      NhietDoLamLanh,
      ThoiGianLamLanh,
      Lactose,
      NongDoChatBeo,
      NongDoChatKho} = value
    const method = TrackingContract.methods.writeCoDac(
      String(id),
      Number(NhietDoLamLanh),
      Number(ThoiGianLamLanh),
      Number(Lactose),
      Number(NongDoChatBeo),
      Number(NongDoChatKho))
    const receipt = await SM.executeMethod(method, privkey)
    return 'Completed'
  } catch (error) {
    return Promise.reject(error)
  }
}