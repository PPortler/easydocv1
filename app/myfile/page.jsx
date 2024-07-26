"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Addfile from '../components/addfile'

function MyfilePage() {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.replace('/login')
        };
    }, [session], [router])

    const [dataUser, setDataUser] = useState();

    useEffect(() => {
        if (session?.user?.email) {
            getUser(session?.user?.email);
        }
     
    }, [])

    async function getUser(email) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/${email}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Error get data from api")
            }

            const data = await res.json();
            setDataUser(data.user)

        } catch (err) {
            console.log("Error fetch api myfilePage", err);
        }
    }

    const [showAdd, setShowAdd] = useState(false)

    useEffect(()=>{
        if(showAdd){
            document.body.classList.add('no_scroll')
        }else{
            document.body.classList.remove('no_scroll')

        }
    },[showAdd])
    function handleShowAdd() {
        setShowAdd(prev => !prev);
        console.log(showAdd);
    }

    function cancelAdd(){
        setShowAdd(false);
    }

    function confirmAdd(){
        setShowAdd(false)
    }


    return (
        <div>
            <div className='md:flex'>
                <Navbar />
                <div className='w-screen text-black mt-10 '>
                    <div className='flex justify-end items-center gap-3 px-5 '>
                        <Image className='h-5 w-5' src="/image/myfile/notification.png" height={1000} width={1000} alt="icon" priority />
                        <Image className='h-5 w-5' src="/image/myfile/settings.png" height={1000} width={1000} alt="icon" priority />
                        <Image className='h-5 w-5' src="/image/myfile/user.png" height={1000} width={1000} alt="icon" priority />
                        <button onClick={() => signOut()} className='p-1 shadow-md px-3 bg-red-500 text-white rounded-lg'>Logout</button>
                    </div>
                    <hr className='my-3 bg-black ' />
                    <div className='flex lg:flex-row items-end flex-col gap-5 md:justify-between px-10 mt-10'>
                        <div className='gap-3 flex items-center w-full lg:w-4/12'>
                            <label className='text-lg font-bold'>Search</label>
                            <input type="text" className='border border-gray-300 p-1 w-full 12 px-3 shadow-sm rounded-md' placeholder='file...' />
                        </div>
                        <div className='flex  items-center gap-3'>
                            <div className='flex justify-center items-center gap-2'>
                                <Image className='w-3 h-3' src="/image/myfile/down-arrow.png" height={1000} width={1000} priority alt="icon"></Image>
                                <p>Last modified by me</p>
                                <Image className='w-3 h-3' src="/image/myfile/down.png" height={1000} width={1000} priority alt="icon"></Image>
                            </div>
                            <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>

                        </div>
                    </div>
                    <hr className='my-5 mx-5 bg-black ' />
                    <div className='relative h-96 mx-5 p-5 flex flex-col shadow-md border border-gray-200 rounded-lg'>
                        <h1 className='my-5'>Folders</h1>
                        <div className='relative overflow-y-scroll h-4/5 shadow-inner '>
                            <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>
                                <Link href="#" className='shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3'>
                                    <div className='flex gap-3 items-center'>
                                        <Image className='w-6 h-6' src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                        <p>Colab Notebook</p>
                                    </div>
                                    <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                </Link>

                            </div>
                        </div>
                        <button onClick={handleShowAdd} className='absolute bottom-0 right-0 m-5'>
                            <Image className='w-12 h-12 transition-opacity opacity-40 hover:cursor-pointer hover:opacity-100 ' src="/image/myfile/plus.png" height={1000} width={1000} priority alt="icon"></Image>
                        </button>


                    </div>
                </div>

            </div>
            <div style={{ display: showAdd ? "block" : "none" }}>
                <Addfile 
                    cancel={cancelAdd}
                    confirm={confirmAdd}
                />
            </div>
        </div>
    )
}

export default MyfilePage
