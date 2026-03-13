import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EnvModule } from './shared/config/env.module.js';

@Module({
  imports: [EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
