
require("dotenv").config()
// this app will start the server
// require the app module after the server start app will run and it will run the routes along with middlewars
const app = require("./app");
// require the mongodb connection module which will connect with the database
const connectDb  =  require("./config/db");

// get the port at where server will listen from .env file 
const PORT = process.env.port || 3000;

const startServer = async ()=>{
    // call the function to coonect with mongodb
    await connectDb();

    app.listen(PORT, ()=>{
        console.log(`Server is listenning at the port ${PORT}`)
    })
}

startServer();