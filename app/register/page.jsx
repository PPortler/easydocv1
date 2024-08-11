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

    const [countPass, setCountPass] = useState(0)
    const [countCPass, setCountCPass] = useState(0)

    const [checkFirstName, setCheckFirstName] = useState('');
    const [checkLastName, setCheckLastName] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [checkPhone, setCheckPhone] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [checkCPassword, setCheckCPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        setStatusLoad(true);

        if (!firstName || !lastName || !phone || !email || !password) {
            setError("กรุณากรอกให้ครบทุกช่อง");
            setStatusLoad(false);
            return;
        }

        setCheckFirstName('pass');
        setCheckLastName('pass');

        let checkEmail = true
        for (let i = 0; i < email.length; i++) {
            if (email.charAt(i) === "@") {
                const domain = email.slice(i + 1);
                if (domain === "gmail.com" || domain === "hotmail.com") {
                    checkEmail = false;
                    setCheckEmail('pass');
                    break;
                }
            }
        }

        if (checkEmail) {
            setStatusLoad(false);
            setCheckEmail('wrong');
            setError('กรุณาใส่ @gmail.com หรือ @hotmail.com ในอีเมลของคุณ');
            return;
        }

        if (isNaN(parseInt(phone, 10))) {
            setError("กรุณาใส่หมายเลขที่ถูกต้อง");
            setCheckPhone('wrong');
            setStatusLoad(false);
            return;
        }
        if (phone.length <= 9 || phone.length > 10 || phone.charAt(0) !== '0') {
            setError("หมายเลขโทรศัพท์ไม่ถูกต้อง");
            setCheckPhone('wrong');
            setStatusLoad(false);
            return;
        }

        setCheckPhone('pass')

        if (password.length <= 7) {
            setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
            setCheckPassword('wrong');
            setStatusLoad(false);
            return;
        }

        setCheckPassword('pass');

        if (password !== Cpassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            setCheckCPassword('wrong');
            setStatusLoad(false);
            return;
        }

        setCheckCPassword('pass');

        const check_agree = document.getElementById('check_agree');
        if (!check_agree.checked) {
            setError("คุณไม่เห็นด้วยกับเงื่อนไขใน easydoc");
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
                setCheckEmail('wrong');
                setError("อีเมลที่กรอกถูกใช้แล้ว")
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
                alert("Register success")
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
                    <h1 className='text-3xl font-bold'>ลงทะเบียน</h1>
                    <p className='text-gray-500 text-xs mt-2'>มาเริ่มสร้างบัญชี easy doc ส่วนตัวของคุณกันดีกว่า</p>
                    <form onSubmit={handleSubmit} className='mt-7'>
                        <div className='flex gap-3'>
                            <div className='relative w-full'>
                                <input onChange={(e) => setFirstName(e.target.value)} className={`${checkFirstName === 'pass' ? "border-green-500" : checkFirstName === 'wrong' ? "border-red-500" : ""} px-3 w-full border p-2 rounded-lg`} type="text" placeholder='ชื่อของคุณ' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>ชื่อ</span>
                            </div>
                            <div className='relative w-full'>
                                <input onChange={(e) => setLastName(e.target.value)} className={`${checkLastName === 'pass' ? " border-green-500" : checkLastName === 'wrong' ? "border-red-500" : ""} px-3 w-full border p-2 rounded-lg`} type="text" placeholder='นามสกุลของคุณ' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>นามสกุล</span>
                            </div>
                        </div>
                        <div className='mt-4 flex gap-3'>
                            <div className='relative w-full'>
                                <input onChange={(e) => setEmail(e.target.value)} className={`${checkEmail === 'pass' ? " border-green-500" : checkEmail === 'wrong' ? "border-red-500" : ""} px-3 w-full border p-2 rounded-lg`} type="text" placeholder='อีเมลของคุณ' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>อีเมล</span>
                            </div>
                            <div className='relative w-full'>
                                <input onChange={(e) => setPhone(e.target.value)} className={`${checkPhone === 'pass' ? "border-green-500" : checkPhone === 'wrong' ? "border-red-500" : ""} px-3 w-full border p-2 rounded-lg`} type="text" placeholder='หมายเลขโทรศัพท์ของคุณ' />
                                <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>เบอร์โทรศัพท์</span>

                            </div>

                        </div>
                        <div className='mt-4 relative'>
                            <input onChange={(e) => {
                                setPassword(e.target.value);
                                setCountPass(e.target.value.length);
                            }} className={`${checkPassword === 'pass' ? "border-green-500" : checkPassword === 'wrong' ? "border-red-500" : ""} px-3 w-full border p-2 rounded-lg`} type="password" placeholder='สร้างรหัสผ่านของคุณ' />
                            <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>รหัสผ่าน</span>
                            <span className={`absolute right-3 ${countPass >= 8 ? "text-black" : "text-gray-400"}  text-sm`} style={{ top: ".7rem" }}>{countPass}/8</span>
                        </div>
                        <div className='mt-4 relative'>
                            <input onChange={(e) => {
                                setCpassword(e.target.value);
                                setCountCPass(e.target.value.length);
                            }} className={`${checkCPassword === 'pass' ? "border-green-500" : checkCPassword === 'wrong' ? "border-red-500" : ""} px-3 w-full border p-2 rounded-lg`} type="password" placeholder='กรอกรหัสผ่านของคุณอีกครั้ง' />
                            <span className='absolute left-2 text-xs text-gray-500 bg-white px-1' style={{ top: "-.5rem" }}>ยืนยันรหัสผ่าน</span>
                            <span className={`absolute right-3 ${countPass >= 8 ? "text-black" : "text-gray-400"}  text-sm`} style={{ top: ".7rem" }}>{countCPass}/8</span>

                        </div>
                        {error && (
                            <div className='mt-1 text-xs rounded-md p-1 px-2 text-white bg-red-500 w-fit'>
                                * {error}
                            </div>
                        )}
                        <div className='mt-4 flex  text-xs justify-between'>
                            <div className='flex gap-1'>
                                <input id="check_agree" className=' border border-black' type="checkbox" />
                                <label >ฉันยอมรับข้อกำหนด <Link href="#" className='text-[#FF8682] hover:underline'>เงื่อนไข</Link> และ <Link href="#" className='text-[#FF8682] hover:underline'>นโยบายความเป็นส่วนตัว</Link></label>
                            </div>
                        </div>
                        <button type='submit' className='w-full mt-8 text-white bg-[#2581C1] p-2 rounded-lg'>สร้างบัญชีของคุณ</button>
                    </form>
                    <p className='text-center mt-3 text-xs'>มีบัญชีอยู่แล้วใช่มั้ย ? <Link href="/login" className='text-[#FF8682] hover:underline'>เข้าสู่ระบบ</Link></p>
                    <div className='relative'>
                        <hr className='mt-14 text-gray-500' />
                        <div className='flex justify-center'>
                            <p className='bg-white text-gray-500 w-fit p-1 relative  text-xs text-center ' style={{ top: "-.8rem" }}>เข้าสู่ระบบด้วย</p>
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
                <Image className='hidden lg:block rounded-lg shadow-md h-fit w-96' src="/image/main/poster_register.png" height={1000} width={1000} priority alt="poster-login"></Image>
            </div>
            <div id="loader" style={{ opacity: statusLoad ? "1" : "0", display: statusLoad ? "" : "none" }}>
                <Loader />
            </div>
        </div>

    )
}

export default RegisterPage
