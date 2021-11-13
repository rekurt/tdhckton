import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import token from './config/token';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    // TelegrafExceptionFilter,
    TelegrafModule.forRoot({
      token,
    }),
    TelegrafModule,
    TelegramModule,
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: TelegrafExceptionFilter,
    // },
  ],
})
export class AppModule {}
