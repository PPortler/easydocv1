"use client"


import React from 'react'
import Link from 'next/link'
import style from './styles/navbar.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'

function Navbar() {

  const [checkSlider, setCheckSlider] = useState(false);

  function handleSlider() {
    const check = document.getElementById("checkSlider")
    setCheckSlider(prev => !prev);

    check.checked = !checkSlider
  }

  useEffect(() => {
    if (checkSlider) {
      document.body.classList.add("no_scroll");
    } else {
      document.body.classList.remove("no_scroll");
    }
  }, [checkSlider])
  return (
    <div className='w-fit z-10 shadow-lg'>
      <input id="checkSlider" type="checkbox" className={`${style.input_slider}`} />
      <div className='hidden  md:block bg-[#080325] pt-10 h-screen'>
        <div className='p-3'>
          <div onClick={handleSlider} className={`bg-[#0F75BC] rounded-full p-3 hover:cursor-pointer`}>
            <Image className=' w-6 h-5 ' src="/image/myfile/menu.png" width={1000} height={1000} alt="icon"></Image>
          </div>
        </div>
        <div className='mt-5 flex flex-col items-center '>
          <Link href="#" className='hover:bg-[#0F75BC] transition-colors w-full flex justify-center p-3 py-4'>
            <Image className=' w-6 h-6 ' src="/image/myfile/gallery.png" width={1000} height={1000} alt="icon"></Image>
          </Link>
          <Link href="#" className='hover:bg-[#0F75BC] transition-colors w-full flex justify-center p-3 py-4'>
            <Image className=' w-6 h-6 ' src="/image/myfile/status.png" width={1000} height={1000} alt="icon"></Image>
          </Link>
          <Link href="#" className='hover:bg-[#0F75BC] transition-colors w-full flex justify-center p-3 py-4'>
            <Image className=' w-6 h-6 ' src="/image/myfile/event.png" width={1000} height={1000} alt="icon"></Image>
          </Link>
          <Link href="#" className='hover:bg-[#0F75BC] transition-colors w-full flex justify-center p-3 py-4'>
            <Image className=' w-6 h-6 ' src="/image/myfile/messenger.png" width={1000} height={1000} alt="icon"></Image>
          </Link>
          <Link href="#" className='hover:bg-[#0F75BC] transition-colors w-full flex justify-center p-3 py-4'>
            <Image className=' w-6 h-6 ' src="/image/myfile/blogger.png" width={1000} height={1000} alt="icon"></Image>
          </Link>
          <Link href="#" className='hover:bg-[#0F75BC] transition-colors w-full flex justify-center p-3 py-4'>
            <Image className=' w-6 h-6 ' src="/image/myfile/settings_white.png" width={1000} height={1000} alt="icon"></Image>
          </Link>
        </div>

      </div>
      <div className={`${style.slider_myfile} z-50 text-white bg-[#080325] pt-10 h-screen`}>

        <div className='flex items-center text-2xl font-bold  p-3 gap-5'>
          <h1 >Easy Doc</h1>
          <div onClick={handleSlider} className={`${style.btn_toggle} p-3 hover:cursor-pointer`}>
            <Image className=' w-5 h-5 ' src="/image/myfile/close.png" width={1000} height={1000} alt="icon"></Image>
          </div>
        </div>
        <div className='mt-5 flex flex-col items-center '>
          <Link href="#" className=' hover:bg-[#0F75BC] transition-colors w-full flex p-5 py-4 gap-3'>
            <Image className=' w-6 h-6 ' src="/image/myfile/gallery.png" width={1000} height={1000} alt="icon"></Image>
            <p>My File</p>
          </Link>
          <Link href="#" className=' hover:bg-[#0F75BC] transition-colors w-full flex p-5 py-4 gap-3'>
            <Image className=' w-6 h-6 ' src="/image/myfile/status.png" width={1000} height={1000} alt="icon"></Image>
            <p>Status</p>
          </Link>
          <Link href="#" className=' hover:bg-[#0F75BC] transition-colors w-full flex p-5 py-4 gap-3'>
            <Image className=' w-6 h-6 ' src="/image/myfile/event.png" width={1000} height={1000} alt="icon"></Image>
            <p>Schedule</p>
          </Link>
          <Link href="#" className=' hover:bg-[#0F75BC] transition-colors w-full flex p-5 py-4 gap-3'>
            <Image className=' w-6 h-6 ' src="/image/myfile/messenger.png" width={1000} height={1000} alt="icon"></Image>
            <p>Message</p>
          </Link>
          <Link href="#" className=' hover:bg-[#0F75BC] transition-colors w-full flex p-5 py-4 gap-3'>
            <Image className=' w-6 h-6 ' src="/image/myfile/blogger.png" width={1000} height={1000} alt="icon"></Image>
            <p>Blog</p>
          </Link>
          <Link href="#" className=' hover:bg-[#0F75BC] transition-colors w-full flex p-5 py-4 gap-3'>
            <Image className=' w-6 h-6 ' src="/image/myfile/settings_white.png" width={1000} height={1000} alt="icon"></Image>
            <p>Setting</p>
          </Link>

        </div>

      </div>
      <div onClick={handleSlider} className={`bg-[#0F75BC] md:hidden rounded-e-full  fixed top-2/4 left-0 p-1 py-2 z-10 hover:cursor-pointer`}>
          <Image className=' w-5 h-5 ' src="/image/myfile/nextarrow.png" width={1000} height={1000} alt="icon"></Image>
      </div>

      <div onClick={handleSlider} style={{ display: checkSlider ? "block" : "none" }}>
        <div className='z-40 h-screen w-screen opacity-50 bg-black fixed top-0'></div>
      </div>
    </div>
  )
}

export default Navbar
