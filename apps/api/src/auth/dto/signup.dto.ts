import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ConstantError } from 'src/interface';

export class SignUpDto {
  @IsNotEmpty()
  @IsString({ message: ConstantError.EMAIL })
  @IsEmail({}, { message: ConstantError.EMAIL })
  email: string;

  @IsNotEmpty()
  @IsString({ message: ConstantError.USERNAME })
  @Length(3, 15)
  username: string;

  @IsNotEmpty()
  @IsString({ message: ConstantError.PASSWORD })
  @Length(8, 24)
  password: string;
}
