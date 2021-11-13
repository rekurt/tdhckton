import { Logger } from "@nestjs/common";

export class ActionService {
    bot: any;
    telegramChatRepository: any;
    userRepository: any;
    logger = new Logger(ActionService.name)

    constructor() {


  this.bot.hears('➕ /subscribe', async (ctx) => {
    return this.subscribe.call(this, ctx);
  })

  this.bot.hears('❌ /unsubscribe', async (ctx) => {
    return this.unsubscribe.call(this, ctx);
  })

  this.bot.hears('📋 /subscribers', async (ctx) => {
    return this.subscribers.call(this, ctx);
  })

  this.bot.hears('⚙️ /settings', async (ctx) => {
    return  this.settingsInfo.call(this, ctx);
  })

  this.bot.action(/^\/show .*$/gm, async (ctx) => {
    return this.show.call(this, ctx);
  })

  this.bot.hears('📸 /show', async (ctx) => {
    return this.show.call(this, ctx);
  })

  this.bot.command('subscribe', async (ctx) =>  {
    return this.subscribe.call(this, ctx);
  })

  this.bot.command('unsubscribe', async (ctx) => {
    return this.unsubscribe.call(this, ctx);
  })

  this.bot.command('subscribers', async (ctx) => {
    return this.subscribers.call(this, ctx);
  })

  this.bot.command('settings', async (ctx) => {
    return this.settingsInfo.call(this, ctx);
  });

  this.bot.command('show', async (ctx) => {
    return this.show.call(this, ctx);
  });

  this.bot.command('start', async (ctx) => {
    const { user } = ctx.session;
    return ctx.reply(`Hello ${user.username}! You can see bot's commands by /commands.`, this.addCommandsKeyBoard());
  })

  // некоторым проще когда есть комманды. и так как это по умолчанию доступно во всех ботах - реализуем на всякий случай и тестовое меню.
  this.bot.command('commands', async (ctx) => {
    ctx.reply(`This commands are available:
    1. /subscribe <title> - to subscribe channel on bot. If title is provided it will associated to subscribed channel;
    2. /subscribers - to see all your added channels;
    3. /models - to show all models;
    4. /unsubscribe <title> - to unsubscribe channel from bot. If no title is provided this channel will be unsubscribed, othwerwise channel with provided title will be unsubscribed;
    5. /settings - to get notification settings for this channel or make a new one;
    6. /show - to get screenshots of your models right now.
    7. /show <modelName> - to get screenshots of your model with modelName.
    You can add bot to whatever channel you want.
    `, this.addCommandsKeyBoard());
  });

  this.bot.action('getSettings', async (ctx) => {
    return  this.settings.call(this, ctx);
  })

  this.bot.action('configureSettings', async (ctx) => {
    return this.configureNotifications.call(this, ctx);
  })
    }
    addCommandsKeyBoard(): any {
        throw new Error("Method not implemented.");
    }

/**
     * Подключаем чат к боту, чтобы он мог с ним взаимодействовать.
     *
     * @param {*} ctx
     * @return {*} 
     */
 async  subscribe(ctx) {
    const { user, from } = ctx.session;
    const { message } = ctx.update;
    const chat = ctx.chat;
    ctx.telegram.sendChatAction(chat.id, 'typing');
    const telegramChatsCount = user.telegramChats?.length || await this.telegramChatRepository.count({ userId: user.id });
      const arrString = message.text.split(' ');
      let chatTitle;
      if (arrString[1] && arrString[1] !== '/subscribe') {
        arrString.splice(0,1);
        chatTitle = arrString.join(' ').trim()
      } else {
        chatTitle = chat.title;
      }

      const telegramChat = new Chat();
      telegramChat.telegramId = from.id;
      telegramChat.chatId = chat.id;
      telegramChat.user = user;
      telegramChat.chatTitle = chatTitle;
      telegramChat.screenshotTimeIntervalId = 1;

      try {
        await telegramChat.save();
      } catch(error) {
          return error.code === 'DUPS' ? ctx.reply('Subscription already added or title is used.') : ctx.reply('Sorry, an error has occured. Please, contact us.');
      }

      ctx.session.user = await this.userRepository.findOneByTelegramName(from.username);

      return ctx.reply('Subscription added.');
    
  }

  /**
   * Отписываем чат от бота.
   * Если без параметра то чат в котором вызвана команда.
   * Если с параметром(текстом после пробела) который является названием чата из списка suscribers,
   * отписываем тот чат.
   *
   * @param {*} ctx
   * @return {*} 
   */
  async  unsubscribe(ctx) {
    const { user, from } = ctx.session;

    const chat = ctx.chat;
    const { message } = ctx.update;
    ctx.telegram.sendChatAction(chat.id, 'typing');
    const arrString = message.text.split(' ');
    let chatTitle;
    if (arrString[1] && arrString[1] !== '/unsubscribe') {
      arrString.splice(0,1);
      chatTitle = arrString.join(' ').trim()
    }
    let result;
    if (chatTitle) {
      result = await this.telegramChatRepository.delete({ chatTitle: chatTitle, telegramId: from.id });
    } else {
      result = await this.telegramChatRepository.delete({ chatId: chat.id, telegramId: from.id });
    }

    if (!result || !result.affected) {
      console.log(`Delete subscribstion which is not exist. User: ${user.telegramUsername}, unsubscribed chat: ${chat.id}`);
      return ctx.reply(`You have no such subscriber${chatTitle ? ' with title "' + chatTitle + '"':'.'} `)
    }

    ctx.session.user = await this.userRepository.findOneByTelegramName(from.username);

    return ctx.reply('Subscription deleted.')
  }

  /**
   * Чтобы увидеть в каких чатах учавствует бот. 
   * Сказали что не нужная вещь. Так как решили что бот в ограниченное число чатов может быть добавлен, 
   * но вроде снова не определились какое именно
   *
   * @param {*} ctx
   * @return {*} 
   */
  async  subscribers(ctx) {
    const { from } = ctx.session;

    const chat = ctx.chat;
    ctx.telegram.sendChatAction(chat.id, 'typing');
    const chats = await this.telegramChatRepository.find({
      select:['chatTitle'],
      where: {
        telegramId: from.id
      }
    });
    let message = 'Your subscribers: \n';
    let i = 0;
    chats.forEach((chat) => {
      i = i+1;
      message +=`${i}. <b>${chat.chatTitle}</b>  \n`;
    })

    return ctx.reply(message, Extra.HTML())
  }

  /**
   * Конфигурация настроек бота. Здесь вызывается wizard.
   *
   * @param {*} ctx
   * @return {*} 
   */
  async  configureNotifications(ctx) {
    const { from } = ctx.session;

    const chat = ctx.chat;
    const user = await this.userRepository.findOne({ telegramUsername: from.username }, { relations: ['settings', 'telegramChats']});
    if (user.telegramChats && user.telegramChats.length) {
      const foundChat = user.telegramChats.find(ch => ch.chatId == chat.id);
      if (!foundChat) {
        return ctx.reply(`I can't find this chat in your chats. Subscribe first /subscribe`)
      }
    } else {
      return ctx.reply(`I can't find this chat in your chats. Subscribe first /subscribe`)
    }

    ctx.session.user = user;
    ctx.session.data = {
      telegramId: from.id,
      chatId: chat.id,
    };
    return ctx.scene.enter('schedule-wizard');
  }

  /**
   * Просмотр конкретных настроек бота.
   *
   * @param {*} ctx
   * @return {*} 
   */
  async  settings(ctx) {
    const { from } = ctx.session;
    const user = await this.userRepository.findOne({telegramUsername: from.username}, { relations: ['telegramChats'] });
    if (!user.telegramChats) {
      return ctx.reply(`I can't find this chat in your chats. Subscribe first /subscribe`)
    }

    const chat = ctx.chat;
    const foundChat = user.telegramChats.find(ch => ch.chatId == chat.id);
    if (!foundChat) {
      return ctx.reply(`I can't find this chat in your chats. Subscribe first /subscribe`)
    }

    // const nameDays = { '1-7': 'Mon - Sun', '1-5': 'Mon - Fri' };
    const boolStat = { 'true': 'yes', 'false': 'no' }

    try {
      const data = `Yours settings are: 
      1. Screenshot timer: ${foundChat.screenshotTimeInterval.screenshotTimeInterval} min;
      2. Day schedule time: ${foundChat.hours};
      3. Recieve notification when model is online: ${boolStat[foundChat.ifOnline.toString()]};
      4. Recieve notification when model is offline: ${boolStat[foundChat.ifOffline.toString()]}`
      return ctx.reply(data);
    } catch (err) {
      return ctx.reply('Ooops. Something goes wrong!');
    }

  }

  /**
   * Вызов подменю с возможностью настроить бота или просмотреть текущие насройки.
   *
   * @param {*} ctx
   * @return {*} 
   */
   settingsInfo(ctx) {
    return ctx.reply('Get notification settings or make a new configuration', Markup.inlineKeyboard([
      [Markup.callbackButton('🗄️ Get settings', 'getSettings'),
      Markup.callbackButton('🔧 Configure', 'configureSettings')
    ]]).extra())
  }

  /**
   * Показать скриншот моделей.
   * По умолчанию создаётся коллаж всех моделей.
   * Если после пробела указано имя модели то покажет только её.
   *
   * @param {*} ctx
   * @return {*} 
   */
  async  show(ctx) {
    const chat = ctx.chat;
    ctx.telegram.sendChatAction(chat.id, 'typing');
    let message;
    if (ctx.update.message) {
      ({ message } = ctx.update);
    } else {
      message = { text: ctx.update.callback_query.data };
    }
    const arrString = message.text.split(' ');
    try {
      if ((arrString[1] && arrString[1] !== '/show') || (arrString[1] && arrString[1] === '/show' && arrString[2])) {
        let nickname
        if (arrString[1] && arrString[1] !== '/show') {
          nickname = arrString[1];
        } else {
          nickname = arrString[2];
        }
        ctx.reply(`Screenshot for model ${nickname} are being prepared. Hold on a minute, please...`);
        this.webcamModelsService.getNowOneModelStatusAndScreenshotByNickname(nickname, chat.id.toString());
      } else {
        ctx.reply('Screenshots are being prepared. Hold on a minute, please...');
        this.webcamModelsService.getNowUserModelsStatusAndScreenshot(chat.id.toString());
      }
    } catch(err) {
      return ctx.reply("Can't find model.");
    }

    return ctx.telegram.sendChatAction(chat.id, 'typing');
  }

public launch(): void {
  this.bot.launch();
}

/**
 * Отправка сообщения со статусами моделей. Подготавиваем данные и затем вызываем метод отправки текстового сообщения.
 *
 * @param {{ user: User, messages: {} }} { user, messages }
 * @return {Promise} Promise void
 * @memberof BotService
 */
public async sendStatusMessage({ user, messages } : { user: User, messages: {} }): Promise<void> {
  const promises = [];
  user.telegramChats.forEach((telegramChat: TelegramChat) => {
    let result = '';
    if (telegramChat.ifOnline) {
      result += messages[WEBCAM_STATUS_ONLINE] || '';
    }

    if (telegramChat.ifOffline) {
      result += messages[WEBCAM_STATUS_OFFLINE] || '';
    }

    if (result.length) promises.push(this.bot.telegram.sendMessage(telegramChat.chatId, result));
  })

  try {
    await Promise.all(promises);
  } catch(err) {
    console.log(err);
  }
}
 


public async sendMessage({ user, message } : { user: User, message: string }): Promise<void> {
  const promises = [this.bot.telegram.sendMessage(user.chatId, message)];
  
  try {
    await Promise.all(promises);
  } catch(err) {
    this.logger.error(`BotService ${user}: ${err}`);
  }
}

/**
 * Отправить фото подписчику. Если размер фото большой то шлём как документ, чтобы качество не пропало.
 *
 * @param {({ user: User, photoPath: string, photosCount: undefined | number })} { user, photoPath, photosCount }
 * @return {Promise} Promise void
 * @memberof BotService
 */
public async sendPhoto({ user, photoPath, photosCount } : { user: User, photoPath: string, photosCount: undefined | number }): Promise<void> {
  const promises = [];
  console.time(`sendPhoto prepare telegram notifications for ${user.username}`);
  user.telegramChats.forEach((telegramChat: TelegramChat) => {
    if (photosCount <= 10) {
      promises.push(this.bot.telegram.sendPhoto(telegramChat.chatId, { source: photoPath }));
    } else {
      promises.push(this.bot.telegram.sendDocument(telegramChat.chatId, { source: photoPath }));
    }
  })

  try {
    await Promise.all(promises);
    console.timeEnd(`sendPhoto prepare telegram notifications for ${user.username}`);
    fs.unlink(photoPath, (err) => {
      if (err) this.logger.error(err);
    });
  } catch(err) {
    this.logger.error(err);
  }
}

/**
 * Метод не релизован.
 * TODO: удалить?
 *
 * @return {Promise} Promise void
 * @memberof BotService
 */
 async getChat(): Promise<void> {
  await this.bot.telegram.sendMessage(-1001428618911, 'You\'re so lucky');
  // const result = await this.bot.context.getChat('@verberden');
  // console.log(result);
}

 
}