import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

const configProvider = {
  provide: ConfigService,
  useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
};

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigModule {}
