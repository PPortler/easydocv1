import React from 'react'
import Link from 'next/link'

function Navbarlogin() {
  return (
    <div className=' size-screen py-4 shadow-md bg-[#2581C1] items-center text-white flex justify-between'>
        <Link href="/" className='font-bold text-xl'>Easy Doc</Link>
        <div>
            <Link className='mx-3' href="/help">Help</Link>
            <Link className='mx-3' href="/help">About ?</Link>
        </div>
    </div>
  )
}

export default Navbarlogin
