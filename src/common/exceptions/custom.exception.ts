/*
 * @Author: YT
 * @Date: 2025-05-24 17:51:44
 * @LastEditors: YT
 * @LastEditTime: 2025-05-24 19:38:41
 * @Description: 当时只道是寻常
 * @FilePath: /dev/isme-nest-serve/src/common/exceptions/custom.exception.ts
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERR } from './error-code';
import { ErrInfo } from './error-code';

/**
 * 自定义异常类
 */
export class CustomException extends HttpException {
  protected code: number;
  constructor(err: ErrInfo, message?: string, status?: HttpStatus) {
    message = message ?? err.message ?? String(err.code);
    super(message, status ?? HttpStatus.BAD_REQUEST);
    this.code = err.code;
  }
}

export { ERR as ErrorCode };
