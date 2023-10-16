import connect from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()


export async function POST(request : NextRequest){
  try {
    const reqBody = await request.json()
    console.log(reqBody)
    const {username,email,password} = reqBody
    // checking the exist or not
    let user = await User.findOne({email})
    console.log("user "+user)
    if(user) return NextResponse.json({message : "User already exist"},{status : 403})
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password,salt)
    const newUser = new User({
      email,
      username,
      password : hashPassword
    })
    user = await newUser.save({username,email,hashPassword})
    console.log(user)
    return NextResponse.json({message : "success",user : user},{status : 200})
  } 
  catch (error : any) {
    return NextResponse.json({error : error.message},{status : 500})
  }
}
