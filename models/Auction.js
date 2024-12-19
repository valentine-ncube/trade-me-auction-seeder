const mongoose = require('mongoose')

const AuctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_price: { type: Number, required: true },
  reserve_price: { type: Number, required: true },
})

module.exports = mongoose.model('Auction', AuctionSchema)
