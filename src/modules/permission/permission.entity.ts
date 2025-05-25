/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 22:04:47
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/modules/permission/permission.entity.ts
 */
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '@/modules/role/role.entity';
import { MethodType, PermissionType } from '@/types';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ unique: true })
  name: string;

  @Column()
  type: PermissionType;

  @ManyToOne(() => Permission, (permission) => permission.children, {
    createForeignKeyConstraints: false,
  })
  parent: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent, {
    createForeignKeyConstraints: false,
  })
  children: Permission[];

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  redirect: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  component: string;

  @Column({ nullable: true })
  isKeepAlive: boolean;

  @Column({ nullable: true })
  isAffix: boolean;

  @Column({ nullable: true })
  isFull: boolean;

  @Column({ nullable: true })
  method: MethodType;

  @Column({ default: true, comment: '是否展示在页面菜单' })
  isHide: boolean;

  @Column({ default: true })
  enable: boolean;

  @Column({ nullable: true })
  order: number;

  @ManyToMany(() => Role, (role) => role.permissions, {
    createForeignKeyConstraints: false,
  })
  roles: Role[];
}
