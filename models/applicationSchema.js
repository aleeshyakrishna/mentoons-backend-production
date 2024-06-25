const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema = new Schema({
   
   name:String,
   email:String,
   phoneNumber:String,
   jobRole:String,
   resume:String,
   links:String,
   message:String

})

module.exports = mongoose.model('Job applications',applicationSchema)