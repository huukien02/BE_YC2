import { Router } from "express";
import { loginUser } from "../controllers/loginController";

const loginRouter = Router();

// Định nghĩa các route cho người dùng
loginRouter.post("", loginUser); // Tạo người dùng mới

export default loginRouter;
