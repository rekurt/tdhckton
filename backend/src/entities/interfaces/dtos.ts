import { IOfferStatus } from './interfaces';

export class OfferDTO {
  readonly id: string;

  supplierID: string;

  providerID: string;

  bidID: string;

  authToken?: string;

  createdAt: string;

  status: IOfferStatus;
}

export class BidDTO {
  readonly id: string;

  supplierId: number;

  auctionId?: string;

  amount: number;

  stepAmount: number;

  createdAt: number;
}

export class AuctionDTO {
  readonly id: string;

  auctionId: string;

  'name': string;

  city: string;

  bids: BidDTO[];

  winner?: string;

  stateName: string;

  'startPrice': number;

  'offerCount': number;

  'auctionCurrentPrice': number;

  'auctionNextPrice': number;

  'beginDate': Date;

  'endDate': Date;

  'regionName': string;
}

export class ChatDTO {
  id?: string;

  chatId?: number;

  isAuth?: boolean;

  authCode?: string;

  chatTitle?: string;

  inn?: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export class ContractDTO {
  readonly id: string;

  supplierID: string;

  providerID: string;

  bidID: string;

  authToken?: string;

  createdAt: string;

  status: IOfferStatus;
}
