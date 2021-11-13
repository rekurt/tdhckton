import { Module } from "@nestjs/common";
import { TelegramService } from "src/telegram/telegram.service";
import { TelegramUpdate } from "src/telegram/telegram.update";
import { SharedModule } from "../shared.module";

@Module({
  imports: [SharedModule],
  providers: [TelegramService, TelegramUpdate],
})
export class AuctionModule {}
