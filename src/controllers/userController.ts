import { Request, Response } from "express";
import { User } from "../models/users";
import path from "path";
import fs from "fs";

// GET USER
export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id; // Lấy ID từ tham số URL

  try {
    // Tìm người dùng trong cơ sở dữ liệu theo ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
        status: false,
      });
    }
    // Nếu người dùng tồn tại, trả về thông tin người dùng
    return res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      status: true,
      user, // Trả về thông tin người dùng
    });
  } catch (error) {
    console.error(error); // In lỗi ra console để dễ dàng debug
    return res.status(500).json({
      message: "Có lỗi xảy ra khi lấy thông tin người dùng",
      status: false,
    });
  }
};

// CREATE USER
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
        status: false,
      });
    }

    // Kiểm tra xem username đã tồn tại hay chưa
    const existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({
        message: "Username đã tồn tại",
        status: false,
      });
    }

    // Tạo người dùng mới trong cơ sở dữ liệu
    const newUser = await User.create({ username, email, password });
    res.status(201).json({
      message: "Người dùng mới đã được tạo",
      user: newUser,
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi tạo người dùng" });
  }
};

// UPLOAD AVATAR
export const uploadAvatar = async (req: Request, res: Response) => {
  const userId: string = req.body.userId; // Lấy ID người dùng từ req.body
  const avatar: string | undefined = req.file?.path; // Lấy đường dẫn của ảnh tải lên

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    // Kiểm tra xem người dùng có ảnh cũ không
    if (user.avatar) {
      // Lấy đường dẫn đầy đủ của ảnh cũ
      const oldAvatarPath = path.resolve(
        __dirname,
        "../../uploads",
        path.basename(user.avatar)
      );

      // Xóa ảnh cũ
      fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.error("Không thể xóa ảnh cũ:", err);
        }
      });
    }

    // Cập nhật thông tin ảnh trong cơ sở dữ liệu
    user.avatar = `${avatar}`.replace("uploads\\", ""); // Cập nhật trường avatar
    await user.save(); // Lưu lại thông tin người dùng

    return res.status(200).json({
      status: true,
      message: "Cập nhật ảnh thành công",
      avatar,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Đã xảy ra lỗi khi cập nhật ảnh" });
  }
};

// UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  const { email, username, userId } = req.body;

  try {
    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields only if they are provided
    if (email) user.email = email;
    if (username) user.username = username;

    // Save the updated user to the database
    await user.save();

    return res
      .status(200)
      .json({ status: true, message: "User updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Failed to update user", error });
  }
};

// DELETE USER
export const deleteUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  res.send(`Người dùng có ID: ${userId} đã bị xóa`);
};
