import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("socket", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const syncDatabase = async () => {
  try {
    // Đồng bộ hóa các mô hình với cơ sở dữ liệu
    await sequelize.sync({ force: true }); // Sử dụng { force: true } để xóa bảng hiện có và tạo lại
    console.log("Cơ sở dữ liệu đã được đồng bộ hóa thành công!");
  } catch (error) {
    console.error("Lỗi khi đồng bộ hóa cơ sở dữ liệu:", error);
  }
};
