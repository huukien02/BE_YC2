import { Router } from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
} from "../controllers/userController";
import upload from "../lib/multer";

const userRouter = Router();

// Định nghĩa các route cho người dùng
userRouter.get("/:id", getUser); // Lấy thông tin người dùng theo ID
userRouter.post("/create", createUser); // Tạo người dùng mới
userRouter.put("/upload-avatar", upload.single("avatar"), uploadAvatar);

userRouter.put("/update", updateUser); // Cập nhật thông tin người dùng theo ID
userRouter.delete("/:id", deleteUser); // Xóa người dùng theo ID

export default userRouter;
