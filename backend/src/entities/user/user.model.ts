import { Schema } from 'mongoose';

export class UserDTO {
  readonly id: string;

  chatID?: string;

  authToken?: string;

  'name': string;

  'inn': number;
}

export type User = UserDTO & Document

export const UserSchema = new Schema({
  chatID: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  authToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  name: {
    type: String,
  },

  inn: {
    type: String,
  },
});
