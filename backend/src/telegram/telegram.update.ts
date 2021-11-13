import { Command, Ctx, Message, On, Start, Update } from "nestjs-telegraf";
import { TelegramService } from "./telegram.service";
import { Context } from "../entities/interfaces";
import {
  CANCEL_ORDER_PREFIX,

} from "../constants";

@Update()
export class TelegramUpdate {
  constructor(
    private telegramService: TelegramService,
    // private auctionService: AuctionService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    const greetings = this.telegramService.getGreetings(ctx);
    await ctx.reply(greetings);
  }

  @Command('show_cats')
  async showCategories(@Ctx() ctx: Context) {
    const catalogs =  [] //await this.auctionService.getCatalogsNames();
    const catalogsString = 'catalogs';
    await ctx.reply(catalogsString, { parse_mode: 'HTML' });
  }

  @Command('edit_offers')
  async editOffers(@Ctx() ctx: Context) {
    const catalogs = ['name1', 'name2'] //await this.auctionService.getCatalogsNames();
    const catalogsString = catalogs.toString(); //formCatalogString(catalogs, 'PICK_CATALOG_TEXT');
    await ctx.reply(catalogsString, { parse_mode: 'HTML' });
  }

  @Command('offers')
  async getOrders(@Ctx() ctx: Context): Promise<void> {
    const result = 'res1' // await this.auctionService.getOffers();
    console.log({result})
    ctx.reply('result?  orders', { parse_mode: 'HTML' });
  }

  @Command('deliver_order')
  async prepareOrder(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('DELIVER_ORDER_MESSAGE');
  }

  @Command('catalog')
  async sendNewCatalogMessage(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('NEW_CATALOG_MESSAGE');
  }

  @Command('new_item')
  async sendNewItemMessage(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('NEW_STUFF_MESSAGE');
  }

  @On('text')
  async showCategoryItems(
    @Message('text') message: string,
    @Ctx() ctx: Context,
  ) {
    const result = await this.telegramService.handleTextMessage(ctx, message);
    await ctx.reply(result, { parse_mode: 'HTML' });

    if (message.includes(CANCEL_ORDER_PREFIX)) {
      await this.start(ctx);
    }
    console.log(ctx)
  }

}
