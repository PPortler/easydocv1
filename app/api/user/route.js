import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Users from "@/models/user";
import bcrypt from "bcryptjs/dist/bcrypt";

export async function POST(req) {
    try {
        const { firstName, lastName, phone, email, password } = await req.json();
        const private_password = await bcrypt.hash(password, 10);
        await connectDB();
        await Users.create({ firstName:firstName, lastName:lastName, phone:phone, email:email, password:private_password });
        return NextResponse.json({ message: "Created User" }, { status: 201 })
    }catch{
        return NextResponse.json({ message: "Error Create User" }, { status: 500 })
    }
}