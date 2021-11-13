import { Model } from 'mongoose';
import { User } from 'src/entities/user/user.model';

export default class UserService {
  constructor(private userRepository: Model<User>) {}

  async saveUser(chatId: number, name: string, message: string): Promise<any> {
    const payload = {
      chatId,
      name,
      message,
    };
    return this.userRepository.create({ payload });
  }
}
