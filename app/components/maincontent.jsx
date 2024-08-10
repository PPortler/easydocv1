import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Maincontent() {
    return (
        <div className='mt-5 lg:mt-20 size-screen flex flex-col-reverse md:flex-row md:justify-between md:items-center '>
            <div>
                <div className='lg:mt-0 mt-10'>
                    <h1 className='text-[#4D4D4D] text-4xl lg:text-6xl font-bold'>เว็บไซต์</h1>
                    <h1 className='text-[#4D4D4D] text-4xl lg:text-6xl font-bold'>จัดการเอกสาร</h1>
                </div>
                <p className='text-[#717171] mt-3'>จัดเก็บทุกเอกสารให้เป็นเรื่องง่าย</p>
                <div className='mt-8'>
                    <Link href="/register" className=' text-white rounded-md bg-[#0F75BC] p-3 px-4 '>ลงทะเบียน</Link>
                </div>
            </div>
            <div>
                <Image className='w-full h-70 lg:h-70 ' src="/image/main/postermain.png" height={1000} width={1000} priority alt="poster"></Image>
            </div>
        </div>
    )
}

export default Maincontent
