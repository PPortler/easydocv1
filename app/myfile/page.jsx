"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Addfile from '../components/addfile'
import Loader from '../components/loader'


function MyfilePage() {

    const [statusLoad, setStatusLoad] = useState(true)
    useEffect(() => {
        setStatusLoad(false)
    }, [])

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.replace('/login')
        };
    }, [session])

    const [dataUser, setDataUser] = useState([]);
    const [myFile, setMyFile] = useState([]);

    const [styleMenu, setStyleMenu] = useState('span')


    useEffect(() => {
        if (session?.user?.email) {
            getUser(session?.user?.email);
            getFile(session?.user?.email);
        }


    }, [])

    async function getFile(email) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/upload/${email}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Error get data from api")
            }

            const data = await res.json();
            setMyFile(data.myfile);


        } catch (err) {
            console.log("Error fetch api myfilePage", err);
        }
    }

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

    useEffect(() => {
        if (showAdd) {
            document.body.classList.add('no_scroll')

        } else {
            document.body.classList.remove('no_scroll')
        }
    }, [showAdd])

    function handlecancel() {
        document.getElementById('showUpload').classList.add('hidden')
        setShowAdd(false)

    }
    function handleShowAdd() {
        document.getElementById('showUpload').classList.remove('hidden')
        setShowAdd(prev => !prev);
    }

    const [search, setSearch] = useState('')
    const [getItemSearch, setGetItemSearch] = useState([])
    const [selectSearch, setSelectSearch] = useState('')

    function handleCloseSearch() {
        setSelectSearch('');
        setSearch('');
    }

    function handleSearch(str ,e) {
        e.preventDefault();

        document.getElementById('search').value = '';
        setSelectSearch(str)

        getSearch();
    }

    function getSearch() {
        if (!search && !selectSearch) {
            setGetItemSearch(myFile);
            return;
        }

        if (!selectSearch) {
            const lowercaseSearch = search.toLowerCase();
            const tempItem = myFile.filter(d => d.fileName.toLowerCase().includes(lowercaseSearch));
            setGetItemSearch(tempItem);

        } else {
            const lowercaseSearch = selectSearch.toLowerCase();
            const tempItem = myFile.filter(d => d.fileName.toLowerCase().includes(lowercaseSearch));
            setGetItemSearch(tempItem);

        }
    }

    useEffect(() => {
        if (!selectSearch && !search) {
            setGetItemSearch(myFile);
        }
        getSearch();

    }, [selectSearch, search, myFile])

    return (
        <div>
            <Navbar data={dataUser} />
            <div className='md:flex lg:ms-16'>

                <div className='w-screen text-black '>
                    <div className='justify-end items-center gap-3 px-5 mt-5 flex'>
                        <Link href="/admin">
                            <Image className='hover:cursor-pointer h-5 w-5' src="/image/myfile/admin.png" height={1000} width={1000} alt="icon" priority />
                        </Link>
                        <Image className='hover:cursor-pointer h-5 w-5' src="/image/myfile/notification.png" height={1000} width={1000} alt="icon" priority />
                        <Image className='hover:cursor-pointer h-5 w-5' src="/image/myfile/settings.png" height={1000} width={1000} alt="icon" priority />
                        <Image className='hover:cursor-pointer h-5 w-5' src="/image/myfile/user.png" height={1000} width={1000} alt="icon" priority />
                    </div>
                    <hr className='my-3 bg-black ' />
                    <div style={{ zIndex: "1" }} className=' border-b  bg-white sticky top-0 flex lg:flex-row items-end flex-col gap-5 md:justify-between p-5 px-10'>
                        <form onSubmit={(e)=> handleSearch(search,e)} className=' overflow-hidden flex items-center border rounded-md border-[#0F75BC] w-full lg:w-4/12 shadow-sm '>
                            <input id="search" onChange={(e) => setSearch(e.target.value)} type="text" className='w-full h-8 px-4 rounded-s-md' placeholder='Search file...' />
                            <button type='submit' className='text-white  h-8 px-2 bg-[#0F75BC] '>
                                <Image className='h-5 w-6' src="/image/myfile/search.png" height={1000} width={1000} alt="icon" priority />
                            </button>
                        </form>

                        <div className='flex  items-center gap-3'>
                            {selectSearch && (
                                <div className='bg-gray-500 p-1 px-2 text-white rounded-lg flex justify-between gap-1'>
                                    <p>{selectSearch}</p>
                                    <Image onClick={handleCloseSearch} className='hover:cursor-pointer w-3 h-3' src="/image/myfile/close.png" height={1000} width={1000} priority alt="icon"></Image>
                                </div>
                            )}
                            <div className='hidden lg:flex justify-center items-center gap-2'>
                                <Image className='w-3 h-3' src="/image/myfile/down-arrow.png" height={1000} width={1000} priority alt="icon"></Image>
                                <p>Last modified by me</p>
                                <Image className='w-3 h-3' src="/image/myfile/down.png" height={1000} width={1000} priority alt="icon"></Image>
                            </div>
                            <div className='flex'>
                                <div className={`p-1  hover:cursor-pointer ${styleMenu === 'block' ? "bg-gray-300 rounded-md" : ""}`} onClick={() => setStyleMenu('block')}>
                                    <Image className='w-6 h-6 ' src="/image/myfile/block.png" height={1000} width={1000} priority alt="icon"></Image>
                                </div>
                                <div className={`p-1  hover:cursor-pointer ${styleMenu === 'span' ? "bg-gray-300 rounded-md" : ""}`} onClick={() => setStyleMenu('span')}>
                                    <Image className='w-6 h-6 ' src="/image/myfile/span.png" height={1000} width={1000} priority alt="icon"></Image>
                                </div>
                            </div>
                            <Image className='w-6 h-6' src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                        </div>
                    </div>
                    <div className='z-0 my-5 relative mx-5 p-5 flex flex-col shadow-md border border-gray-200 rounded-lg'>
                        <h1 className='font-bold '>Folders</h1>
                        <div className='mt-3 relative '>
                            <div className={`${styleMenu === 'block' ? "grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3" : "grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2"} grid    gap-3`}>
                                {getItemSearch.length > 0 ? (
                                    getItemSearch.map((d, index) => (
                                        d.fileType === 'pdf' ? (
                                            <Link key={index} href="#" className={`${styleMenu === 'block' ? "flex-col" : ""} relative shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3`}>
                                                <div className={`${styleMenu === 'block' ? "flex-col" : ""} flex gap-3 items-center`}>
                                                    <Image className={`${styleMenu === 'block' ? "w-14 h-14" : "w-6 h-6"} `} src="/image/myfile/pdf.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    <div className='flex items-center w-full justify-center  '>
                                                        <p className=' whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{d.fileName}</p>
                                                        <Image className={`absolute right-0 ${styleMenu === 'block' ? "" : "hidden"} w-6 h-6  `} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    </div>
                                                </div>
                                                <Image className={`${styleMenu === 'block' ? "hidden" : ""} w-6 h-6`} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                            </Link>
                                        ) : d.fileType === 'docx' ? (
                                            <Link key={index} href="#" className={`${styleMenu === 'block' ? "flex-col" : ""} relative shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3`}>
                                                <div className={`${styleMenu === 'block' ? "flex-col" : ""} flex gap-3 items-center`}>
                                                    <Image className={`${styleMenu === 'block' ? "w-14 h-14" : "w-6 h-6"} `} src="/image/myfile/doc.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    <div className='flex items-center w-full justify-center  '>
                                                        <p className=' whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{d.fileName}</p>
                                                        <Image className={`absolute right-0 ${styleMenu === 'block' ? "" : "hidden"} w-6 h-6  `} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    </div>
                                                </div>
                                                <Image className={`${styleMenu === 'block' ? "hidden" : ""} w-6 h-6`} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                            </Link>
                                        ) : d.fileType === 'xlsx' ? (
                                            <Link key={index} href="#" className={`${styleMenu === 'block' ? "flex-col" : ""} relative shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3`}>
                                                <div className={`${styleMenu === 'block' ? "flex-col" : ""} flex gap-3 items-center`}>
                                                    <Image className={`${styleMenu === 'block' ? "w-14 h-14" : "w-6 h-6"} `} src="/image/myfile/xlsx.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    <div className='flex items-center w-full justify-center  '>
                                                        <p className=' whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{d.fileName}</p>
                                                        <Image className={`absolute right-0 ${styleMenu === 'block' ? "" : "hidden"} w-6 h-6  `} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    </div>
                                                </div>
                                                <Image className={`${styleMenu === 'block' ? "hidden" : ""} w-6 h-6`} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                            </Link>
                                        ) : d.fileType === 'zip' || d.fileType === 'rar' ? (
                                            <Link key={index} href="#" className={`${styleMenu === 'block' ? "flex-col" : ""} relative shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3`}>
                                                <div className={`${styleMenu === 'block' ? "flex-col" : ""} flex gap-3 items-center`}>
                                                    <Image className={`${styleMenu === 'block' ? "w-14 h-14" : "w-6 h-6"} `} src="/image/myfile/zip.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    <div className='flex items-center w-full justify-center  '>
                                                        <p className=' whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{d.fileName}</p>
                                                        <Image className={`absolute right-0 ${styleMenu === 'block' ? "" : "hidden"} w-6 h-6  `} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    </div>
                                                </div>
                                                <Image className={`${styleMenu === 'block' ? "hidden" : ""} w-6 h-6`} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                            </Link>
                                        ) : (
                                            <Link key={index} href="#" className={`${styleMenu === 'block' ? "flex-col" : ""} relative shadow-sm rounded-lg bg-gray-100 flex justify-between p-2 px-3`}>
                                                <div className={`${styleMenu === 'block' ? "flex-col" : ""} flex gap-3 items-center`}>
                                                    <Image className={`${styleMenu === 'block' ? "w-20 h-20" : "w-6 h-6"} `} src={d.fileURL} height={1000} width={1000} priority alt="icon"></Image>
                                                    <div className='flex items-center w-full justify-center  '>
                                                        <p className=' whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{d.fileName}</p>
                                                        <Image className={`absolute right-0 ${styleMenu === 'block' ? "" : "hidden"} w-6 h-6  `} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                                    </div>
                                                </div>
                                                <Image className={`${styleMenu === 'block' ? "hidden" : ""} w-6 h-6`} src="/image/myfile/dot.png" height={1000} width={1000} priority alt="icon"></Image>
                                            </Link>
                                        )
                                    ))
                                ) : (
                                    <div className='text-sm text-gray-400'>Press plus to add your files.</div>
                                )}


                            </div>
                        </div>
                        <button onClick={handleShowAdd} className='fixed md:absolute bottom-0 right-0 m-5'>
                            <Image className='w-12 h-12 transition-opacity opacity-40 hover:cursor-pointer hover:opacity-100 ' src="/image/myfile/plus.png" height={1000} width={1000} priority alt="icon"></Image>
                        </button>


                    </div>
                </div>

            </div>
            <div style={{ display: showAdd ? "block" : "none" }}>
                <Addfile
                    cancel={handlecancel}
                    setShowAdd={setShowAdd}
                />
            </div>
            <div id="loader" style={{ opacity: statusLoad ? "1" : "0", display: statusLoad ? "" : "none" }}>
                <Loader />
            </div>
        </div>
    )
}

export default MyfilePage
