import dotenv from 'dotenv';
import Koa from 'koa';
import cors from '@/middlewares/cors';
import body from 'koa-body';
import serve from 'koa-static';
import { join } from 'path';
import router from '@/router';
import Database from '@/utils/Database';
import { DATABASE_TABLES } from '@/constants/index';

// 加载环境变量
dotenv.config();

// 创建 koa 实例
const app = new Koa();

// 应用中间件
app.use(cors());
app.use(body({ multipart: true, formidable: { hashAlgorithm: 'md5' } }));
app.use(serve(join(process.cwd(), process.env.OBS_PATH || '')));
app.use(router.routes());
app.use(router.allowedMethods());

// 初始化数据库
Database.initialize(DATABASE_TABLES)
  .then(() => {
    console.log('\nDatabase initialized successfully.');
    // 启动服务
    const { SERVICE_PORT, SERVICE_HOST } = process.env;
    app.listen(Number(SERVICE_PORT), SERVICE_HOST, () => {
      console.log('\nServer started successfully.');
      console.log(`\nServer is running at http://${SERVICE_HOST}:${SERVICE_PORT}`);
    });
  })
  .catch(err => {
    console.log('\nDatabase initialization failed.');
    console.error(err);
  });
