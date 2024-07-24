import { connectDB } from "@/lib/database";
import Users from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req){
    const email = req.nextUrl.pathname.split('/').pop();
    await connectDB();
    const user = await Users.findOne({ email:email })
    return NextResponse.json({ user });
}