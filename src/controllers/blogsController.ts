import { Request, Response } from "express";
import { Blog } from "../models/blogs";
import { User } from "../models/users";
import { Comment } from "../models/comments";

// GET USER
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: "author", // Tên alias đã định nghĩa trong mối quan hệ
          attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
        },
        {
          model: Comment,
          as: "comments", // Alias đã định nghĩa trong mối quan hệ
          attributes: ["id", "content", "createdAt"], // Chọn các trường cần thiết từ Comment
          include: [
            {
              model: User,
              as: "author", // Nếu cần thông tin tác giả của bình luận
              attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
            },
          ],
        },
      ],
    });

    res.status(200).json(blogs); // Trả về danh sách bài viết
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    res.status(500).json({ message: "Có lỗi xảy ra" }); // Trả về lỗi server
  }
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
  let imageUrl = req.file ? req.file.path : null; // Lấy đường dẫn ảnh từ Multer

  // Kiểm tra dữ liệu
  if (!title || !content) {
    return res.status(400).json({ message: "Tiêu đề và nội dung là bắt buộc" });
  }

  try {
    imageUrl = `${imageUrl}`.replace("uploads\\", "");
    const newBlog = await Blog.create({ title, content, imageUrl, userId }); // Tạo bài viết mới
    // Gửi blog hiện tại
    const blogWithAuthor = await Blog.findOne({
      where: { id: newBlog.id },
      include: [
        {
          model: User,
          as: "author", // Tên alias đã định nghĩa trong mối quan hệ
          attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
        },
      ],
    });

    res.status(201).json(blogWithAuthor); // Trả về bài viết vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    res.status(500).json({ message: "Có lỗi xảy ra" }); // Trả về lỗi server
  }
};
