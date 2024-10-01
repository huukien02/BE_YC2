import express, { Request, Response } from "express";
import indexRouter from "./routers/index";
import cors from "cors"; // Import cors
import "./models/index";
import loginRouter from "./routers/login";
import usersRouter from "./routers/users";
import blogsRouter from "./routers/blogs";
import commentsRouter from "./routers/comments";

// import userLogin from "./routers/login";

import { syncDatabase } from "./models/index";
import path from "path";

const app = express();
const port = 4000;

app.use(cors());

// Middleware để phân tích JSON
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Định tuyến đơn giản
app.get("/", indexRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/comments", commentsRouter);

// Lắng nghe cổng
app.listen(port, async () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
  // Gọi hàm đồng bộ hóa khi server khởi động
  await syncDatabase();
});
