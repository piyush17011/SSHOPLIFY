require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;
const connection= async() =>{
    try{
        const connection  = await mongoose.connect(mongoURL);
    }       
    catch(err){
        console.log(err);
    }
    
}
module.exports = connection;