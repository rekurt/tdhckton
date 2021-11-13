import { Telegraf } from 'telegraf';
import { Injectable } from "@nestjs/common";
 
import { Context } from "../entities/interfaces";
import { InjectBot } from 'nestjs-telegraf';
import { AuctionService } from 'src/auction/auction.service'; 
@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private auctionService: AuctionService
  ) {
    this.bot.start((ctx) => ctx.reply(this.getGreetings(ctx)))
  }
  
   getGreetings(ctx: any): string {
    return 'Hello '+ctx.botInfo+'! ';
  }
  
  
    async handleTextMessage(ctx: Context, message: string): Promise<string> {
      console.log({
       ctx, message
      })
      // TODO: FIX OR DELETE?
      return message;

      // // const chatId = ctx.from.id.toString()
  
      // if (message.includes(CATALOG_PREFIX)) {
      //   return this.auctionService.getCatalogsItem(message);
      // }
  
      // if (message.includes(CANCEL_ORDER_PREFIX)) {
      //   return this.auctionService.cancelOffer(message);
      // }
  
      // if (message.includes(SEMICOLON_SPLITTER)) {
      //   return this.auctionService.confirmOffer(message);
      // }
  
      // const offers = await this.auctionService.getOffers();
      // const offer:OfferDTO = offers.find((offer) => offer.id === message);
      // if (offer) {
      //   const resultsMessage = await this.auctionService.deliverOffer(message);
      //   ctx.telegram.sendMessage(
      //     offer.users.telegramId,
      //     'offer'+offer+', ORDER_UPDATED_MESSAGE',
      //     { parse_mode: 'HTML' },
      //   );
      //   return resultsMessage;
      // }
   
  
      // if (message.includes('/newBid')) {
      //   await this.addBid(message);
      //   const catalogs = await this.getCatalogsNames();
      //   const catalogsNames = catalogs.map((x) => x.name);
      //   const catalogsItem = await this.getItem(catalogsNames);
      //   const offeredCatalogItem = catalogsItem.sort(
      //     (a, b) => Number(a.createdAt) - Number(b.createdAt),
      //   );
  
      // }
  
      // return DEFAULT_MESSAGE;
    }
}
