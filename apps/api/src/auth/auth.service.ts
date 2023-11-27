import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { PasswordUtil } from '../utils';
import { ResUser, ResSignIn } from 'src/interface';

import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordUtil,
  ) {}

  async signin(user: ResUser): Promise<ResSignIn> {
    const payload = { email: user.email, id: user.id };

    return {
      id: user.id,
      username: user.username,
      coinOptions: user.coinOptions,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(dto: SignUpDto): Promise<ResUser> {
    const { username, email } = dto;
    const passwordHash = await this.passwordService.hash({ password: dto.password });

    return this.userService.create({
      username,
      email,
      passwordHash,
    });
  }
}
