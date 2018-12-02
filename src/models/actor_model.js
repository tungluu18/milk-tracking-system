const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActorSchema = new Schema({
  role: String,
  address: String,
  privkey: String,
  name: String,
  username: String,
  password: String,
})

module.exports = mongoose.model('actor', ActorSchema)