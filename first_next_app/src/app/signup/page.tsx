"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignUpPage(){
    const router=useRouter()
    const [user,setUser]=useState({
            email:"",
            password:"",
            userName:""
})


const [loading,setLoading] = useState(false)
const onSignUp = async() =>{
try {
    setLoading(true)
    const response=await axios.post("api/users/signup",user)
    console.log(response.data)
    router.push("/login")

    
} catch (error:any) {
    console.error(error)
    toast.error(error.message)
}finally{
    setLoading(false)
}
}
    return(
       <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
        <h1>
            Sign Up
        </h1>
        <hr className="mt-10"/>
        <label htmlFor="userName">User Name</label>
        <input
        className="p-2 mb-2 border border-grey-250 rounded-lg text-black focus:border-grey-600"
         type="text"
         id="userName" 
         placeholder="user name"
        value={user.userName} 
        onChange={(e)=>setUser({...user,userName:e.target.value})}
        />
        <label htmlFor="email">Email</label>
        <input
        className="p-2 mb-2 border border-grey-250 focus:w-2/12 rounded-lg text-black focus:border-grey-600"
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
        disabled={loading}
        onClick={()=>onSignUp()}
        >Signup here</button>

<Link href="/login">Visit login page</Link>
       </div>
    )
}