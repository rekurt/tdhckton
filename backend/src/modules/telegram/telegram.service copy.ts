import { Injectable } from "@nestjs/common";
import {
  AMPERSAND_SPLITTER,
  CANCEL_ORDER_PREFIX,
  CATALOG_PREFIX,
  DEFAULT_MESSAGE,
  NEW_ORDER_PREFIX as EDIT_ORDER_PREFIX,
  SEMICOLON_SPLITTER,
  SPLITTER,
} from "../../constants";
 
import { Catalog, Context } from "../interfaces";
import {
  formConfirmedOrderString,
  getDeliverOrderString,
  parseMessage
} from "../../helpers";
import { OrderStatuses } from "../../shared.types";
import { commands } from "src/telegram.config";

@Injectable()
export class TelegramService {
  constructor(
    private catalogRepo: CatalogRepository,
    private orderRepo: OrderRepository,
  ) {}

  async getGreetings(ctx: Context): Promise<string> {
    return 'Hello!';
  }

  async getCatalogsNames(): Promise<Catalog[]> {
    const catalogs = await this.catalogRepo.find();
    return catalogs.map(({ name, description }) => ({
      name,
      description,
    }));
  }

  async handleTextMessage(ctx: Context, message: string): Promise<string> {
    // const chatId = ctx.from.id.toString()

    if (message.includes(CATALOG_PREFIX)) {
      return this.getCatalogsItem(message);
    }

    // if (message.includes(EDIT_ORDER_PREFIX)) {
    //   return this.editOrder(ctx, message);
    // }

    if (message.includes(CANCEL_ORDER_PREFIX)) {
      return this.cancelOrder(message);
    }

    if (message.includes(SEMICOLON_SPLITTER)) {
      return this.confirmOrder(message);
    }

    const orders = await this.orderRepo.getOrders();
    const order = orders.find((order) => order.id === message);
    if (order) {
      const resultsMessage = await this.deliverOrder(message);
      ctx.telegram.sendMessage(
        order.users.telegramId,
        'order'+order+', ORDER_UPDATED_MESSAGE',
        { parse_mode: 'HTML' },
      );
      return resultsMessage;
    }
 

    if (message.includes('/newBid')) {
      await this.addBid(message);
      const catalogs = await this.getCatalogsNames();
      const catalogsNames = catalogs.map((x) => x.name);
      const catalogsItem = await this.getItem(catalogsNames);
      const orderedCatalogItem = catalogsItem.sort(
        (a, b) => Number(a.createdAt) - Number(b.createdAt),
      );

    }

    return DEFAULT_MESSAGE;
  }

  async getCatalogsItem(message: string): Promise<string> {
    const [, catalogName] = parseMessage(message, SPLITTER);
    const catalogItem = await this.getItem([catalogName]);
    const updatedCatalog = this.countCostPerItem(catalogItem);
    // return buildCatalogMessage(updatedCatalog);
  }

  async getItem(catalogs: string[]): Promise<ItemEntity[]> {
    let item = [] as ItemEntity[];

    // for (const catalog of catalogs) {
    //   const gg = await this.itemRepo.find({
    //     catalogId: catalog.id
    //   })
    // }

    return item;
  }

  countCostPerItem(item: ItemEntity[]): ItemFields[] {
    return item.map((x) => ({
      id: x.id,
      name: x.name,
      amount: x.amount / x.quantity,
    }));
  }

  async handleNewTender(ctx: Context, message: string): Promise<string> {
    const [, itemId] = parseMessage(message, EDIT_ORDER_PREFIX);
    const { id } = ctx.from;

    // const order = this.orderRepo.create({
    //   item,
    //   users: user,
    // });

    // await order.save();

    // return
  }

  async cancelOrder(message: string) {
    const [orderId] = parseMessage(message, CANCEL_ORDER_PREFIX);
    const order = await this.orderRepo.findOne(orderId);
    order.status = OrderStatuses.CANCELLED;
    await order.save();

    return formCancelledOrderString(order.users?.name);
  }

  async confirmOrder(message: string) {
    const [orderId, strQuantity] = parseMessage(message, SEMICOLON_SPLITTER);
    const requiredQuantity = +strQuantity;
    const order = await this.orderRepo.findOne(orderId);
    const { quantity, amount } = order.item;

    if (requiredQuantity > order.item.quantity) {
      return formNotEnoughItem(quantity);
    }

    const cost = Math.round((amount / quantity) * requiredQuantity);
    order.item.quantity -= requiredQuantity;
    order.item.amount -= cost;
    await order.item.save();

    order.quantity = requiredQuantity;
    order.amount = cost;
    order.status = OrderStatuses.CONFIRMED;
    await order.save();

    return formConfirmedOrderString(order.users.name, cost);
  }


  async getOrders(): Promise<string> {
    const orders = await this.orderRepo.getOrders();
    const confirmedOrders = orders
      .filter((x) => x.status === OrderStatuses.CONFIRMED)
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      return ''
  }

  async deliverOrder(orderId: string): Promise<string> {
    const order = await this.orderRepo.findOne(orderId);
    order.status = OrderStatuses.DELIVERED;
    await this.orderRepo.update(orderId, order);
    return getDeliverOrderString(orderId);
  }

  async getCatalog(message: string): Promise<void> {
    const [, name] = parseMessage(message, AMPERSAND_SPLITTER);
    const catalog = await this.catalogRepo.findOne({ name });
    return catalog;
  }

  async addBid(message: string): Promise<void> {
    const [, name, quantity, amount, catalogName] = parseMessage(
      message,
      AMPERSAND_SPLITTER,
    );



    
    // const catalog = await this.catalogRepo.findOne{);
   // let bid = await this.bidRepo.findOne();

 
  }
}
