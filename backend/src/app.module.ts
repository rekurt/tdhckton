import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import token from "./config/token";

@Module({
  imports: [
    // TelegrafExceptionFilter,
    TelegrafModule.forRoot({
      token
    }),
    TelegrafModule,

  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: TelegrafExceptionFilter,
    // },
  ],
})
export class AppModule {}
