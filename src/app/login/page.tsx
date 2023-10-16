"use client";
"use client";
import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter()
  const [loginDisabled,setLoginDisabled] = useState(true)
  const [user,setUser] = useState({
    username : "",
    password : ""
  })
  const [showPassword,setShowPassword] = useState(false)
  const onSignUp = async () =>{
    let response : any = await axios.post('/api/users/login',user)
    console.log("login successful")
    console.log(response)
    router.push(`/profile/[${response.data.user._id}`)
  }
  useEffect(()=>{
    if(user.username.length > 0 && user.password.length > 0) setLoginDisabled(false)
    else setLoginDisabled(true)
  },[user.password,user.username])
  return (
    <div className='flex justify-center items-center h-screen w-screen text-gray-300 bg-gray-800'>
      <div className=' min-w-fit p-8 space-y-4 bg-black rounded-xl drop-shadow-2xl'>
        <p className='w-fit mx-auto text-white text-2xl font-bold'>Login</p>
        <div className='flex flex-col gap-1'>
          <label htmlFor="username">Username</label>
          <input className='px-2 w-full text-gray-800 outline-none autofill:bg-black rounded-full' type="text" name="username" id="" placeholder='username' value={user.username} onChange={(e)=>setUser({...user, username : e.target.value})}/>
        </div>
        <div className='flex flex-col gap-1 min-w-98'>
          <label htmlFor="password">Password</label>
          <div className='flex justify-between bg-white rounded-full'>
            <input className='pl-2 text-gray-800 outline-none rounded-full' type={showPassword ? 'text' : 'password'} name="password" id="" placeholder='password' value={user.password} onChange={(e)=>setUser({...user, password : e.target.value})}/>
            <button className='w-10 pr-2 mx-auto text-xs text-gray-950 font-medium rounded-full' onClick={(e) =>{setShowPassword(!showPassword)}}>
              {showPassword ? (<>Hide</>) : (<>Show</>)}
            </button>     
          </div>
          <p className='text-xs text-yellow-50'>forgot password?</p>
        </div>
        <button className='flex justify-center w-full p-1 text-gray-950 font-semibold hover:text-white bg-green-400 hover:bg-green-600 rounded-full transition duration-300' onClick={onSignUp} disabled={loginDisabled}>
          <p>Login</p>
        </button>
        <div>
          <p onClick={()=>router.push('/signup')} className='text-xs'>not a <span className='text-amber-300'>User?</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login