import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";
import { User } from "./users";
import { Blog } from "./blogs";

class Comment extends Model {
  public id!: number; // ID sẽ tự động tăng
  public content!: string; // Nội dung bình luận
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Khởi tạo model Comment
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments", // Tên bảng trong cơ sở dữ liệu
  }
);

// Thiết lập quan hệ với User và Blog
Comment.belongsTo(User, {
  foreignKey: "userId", // Khóa ngoại để liên kết với User
  as: "author", // Alias để gọi trong các truy vấn
});

Comment.belongsTo(Blog, {
  foreignKey: "blogId", // Khóa ngoại để liên kết với Blog
  as: "blog", // Alias để gọi trong các truy vấn
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments", // Một người dùng có thể có nhiều bình luận
});

Blog.hasMany(Comment, {
  foreignKey: "blogId",
  as: "comments", // Một bài viết có thể có nhiều bình luận
});

export { Comment };
