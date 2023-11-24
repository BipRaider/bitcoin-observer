import { IsNotEmpty, IsOptional, IsString, Length, Min, IsInt } from 'class-validator';
import { IsPrise } from 'src/decorators';
import { ConstantError } from 'src/interface';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: ConstantError.USERNAME })
  @IsNotEmpty()
  @Length(4, 24)
  username: string;

  @IsOptional()
  @IsInt({ message: ConstantError.UPPER_PRICE })
  @Min(0)
  @IsPrise(2, { message: ConstantError.UPPER_PRICE })
  upperPrice: number;

  @IsOptional()
  @IsInt({ message: ConstantError.MIDDLE_PRICE })
  @Min(0)
  @IsPrise(2, { message: ConstantError.MIDDLE_PRICE })
  middlePrice: number;

  @IsOptional()
  @IsInt({ message: ConstantError.LOWER_PRICE })
  @Min(0)
  @IsPrise(2, { message: ConstantError.LOWER_PRICE })
  lowerPrice: number;

  @IsOptional()
  @IsString({ message: ConstantError.COIN_NAMES })
  coinNames: string;
}
