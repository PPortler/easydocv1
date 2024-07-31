"use client"

import React from 'react'
import Image from 'next/image'


function Alert({ fileName, setStatusAlert }) {

    function setStatus(){
        setStatusAlert(false);
    }

    return (
        <div>
            <div className='absolute z-10 top-0 left-0 h-screen w-screen bg-black opacity-30'></div>
            <div className='absolute z-20 top-0 left-0 h-screen w-screen flex justify-center items-center'>
                <div className='flex justify-center flex-col items-center  p-5 border rounded-md bg-white shadow-lg'>

                    <Image className='h-28 w-28' src="/image/main/delete.png" height={1000} width={1000} priority alt="icon"></Image>
                    <h1 className='mt-5 font-bold'>Uploaded: {fileName}</h1>
                    <div className='mt-5 flex gap-3 '>
                        <button  onClick={setStatus} className='hover:cursor-pointer p-2 px-3 bg-gray-500 text-white rounded-md'>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert
