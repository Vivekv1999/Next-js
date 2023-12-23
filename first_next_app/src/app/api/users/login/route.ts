import User from "@/models/userModel"
import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody

        console.log(reqBody);


        //check if user exists or not
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        
        //check password is corect
        const isMatch=await bcryptjs.compare(password,user.password)
        if(!isMatch){
            return NextResponse.json({message:"Password is not correct"},{status:400})
        }

        //create token data
        const tokenData = {
            id:user._id,
            userName:user.userName,
            email:user.email
        }

        //sign token
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
            expiresIn:"1d"
        })

        const response=NextResponse.json({
            message:"login success",
            status:200,
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    } catch (error:any) {
        console.error(error)
        return NextResponse.json({error: error.message},{status: 500})
    }
}