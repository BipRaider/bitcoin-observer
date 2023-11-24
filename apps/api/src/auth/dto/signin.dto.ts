import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ConstantError } from 'src/interface';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: ConstantError.EMAIL })
  email: string;

  @IsNotEmpty()
  @IsString({ message: ConstantError.PASSWORD })
  @Length(8, 24)
  password: string;
}
