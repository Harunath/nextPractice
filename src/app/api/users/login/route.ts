import User from '../../../../models/userModel'
import connect from '../../../../dbConfig/dbConfig'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request : NextRequest){
  try {
    const {username,password} = await request.json()

    const user = await User.findOne({username})
    if(!user) return NextResponse.json({msg : "User doesn't exist"},{status : 401})
    console.log(user._id)
    const validPassword = await bcryptjs.compare(password,user.password)
    if(!validPassword) return NextResponse.json({msg : "Password incorrect"},{status : 401})
    let tokenData = {
      id : user._id,
      username : user.username,
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn : '1d'})
    const response = NextResponse.json({
      msg : "login successful",
      user : user,
      success : true
    })
    response.cookies.set("token",token,{
      httpOnly : true
    })
    return response    

  } catch (error) {
    return NextResponse.json({msg : "Something went wrong"},{status : 500})
  }
}