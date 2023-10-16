import mongoose from "mongoose";

export default async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection;
    connection.on('connected',()=>{
      console.log("Mongoose successfully connected")
    })
  } catch (error : any) {
    console.log("something went wrong!")
    console.log(error)
  }
}