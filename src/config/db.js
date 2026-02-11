
require("dotenv").config()
// this file will be used to to coonect with database
const mongoose  = require("mongoose");

const connectDb = async ()=>{
    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.error("Database connection failed");
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDb;