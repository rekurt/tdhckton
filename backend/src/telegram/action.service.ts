import { Injectable } from '@nestjs/common';
import { BidsService } from '../core/bids.service';
import { OfferService } from '../core/offers.service';
import { OfferDTO } from '../entities/interfaces/dtos';
import { UserService } from '../entities/user/user.service';

@Injectable()
export class ActionService {
  constructor(
    private bidsService: BidsService,
    private userService: UserService,
    private offerService: OfferService,
  ) {}

  hideOffer(chatId: number): OfferDTO {
    return null;
  }

  goHome(chatId: number): any {}

  getList(chatId: number, filters: any): OfferDTO[] {
    return [];
  }

  setFilters(chatId: number, filters): any {}

  setUpdateNotify(chatId: number, filterObject) {}

  next(chatId: number, currentPosition) {}

  hide(chatId: number, currentPosition) {} // не участвую

  setBid(chatId: number, bidConfig) {}

  setBidConfirm(chatId: number, bidConfig) {}

  setAutoBid(chatId: number, offerId, amount) {}

  setAutoBidConfirm(chatId: number, bidConfig) {}

  myBids(chatId) {}
}
