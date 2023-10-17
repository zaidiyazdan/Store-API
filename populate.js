//this file is used to add our dummy data to our database.
require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./models/product')

const jsonProducts = require('./products.json')

//connecting to the database.
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        //We want to remove the existing products and give it our own products.
        //passing our products json products (we can also pass array as a argument)
        await Product.create(jsonProducts)
        console.log("Sucesss!!!!");
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
}

start();