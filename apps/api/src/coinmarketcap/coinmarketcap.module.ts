import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CoinMarketCapService } from './coinmarketcap.service';
import { CoinMarketCapController } from './coinmarketcap.controller';
import { PrismaService } from '../prisma/prisma.service';
import { getCMCConfig } from 'src/configs/cmc.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getCMCConfig,
    }),
  ],
  providers: [CoinMarketCapService, PrismaService],
  exports: [CoinMarketCapService],
  controllers: [CoinMarketCapController],
})
export class CoinMarketCapModule {}
