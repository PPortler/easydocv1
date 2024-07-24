import React from 'react'
import Image from 'next/image'

function Community() {
    return (
        <div className='my-12 md:my-10'>
            <h1 className='text-[#4D4D4D] font-bold size-screen md:text-center text-3xl'>Manage your entire community<br /> in a single system</h1>
            <div className='mt-10 grid grid-flow-row md:grid-cols-3 xl:gap-36 size-screen gap-7'>
                <div className='box-main'>
                    <Image className='h-10 w-10' src="/image/main/people.png" height={1000} width={1000} priority alt="icon" />
                    <h1 className='mt-2 text-[#4D4D4D] text-2xl font-bold'>Membership Organisations</h1>
                    <p className='mt-3 text-center text-[#717171] text-xs'>Our membership management software provides full automation of membership renewals and payments</p>
                </div>
                <div className='box-main'>
                    <Image className='h-10 w-10' src="/image/main/people.png" height={1000} width={1000} priority alt="icon" />
                    <h1 className='mt-2 text-[#4D4D4D] text-2xl font-bold'>National Associations</h1>
                    <p className='mt-3 text-center text-[#717171] text-xs'>Our membership management software provides full automation of membership renewals and payments</p>
                </div>
                <div className='box-main'>
                    <Image className='h-10 w-10' src="/image/main/people.png" height={1000} width={1000} priority alt="icon" />
                    <h1 className='mt-2 text-[#4D4D4D] text-2xl font-bold'>Clubs And Groups</h1>
                    <p className='mt-3 text-center text-[#717171] text-xs'>Our membership management software provides full automation of membership renewals and payments</p>
                </div>
            </div>
        </div>
    )
}

export default Community
