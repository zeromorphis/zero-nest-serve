/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 19:42:22
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/app.module.ts
 */
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    /* 配置文件模块 */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    UserModule,
    PermissionModule,
    RoleModule,
    AuthModule,
    SharedModule,
  ],
})
export class AppModule {}
