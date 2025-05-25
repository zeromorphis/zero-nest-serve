/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 19:40:56
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/common/interceptors/transform.interceptor.ts
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { ReturnType } from '@/types';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const returnType = this.reflector.get<ReturnType>('returnType', context.getHandler());
    const req = context.getArgByIndex(1).req as Request;
    return next.handle().pipe(
      map((data) => {
        switch (returnType) {
          case 'primitive':
            return data;
          default:
            return {
              code: 0,
              message: 'OK',
              data,
              originUrl: req.originalUrl,
            };
        }
      }),
    );
  }
}
