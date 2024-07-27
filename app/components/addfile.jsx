"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function Addfile({ cancel, confirm }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [typeName, setTypeName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputFileRef = useRef(null);
  const dropAreaRef = useRef(null);

  useEffect(() => {
    const inputFile = inputFileRef.current;
    const dropArea = dropAreaRef.current;

    inputFile.addEventListener("change", handleFileSelect);
    dropArea.addEventListener("click", openFileInput);
    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      inputFile.removeEventListener("change", handleFileSelect);
      dropArea.removeEventListener("click", openFileInput);
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      const imgLink = URL.createObjectURL(file);
      setImageSrc(imgLink);
      setFileName(file.name);
      setTypeName(file.name.split('.').pop());
    }
  }

  function openFileInput() {
    const inputFile = inputFileRef.current;
    inputFile.click();
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  }

  function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const imgLink = URL.createObjectURL(file);
      setImageSrc(imgLink);
      setFileName(file.name);
      setTypeName(file.name.split('.').pop());
     
    }
  }

  async function confirmAdd() {
   
    const inputFile = inputFileRef.current;
  
    if (!inputFile.files.length) {
      console.error('No file selected');
      return;
    }
  
    const file = inputFile.files[0];
    const formData = new FormData();
    formData.append('file', file);
 
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData.message);
        confirm(); // Call confirm function on success
      } else {
        const errorText = await res.text(); // Read response as text
        console.error('Upload Failed:', errorText);
        alert(`Upload Failed: ${errorText}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  }
  
  

  return (
    <div className='z-50'>
      <div className='fixed top-0 left-0 h-screen w-screen bg-black opacity-50 z-10'></div>
      <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-20'>
        <div className='bg-white rounded-lg p-4'>
          <h1 className='font-bold text-lg'>File Upload</h1>
          <hr className='my-3' />
          <div
            id="drop-area"
            ref={dropAreaRef}
            className={`hover:cursor-pointer hover:bg-gray-300 relative bg-gray-100 rounded-md border-2 border-dotted border-[#0F75BC] p-10 ${isDragging ? 'bg-gray-300' : ''}`}
          >
            <input type="file" hidden id="input-file" ref={inputFileRef} />
            <div className='gap-2 flex flex-col justify-center items-center'>
              {!imageSrc && (
                <>
                  <Image className='w-20 h-20' src="/image/myfile/cloud-computing.png" height={1000} width={1000} priority alt="icon-upload"></Image>
                  <p className='text-gray-500'>Drop item or click for upload here</p>
                </>
              )}
              {imageSrc && (
                typeName === 'pdf' ? (
                  <div className='gap-2 flex flex-col justify-center items-center'>
                    <Image className='w-20 h-20' src='/image/myfile/pdf.png' height={1000} width={1000} priority alt="uploaded-image"></Image>
                    <p className='text-gray-500'>Upload: {fileName}</p> {/* แสดงชื่อไฟล์ที่อัพโหลด */}
                  </div>
                ) : typeName === 'docx' ? (
                  <div className='gap-2 flex flex-col justify-center items-center'>
                    <Image className='w-20 h-20' src='/image/myfile/doc.png' height={1000} width={1000} priority alt="uploaded-image"></Image>
                    <p className='text-gray-500'>Upload: {fileName}</p> {/* แสดงชื่อไฟล์ที่อัพโหลด */}
                  </div>
                ) : typeName === 'png' || 'jpg' || 'webp' || 'svg' ? (
                  <div className='gap-2 flex flex-col justify-center items-center'>
                    <Image className='w-20 h-20' src={imageSrc} height={1000} width={1000} priority alt="uploaded-image"></Image>
                    <p className='text-gray-500'>upload: {fileName}</p> {/* แสดงชื่อไฟล์ที่อัพโหลด */}
                  </div>
                ) : (
                  <div className='gap-2 flex flex-col justify-center items-center'>
                    <Image className='w-20 h-20' src='/image/myfile/documents.png' height={1000} width={1000} priority alt="uploaded-image"></Image>
                    <p className='text-gray-500'>upload: {fileName}</p> {/* แสดงชื่อไฟล์ที่อัพโหลด */}
                  </div>
                )
              )}
            </div>
          </div>
          <div className='mt-5 flex justify-end gap-3'>
            <button onClick={cancel} className='rounded-lg p-2 px-3 bg-white border border-gray-200 text-black'>Cancel</button>
            <button onClick={confirmAdd} className='rounded-lg p-2 px-3 bg-[#0F75BC] text-white'>Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addfile
