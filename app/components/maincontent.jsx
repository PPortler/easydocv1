import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Maincontent() {
    return (
        <div className='mt-5 lg:mt-20 size-screen flex flex-col-reverse sm:flex-row md:justify-between md:items-center '>
            <div>
                <div className='lg:mt-0 mt-10'>
                    <h1 className='text-[#4D4D4D] text-4xl lg:text-6xl font-bold'>Document</h1>
                    <h1 className='text-[#4D4D4D] text-4xl lg:text-6xl font-bold'>Management</h1>
                </div>
                <p className='text-[#717171] mt-3'>Adjust Every Document</p>
                <div className='mt-8'>
                    <Link href="/register" className=' text-white rounded-md bg-[#0F75BC] p-3 px-4 '>Register</Link>
                </div>
            </div>
            <div>
                <Image className='w-full h-70 lg:h-96 ' src="/image/main/postermain.png" height={1000} width={1000} priority alt="poster"></Image>
            </div>
        </div>
    )
}

export default Maincontent