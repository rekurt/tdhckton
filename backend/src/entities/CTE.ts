import { Document, Schema } from 'mongoose';

export const CTESchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifyingCode: {
      type: String,
      unique: true,
      index: true,
    },
    ref: {
      type: String,
      unique: true,
      index: true,
    },
    refBalance: {
      type: Number,
      default: 0,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    male: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    birthdate: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    extra: {
      type: Map,
      default: new Map(),
    },
  }, { timestamps: true });


export const CTEOptionSchema = new Schema({
    
  },
   { timestamps: true }
);

export class User extends Document {
  email: string;

  verifiedEmail: boolean;

  verifyingCode: string;

  ref: string;

  name: string;

  refBalance: number;

  password: string;

  extra: Map<string, any>;

  city?: string;

  country?: string;

  birthdate?: string;

  lastname?: string;

  male?: string;
}

export class ICTEOption {
  id: string;

  currency: string;

  value: string;

  data: any;
}
 