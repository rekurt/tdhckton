import { Telegraf, Markup } from 'telegraf';
import { Injectable } from "@nestjs/common";

import { Context } from "../entities/interfaces";
import { InjectBot } from 'nestjs-telegraf';
// import { AuctionService } from 'src/auction/auction.service'; 

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
//    private auctionService: AuctionService
  ) {

    this.bot.start((ctx) => ctx.reply(this.getGreetings(ctx)))
    // this.bot.on('sticker', (ctx) => ctx.reply('👍'))
    // this.bot.hears('auth', (ctx) => ctx.reply('Hey there'))
    
  }
  
   getGreetings(ctx: any): string {
     const { startPayload } = ctx
    //  console.log('ctx.startPayload')
    //  if (!startPayload) return "Требуется аутентификация"
    // return 'Добро пожаловать! ✋ \nИП Васильев'
     return ctx.reply('Добро пожаловать! ✋ \nИП Васильев', Markup.inlineKeyboard([
      Markup.button.callback('Горящие закупки 🔥', 'HOT_PURCHASE'),
      Markup.button.callback('Активные закупки', 'ACTIVE_PURCHASE'),
      Markup.button.callback('Уведомления', 'NOTIFICATIONS'),
      Markup.button.callback('Мои подписки', 'MY_SUBSCRIPTIONS'),
      Markup.button.callback('Фильтры', 'FILTERS'),
    ], { wrap: () => true  }))
    
  }
  
  
    async handleTextMessage(ctx: Context, message: string): Promise<any> {
      // console.log({
      //  ctx, message
      // })
      // TODO: FIX OR DELETE?
       return ctx.reply('Custom buttons keyboard',Markup.inlineKeyboard([
        Markup.button.callback('Movie', 'MOVIE_ACTION'),
        Markup.button.callback('Theater', 'THEATER_ACTION'),
      ])
   )
      
    }
}
