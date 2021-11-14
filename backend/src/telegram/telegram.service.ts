import { Telegraf, Markup, Scenes } from 'telegraf';
import { Injectable } from '@nestjs/common';
const LocalSession = require('telegraf-session-local')

import { Context } from '../entities/interfaces/interfaces';
import { InjectBot } from 'nestjs-telegraf';
// import { AuctionService } from 'src/auction/auction.service'; 
import hotPurchasesScene from './scenes/hotPurchasesScene';

const { enter, leave } = Scenes.Stage

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>, //    private auctionService: AuctionService
  ) {

    // const hotPurchasesScene = new Scenes.BaseScene<Scenes.SceneContext>('HOT_PURCHASES_SCENE')
    // get(hotPurchasesScene)

    bot.use((new LocalSession()).middleware())

    const stage = new Scenes.Stage<Scenes.SceneContext>([hotPurchasesScene])
    this.bot.use(stage.middleware())

    // const stage = new Scenes.Stage<Scenes.WizardContext>([HotPurchasesWizard], {
    //   default: 'super-wizard',
    // })
    // this.bot.use(stage.middleware())
    this.bot.start((ctx) => ctx.reply(this.getMenu(ctx)))

    this.bot.action('HOT_PURCHASE', (ctx) => ctx.scene.enter('HOT_PURCHASES_SCENE'))

    // this.bot.action('HOT_PURCHASE_BID', (ctx) => HotPurchasesScene.bid({ ctx }))
    // this.bot.action('HOT_PURCHASE_LATER', (ctx) => HotPurchasesScene.later({ ctx }))
    // this.bot.action('HOT_PURCHASE_AUTO_BID', (ctx) => HotPurchasesScene.autoBid({ ctx }))
    // this.bot.action('HOT_PURCHASE_NOT_INTRESTED', (ctx) => HotPurchasesScene.notIntrested({ ctx }))
  }

  getMenu(ctx: any): string {
    const { startPayload } = ctx;
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
}
