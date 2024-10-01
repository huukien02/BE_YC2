import multer from "multer";
import { Request } from "express";

// Định nghĩa kiểu cho request có sử dụng multer
export interface MulterRequest extends Request {
  file?: Express.Multer.File; // File tải lên
}

// Cấu hình Multer để lưu file vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Đường dẫn lưu file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    ); // Tên file
  },
});

// Khởi tạo multer với cấu hình storage
const upload = multer({ storage });

export default upload;
