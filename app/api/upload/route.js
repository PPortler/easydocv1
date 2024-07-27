import { NextResponse } from "next/server";
import multer from "multer";
import { connectDB } from "@/lib/database";
import File from "@/models/file";

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Initialize multer middleware
const multerMiddleware = upload.single('file');

export async function POST(req) {
  await connectDB();

  return new Promise((resolve, reject) => {
    multerMiddleware(req, {}, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return resolve(NextResponse.json({ error: 'File upload error' }, { status: 400 }));
      }

      try {
        const file = req.file;
        if (!file) {
          console.error('No file uploaded');
          return resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
        }

        const newFile = new File({
          filename: file.originalname,
          contentType: file.mimetype,
          data: file.buffer,
        });

        await newFile.save();
        resolve(NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 }));
      } catch (error) {
        console.error('Database save error:', error);
        resolve(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
      }
    });
  });
}
