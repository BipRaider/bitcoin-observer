import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
// import { Prisma } from '@prisma/client';

import { HttpService } from '@nestjs/axios';

import { PrismaService } from '../prisma/prisma.service';
import { JWTUser, ResCMC, ValueInterval, ConstantInterval } from 'src/interface';

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

  async add(interval: ValueInterval): Promise<void> {
    const coinNames = await this.prisma.coinOptions.findMany({ select: { coinNames: true } });
    const symbol = [...new Set(coinNames.map(value => value.coinNames).flat())].join(',');

    const {
      data: { data, status },
    } = await this.httpService.axiosRef.get<ResCMC>(`/v2/cryptocurrency/quotes/latest`, {
      params: { symbol },
    });

    if (status.error_message) return;

    for (const name in data) {
      console.dir({
        name,
        pp: data[name][0],
      });
    }
  }
}
