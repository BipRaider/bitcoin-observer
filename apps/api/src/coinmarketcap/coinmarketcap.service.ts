import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CryptoCoin, Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';

import { PrismaService } from '../prisma/prisma.service';
import { JWTUser, ResCMC, ValueInterval, ResCMCGet } from 'src/interface';

import { GetDto } from './dto';

@Injectable()
export class CoinMarketCapService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async start(data: { interval: ValueInterval }): Promise<void> {
    const job = this.schedulerRegistry.getCronJob(data.interval);
    job.start();
  }

  async stop(data: { interval: ValueInterval }): Promise<void> {
    const job = this.schedulerRegistry.getCronJob(data.interval);
    job.stop();
  }

  /*** The function adds crypto coin to the database. */
  async add(interval: ValueInterval): Promise<void> {
    // Get all coin names from coin options
    const coinNames = await this.prisma.coinOptions.findMany({ select: { coinNames: true } });
    // Converting the names for the query.
    const symbol = [...new Set(coinNames.map(value => value.coinNames).flat())].join(',');

    // Getting the data of the coins.
    const {
      data: { data, status },
    } = await this.httpService.axiosRef.get<ResCMC>(`/v2/cryptocurrency/quotes/latest`, {
      params: { symbol },
    });

    if (status.error_message) return;

    try {
      for (const name in data) {
        const item = data[name][0];
        if (!item) continue;
        const coin: Omit<CryptoCoin, 'id'> = {
          currency: 'USD',
          price: 0,
          coinId: item.id,
          name: item.name,
          symbol: item.symbol,
          slug: item.slug,
          interval,
          createdAt: new Date(status.timestamp),
        };

        for (const currency in item.quote) {
          coin.currency = currency;
          coin.price = item.quote[currency]?.price;

          const t = await this.prisma.cryptoCoin.create({ data: coin });
          console.log('add coin', t);
        }
      }
    } catch {
      return;
    }
  }

  /*** Getting the coins from database. And there are some setting for that.
   ** `skip`      - How much to skip.
   ** `take`      - How much to take.
   ** `cursorId`  - Start receiving from this identifier.
   ** `symbol`    - The short name of the crypto coin. `BTC`, `ETH`
   ** `from`      - Sorting start date
   ** `to`        - Sorting end date
   */
  async get(user: JWTUser, dto: GetDto): Promise<ResCMCGet> {
    const find: Prisma.CryptoCoinFindManyArgs = { where: {}, take: 20 };
    const where: Prisma.CryptoCoinFindManyArgs['where'] = {};
    find.where = where;
    let createdAt: Prisma.CryptoCoinFindManyArgs['where']['createdAt'] = {};

    // Sorting by date
    if (dto.from && dto.to) {
      createdAt = { gte: new Date(dto.from), lte: new Date(dto.to) };
    } else if (dto.from) createdAt = { gte: new Date(dto.from) };
    else if (dto.to) createdAt = { lte: new Date(dto.to) };

    if (typeof dto.cursorId === 'string') {
      find.cursor = { id: dto.cursorId };
      find.skip = dto.skip || 1;
    }

    if (dto.symbol) {
      // Sorting by symbol as BTC
      where.symbol = dto.symbol;
      where.interval = dto.interval || user.coinOptions.interval;
      where.createdAt = createdAt;
    } else if (!user.coinOptions?.coinNames?.length) {
      return {
        interval: dto.interval || user.coinOptions.interval,
        coinNames: [],
        data: [],
      };
    } else {
      where.OR = user.coinOptions.coinNames.map(value => {
        return {
          symbol: value,
          interval: dto.interval || user.coinOptions.interval,
          createdAt,
        };
      });
    }
    if (typeof dto.take === 'number' && dto.take > 0) find.take = dto.take;
    if (typeof dto.skip === 'number' && dto.skip > 0) find.skip = dto.skip;

    find.select = {
      id: true,
      price: true,
      createdAt: true,
      currency: true,
      symbol: true,
      interval: true,
    };
    find.orderBy = {
      createdAt: 'asc',
    };

    const data = await this.prisma.cryptoCoin.findMany(find);

    return {
      data,
      interval: dto.interval || user.coinOptions.interval,
      coinNames: user.coinOptions.coinNames,
    };
  }
}
