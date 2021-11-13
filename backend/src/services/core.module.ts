import { CTESchema } from './../entities/CTE';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/user/user.model';
import { UserService } from 'src/entities/user/user.service';
import { ContractSchema } from 'src/entities/Contract';
import { BidsService } from './bids.service';
import { BidSchema } from 'src/entities/Bid';
import { OfferService } from './offers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'CTE', schema: CTESchema }]),
    MongooseModule.forFeature([{ name: 'Contract', schema: ContractSchema }]),
    MongooseModule.forFeature([{ name: 'Bid', schema: BidSchema }]),
  ],
  providers: [UserService, OfferService, BidsService],
  exports: [UserService],
})
export class UserModule {}
