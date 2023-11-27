import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { ConstantError, ResSignIn, ResSignUp, ResServer } from 'src/interface';
import { PasswordUtil } from 'src/utils';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly passwordService: PasswordUtil,
  ) {}

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() { email, password }: SignInDto): Promise<ResServer<ResSignIn>> {
    const userExists = await this.userService.get({ email });

    if (!userExists) throw new UnauthorizedException(ConstantError.EMAIL_OR_PASSWORD_IS_INCORRECT);

    const isCorrectPassword = await this.passwordService.compare({
      password,
      passwordHash: userExists.passwordHash,
    });

    if (!isCorrectPassword)
      throw new UnauthorizedException(ConstantError.EMAIL_OR_PASSWORD_IS_INCORRECT);

    const data = await this.authService.signin(userExists);

    return { status: 'ok', data };
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto): Promise<ResServer<ResSignUp>> {
    const existingUser = await this.userService.get({ email: dto.email });

    if (existingUser) throw new BadRequestException(ConstantError.USER_ALREADY_EXIST);

    const user = await this.authService.signup(dto);

    if (!user) throw new BadRequestException(ConstantError.EMAIL_OR_PASSWORD_IS_INCORRECT);

    return { status: 'ok', data: {} };
  }
}
