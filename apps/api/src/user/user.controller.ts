import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';

import { ReqUser, ResUser } from 'src/interface';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async update(@Request() req: ReqUser, @Body() dto: UpdateUserDto): Promise<ResUser> {
    const updatedUser = await this.userService.update({ user: req.user, body: dto });

    return updatedUser;
  }
}
