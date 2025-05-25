/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 19:40:25
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/common/guards/permission.guard.ts
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // 当前角色不在可操作角色范围内
    if (!user.currentRoleCode) throw new CustomException(ErrorCode.ERR_11005);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles?.length) return true;
    const hasRole = roles.includes(user.currentRoleCode);
    if (!hasRole) throw new CustomException(ErrorCode.ERR_11003);
    return true;
  }
}
