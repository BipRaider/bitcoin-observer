import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';

import { JWTUser, ResCMC } from 'src/interface';

@Injectable()
export class CoinMarketCapService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async get(user: JWTUser) {
    console.log('CoinMarketCapService', user);

    const { data } = await this.httpService.axiosRef.get<ResCMC>(
      `/v2/cryptocurrency/quotes/latest`,
      {
        params: {
          symbol: user.coinOptions?.coinNames.join(','),
        },
      },
    );

    console.dir(data);
  }
}
