import type { Context } from 'koa';
import cors from '@koa/cors';

function getAllowOrigins() {
  const { ALLOW_ORIGINS } = process.env;
  // 未设置返回空
  if (!ALLOW_ORIGINS) {
    return [];
  }
  // 已设置按照逗号分割
  return ALLOW_ORIGINS.split(',');
}

export default () =>
  cors({
    origin(ctx: Context) {
      const allowOrigins = getAllowOrigins();
      // 默认允许所有源
      if (allowOrigins.length < 1) {
        return '*';
      }
      // 请求源在白名单中
      const requestOrigin = ctx.get('Origin');
      if (requestOrigin && allowOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }
      // 请求源不在白名单中
      return '';
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
