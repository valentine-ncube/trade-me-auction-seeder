const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./db')
const Auction = require('./models/Auction')

const app = express()

//Middleware
app.use(cors())
app.use(bodyParser.json())

//connect to MongoDB
connectDB()

//Test route
app.get('/', (req, res) => {
  res.send('API is running')
})

//Start the server
const PORT = 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
