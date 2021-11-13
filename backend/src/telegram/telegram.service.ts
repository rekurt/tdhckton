import { Telegraf, Markup, session, Scenes } from 'telegraf';
import { Injectable } from '@nestjs/common';

import { Context } from '../entities/interfaces/interfaces';
import { InjectBot } from 'nestjs-telegraf';
// import { AuctionService } from 'src/auction/auction.service'; 
import hotPurchasesScene from './scenes/hotPurchasesScene';
import echoScene from './scenes/echoScene';

const { enter, leave } = Scenes.Stage

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>, //    private auctionService: AuctionService
  ) {

    // const hotPurchasesScene = new Scenes.BaseScene<Scenes.SceneContext>('HOT_PURCHASES_SCENE')
    // get(hotPurchasesScene)

    // Greeter scene
    const greeterScene = new Scenes.BaseScene<Scenes.SceneContext>('greeter')
    greeterScene.enter((ctx) => ctx.reply('Hi'))
    greeterScene.leave((ctx) => ctx.reply('Bye'))
    greeterScene.hears('hi', enter<Scenes.SceneContext>('greeter'))
    greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

    // Echo scene
  
    
    console.log(hotPurchasesScene)
    const stage = new Scenes.Stage<Scenes.SceneContext>([hotPurchasesScene, echoScene])
    this.bot.use(session())
    this.bot.use(stage.middleware())

    bot.command('greeter', (ctx) => ctx.scene.enter('greeter'))
    bot.command('echo', (ctx) => ctx.scene.enter('echo'))

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

  xxx(ctx) {
    return ctx.reply('Добро пожаловать! ✋ \nИП Васильев', Markup.inlineKeyboard([
      Markup.button.callback('Горящие закупки 🔥', 'HOT_PURCHASE'),
      Markup.button.callback('Активные закупки', 'ACTIVE_PURCHASE'),
      Markup.button.callback('Уведомления', 'NOTIFICATIONS'),
      Markup.button.callback('Мои подписки', 'MY_SUBSCRIPTIONS'),
      Markup.button.callback('Фильтры', 'xui'),
    ], { wrap: () => true }))
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
    console.log('qq')
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
