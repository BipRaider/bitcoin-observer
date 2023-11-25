import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

import { ConstantError, ValueInterval, ConstantInterval } from 'src/interface';

export class IntervalDto {
  @IsNotEmpty()
  @IsString({ message: ConstantError.INTERVAL })
  @IsEnum(ConstantInterval, { message: ConstantError.INTERVAL })
  interval: ValueInterval;
}
