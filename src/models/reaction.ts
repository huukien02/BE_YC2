import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";
import { User } from "./users";
import { Blog } from "./blogs";

class Reaction extends Model {
  public id!: number; // ID sẽ tự động tăng
  public type!: string; // Loại phản ứng (ví dụ: 'like', 'dislike')
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Khởi tạo model Reaction
Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING, // Sử dụng STRING cho loại phản ứng
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reaction",
    tableName: "reactions", // Tên bảng trong cơ sở dữ liệu
  }
);

// Thiết lập quan hệ với User và Blog
Reaction.belongsTo(User, {
  foreignKey: "userId", // Khóa ngoại để liên kết với User
  as: "author", // Alias để gọi trong các truy vấn
});

Reaction.belongsTo(Blog, {
  foreignKey: "blogId", // Khóa ngoại để liên kết với Blog
  as: "blog", // Alias để gọi trong các truy vấn
});

User.hasMany(Reaction, {
  foreignKey: "userId", // Khóa ngoại trong Reaction
  as: "reactions", // Một người dùng có thể có nhiều phản ứng
});

Blog.hasMany(Reaction, {
  foreignKey: "blogId", // Khóa ngoại trong Reaction
  as: "reactions", // Một bài viết có thể có nhiều phản ứng
});

export { Reaction };
