import React from 'react'
import Link from 'next/link'

function NavbarAdmin() {
  return (
    <div className='fixed top-0 w-full z-10 size-screen py-4 shadow-md bg-[#2581C1] items-center text-white flex justify-between'>
        <Link href="/" className='font-bold text-xl'>Easy Doc</Link>
        <div>
            <Link className='mx-3' href="/help">Manage User</Link>
            <Link className='mx-3' href="/help">About ?</Link>
        </div>
    </div>
  )
}

export default NavbarAdmin
