import { HttpModuleOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export const getCMCConfig = async (configService: ConfigService): Promise<HttpModuleOptions> => {
  return {
    timeout: 5000,
    maxRedirects: 5,
    baseURL: configService.get('COIM_MARKET_CAP_URL'),
    headers: {
      'X-CMC_PRO_API_KEY': configService.get('COIM_MARKET_CAP_TOKEN'),
    },
  };
};
