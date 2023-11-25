import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';

import { ConstantError, ValueInterval, ConstantInterval } from 'src/interface';

export class GetDto {
  @IsOptional()
  @IsString({ message: ConstantError.INTERVAL })
  @IsEnum(ConstantInterval, { message: ConstantError.INTERVAL })
  interval: ValueInterval;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(200)
  take: number;

  @IsOptional()
  @IsString()
  cursorId: string;

  @IsOptional()
  @IsString()
  symbol: string;
}
