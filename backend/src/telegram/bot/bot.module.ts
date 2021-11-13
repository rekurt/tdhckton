import { Module, Logger, forwardRef } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { botProviders } from './bot.provider';
import { DatabaseModule } from 'src/database/database.module';
import { WebcamModelsModule } from 'src/webcam-models/webcam-models.module';

@Module({
  imports: [
    forwardRef(() => WebcamModelsModule),
    ConfigModule,
    DatabaseModule
  ],
  controllers: [BotController],
  providers: [
    ...botProviders,
    BotService,
  ],
  exports: [
    BotService
  ]
})
export class BotModule {
  private logger = new Logger(BotModule.name);
  constructor(telegramService: BotService) {
    try {
      telegramService.launch();
    } catch(err) {
      this.logger.error(err);
    }

  }
}