import { Module } from '@nestjs/common';

import { PasswordUtil } from './password.util';

@Module({
  exports: [PasswordUtil],
  providers: [PasswordUtil],
})
export class PasswordModule {}
