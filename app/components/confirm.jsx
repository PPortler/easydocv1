

import React from 'react'
import Image from 'next/image'


function Confirm({ title, confirm, cancel, role }) {

    return (
        <div>
            <div className='fixed z-10 top-0 left-0 h-screen w-screen bg-black opacity-30'></div>
            <div className='fixed z-20 top-0 left-0 h-screen w-screen flex justify-center items-center'>
                <div className='flex justify-center flex-col items-center  p-5 border rounded-md bg-white shadow-lg'>
                    {role === 'delete' ? (
                        <Image className='h-28 w-28' src="/image/main/delete.png" height={1000} width={1000} priority alt="icon"></Image>

                    ) : role === 'confirm' ? (
                        <Image className='h-28 w-28' src="/image/confirm.png" height={1000} width={1000} priority alt="icon"></Image>
                    ) : null}
                    <h1 className='mt-5 font-bold text-center text-ellipsis overflow-hidden whitespace-nowrap  max-w-44 md:max-w-60 lg:max-w-72'>Do you want to delete <br />"{title}" ?</h1>
                    <div className='mt-5 flex gap-3 '>
                        <button onClick={cancel} className='hover:cursor-pointer p-2 px-3 bg-gray-500 text-white rounded-md'>Cancle</button>
                        {role === 'delete' ? (
                            <button onClick={confirm} className='hover:cursor-pointer p-2 px-3 bg-red-500 text-white rounded-md'>Delete</button>
                        ) : role === 'confirm' ? (
                            <button onClick={confirm} className='hover:cursor-pointer p-2 px-3 bg-green-500 text-white rounded-md'>Confirm</button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm
