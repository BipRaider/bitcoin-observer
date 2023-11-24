import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { UserService } from '../user/user.service';
import { PasswordUtil } from '../utils';
import { ResUser } from 'src/interface';

import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordUtil,
  ) {}

  async signin(email: User['email']): Promise<{ access_token: string }> {
    const user = await this.userService.get({ email });
    const payload = { email: user?.email, id: user?.id };

    return {
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
