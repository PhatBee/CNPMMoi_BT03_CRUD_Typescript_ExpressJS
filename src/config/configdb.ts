// src/config/configdb.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  'node_fulltask',
  'root',
  '1234567@a$',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3306
  }
);

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    // Tùy bạn: ném lỗi để dừng app nếu không kết nối được
    throw error;
  }
};

export default connectDB;
