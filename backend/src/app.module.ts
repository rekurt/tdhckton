import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { APP_FILTER } from "@nestjs/core";
import { TelegrafExceptionFilter } from "src/modules/exception-filters/global-exception-handler.filter";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token
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
