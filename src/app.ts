import express, { Request, Response } from "express";
import indexRouter from "./routers/index";
import loginRouter from "./routers/login";
import usersRouter from "./routers/users";
import blogsRouter from "./routers/blogs";
import commentsRouter from "./routers/comments";
import reactionRouter from "./routers/reaction";

import cors from "cors"; // Import cors
import "./models/index"; // Import các mô hình
import path from "path";
import { syncDatabase } from "./models/index"; // Giả định có hàm syncDatabase
import http from "http";
import { Server } from "socket.io";
import { Blog } from "./models/blogs";
import { User } from "./models/users";
import { Comment } from "./models/comments";
import { Reaction } from "./models/reaction";

// Khởi tạo ứng dụng Express và server
const app = express();
const server = http.createServer(app);
const port = 4000;

// Cấu hình CORS
app.use(cors());

// Middleware để phân tích JSON
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/index", indexRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);
app.use("/comments", commentsRouter);
app.use("/reaction", reactionRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // URL Frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Hàm lấy blogs
  const sendBlogs = async () => {
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
          {
            model: Reaction,
            as: "reactions", // Alias đã định nghĩa trong mối quan hệ với Reaction
            attributes: ["id", "type", "createdAt"], // Chọn các trường cần thiết từ Reaction
            include: [
              {
                model: User,
                as: "author", // Nếu cần thông tin tác giả của phản ứng
                attributes: ["id", "username", "email", "avatar"], // Chọn các trường cần thiết
              },
            ],
          },
        ],
      });
      // Gửi dữ liệu blogs đến frontend
      socket.emit("update_blogs", blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Gọi hàm sendBlogs liên tục
  const intervalId = setInterval(sendBlogs, 5000); // Gọi hàm mỗi 5 giây (hoặc khoảng thời gian bạn muốn)

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    clearInterval(intervalId); // Dừng gọi hàm khi socket bị ngắt kết nối
  });
});

// Lắng nghe cổng
server.listen(port, async () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
  // await syncDatabase()
});
