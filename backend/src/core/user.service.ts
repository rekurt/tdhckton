import { Model } from 'mongoose';
import { User } from 'src/entities/user/user.model';
import {InjectModel} from "@nestjs/mongoose";

export default class UserService {
  constructor(@InjectModel('User') private userRepository: Model<User>) {}

  async saveUser(chatId: number, name: string, message: string): Promise<any> {
    const payload = {
      chatId,
      name,
      message,
    };
    return this.userRepository.create({ payload });
  }
}
