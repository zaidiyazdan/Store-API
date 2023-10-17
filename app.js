require('dotenv').config();
require('express-async-errors');
//async errors

const express = require('express')
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found');

//middleware

app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send(`<h1>Store Api</h1><a href="/api/v1/products">Products Route</a>`)
})

app.use('/api/v1/products',productRouter);

// Product routes.

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT||3000;

//Start function in which we connect to the database as well as we start the server it is async as the call to connect the database is await.
const start = async () =>{
    try{
        //here we will connect to database later
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`listening at port ${port}`))
    }catch(err)
    {
        console.log(err);
    }
}

start();
