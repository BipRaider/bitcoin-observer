import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CryptoCoin, Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';

import { PrismaService } from '../prisma/prisma.service';
import { JWTUser, ResCMC, ValueInterval, ConstantInterval, ResCMCGet } from 'src/interface';

import { GetDto } from './dto';

@Injectable()
export class CoinMarketCapService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async init(): Promise<void> {
    const init = this.schedulerRegistry.getCronJob('init');
    init.stop();
    const one = this.schedulerRegistry.getCronJob(ConstantInterval.ONE);
    one.stop();
    const thirty = this.schedulerRegistry.getCronJob(ConstantInterval.THIRTY);
    thirty.stop();
    const sixty = this.schedulerRegistry.getCronJob(ConstantInterval.SIXTY);
    sixty.stop();
  }

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

        const coin: Omit<CryptoCoin, 'id'> = {
          currency: 'USD',
          price: 0,
          coinId: item.id,
          name: item.name,
          symbol: item.symbol,
          slug: item.slug,
          interval,
          createdAt: status.timestamp,
        };

        for (const currency in item.quote) {
          coin.currency = currency;
          coin.price = item.quote[currency]?.price;

          await this.prisma.cryptoCoin.create({ data: coin });
        }
      }
    } catch {
      return;
    }
  }

  /***  */
  async get(user: JWTUser, dto: GetDto): Promise<ResCMCGet> {
    const find: Prisma.CryptoCoinFindManyArgs = { where: {}, take: 200 };
    const where: Prisma.CryptoCoinFindManyArgs['where'] = {};

    if (dto.symbol) where.symbol = dto.symbol;
    else if (!user.coinOptions?.coinNames?.length) {
      return {
        interval: dto.interval || user.coinOptions.interval,
        coinNames: [],
        data: [],
      };
    } else {
      const filter = user.coinOptions.coinNames.map(value => {
        return {
          symbol: value,
          interval: dto.interval || user.coinOptions.interval,
        };
      });
      where.AND = filter;
    }
    if (typeof dto.take === 'number') find.take = dto.take;
    if (typeof dto.skip === 'number') find.skip = dto.skip;
    if (typeof dto.cursorId === 'string') find.cursor = { id: dto.cursorId };

    find.where = where;
    find.select = {
      id: true,
      price: true,
      createdAt: true,
      currency: true,
      symbol: true,
    };

    const data = await this.prisma.cryptoCoin.findMany(find);

    return {
      data,
      interval: dto.interval || user.coinOptions.interval,
      coinNames: user.coinOptions.coinNames,
    };
  }
}
