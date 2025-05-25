/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 20:29:53
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'zero',
      name: 'zero.session',
      rolling: true,
      cookie: { maxAge: null },
      resave: false,
      saveUninitialized: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.APP_PORT || 8085);

  console.log(`🚀 启动成功: http://localhost:${process.env.APP_PORT}`);
}
bootstrap();
