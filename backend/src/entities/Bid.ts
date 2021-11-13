import { Document, Schema } from 'mongoose';

export const BidSchema = new Schema(
  {
    
  },
  { timestamps: true },
);

export class ContractDocument extends Document {
  options: IContractOption[];
}

export class IContractOption {
  id: string;

  currency: string;

  value: string;

  data: any;
}
