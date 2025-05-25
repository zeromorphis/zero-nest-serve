/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 22:04:36
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/modules/permission/dto.ts
 */

import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { MethodType, PermissionType } from '@/types';

export class CreatePermissionDto {
  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  type: PermissionType;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  redirect?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  component?: string;

  @IsBoolean()
  @IsOptional()
  isKeepAlive?: boolean;

  @IsBoolean()
  @IsOptional()
  isAffix?: boolean;

  @IsBoolean()
  @IsOptional()
  isFull?: boolean;

  @IsString()
  @IsOptional()
  method?: MethodType;

  @IsBoolean()
  @IsOptional()
  isHide?: boolean;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @Exclude()
  type: PermissionType;
}
