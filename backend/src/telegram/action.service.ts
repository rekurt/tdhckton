import { BidsService } from './../services/bids.service';
import { Injectable } from '@nestjs/common';
import { OfferService } from 'src/services/offers.service';
import { OfferDTO } from 'src/entities/interfaces/dtos';
import { UserService } from 'src/entities/user/user.service';

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
