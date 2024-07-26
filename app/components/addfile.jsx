import React from 'react'

function Addfile({cancel,confirm}) {
  return (
    <div className=''>
      <div className='absolute top-0 left-0 h-screen w-screen bg-black opacity-50 z-10'></div>
      <div className='absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-20'>
        <div className='bg-white rounded-lg p-4'>
            <h1 className='font-bold text-lg'>File Upload</h1>
            <hr className='my-3'/>
            <div className='flex justify-end gap-3'>
                <button onClick={cancel} className='rounded-lg p-2 px-3 bg-white border border-gray-200 text-black'>Cancel</button>
                <button onClick={confirm} className='rounded-lg p-2 px-3 bg-[#0F75BC] text-white'>Continue</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Addfile
