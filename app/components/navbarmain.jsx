import React from 'react'
import Link from 'next/link'

function Navbarmain() {
  return (
    <div className='fixed top-0 w-full z-10 flex justify-between py-4 size-screen items-center bg-[#F5F7FA]'>
      <Link href="/" className='font-bold text-2xl'>Easy Doc</Link>
      <div className='hidden lg:flex'>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>หน้าหลัก</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>บริการ</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>คุณสมบัติ</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>ผลิตภัณฑ์</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>เกี่ยวกับเรา</Link>
        <Link href="#" className='lg:mx-3 mx-2 text-sm'>คำถามที่พบบ่อย</Link>
      </div>
      <div>
        <Link href="/login" className='text-[#0F75BC] p-2 px-4'>เข้าสู่ระบบ</Link>
        <Link href="/register" className='text-white rounded-md bg-[#0F75BC] p-2 px-4 '>ลงทะเบียน</Link>
      </div>
    </div>
  )
}

export default Navbarmain
