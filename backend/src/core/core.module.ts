import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../entities/user/user.model';
import { UserService } from '../entities/user/user.service';
import { ContractSchema } from '../entities/Contract';
import { CTESchema } from '../entities/CTE';
import { BidsService } from './bids.service';
import { BidSchema } from '../entities/Bid';
import { OfferService } from './offers.service';
import { OfferSchema } from '../entities/Offer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'CTE', schema: CTESchema }]),
    MongooseModule.forFeature([{ name: 'Offer', schema: OfferSchema }]),
    MongooseModule.forFeature([{ name: 'Contract', schema: ContractSchema }]),
    MongooseModule.forFeature([{ name: 'Bid', schema: BidSchema }]),
  ],
  providers: [UserService, OfferService, BidsService],
  exports: [UserService, OfferService, BidsService],
})
export class CoreModule {}
