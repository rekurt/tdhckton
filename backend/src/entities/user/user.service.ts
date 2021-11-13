/* eslint-disable no-underscore-dangle */
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Injectable } from '@nestjs/common';
import { ChatDTO } from '../interfaces/dtos';

export class IUserCreatePayload {
  chatId: number;

  name: string;
}

export type IPatchUserPayload = Partial<User>;

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  prepareDTO(doc: User): ChatDTO {
    if (!doc) {
      return null;
    }
    return {
      id: doc.id,
      chatId: doc.chatID,
      authCode: doc.authToken,
      chatTitle: doc.name,
      inn: doc.inn,
    };
  }

  async get(chatId: number): Promise<ChatDTO> {
    const user = await this.getDocument(chatId);
    return this.prepareDTO(user);
  }

  async getDocument(chatId: number): Promise<User> {
    return this.userModel.findOne({ chatId }).exec();
  }

  async getList(
    chatId: number,
    username: string,
    name: string,
    skip = 0,
    limit = 10,
  ): Promise<ChatDTO[]> {
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
    const users = await this.userModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    return users.map(this.prepareDTO);
  }

  async getById(chatId: number): Promise<ChatDTO> {
    const user = await this.userModel.findOne({ chatId }).exec();
    return this.prepareDTO(user);
  }

  async create(payload: IUserCreatePayload): Promise<ChatDTO> {
    const userDoc = await this.get(payload.chatId);
    if (userDoc) {
      return userDoc;
    }
    const user = await this.userModel.create({
      ...payload,
    });
    return this.prepareDTO(user);
  }

  async edit(payload: IPatchUserPayload): Promise<ChatDTO> {
    const { chatID } = payload;
    await this.userModel.updateOne({ chatID }, payload);
    return this.get(chatID);
  }
}
