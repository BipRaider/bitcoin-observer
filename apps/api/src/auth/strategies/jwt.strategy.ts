import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConstantError, JWTUser } from 'src/interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(_: Request, { email, id }: Pick<JWTUser, 'email' | 'id'>): Promise<JWTUser> {
    const userExist = await this.userService.get({ email });

    if (!userExist) throw new NotFoundException(ConstantError.USER_NOT_FOUND);

    return { email, id, coinOptions: userExist.coinOptions };
  }
}
