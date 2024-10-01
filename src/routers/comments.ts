import { Router } from "express";
import { createComment } from "../controllers/commentsController";

const commentsRouter = Router();

// Định nghĩa các route cho người dùng
commentsRouter.post("/create", createComment); // Tạo người dùng mới

export default commentsRouter;
