const express = require('express')
const bodyparser = require('body-parser')
const app = express()

// read config file
const fs = require('fs')
const readConfigFile = fs.readFileSync('src/config.json')
const config = JSON.parse(readConfigFile)

// mondogdb connection
const mongoose = require('mongoose')
const mongodb_url = config.database['mongodb-url']
mongoose.connect(process.env.MONGODB_URI || mongodb_url)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

// body-parser to read request
app.use(bodyparser.json())

const RecordRoute = require('./routes/record_route')
const ActorRoute = require('./routes/actor_route')

app.use('/api/v1/records', RecordRoute)
app.use('/api/v1/actors', ActorRoute)

const PORT = 12345
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}...`)
})
