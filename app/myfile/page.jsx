"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { useRouter } from 'next/navigation'

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
            const res = await fetch(`http://localhost:3000/api/user/${email}`, {
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


    return (
        <div>
            <Navbar />
            {dataUser && (
                <>
                    <p>Name: {dataUser.firstName} {dataUser.lastName}</p>
                    <p>Email: {dataUser.email}</p>
                    <p>Phone: {dataUser.phone}</p>
                </>
            )}
        </div>
    )
}

export default MyfilePage
