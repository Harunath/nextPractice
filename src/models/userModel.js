import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : [true, "please provide a username"],
    unique : true,
  },
  email : {
    type : String,
    required : [true, "please provide a username"],
    unique : true,
  },
  password : {
    type : String,
    required : [true, "please provide a username"],
  },
  role : {
    type : String,
    default : "User"
  },
  isVerified : {
    type : Boolean,
    default : false
  },
  forgotPasswordToken : String,
  forgotPasswordTokenExpiry : Date,
  isVerifiedToken : String,
  isVerifiedTokenExpiry : Date
})

const User = mongoose.model.users || mongoose.model("User",userSchema)

export default User