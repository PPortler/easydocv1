import React from 'react'
import Image from 'next/image'

function Community() {
    return (
        <div className='mt-14 mb-8 text-center '>
            <h1 className='text-[#4D4D4D] font-bold size-screen md:text-center text-2xl'>จัดการชุมชนทั้งหมดของคุณ<br /> ในระบบเดียว</h1>
            <div className='mt-5 grid grid-flow-row md:grid-cols-3  xl:gap-1 size-screen gap-2'>
                <div className='box-main'>
                    <Image className='h-10 w-10' src="/image/main/people.png" height={1000} width={1000} priority alt="icon" />
                    <h1 className='mt-2 text-[#4D4D4D] text-2xl font-bold'>องค์กรสมาชิก</h1>
                    <p className='mt-3 text-center text-[#717171] text-xs'>ซอฟต์แวร์การจัดการสมาชิกของเรามีระบบการต่ออายุและการชำระเงินสมาชิกอัตโนมัติเต็มรูปแบบ</p>
                </div>
                <div className='box-main'>
                    <Image className='h-10 w-10' src="/image/main/people.png" height={1000} width={1000} priority alt="icon" />
                    <h1 className='mt-2 text-[#4D4D4D] text-2xl font-bold'>สมาคมแห่งชาติ</h1>
                    <p className='mt-3 text-center text-[#717171] text-xs'>ซอฟต์แวร์การจัดการสมาชิกของเรามีระบบการต่ออายุและการชำระเงินสมาชิกอัตโนมัติเต็มรูปแบบ</p>
                </div>
                <div className='box-main'>
                    <Image className='h-10 w-10' src="/image/main/people.png" height={1000} width={1000} priority alt="icon" />
                    <h1 className='mt-2 text-[#4D4D4D] text-2xl font-bold'>สโมสรและกลุ่ม</h1>
                    <p className='mt-3 text-center text-[#717171] text-xs'>ซอฟต์แวร์การจัดการสมาชิกของเรามีระบบการต่ออายุและการชำระเงินสมาชิกอัตโนมัติเต็มรูปแบบ</p>
                </div>
            </div>
        </div>
    )
}

export default Community
