import { IOfferStatus } from "./IOfferStatus";

export class OfferDTO {

    readonly id: string;

    supplierID: string
    
    providerID: string

    bidID: string

    authToken?: string;

    createdAt: string

    status: IOfferStatus;
}


