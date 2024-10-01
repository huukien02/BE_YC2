import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";

class User extends Model {
  public id!: number; // ID sẽ tự động tăng
  public username!: string;
  public email!: string;
  public password!: string;
  public avatar?: string; // Thêm trường avatar
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER, // Kiểu dữ liệu là INTEGER
      autoIncrement: true, // Thiết lập tự động tăng
      primaryKey: true, // Đây là khóa chính
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Đảm bảo email là duy nhất
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, // Có thể để trống
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // Tên bảng trong cơ sở dữ liệu
  }
);

export { User };
