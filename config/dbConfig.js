
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://aleeshyakrishnamv:0u2phdQesL3eLYk6@cluster0.sdfzd2j.mongodb.net/mentoonsAdda')

mongoose.connection.once('open',()=>console.log('database connected successfullly!!')).on('error',error=>{
        console.log(error);
})