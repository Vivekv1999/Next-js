"use client"
import axios from 'axios'
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Verifyemail() {
    const router=useRouter()
    const [token,setToken]=useState("")
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false)

    useEffect(()=>{
        if(token.length>0) {
        verifyUserEmail()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])


useEffect(()=>{
const urlToken=window.location.search.split("=")[1]
setToken(urlToken || "")
},[])

const verifyUserEmail=async()=>{
    try{
        axios.post('/api/users/verifyemail',{token})
        setVerified(true)
    }catch(err){
        setError(true)
        console.error(err)
    }
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
    <h1>Verify Email</h1>
    <h2 className='p-2 bg-green-400 text-black'>{token ? `${token}` :"no token"}</h2>
      {
        verified && (
            <div>
                <h2 className='p-2 bg-green-400 text-black'>Email Verified</h2>
                <Link href="/login">Login</Link>
            </div>
        )
      }
      {
        error && (
            <div>
                <h2 className='p-2 bg-red-400 text-black'>Error</h2>
            </div>
        )
      }
    </div>
  )
}
