import { Injectable } from '@nestjs/common';
import { ChatDTO, OfferDTO } from '../entities/interfaces/dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BidDocument } from '../entities/Bid';
import { OfferDocument } from '../entities/Offer';
import { ContractDocument } from '../entities/Contract';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel('Bid') private bidRepository: Model<BidDocument>,
    @InjectModel('Contract') private contractRepository: Model<ContractDocument>,
    @InjectModel('Offer') private offerRepository: Model<OfferDocument>,
  ) {}

  prepareDTO(offer: OfferDocument): OfferDTO {
    return null;
  }

  getCategoryList(name?: string) {}

  async getList(
    chatId: number,
    username: string,
    name: string,
    skip = 0,
    limit = 10,
  ): Promise<OfferDTO[]> {
    const query: any = {};
    if (chatId) {
      query.chatId = chatId;
    }
    if (username) {
      query.username = { $regex: `.*${username}.*`, $options: 'i' };
    }
    if (name) {
      query.name = { $regex: `.*${name}.*`, $options: 'i' };
    }
    const offers = await this.offerRepository
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    return offers.map(this.prepareDTO);
  }
}
