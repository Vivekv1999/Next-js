import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password -isverified")  //SLECT (- FILED NAME WHICH YOU DID NOT WANT TO GET WITH OUT COMMA )
    return NextResponse.json({
        message: "user found",
        userData:user
    })
   } catch (error:any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
