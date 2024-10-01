import { Router } from "express";
import { Blog } from "../models/blogs";
import upload from "../lib/multer";
import { createBlog, getBlogs } from "../controllers/blogsController";

const blogRouter = Router();

// Route để lấy tất cả bài viết
blogRouter.get("/", getBlogs);

// Route để tạo một bài viết mới
blogRouter.post("/create", upload.single("image"), createBlog);

export default blogRouter;
