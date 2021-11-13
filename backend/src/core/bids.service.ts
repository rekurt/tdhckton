import { IBidConfigDTO } from '../entities/interfaces/interfaces';

export class BidsService {
  setBid(chatId: number, bidConfig: IBidConfigDTO) {}

  setBidConfirm(chatId: number, bidConfig) {}

  setAutoBid(chatId: number, offerId: string, amount: number) {}
  setAutoBidConfirm(chatId: number, bidConfig: any) {}

  myBids(chatId: number) {}
}
