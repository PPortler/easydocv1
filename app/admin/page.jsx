"use client"

import React from 'react'
import NavbarAdmin from '../components/navbarAdmin'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Loader from '../components/loader'
import Confirm from '../components/confirm'

function Admin() {

    const [statusLoad, setStatusLoad] = useState(true)
    useEffect(() => {
        setStatusLoad(false)
    }, [])


    const [dataUser, setDataUser] = useState([])
    const [idNameUser,setIdNameUser] = useState('');

    async function getDataUser() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Error fetch api in getDataUser for admin");
            }

            const data = await res.json();
            setDataUser(data.users);
        } catch (err) {
            console.log(err);
        }
    }

    const [showConfirm, setShowConfirm] = useState(false);
    const [userID, setUserID] = useState('');

    useEffect(()=>{
        if(showConfirm){
            document.body.classList.add('no_scroll');
        }else{
            document.body.classList.remove('no_scroll');
        }
    },[showConfirm])
    
    function handleShowConfirm(id) {
        const tempName = dataUser.find(data => data._id === id);
        if(tempName){
            setIdNameUser(tempName.email);
        }
        setUserID(id)
        setShowConfirm(true);
    }
    function handleCancel() {
        setShowConfirm(false);
        setStatusLoad(false)
    }
    function handleConfirm() {
        setStatusLoad(true)
        DeleteUser(userID)
        setShowConfirm(false);
    }

    async function DeleteUser(id) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/${id}`, {
                method: "DELETE"
            })

            if (!res.ok) {
                alert("faile");
                handleCancel();
                throw new Error("Error fetch api delete user");
            }

            handleCancel();
            window.location.reload();
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getDataUser();

    }, [])
    return (
        <div>
            <NavbarAdmin />
            <div className='size-screen size-container '>

                <div className='border rounded-md p-5 shadow-md '>
                    <div className='flex justify-between items-center'>
                        <h1 className='my-3 font-bold text-black'>All Users in Easy Doc</h1>
                        <Link href="#" className='text-sm text-[#2581C1] hover:underline'>view more ({dataUser.length})</Link>
                    </div>
                    <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  overflow-y-scroll h-96 shadow-inner'>
                        {dataUser.length > 0 ? (
                            dataUser.map((user, index) => (
                                <div key={index} className=' flex flex-col lg:flex-row lg:items-center lg:justify-between border rounded-md p-5'>
                                    <div className=' lg:flex lg:gap-10 w-full flex gap-5 lg:items-center'>
                                        <Image src="/image/myfile/user.png" height={1000}
                                            className='w-10 h-10 rounded-full ' width={1000} priority alt="profile"></Image>
                                        <div className='overflow-hidden w-full grid grid-cols-2 gap-3 lg:grid-cols-4 lg:pe-20'>
                                            <p className='font-bold '>Email: <br /> <span className='font-thin block overflow-hidden max-w-sx whitespace-nowrap text-ellipsis'>{user.email}</span></p>
                                            <p className='font-bold '>Name: <br /> <span className='font-thin block overflow-hidden max-w-sx whitespace-nowrap text-ellipsis'>{user.firstName} {user.lastName}</span></p>
                                            <p className='font-bold '>Phone: <br /> <span className='font-thin block overflow-hidden max-w-sx whitespace-nowrap text-ellipsis'>{user.phone}</span></p>
                                            <p className='font-bold '>Password: <br /> <span className='font-thin block overflow-hidden max-w-sx whitespace-nowrap text-ellipsis' >{user.password}</span></p>
                                            <p className='font-bold '>Role: <br /> <span className='font-thin block overflow-hidden max-w-sx whitespace-nowrap text-ellipsis' >{user.role}</span></p>
                                        </div>
                                    </div>
                                    <div className='flex gap-1 justify-end mt-5 lg:mt-0'>
                                        <button className='border rounded-md p-2 px-3 bg-green-500 text-white'>View</button>
                                        <button className='border rounded-md p-2 px-3 bg-gray-500 text-white'>Edit</button>
                                        <button onClick={()=>handleShowConfirm(user._id)} className='border rounded-md p-2 px-3 bg-red-500 text-white'>Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (

                            <div className='p-3 rounded-md bg-gray-100 absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                                <p className=' w-fit p-2 text-xsrounded-md'>Not User in easy doc.</p>
                            </div>
                        )}

                    </div>

                </div>
            </div>
            <div id="loader" style={{opacity: statusLoad ? "1" : "0", display: statusLoad ? "":"none"}}>
                <Loader />
            </div> 

            {showConfirm ? (
                <>
                    <Confirm
                        title={`Do you want to delete "${idNameUser}" ?`}
                        cancel={handleCancel}
                        confirm={handleConfirm}
                        role= "delete"
                    />
                </>
            ) : null}
        </div>
    )
}

export default Admin
