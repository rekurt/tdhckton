// import { OfferStatuses } from 'src/shared.types';
// import { InjectBot } from "nestjs-telegraf";
// import { Telegraf } from "telegraf";
// import { SPLITTER, CANCEL_ORDER_PREFIX, SEMICOLON_SPLITTER, AMPERSAND_SPLITTER } from "src/constants";
// import { Catalog } from "src/entities/interfaces";
// import { Injectable } from "@nestjs/common";
// import { OfferDTO } from './../modules/interfaces/CteDTO';

// @Injectable()
// export class AuctionService {
//     constructor(
//         @InjectBot() private bot: Telegraf<any>,
//         private catalogRepository: any,
//         private offerRepository: any,
//       ) {
//         this.bot.start((ctx) => ctx.reply('Welcome'))
//       }

//   async getCatalogsNames(): Promise<Catalog[]> {
//     const catalogs = await this.catalogRepository.find();
//     return catalogs.map(({ name, description }) => ({
//       name,
//       description,
//     }));
//   }

//   async getCatalogsItem(message: string): Promise<string> {
//     const [, catalogName] = helpers.parseMessage(message, SPLITTER);
//     const catalogItem = await this.getItem([catalogName]);
//     const updatedCatalog = this.countCostPerItem(catalogItem);
//     // return buildCatalogMessage(updatedCatalog);
//     return 'item message';
//   }

//   async getItem(catalogs: string[]): Promise<any[]> {
//     let item = [] as any[];

//     // for (const catalog of catalogs) {
//     //   const gg = await this.itemRepo.find({
//     //     catalogId: catalog.id
//     //   })
//     // }

//     return item;
//   }

//   countCostPerItem(item: any[]): any[] {
//     return item.map((x) => ({
//       id: x.id,
//       name: x.name,
//       amount: x.amount / x.quantity,
//     }));
//   } 

//   async cancelOffer(message: string) {
//     const [offerId] = helpers.parseMessage(message, CANCEL_ORDER_PREFIX);
//     const offer = await this.offerRepository.findOne(offerId);
//     offer.status = OfferStatuses.CANCELLED;
//     await offer.save();
//     return 'offerIsCancelled';
//     }

//   async confirmOffer(message: string) {
//     const [offerId, strQuantity] = helpers.parseMessage(message, SEMICOLON_SPLITTER);
//     const requiredQuantity = +strQuantity;
//     const offer = await this.offerRepository.findOne(offerId);
//     const { quantity, amount } = offer.item;

//     const cost = Math.round((amount / quantity) * requiredQuantity);
//     offer.item.quantity -= requiredQuantity;
//     offer.item.amount -= cost;
//     await offer.item.save();

//     offer.quantity = requiredQuantity;
//     offer.amount = cost;
//     offer.status = OfferStatuses.CONFIRMED;
//     await offer.save();
//     return 'confirmed'
//   }


//   async getOffers(): Promise<OfferDTO[]> {
//     const offers = await this.offerRepository.getOffers();
//     const confirmedOffers = offers
//       .filter((x) => x.status === OfferStatuses.CONFIRMED)
//       .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

//       const offersRes: OfferDTO[]= []
//       return offersRes;
//   }

//   async getCatalog(message: string): Promise<void> {
//     const [, name] = helpers.parseMessage(message, AMPERSAND_SPLITTER);
//     const catalog = await this.catalogRepository.findOne({ name });
//     return catalog;
//   }

//   async addBid(message: string): Promise<void> {
//     const [, name, quantity, amount, catalogName] = helpers.parseMessage(
//       message,
//       AMPERSAND_SPLITTER,
//     );



    
//     // const catalog = await this.catalogRepository.findOne{);
//    // let bid = await this.bidRepo.findOne();

 
//   }
// }