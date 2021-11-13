import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AlertsService } from './alerts.service';

@Module({
  imports: [
    TelegramModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          botKey: configService.get<string>('telegram.botToken'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AlertsService],
})
export class AlertsModule {}
