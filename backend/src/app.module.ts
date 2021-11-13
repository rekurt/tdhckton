import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import token from './config/token';
import { TelegramModule } from './telegram/telegram.module';
import { mongo } from './config/mongo';

@Module({
  imports: [
    MongooseModule.forRoot(mongo),
    TelegrafModule.forRoot({
      token,
    }),
    TelegrafModule,
    CoreModule,
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
