import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CoinMarketCapModule } from './coinmarketcap/coinmarketcap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    CoinMarketCapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
