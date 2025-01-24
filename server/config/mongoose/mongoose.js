import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(`${process.env.MONGO_URL}`);

const db= mongoose.connection;

db.on('open', ()=>
    {
        console.log("successfully connected with db !!!")
    })

db.on('error', ()=>
    {
        console.log("Error in connecting with db !!!")
    })

export default db;