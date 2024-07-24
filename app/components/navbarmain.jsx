import React from 'react'
import Link from 'next/link'

function Navbarmain() {
  return (
    <div className='flex justify-between py-4 size-screen items-center bg-[#F5F7FA]'>
      <Link href="/" className='font-bold text-2xl'>Easy Doc</Link>
      <div className='hidden lg:flex'>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>Home</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>Service</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>Feature</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>Product</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>Testimonial</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>FAQ</Link>
      </div>
      <div>
        <Link href="/login" className='text-[#0F75BC] p-2 px-4'>Login</Link>
        <Link href="/register" className='text-white rounded-md bg-[#0F75BC] p-2 px-4 '>Sign up</Link>
      </div>
    </div>
  )
}

export default Navbarmain
