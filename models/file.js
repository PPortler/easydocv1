import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    email: { type: String, required: true },
    fileName: { type: String, required: true },
    fileURL: { type: String, required: true },
    fileType: { type: String, required: true },
});

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;
