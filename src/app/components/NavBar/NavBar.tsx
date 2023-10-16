import React from 'react'
import Link from 'next/link'

function NavBar() {
  return (
    <div className=' flex items-center h-10 p-2 bg-gray-500'>
      <Link href='/'>Logo</Link>
      <Link href='/login'>Login</Link>    
    </div>
  )
}

export default NavBar
