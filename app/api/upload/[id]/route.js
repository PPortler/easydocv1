import { NextResponse } from "next/server";
import File from "@/models/file";
import { connectDB } from "@/lib/database";

export async function POST(req) {
  const email = req.nextUrl.pathname.split('/').pop();
  const { fileName, fileURL, fileType } = await req.json();
  if (!fileName || !fileURL || !fileType) {
    return NextResponse.json({ error: "fileName and fileURL is not defind" }, { status: 400 });
  }
  await connectDB();
  await File.create({ email, fileName: fileName, fileURL: fileURL, fileType: fileType })
  return NextResponse.json({ message: "Created Url file" }, { status: 201 });
}

export async function GET(req){
  const email = req.nextUrl.pathname.split('/').pop();
  await connectDB();
  const myfile = await File.find({ email:email })
  return NextResponse.json({ myfile });
}

export async function DELETE(req){
  const id = req.nextUrl.pathname.split('/').pop();
  await connectDB();
  await File.findByIdAndDelete(id);
  console.log(id);
  return NextResponse.json({ message: "Deleted file" }, { status: 200 });
}