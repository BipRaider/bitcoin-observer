import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { ReqUser } from 'src/interface';
import { JwtAuthGuard } from 'src/auth/guards';

import { CoinMarketCapService } from './coinmarketcap.service';

@Controller('coinmarketcap')
export class CoinMarketCapController {
  constructor(private readonly coinMarketCapService: CoinMarketCapService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async get(@Request() req: ReqUser): Promise<void> {
    await this.coinMarketCapService.get(req.user);
  }
}
