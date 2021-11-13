import { Module, Logger, forwardRef } from '@nestjs/common';
import BotService from './bot.service';

@Module({
  providers: [
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