import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";
import { User } from "./users";

class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public imageUrl?: string; // Thêm trường để lưu URL ảnh
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Blog",
    tableName: "blogs",
  }
);

// Thiết lập quan hệ với User
Blog.belongsTo(User, {
  foreignKey: "userId", // Khóa ngoại để liên kết với User
  as: "author", // Alias để gọi trong các truy vấn
});
User.hasMany(Blog, {
  foreignKey: "userId",
  as: "blogs", // Một người dùng có thể có nhiều bài viết
});

export { Blog };
