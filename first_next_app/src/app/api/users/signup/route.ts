import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs" 

connect()

export async function POST(request:NextRequest){
    try {
        const requestBody = await request.json();
        const {userName,email,password} = requestBody

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message:"Email already exists"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            userName,
            email,
            password:hashedPassword
        })
        
        const savedUser=await newUser.save()
        console.log(savedUser)
        return NextResponse.json({message:"User created successfully",sucess:true,user:savedUser},{status:201})
    } catch (error) {
        return NextResponse.json({error: error}, 
        {status: 500})

    }
}