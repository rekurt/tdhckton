import { Telegraf, Markup, session, Scenes } from 'telegraf';
import { Injectable } from '@nestjs/common';

import { Context } from '../entities/interfaces/interfaces';
import { InjectBot } from 'nestjs-telegraf';
import { hotPurchasesScene } from './scenes/hotPurchasesScene';
// import { AuctionService } from 'src/auction/auction.service';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>, //    private auctionService: AuctionService
  ) {
    this.bot.use(session());
    const stage = new Scenes.Stage<Scenes.SceneContext>([hotPurchasesScene], {
      ttl: 10,
    });
    bot.use(stage.middleware());
    this.bot.start((ctx) => ctx.reply(this.getMenu(ctx)));

    this.bot.action('HOT_PURCHASE', (ctx) =>
      this.showHotPurchase({ ctx, index: null }),
    );
    // this.bot.action('HOT_PURCHASE_BID', (ctx) => this.bidPurchase({ ctx }))
    // this.bot.action('HOT_PURCHASE_LATER', (ctx) => this.laterPurchase({ ctx, index: null }))
    // this.bot.action('HOT_PURCHASE_AUTO_BID', (ctx) => this.autobidPurchase({ ctx, index: null }))
    // this.bot.action('HOT_PURCHASE_NOT_INTRESTED', (ctx) => this.processPurchase({ ctx, index: null }))
  }

  getMenu(ctx: any): string {
    const { startPayload } = ctx;
    //  console.log('ctx.startPayload')
    //  if (!startPayload) return "Требуется аутентификация"
    // return 'Добро пожаловать! ✋ \nИП Васильев'
    return ctx.reply(
      'Добро пожаловать! ✋ \nИП Васильев',
      Markup.inlineKeyboard(
        [
          Markup.button.callback('Горящие закупки 🔥', 'HOT_PURCHASE'),
          Markup.button.callback('Активные закупки', 'ACTIVE_PURCHASE'),
          Markup.button.callback('Уведомления', 'NOTIFICATIONS'),
          Markup.button.callback('Мои подписки', 'MY_SUBSCRIPTIONS'),
          Markup.button.callback('Фильтры', 'FILTERS'),
        ],
        { wrap: () => true },
      ),
    );
  }

  showHotPurchase({ ctx, index }) {
    return ctx.scene.enter('HOT_PURCHASES_SCENE');
  }

  bidPurchase() {}

  laterPurchase() {}
  autobidPurchase() {}

  processPurchase() {}

  async handleTextMessage(ctx: Context, message: string): Promise<any> {
    // console.log({
    //  ctx, message
    // })
    // TODO: FIX OR DELETE?
    //  return ctx.reply('Custom buttons keyboard',Markup.inlineKeyboard([
    //   Markup.button.callback('Movie', 'MOVIE_ACTION'),
    //   Markup.button.callback('Theater', 'THEATER_ACTION'),
    // ])
    //  )
  }
}
