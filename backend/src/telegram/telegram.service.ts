import { Telegraf, Markup, session } from 'telegraf';
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

    this.bot.use(session())
    this.bot.start((ctx) => ctx.reply(this.getMenu(ctx)))

    this.bot.action('HOT_PURCHASE', (ctx) => this.showHotPurchase({ ctx, index: null }))
    // this.bot.on('sticker', (ctx) => ctx.reply('👍'))
    // this.bot.hears('auth', (ctx) => ctx.reply('Hey there'))

  }

  getMenu(ctx: any): string {
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
    ], { wrap: () => true }))
  }

  showHotPurchase({ ctx, index }) {
    let currentPurchase = null;
    if (index === null) {
      ctx.session = { hotPurchases: FAKE_PURCHASES }
      index = 0
    }

    const count = ctx.session.hotPurchases.length
    if (count === 0) {
      return ctx.reply('Пусто :-(')

    } else {
      currentPurchase = ctx.session.hotPurchases[index]
    }

    ctx.session.currentHotPurchase = index

    const { itemName, quantity, beforeEnd, currentPrice, customerName, currentPriceOneItem, id } = currentPurchase

    return ctx.reply(`
Горящие закупки: ${index + 1} из ${count}

Номер: ${id}

${itemName}, в  кол. ${quantity}
До завершения: ${beforeEnd}

Текущая цена: ${currentPrice} р., за единицу ${currentPriceOneItem} р.

Заказчик: ${customerName}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Сделать ставку', 'HOT_PURCHASE_BID'),
        Markup.button.callback('Автоматические ставки', 'HOT_PURCHASE_AUTO_BID'),
        Markup.button.callback('Посмотрю позже', 'HOT_PURCHASE_LATER'),
        Markup.button.callback('Не интересно', 'HOT_PURCHASE_NOT_INTRESTED'),
      ], { wrap: () => true }))






  }


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

const FAKE_PURCHASES = [
  { itemName: 'Автомат Калашникова', quantity: 100, beforeEnd: '1 ч. 5 м.', currentPrice: 100, customerName: 'Управление образованием', currentPriceOneItem: 1, id: '36к8268563' },
  { itemName: 'Автомат Бориса', quantity: 100, beforeEnd: '1 ч. 5 м.', currentPrice: 100, customerName: 'Управление образованием', currentPriceOneItem: 1, id: '36к8268563' },
  { itemName: 'Автомат Никиты', quantity: 100, beforeEnd: '1 ч. 5 м.', currentPrice: 100, customerName: 'Управление образованием', currentPriceOneItem: 1, id: '36к8268563' },
  { itemName: 'Автомат Олега', quantity: 100, beforeEnd: '1 ч. 5 м.', currentPrice: 100, customerName: 'Управление образованием', currentPriceOneItem: 1, id: '36к8268563' },
  { itemName: 'Автомат Влада', quantity: 100, beforeEnd: '1 ч. 5 м.', currentPrice: 100, customerName: 'Управление образованием', currentPriceOneItem: 1, id: '36к8268563' },
]
