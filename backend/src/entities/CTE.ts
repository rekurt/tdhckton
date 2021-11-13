import { Document, Schema } from 'mongoose';

export const CTEOptionSchema = new Schema(
  {
    Name: {
      type: String,
      unique: true,
      index: true,
    },
    id: {
      type: String,
      index: true,
    },
    Value: {
      type: String,
    },
    Unit: {
      type: String,
    },
  },
  { timestamps: true },
);

export const CTESchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    CTE_id: {
      type: Number,
      index: true,
    },
    CTE_name: {
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
    Properties: {
      type: Array,
      of: CTEOptionSchema,
    },
  },
  { timestamps: true },
);

export class CTEDocument extends Document {
  options: ICTEOption[];
}

export class ICTEOption {
  id: string;

  currency: string;

  value: string;

  data: any;
}
