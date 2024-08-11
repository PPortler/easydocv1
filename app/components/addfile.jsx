"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { useSession } from 'next-auth/react';
import Loader from './loader';
import Alert from './alert';

function Addfile({ cancel, setShowAdd }) {

  const { data: session } = useSession();

  const [File, setFile] = useState(null);
  const [ImageFile, setImageFile] = useState('')
  const [notFile, setNotFile] = useState(false)
  const inputFileRef = useRef(null);

  const [statusAlert, setStatusAlert] = useState(false);

  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState(null)
  const [fileType, setFileType] = useState('')

  const [statusLoad, setStatusLoad] = useState(false);

  useEffect(() => {
    const addFileArea = document.getElementById('addfileArea');

    addFileArea.addEventListener("click", openfile);
  }, [])


  function openfile() {
    const input_file = inputFileRef.current;
    input_file.click();
  }

  function handleFile(e) {

    setFile(e.target.files[0])
    const files = e.target.files[0];
    if(!files) return;
    const type = files.name.split('.').pop();
    if (files) {
      setImageFile(URL.createObjectURL(files));
      setFile(files);
      setFileType(type);
    }
  }

  useEffect(() => {
    if (File) {
      setNotFile(false);
    }
  }, [File], [notFile])

  function handleUpload() {
    setStatusLoad(true);

    if (!File) return setStatusLoad(false), setNotFile(true);

    const storageRef = ref(storage, `${session?.user?.email}/files/${File.name}`);
    const uploadTask = uploadBytesResumable(storageRef, File);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        setStatusLoad(false);
        console.log("upload failed!", err);
      },
      async () => {
        try {
          getDownloadURL(uploadTask.snapshot.ref).then((fileURL) => {
            setFileURL(fileURL);
            sendFiletoDB(fileURL);
          })

        } catch (err) {
          alert("Failed to get URL!")
          setStatusLoad(false);
        }
      }
    )


  }



  async function sendFiletoDB(url) {

    if (!url) return setStatusLoad(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/upload/${session?.user?.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fileName: File.name, fileURL: url, fileType: fileType })
      })
      if (res.ok) {
        setShowAdd(false)
        setImageFile('')
        setProgress(0)
        setFile(null)
        setStatusLoad(false)
        alert(`${File.name} อัพโหลดสำเร็จ`)
        window.location.reload();
      }

    } catch (err) {
      console.log(err);
      setStatusLoad(false);
    }
  }
  function clearFile() {
    setImageFile('');
    setFile(null);
  }


  return (
    <>
      <div id="showUpload" className='z-40'>
        <div className='fixed top-0 left-0 h-screen w-screen bg-black opacity-50 z-10'></div>
        <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-20'>
          <div className='bg-white rounded-lg p-4'>
            <h1 className='font-bold text-lg'>อัพโหลดไฟล์</h1>
            <hr className='my-3' />
            <div id="addfileArea" className={`relative hover:cursor-pointer hover:bg-gray-200 transition-colors border-2 rounded-md ${notFile ? "border-red-500" : "border-[#0F75BC]"}  flex flex-col text-center items-center gap-3 p-10 border-dotted `}>
              <input type="file" ref={inputFileRef} onChange={handleFile} id="input_file" hidden />

              {File ? (
                fileType === 'pdf' ? (
                  <>
                    <Image className='w-24 h-24' src={'/image/myfile/pdf.png'} height={1000} width={1000} priority alt="upload"></Image>
                    <p>อัพโหลด: {File.name}</p>
                    <p>{progress} %</p>
                    <Image onClick={clearFile} className='hover:cursor-pointer absolute top-0 right-0 m-3 w-6 h-6' src="/image/myfile/close_black.png" height={1000} width={1000} priority alt="upload"></Image>
                  </>
                ) : fileType === 'docx' ? (
                  <>
                    <Image className='w-24 h-24' src={'/image/myfile/doc.png'} height={1000} width={1000} priority alt="upload"></Image>
                    <p>อัพโหลด: {File.name}</p>
                    <p>{progress} %</p>
                    <Image onClick={clearFile} className='hover:cursor-pointer absolute top-0 right-0 m-3 w-6 h-6' src="/image/myfile/close_black.png" height={1000} width={1000} priority alt="upload"></Image>
                  </>
                ) : fileType === 'xlsx' ? (
                  <>
                    <Image className='w-24 h-24' src={'/image/myfile/xlsx.png'} height={1000} width={1000} priority alt="upload"></Image>
                    <p>อัพโหลด: {File.name}</p>
                    <p>{progress} %</p>
                    <Image onClick={clearFile} className='hover:cursor-pointer absolute top-0 right-0 m-3 w-6 h-6' src="/image/myfile/close_black.png" height={1000} width={1000} priority alt="upload"></Image>
                  </>
                ) : fileType === 'zip' || fileType === 'rar' ? (
                  <>
                    <Image className='w-24 h-24' src={'/image/myfile/zip.png'} height={1000} width={1000} priority alt="upload"></Image>
                    <p>อัพโหลด: {File.name}</p>
                    <p>{progress} %</p>
                    <Image onClick={clearFile} className='hover:cursor-pointer absolute top-0 right-0 m-3 w-6 h-6' src="/image/myfile/close_black.png" height={1000} width={1000} priority alt="upload"></Image>
                  </>
                ) : (
                  <>
                    <Image className='w-24 h-24' src={ImageFile || '/image/myfile/documents.png'} height={1000} width={1000} priority alt="upload"></Image>
                    <p>อัพโหลด: {File.name}</p>
                    <p>{progress} %</p>
                    <Image onClick={clearFile} className='hover:cursor-pointer absolute top-0 right-0 m-3 w-6 h-6' src="/image/myfile/close_black.png" height={1000} width={1000} priority alt="upload"></Image>
                  </>
                )
              ) : (
                <>
                  <Image className='w-24 h-24' src="/image/myfile/cloud-computing.png" height={1000} width={1000} priority alt="upload"></Image>
                  <p className='text-gray-500'>วางไฟล์หรือคลิก <br /> เพื่ออัพโหลดไปยังไดรเวอร์ของคุณ</p>
                  {notFile && (
                    <p className='text-red-500'>*กรุณาใส่ไฟล์ของคุณ</p>
                  )}
                </>
              )
              }
            </div>
            <div className='mt-5 flex justify-end gap-3'>
              <button onClick={cancel} className='rounded-lg p-2 px-3 bg-white border border-gray-200 text-black'>ยกเลิก</button>
              <button onClick={handleUpload} className='rounded-lg p-2 px-3 bg-[#0F75BC] text-white'>อัพโหลด</button>
            </div>
          </div>
        </div>

      </div>
      <div id="loader" style={{ opacity: statusLoad ? "1" : "0", display: statusLoad ? "" : "none" }}>
        <Loader />
      </div>

      {File && (
        <div id="alert" style={{ display: statusAlert ? "" : "none" }}>
          <Alert fileName={File.name} setStatusAlert={setStatusAlert} />
        </div>
      )}
    </>
  )
}

export default Addfile
