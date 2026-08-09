import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, "..");

// Ensure the upload folders exist
const videoDir = path.join(baseDir, "uploads", "videos");
const thumbDir = path.join(baseDir, "uploads", "thumbnails");
fs.mkdirSync(videoDir, { recursive: true });
fs.mkdirSync(thumbDir, { recursive: true });

// ---- Video file storage ----
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, videoDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".mp4";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${ext}`);
  },
});

// ---- Thumbnail image storage ----
const thumbStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, thumbDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${ext}`);
  },
});

// ---- File type filters ----
const videoFilter = (req, file, cb) => {
  const allowed = /mp4|webm|ogg|mov|m4v|mkv|avi/;
  const ok =
    allowed.test(path.extname(file.originalname).toLowerCase()) ||
    (file.mimetype && file.mimetype.startsWith("video/"));
  cb(ok ? null : new Error("Only video files are allowed."), ok);
};

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ok =
    allowed.test(path.extname(file.originalname).toLowerCase()) ||
    (file.mimetype && file.mimetype.startsWith("image/"));
  cb(ok ? null : new Error("Only image files are allowed."), ok);
};

// Single multer instance handling both fields (optional 40MB video limit)
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = file.fieldname === "thumbnail" ? thumbDir : videoDir;
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || (file.fieldname === "video" ? ".mp4" : ".jpg");
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "thumbnail") imageFilter(req, file, cb);
    else videoFilter(req, file, cb);
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});
