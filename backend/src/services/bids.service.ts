export interface IAutoBid {
  offerId: number;
  userId: string;
  minAmount: number;
  step: number;
}

export class BidsService {
  setBid(chatId: number, bidConfig) {}
  setBidConfirm(chatId: number, bidConfig) {}
  setAutoBid(chatId: number, offerId: string, amount: number) {}
  setAutoBidConfirm(chatId: number, bidConfig: any) {}
  myBids(chatId: number) {}
}
