import { BidDTO } from './BidDTO';

export class AuctionDTO {
    readonly id: string;
  
    "auctionId": string;

    "name": string;

    city: string;

    "bids": BidDTO[];

    winner?: string;

    stateName: string;

    "startPrice": number;

    "offerCount": number;

    "auctionCurrentPrice": number;
    
    "auctionNextPrice": number;
    
    "beginDate": Date;

    "endDate": Date;
    
    "regionName": String;

  }
