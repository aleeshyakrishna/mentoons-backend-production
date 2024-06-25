const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobOpeningSchema = new Schema({

   jobTitle:{
    type:String
   },
   discription:{
    type:String
   },
   active:{
    type:Boolean
   },
   image:{
    trype:String
   }

})

module.exports = mongoose.model('current opening',jobOpeningSchema)