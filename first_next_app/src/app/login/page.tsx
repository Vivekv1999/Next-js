"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage(){
const router=useRouter()
const [isLoading,setIsLoading] = useState(false)
    const [user,setUser]=useState({
            email:"",
            password:""
})

const onLogin = async() =>{
    try {
        setIsLoading(true)
        const response = await axios.post('/api/users/login',user)
        console.log(response,"login data: ")
        toast.success("login successful") 
        router.push("/profile")


        
    } catch (error:any) {
        console.error(error)
        toast.error(error.message)
    }
    finally {
        setIsLoading(false)
    }

}
    return(
       <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
        <h1>
            Login
        </h1>
        <hr className="mt-10"/>
        
        <label htmlFor="email">Email</label>
        <input
        className="p-2 mb-2 border border-grey-250  rounded-lg text-black focus:border-grey-600"
         type="text"
         id="email" 
         placeholder="Email"
        value={user.email} 
        onChange={(e)=>setUser({...user,email:e.target.value})}
        />
        <label htmlFor="password">Password</label>
        <input
        className="p-2 mb-2 border border-grey-250 rounded-lg text-black focus:border-grey-600"
         type="password"
         id="password" 
         placeholder="Password"
        value={user.password} 
        onChange={(e)=>setUser({...user,password:e.target.value})}
        />
        
        <button
        className="p-2 mt-5 mb-2 border border-grey-250 rounded-lg "
        disabled={isLoading}
        onClick={onLogin}
        >Login here</button>

<Link href="/signup">Visit Sign up page</Link>
       </div>
    )
}