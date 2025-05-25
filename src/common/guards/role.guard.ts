/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 19:40:46
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/common/guards/role.guard.ts
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const currentRoleCode = user.currentRoleCode;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // 当前用户没有角色
    if (!currentRoleCode) throw new CustomException(ErrorCode.ERR_11005);
    if (!roles?.length) return true;
    // 当前角色不在可操作角色范围内
    if (!roles.includes(currentRoleCode)) throw new CustomException(ErrorCode.ERR_11003);
    return true;
  }
}
