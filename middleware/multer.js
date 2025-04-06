import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

// Ensure the "uploads" folder exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const id = uuid();
    const extension = file.originalname.split(".").pop();    
    const filename = `${id}.${extension}`;
    cb(null, filename);
  }
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only images are allowed."), false);
  }
  
  cb(null, true);
};

// Multer middleware with limits
export const uploadFiles = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
}).single("image");
