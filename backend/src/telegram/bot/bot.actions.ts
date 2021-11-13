export class BotActions {

     addCommandsKeyBoard() {
        return Markup
        .keyboard([
          ['➕ /subscribe', '❌ /unsubscribe'], // Row1 with 2 buttons
          ['📸 /show', '👯‍♀️ /models', '⚙️ /settings'], // Row2 with 3 buttons '📋 /subscribers'
        ])
        .resize()
        .extra()
      }
  
      /**
       * Выводим в чат моделей.
       *
       * @param {*} ctx
       * @return {*} 
       */
      async  models(ctx) {
        const chat = ctx.chat;
        ctx.telegram.sendChatAction(chat.id, 'typing');
        const modelsButtons = [];
        const message = 'Models: \n';
        // const metaModels = await this.webcamModelsService.getModels(user);
        // 
        // 
        // for (const key in metaModels) {
        //   metaModels[key].forEach((model) => {
        //     // message += `${model.nickname} ${model.platform} \n`
        //     modelsButtons.push([Markup.callbackButton(`${model.nickname} ${model.platform}`, `/show ${model.nickname}`)]);
        //     console.log(`/show ${model.nickname}`);
        //   })
        // }
  
        const models = await this.webcamModelsService.getChatModels(chat.id.toString());
        models.forEach((model) => {
          modelsButtons.push([Markup.callbackButton(`${model.nickname} ${model.platform}`, `/show ${model.nickname}`)]);
        })
        return ctx.reply(message, Markup.inlineKeyboard(modelsButtons).extra())
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
        if (telegramChatsCount < MAX_SUBSCRIPTIONS_COUNT) {
          const arrString = message.text.split(' ');
          let chatTitle;
          if (arrString[1] && arrString[1] !== '/subscribe') {
            arrString.splice(0,1);
            chatTitle = arrString.join(' ').trim()
          } else {
            chatTitle = chat.title;
          }
    
          const telegramChat = new TelegramChat();
          telegramChat.telegramId = from.id;
          telegramChat.chatId = chat.id;
          telegramChat.user = user;
          telegramChat.chatTitle = chatTitle;
          telegramChat.screenshotTimeIntervalId = 1;
    
          try {
            await telegramChat.save();
          } catch(error) {
            if (error.code === DUPLICATE_ERROR_CODE) {
              return ctx.reply('Subscription already added or title is used.')
            }
            return ctx.reply('Sorry, an error has occured. Please, contact us.')
          }
  
          ctx.session.user = await this.userRepository.findOneByTelegramName(from.username);
    
          return ctx.reply('Subscription added.');
        } else {
          return ctx.reply(`Sorry, you\'ve already have maximum of subsciptions: ${MAX_SUBSCRIPTIONS_COUNT}.`);
        }
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
}