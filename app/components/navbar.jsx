"use client"

import { signOut } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div>
      <Link onClick={()=> signOut()} href="/login">Logout</Link>
    </div>
  )
}

export default Navbar
