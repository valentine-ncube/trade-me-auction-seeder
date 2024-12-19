const readlineSync = require('readline-sync')
const connectDB = require('./db')
const Auction = require('./models/Auction')

const main = async () => {
  await connectDB()

  console.log('Welcome to the Trade Me Auction Seeder CLI')

  const action = readlineSync
    .question('What would you like to do? (seed/delete):')
    .toLowerCase()

  if (action === 'seed') {
    const sampleData = [
      {
        title: 'Dining Table Set',
        description: 'A six-seater wooden dining table set',
        start_price: 100,
        reserve_price: 300,
      },
      {
        title: 'Laptop',
        description: 'A brand new HP laptop',
        start_price: 500,
        reserve_price: 700,
      },
      {
        title: 'Mountain Bike',
        description: 'A mountain bike in excellent condition',
        start_price: 200,
        reserve_price: 500,
      },
    ]
    await Auction.insertMany(sampleData)
    console.log('Sample auction data has been seeded!')
  } else if (action === 'delete') {
    await Auction.deleteMany({})
    console.log('All auction data has been deleted!')
  } else {
    console.log('Invalid action. Please try again.')
  }

  process.exit()
}

main()
