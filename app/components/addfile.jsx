"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function Addfile({ cancel }) {
  const [File, setFile] = useState(null);
  const [ImageFile, setImageFile] = useState('')
  const inputFileRef = useRef(null);

  useEffect(() => {
    const addFileArea = document.getElementById('addfileArea');

    addFileArea.addEventListener("click", openfile);
  }, [])


  function openfile() {
    const input_file = inputFileRef.current;
    input_file.click();
  }

  function handleFile(e) {
    const files = e.target.files[0];
    if (files) {
      setImageFile(URL.createObjectURL(files));
      setFile(files);
    }
  }

  function clearFile() {
    setImageFile('');
    setFile(null)
  }


  return (
    <div id="showUpload" className='z-50'>
      <div className='fixed top-0 left-0 h-screen w-screen bg-black opacity-50 z-10'></div>
      <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-20'>
        <div className='bg-white rounded-lg p-4'>
          <h1 className='font-bold text-lg'>File Upload</h1>
          <hr className='my-3' />
          <div id="addfileArea" className='relative hover:cursor-pointer hover:bg-gray-200 transition-colors border-2 rounded-md border-[#0F75BC] flex flex-col text-center items-center gap-3 p-10 border-dotted '>
            <input type="file" ref={inputFileRef} onChange={handleFile} id="input_file" hidden />

            {File ? (
              <>
                <Image className='w-24 h-24' src={ImageFile} height={1000} width={1000} priority alt="upload"></Image>
                <p>Upload: {File.name}</p>
                <Image onClick={clearFile} className='hover:cursor-pointer absolute top-0 right-0 m-3 w-6 h-6' src="/image/myfile/close_black.png" height={1000} width={1000} priority alt="upload"></Image>
              </>
            ) : (
              <>
                <Image className='w-24 h-24' src="/image/myfile/cloud-computing.png" height={1000} width={1000} priority alt="upload"></Image>
                <p className='text-gray-500'>Drop file or click <br/> for upload to your driver.</p>
              </>
            )}
          </div>
          <div className='mt-5 flex justify-end gap-3'>
            <button onClick={cancel} className='rounded-lg p-2 px-3 bg-white border border-gray-200 text-black'>Cancel</button>
            <button className='rounded-lg p-2 px-3 bg-[#0F75BC] text-white'>Upload</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addfile
