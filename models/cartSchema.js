const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
   userId: String,
   products:[
    {
        
    }
   ]
   
   
})

module.exports = mongoose.model('carts',cartSchema)