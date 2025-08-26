// src/server.ts
import dotenv from 'dotenv';
dotenv.config(); // load .env trước khi dùng process.env

import express, { Express } from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web'; // đảm bảo đường dẫn đúng (routes, không phải route)
import { connectDB, sequelize } from './config/configdb';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 6969;

// body parsing (dùng built-in express, không bắt buộc body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cấu hình view engine + static
viewEngine(app);

// đăng ký route (hàm khởi tạo route)
initWebRoutes(app);

// khởi động: kết nối DB trước, sau đó start server
(async () => {
  try {
    await connectDB(); // connectDB trả Promise - await để chắc đã kết nối
    // DEV: đồng bộ model với DB (chỉ dùng trong dev)
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`✅ Backend Nodejs is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
})();
