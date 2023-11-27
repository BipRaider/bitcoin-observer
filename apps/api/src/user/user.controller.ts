import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';

import { ReqUser, ResServer, ResUser } from 'src/interface';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async update(@Request() req: ReqUser, @Body() dto: UpdateUserDto): Promise<ResServer<ResUser>> {
    const user = await this.userService.update({ user: req.user, body: dto });

    delete user.passwordHash;
    delete user.coinOptions.id;
    delete user.coinOptions.userId;

    return { status: 'ok', data: user };
  }
}
