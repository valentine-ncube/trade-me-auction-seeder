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
  res.send('API is running...')
})

//Search for similar auction items
app.get('/api/auctions/search', async (req, res) => {
  const { keyword } = req.query

  if (!keyword) {
    return res
      .status(400)
      .json({ error: 'Keyword query parameter is required.' })
  }

  try {
    // Search for items where title or description contains the keyword
    const results = await Auction.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    })

    res.json(results)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//Start the server
const PORT = 5001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
