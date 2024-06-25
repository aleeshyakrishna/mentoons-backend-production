const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workshopEnquirySchema = new Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    category:{
        type:String
    }
   
})

module.exports = mongoose.model('workshop-enquiry',workshopEnquirySchema)