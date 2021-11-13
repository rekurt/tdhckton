import { Scenes } from 'telegraf';

export interface Catalog {
  name: string;
  description: string;
}
export type Context = Scenes.SceneContext;

export interface ItemFields {
  id: string;
  name: string;
  amount: number;
}

export enum IOfferStatus {
  Success = 'success',
  Declined = 'declined',
  Pending = 'pending',
}
