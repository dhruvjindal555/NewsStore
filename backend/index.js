const express = require('express')
const app = express()
const port = 8888
var cors = require('cors')
const connectToDatabse = require('../backend/DB/db')
connectToDatabse()

app.use(express.json())
app.use(cors())
app.use('/auth', require('./Routes/auth'))
app.use('/favourites', require('./Routes/fav'))

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})