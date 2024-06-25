const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userMessageSchema = new Schema ({
  
    userId:mongoose.SchemaTypes.ObjectId,
    name:String,
    email:String,
    content:String

})

module.exports = mongoose.model('customerMessage',userMessageSchema)