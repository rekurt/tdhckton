import { Document, Schema } from 'mongoose';

export const ContractSchema = new Schema(
  {
    Contract_id: {
      type: Number,
      index: true,
    },
    Contract_name: {
      type: String,
      index: true,
    },
    Category: {
      index: true,
      type: String,
    },
    Category_id: {
      index: true,
      type: String,
    },
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
