import multer from "multer";
import fs from "fs";

// Ensure temp directory exists
const TEMP_DIR = "./public/temp";
if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Create upload middleware
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Max 5MB file size
    },
});
