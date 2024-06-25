const mongoose = require('mongoose')
const Schema = mongoose.Schema

const signupSchema = new Schema({
    username:{
       type: String,
    //    required:true
    },
    email:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type:String,
        unique:true
    },
    age:{
        type:String
    },
    password:{
        type:String
    },
     
},
{
    timestamps:true
}
)

module.exports = mongoose.model('users',signupSchema)