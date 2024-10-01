import { Router } from "express";

const userRouter = Router();

// Định nghĩa các route cho người dùng
userRouter.get("/", (req, res) => {
  res.send("Server is running");
});

export default userRouter;
