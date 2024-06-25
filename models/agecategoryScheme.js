const mongoose = require('mongoose')
const Schema = mongoose.Schema

const agecategorySchema = new Schema({

    ageCategoryName:{
        
        type:String
    }
   
})

module.exports = mongoose.model('Agecategory',agecategorySchema)