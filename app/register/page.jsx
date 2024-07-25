"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbarlogin from '../components/navbarlogin'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Loader from '../components/loader'

function RegisterPage() {

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

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Cpassword, setCpassword] = useState("")
    const [error, setError] = useState("")

    

    async function handleSubmit(e) {
        e.preventDefault();

        setStatusLoad(true);

        if (!firstName || !lastName || !phone || !email || !password) {
            setError("Please input all");
            setStatusLoad(false);
            return;
        }

        if (password !== Cpassword) {
            setError("Password don't match");
            setStatusLoad(false);
            return;
        }

        const check_agree = document.getElementById('check_agree');
        if (!check_agree.checked) {
            setError("you don't agree condision in easydoc");
            setStatusLoad(false);
            return;
        }

        try {
            const resCheckUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/checkuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            if (!resCheckUser.ok) {
                setStatusLoad(false);
                throw new Error("Error fetch api checkuser.")
            }

            const { user } = await resCheckUser.json()

            if (user) {
                setStatusLoad(false);
                setError("User already exists!")
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, phone, email, password })
            })

            if (res.ok) {
                router.push('/login');
            }
        } catch (err) {
            setStatusLoad(false);
            console.log("Error Fetch Api in register: ", err)
        }
    }

    return (
        <div>
            <Navbarlogin />
            <div className='size-container justify-center mx-auto  items-center flex-row-reverse flex gap-20 '>
                <div className=' w-10/12 md:w-8/12 xl:w-4/12 lg:w-5/12 flex flex-col justify-between '>
                    <h1 className='text-3xl font-bold'>Sign Up</h1>
                    <p className='text-gray-500 text-xs mt-2'>Let’s get you create your personal account.</p>
                    <form onSubmit={handleSubmit} className='mt-7'>
                        <div className='flex gap-3'>
                            <div className='relative w-full'>
                                <input onChange={(e) => setFirstName(e.target.value)} className='px-3 w-full border p-2 rounded-lg' type="text" placeholder='Your first name' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>First Name</span>
                            </div>
                            <div className='relative w-full'>
                                <input onChange={(e) => setLastName(e.target.value)} className='px-3 w-full border p-2 rounded-lg' type="text" placeholder='Your last name' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Last Name</span>
                            </div>
                        </div>
                        <div className='mt-4 flex gap-3'>
                            <div className='relative w-full'>
                                <input onChange={(e) => setEmail(e.target.value)} className='px-3 w-full border p-2 rounded-lg' type="text" placeholder='Enter your email' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Email</span>
                            </div>
                            <div className='relative w-full'>
                                <input onChange={(e) => setPhone(e.target.value)} className='px-3 w-full border p-2 rounded-lg' type="text" placeholder='Enter your phone number' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Phone Number</span>
                            </div>

                        </div>
                        <div className='mt-4 relative'>
                            <input onChange={(e) => setPassword(e.target.value)} className='px-3 w-full border p-2 rounded-lg' type="password" placeholder='Enter your password' />
                            <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Password</span>
                        </div>
                        <div className='mt-4 relative'>
                            <input onChange={(e) => setCpassword(e.target.value)} className='px-3 w-full border p-2 rounded-lg' type="password" placeholder='confirm password' />
                            <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>Confirm Password</span>
                        </div>
                        {error && (
                            <div className='mt-1 text-xs rounded-md p-1 px-2 text-white bg-red-500 w-fit'>
                                * {error}
                            </div>
                        )}
                        <div className='mt-4 flex  text-xs justify-between'>
                            <div className='flex gap-1'>
                                <input id="check_agree" className=' border border-black' type="checkbox" />
                                <label >I agree to all the <Link href="#" className='text-[#FF8682] hover:underline'>Terms</Link> and <Link href="#" className='text-[#FF8682] hover:underline'>Privacy Policies</Link></label>
                            </div>
                        </div>
                        <button type='submit' className='w-full mt-8 text-white bg-[#2581C1] p-2 rounded-lg'>Create account</button>
                    </form>
                    <p className='text-center mt-3 text-xs'>Already have an account? <Link href="/login" className='text-[#FF8682] hover:underline'>Login</Link></p>
                    <div className='relative'>
                        <hr className='mt-14 text-gray-500' />
                        <div className='flex justify-center'>
                            <p className='bg-white text-gray-500 w-fit p-1 relative  text-xs text-center ' style={{ top: "-.8rem" }}>Or login with</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-2 mt-3'>
                        <Link className='flex border rounded-lg border-[#2581C1] p-2 px-4 justify-center' href="#">
                            <Image className='w-6 h-6' src="/image/main/google.png" width={1000} height={1000} priority alt="icon" />
                        </Link>
                        <Link className='flex border rounded-lg border-[#2581C1] p-2 px-4 justify-center' href="#">
                            <Image className='w-6 h-6' src="/image/main/google.png" width={1000} height={1000} priority alt="icon" />
                        </Link>
                        <Link className='flex border rounded-lg border-[#2581C1] p-2 px-4 justify-center' href="#">
                            <Image className='w-6 h-6' src="/image/main/google.png" width={1000} height={1000} priority alt="icon" />
                        </Link>
                    </div>
                </div>
                <Image className='hidden lg:block rounded-lg shadow-md h-fit w-96' src="/image/main/poster_register.png" height={1000} width={1000} priority alt="poster-login"></Image>
            </div>
            <div id="loader" style={{ opacity: statusLoad ? "1" : "0", display: statusLoad ? "" : "none" }}>
                <Loader />
            </div>
        </div>

    )
}

export default RegisterPage
