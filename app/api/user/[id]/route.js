import { connectDB } from "@/lib/database";
import Users from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req){
    const email = req.nextUrl.pathname.split('/').pop();
    await connectDB();
    const user = await Users.findOne({ email:email })
    return NextResponse.json({ user });
}

export async function DELETE(req){
    const id = req.nextUrl.pathname.split('/').pop();
    await connectDB()
    await Users.findByIdAndDelete( id )
    return NextResponse.json({ message:"Deleted user" },{status:200});
}