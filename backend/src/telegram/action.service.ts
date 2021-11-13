import { BidsService } from './../services/bids.service';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { OfferDTO } from 'src/entities/interfaces/OfferDto';

@Injectable()
export class ActionService {
  constructor(
    private bidsService: BidsService,
    private userService: UserService,
    private offerService: OffersService,
  ) {}

  hideOffer(chatId: number): OfferDTO {}
  goHome(chatId: number): any {}
  getList(chatId: number, filters: any): OfferDTO[] {}
  setFilters(chatId, filters): any {}
  setUpdateNotify(chatId, filterObject) {}

  next(chatId, currentPosition) {}

  hide(chatId, currentPosition) {} // не участвую
  setBid(chatId, bidConfig) {}
  setBidConfirm(chatId, bidConfig) {}
  setAutoBid(chatId, offerId, amount) {}
  setAutoBidConfirm(chatId, bidConfig) {}
  myBids(chatId) {}
}
