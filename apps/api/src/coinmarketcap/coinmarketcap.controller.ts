import { SchedulerRegistry, Cron, CronExpression } from '@nestjs/schedule';
import { Controller, Get, Request, UseGuards, Body, Post } from '@nestjs/common';

import { ReqUser, ConstantInterval, ResCMCGet } from 'src/interface';
import { JwtAuthGuard } from 'src/auth/guards';

import { CoinMarketCapService } from './coinmarketcap.service';
import { GetDto, IntervalDto } from './dto';

@Controller('coinmarketcap')
export class CoinMarketCapController {
  constructor(
    private readonly coinMarketCapService: CoinMarketCapService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'init' })
  async init(): Promise<void> {
    await this.coinMarketCapService.init();
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: ConstantInterval.ONE })
  async one(): Promise<void> {
    await this.coinMarketCapService.add(ConstantInterval.ONE);
  }

  @Cron(CronExpression.EVERY_30_MINUTES, { name: ConstantInterval.THIRTY })
  async thirty(): Promise<void> {
    await this.coinMarketCapService.add(ConstantInterval.THIRTY);
  }

  @Cron(CronExpression.EVERY_HOUR, { name: ConstantInterval.SIXTY })
  async sixty(): Promise<void> {
    await this.coinMarketCapService.add(ConstantInterval.SIXTY);
  }

  @Post('/stop')
  async stop(@Body() dto: IntervalDto): Promise<{ status: string }> {
    await this.coinMarketCapService.stop(dto);
    return { status: 'ok' };
  }

  @Post('/start')
  async start(@Body() dto: IntervalDto): Promise<{ status: string }> {
    await this.coinMarketCapService.start(dto);
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async get(@Request() req: ReqUser, @Body() dto: GetDto): Promise<ResCMCGet> {
    return await this.coinMarketCapService.get(req.user, dto);
  }
}
