import { Request, Response } from "express";
import { User } from "../models/users";

// GET USER
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      return res.status(400).json({
        message: "Đăng nhập thất bại",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Đăng nhập thành công",
      status: true,
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đăng nhập thất bại" });
  }
};
