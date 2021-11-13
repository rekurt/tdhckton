import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { APP_FILTER } from "@nestjs/core";
import { TelegrafExceptionFilter } from "src/exception-filters/global-exception-handler.filter";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '2113185753:AAF1HOF2MiUqIGCbktkysV_xUDb9WN47y8c',
    }),
    TelegrafModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TelegrafExceptionFilter,
    },
  ],
})
export class AppModule {}
