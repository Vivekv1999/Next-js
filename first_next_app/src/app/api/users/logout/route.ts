import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response=NextResponse.json({
            status:200,
            message:"Logout Sucessfullt"
        });
        
        response.cookies.set("token", "",{httpOnly:true,expires:new Date(0)});
        return response;

    } catch (error:any) {
        console.error(error);
        return NextResponse.json({error: error.message},{status:500});
        
    }

}
