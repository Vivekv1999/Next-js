import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const userData = await User.findOne({
      verfifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    
    if(!userData) {
        return NextResponse.json({ error:"User not found"},{status: 400})
    }

    userData.isverified = true;
    userData.verfifyToken = undefined;
    userData.verifyTokenExpiry = undefined;

    await userData.save()

    return NextResponse.json({message:'Email verified sucessfully'},
     {status: 200})
  } catch (error: any) {
    console.error(error); 
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
