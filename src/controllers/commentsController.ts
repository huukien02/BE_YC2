import { Request, Response } from "express";
import { Comment } from "../models/comments"; // Đường dẫn đến model Comment
import { User } from "../models/users"; // Đường dẫn đến model User
import { Blog } from "../models/blogs"; // Đường dẫn đến model Blog

// Hàm tạo bình luận
const createComment = async (req: Request, res: Response) => {
  try {
    const { content, userId, blogId } = req.body; // Lấy dữ liệu từ request body

    // Kiểm tra xem userId và blogId có hợp lệ không
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user || !blog) {
      return res.status(400).json({ message: "User or Blog not found." });
    }

    // Tạo bình luận mới
    const comment = await Comment.create({
      content,
      userId, // Khóa ngoại để liên kết với User
      blogId, // Khóa ngoại để liên kết với Blog
    });

    return res.status(201).json(comment); // Trả về bình luận mới đã tạo
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createComment };
