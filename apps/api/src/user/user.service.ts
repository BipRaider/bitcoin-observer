import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { JWTUser, ResUser } from 'src/interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async get(data: Prisma.UserWhereUniqueInput): Promise<ResUser | null> {
    return this.prisma.user.findUnique({
      where: { ...data },
      include: {
        coinOptions: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<ResUser> {
    return await this.prisma.user.create({
      data: {
        ...data,
        coinOptions: { create: {} },
      },
      include: {
        coinOptions: true,
      },
    });
  }

  async update(data: { body: UpdateUserDto; user: JWTUser }): Promise<ResUser> {
    const { user, body } = data;
    const {
      id,
      coinOptions: { coinNames },
    } = user;

    const coinOptions: Prisma.UserUpdateInput['coinOptions'] = {
      update: {},
    };

    if (typeof body.upperPrice === 'number') coinOptions.update.upperPrice = body.upperPrice;
    if (typeof body.middlePrice === 'number') coinOptions.update.middlePrice = body.middlePrice;
    if (typeof body.lowerPrice === 'number') coinOptions.update.lowerPrice = body.lowerPrice;
    if (typeof body.coinNames === 'string')
      coinOptions.update.coinNames = { set: [...new Set([...coinNames, body.coinNames])] };

    return this.prisma.user.update({
      where: { id },
      data: {
        username: body.username,
        coinOptions: coinOptions,
      },
      include: {
        coinOptions: true,
      },
    });
  }
}
