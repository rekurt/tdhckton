import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { config } from "../../../Node-telegram-bot/src/app/config/app.config";
import { APP_FILTER } from "@nestjs/core";
import { TelegrafExceptionFilter } from "src/exception-filters/global-exception-handler.filter";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: config.BOT_TOKEN,
    }),
    TelegrafModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TelegrafExceptionFilter​​,
    },
  ],
})
export class AppModule {}
