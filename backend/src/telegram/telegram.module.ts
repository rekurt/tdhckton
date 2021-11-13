import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { SharedModule } from '../shared.module';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [SharedModule, CoreModule],
  providers: [TelegramService, ActionService, TelegramUpdate],
})
export class TelegramModule {}
