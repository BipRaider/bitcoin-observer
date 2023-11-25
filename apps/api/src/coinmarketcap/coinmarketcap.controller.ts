import { SchedulerRegistry, Cron, CronExpression } from '@nestjs/schedule';
import { Controller, Get, Request, UseGuards, Body, Post } from '@nestjs/common';

import { ReqUser, ValueInterval, ConstantInterval } from 'src/interface';
import { JwtAuthGuard } from 'src/auth/guards';

import { CoinMarketCapService } from './coinmarketcap.service';

@Controller('coinmarketcap')
export class CoinMarketCapController {
  constructor(
    private readonly coinMarketCapService: CoinMarketCapService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'init',
  })
  async init(): Promise<void> {
    await this.coinMarketCapService.init();
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: ConstantInterval.ONE,
  })
  async one(): Promise<void> {
    await this.coinMarketCapService.add(ConstantInterval.ONE);
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: ConstantInterval.THIRTY,
  })
  async thirty(): Promise<void> {
    console.dir(ConstantInterval.THIRTY);
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: ConstantInterval.SIXTY,
  })
  async sixty(): Promise<void> {
    console.dir(ConstantInterval.SIXTY);
  }

  @Post('/stop')
  async stop(@Body() dto: { interval: ValueInterval }): Promise<void> {
    await this.coinMarketCapService.stop(dto);
  }

  @Post('/start')
  async start(@Body() dto: { interval: ValueInterval }): Promise<void> {
    await this.coinMarketCapService.start(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async get(@Request() req: ReqUser, @Body() dto: Record<string, any>): Promise<void> {
    console.dir(dto);

    await this.coinMarketCapService.get(req.user);
  }
}
