import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CoinMarketCapService } from './coinmarketcap.service';
import { CoinMarketCapController } from './coinmarketcap.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getCMCConfig } from 'src/configs/cmc.config';

@Module({
  imports: [
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
