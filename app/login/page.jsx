"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbarlogin from '../components/navbarlogin'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loader from '../components/loader'

function LoginPage() {

    const [statusLoad, setStatusLoad] = useState(true)
    useEffect(() => {
        setStatusLoad(false)
    }, [])

    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.replace('/myfile')
        };
    }, [session], [router])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    async function handleSubmit(e) {
        e.preventDefault();
        setStatusLoad(true)

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            if (res.error) {
                setError("Invalid credentials");
                setStatusLoad(false)
                return;
            }
            
            router.replace('/myfile')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Navbarlogin />
            <div className='size-container justify-center mx-auto  items-center flex gap-20 '>
                <div className=' w-10/12 md:w-8/12 lg:w-4/12 flex flex-col justify-between '>
                    <h1 className='text-3xl font-bold'>Login</h1>
                    <p className='text-gray-500 text-xs mt-2'>Login to access your travelwise account</p>
                    <form onSubmit={handleSubmit} className='mt-7'>
                        <div className='relative'>
                            <input onChange={(e) => setEmail(e.target.value)} className='px-3 w-full border p-2 rounded-md' type="text" placeholder='Enter your email' />
                            <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Email</span>
                        </div>
                        <div className='mt-4 relative'>
                            <input onChange={(e) => setPassword(e.target.value)} className='px-3 w-full border p-2 rounded-md' type="password" placeholder='Enter your password' />
                            <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Password</span>
                        </div>
                        {error && (
                            <div className='mt-1 text-xs rounded-md p-1 px-2 text-white bg-red-500 w-fit'>
                                * {error}
                            </div>
                        )}
                        <div className='mt-4 flex  text-xs justify-between'>
                            <div className='flex gap-1'>
                                <input className=' border border-black' type="checkbox" />
                                <label >Remember me</label>
                            </div>
                            <Link className='text-[#FF8682] hover:underline' href="/forgot" >Forgot Password ?</Link>
                        </div>

                        <button type='submit' className='w-full mt-8 text-white bg-[#2581C1] p-2 rounded-lg'>Login</button>
                    </form>
                    <p className='text-center mt-3 text-xs'>Don't have an account? <Link href="/register" className='text-[#FF8682] hover:underline'>Sign up</Link></p>
                    <div className='relative'>
                        <hr className='mt-14 text-gray-500' />
                        <div className='flex justify-center'>
                            <p className='bg-white text-gray-500 w-fit p-1 relative  text-xs text-center ' style={{ top: "-.8rem" }}>Or login with</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 mt-3'>
                        <Link className='flex border rounded-lg border-[#2581C1] p-2 px-4 justify-center' href="#">
                            <Image className='w-6 h-6' src="/image/main/google.png" width={1000} height={1000} priority alt="icon" />
                        </Link>
                        <Link className='flex border rounded-lg border-[#2581C1] p-2 px-4 justify-center' href="#">
                            <Image className='w-6 h-6' src="/image/main/facebook.png" width={1000} height={1000} priority alt="icon" />
                        </Link>
                       
                    </div>
                </div>
                <Image className='hidden lg:block rounded-lg shadow-md h-fit w-96' src="/image/main/poster_login.png" height={1000} width={1000} priority alt="poster-login"></Image>
            </div>
            <div id="loader" style={{opacity: statusLoad ? "1" : "0", display: statusLoad ? "":"none"}}>
                <Loader />
            </div>
        </div>

    )
}

export default LoginPage
