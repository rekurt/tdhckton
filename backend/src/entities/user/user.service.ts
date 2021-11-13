/* eslint-disable no-underscore-dangle */
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDTO } from './user.model';
import { Injectable } from '@nestjs/common';

export class IUserCreatePayload {
  chatId: string;

  name: string;
}

export type IPatchUserPayload = Partial<User>;

@Injectable()
export class UserService {
  
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  prepareDTO(doc: User): UserDTO {
    if (!doc) {
      return null;
    }
    return {
      id: doc.id,
      chatID: doc.chatID,
      authToken: doc.authToken,
      name: doc.name,
      inn: doc.inn,
    };
  }

  async get(chatId: string): Promise<UserDTO> {
    const user = await this.getDocument(chatId);
    return this.prepareDTO(user);
  }

  async getDocument(chatId: string): Promise<User> {
    return this.userModel.findOne({ chatId }).exec();
  }

  async getList(
    userID: string,
    courseID: string,
    username: string,
    name: string,
    email: string,
    skip = 0,
    limit = 10,
  ): Promise<UserDTO[]> {
    const query: any = {};
    if (userID) {
      query._id = userID;
    }
    if (username) {
      query.username = { $regex: `.*${username}.*`, $options: 'i' };
    }
    if (name) {
      query.name = { $regex: `.*${name}.*`, $options: 'i' };
    }
    if (email) {
      query.email = { $regex: `.*${email}.*`, $options: 'i' };
    }
    if (courseID) {
      query.courseID = courseID;
    }
    const users = await this.userModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    return users.map(this.prepareDTO);
  }

  async getById(chatId: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({ chatId }).exec();
    return this.prepareDTO(user);
  }

  async create(payload: IUserCreatePayload): Promise<UserDTO> {
    const userDoc = await this.get(payload.chatId);
    if (userDoc) {
      return userDoc;
    }
    const user = await this.userModel.create({
      ...payload,
    });
    return this.prepareDTO(user);
  }

  async edit(payload: IPatchUserPayload): Promise<UserDTO> {
    const { chatID } = payload;
    await this.userModel.updateOne({ chatID }, payload);
    return this.get(chatID);
  }
}
