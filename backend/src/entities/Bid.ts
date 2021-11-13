import { Document, Schema } from 'mongoose';

export const BidSchema = new Schema(
  {
    id: { type: String },

    supplierId: { type: String },

    auctionId: { type: String, index: true },

    amount: { type: Number },

    stepAmount: { type: Number },

    createdAt: { type: Number },
  },
  { timestamps: true },
);

export class BidDocument extends Document {
  options: IContractOption[];
}

export class IContractOption {
  id: string;

  value: string;
}
