const SM = require('../web3module/ContractUtil')
const TrackingContract = SM.SmartContract

exports.getById = async function (id) {
  if (!id) return null
  try {
    const DongHoa = await TrackingContract.methods.getDongHoa(String(id)).call()
    const result = {
      NhietDo: DongHoa.NhietDo,
      ApSuat: DongHoa.ApSuat,
      ChatNhuHoa: DongHoa.ChatNhuHoa,
      HamLuongCasein: DongHoa.HamLuongCasein,
      KichThuocHatKem: DongHoa.KichThuocHatKem,
      ThoiGianLytam: DongHoa.ThoiGianLytam
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
      NhietDo,
      ApSuat,
      ChatNhuHoa,
      HamLuongCasein,
      KichThuocHatKem,
      ThoiGianLytam} = value
    const method = TrackingContract.methods.writeDongHoa(
      String(id),
      Number(NhietDo),
      Number(ApSuat),
      String(ChatNhuHoa),
      Number(HamLuongCasein),
      Number(KichThuocHatKem),
      Number(ThoiGianLytam))
    const receipt = await SM.executeMethod(method, privkey)
    return 'Completed'
  } catch (error) {
    return Promise.reject(error)
  }
}