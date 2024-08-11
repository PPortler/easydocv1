import React from 'react'
import Link from 'next/link'

function NavbarAdmin() {
  return (
    <div className='fixed top-0 w-full z-10 size-screen py-4 shadow-md bg-[#2581C1] items-center text-white flex justify-between'>
        <Link href="/myfile" className='font-bold text-xl'>Easy Doc</Link>
        <div>
            <Link className='mx-3' href="/help">จัดการผู้ใช้</Link>
            <Link className='mx-3' href="/help">เกี่ยวกับเรา?</Link>
        </div>
    </div>
  )
}

export default NavbarAdmin
