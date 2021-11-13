export class CustomerDTO {

    "name": string;

    "inn": number;

    "supplierId": string;

    "customerId": string;

    "id": string

  }

export class AuctionDTO {
    readonly id: string;
  

    "auctionId": string;


    "name": string;
    "customers": CustomerDTO[];

    "purchaseCreator": {

      "name": string;

      "inn": number;

      "supplierId": number,

      "customerId": number,

      "id": number

    };

    "winner": string;

    "stateName": string;

    "startPrice": number;

    "offerCount": number;

    "auctionCurrentPrice": number;
    
    "auctionNextPrice": number;
    
    "beginDate": Date;

    "endDate": Date;
    
    "regionName": String;

    "federalLawName": IFed; 

  },
