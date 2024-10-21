import { Request, Response } from "express";
import { Reaction } from "../models/reaction";
import { User } from "../models/users";
import { Blog } from "../models/blogs";

const validReactionTypes = ["like", "love", "angry"]; // Các loại phản ứng hợp lệ

const addOrUpdateReaction = async (req: Request, res: Response) => {
  const { type, userId, blogId } = req.body; // Lấy dữ liệu từ request body

  try {
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Tìm Reaction hiện tại của user cho blog
    const existingReaction = await Reaction.findOne({
      where: {
        userId,
        blogId,
      },
    });

    if (existingReaction) {
      // Nếu đã có reaction, cập nhật loại phản ứng
      existingReaction.type = type;
      await existingReaction.save();

      return res.status(200).json({
        status: true,
        message: "Đã cập nhật reaction.",
        reaction: existingReaction, // Trả về reaction đã cập nhật
      });
    } else {
      // Nếu chưa có reaction, tạo mới
      const newReaction = await Reaction.create({
        userId,
        blogId,
        type,
      });

      return res.status(201).json({
        status: true,
        message: "Reaction thành công.",
        reaction: newReaction, // Trả về reaction mới được tạo
      });
    }
  } catch (error: any) {
    console.error("Error adding/updating reaction:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { addOrUpdateReaction };
