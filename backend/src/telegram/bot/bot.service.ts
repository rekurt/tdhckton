// eslint-disable-next-line @typescript-eslint/no-var-requires
const RedisSession = require('telegraf-session-redis');
import { Injectable, Inject, Logger } from '@nestjs/common';
import {  WEBCAM_STATUS_ONLINE, WEBCAM_STATUS_OFFLINE } from 'src/constants';
import superWizard from './telegraf-handlers/config.handler'
import * as WizardScene from 'telegraf/scenes/wizard';
import { User } from 'src/users/user.entity';
import { Telegraf } from 'telegraf';
import { Stage } from 'telegraf/typings/scenes';
import RedisConf from 'src/config/redis';


/**
 * В Ботсервисе настраиваем и подключаемся к боту. Затем можем отправлять сообщения. Бот серви на основе пакета telegraf
 * Настроены меню для использования в боте. Испольльзуются как система комманл так и ожидание определённого сообщения.
 * Например, есть команда '/subscribe' и эквивалентное сообщение '➕ /subscribe'. Им назанчаются одинаковые обработчики.
 * То есть очень похоже на express, где bot.use(middleware(context, next))
 * Для осуществления настройки расписания бота используется wizard 
 * и сам метод-обработчик находится в отдельном файле telegraf-handlers/config.handler.ts
 * 
 *
 * @export
 * @class BotService
 */
@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);
  private bot: Telegraf<any>;
  private wizards: WizardScene[];

  constructor() {
    const botToken: string = '   ';
    this.wizards = [ superWizard.call(this) ];
    this.bot = new Telegraf(botToken);

    // сессии бота хранятся в редисе. например, чтобы помнить на чём остановился человек.
    const session = new RedisSession({
      store: RedisConf,
      ttl: 86400
    })
    const stage = new Stage(this.wizards, { ttl: 3600 });
    this.bot.use(session.middleware());
    this.bot.use(stage.middleware());
    this.bot.catch((er, ctx)=> this.logger.error(er));

    this.bot.hears('👯‍♀️ /models', async (ctx) => {
      return await models.call(this, ctx);
    })

    this.bot.hears('➕ /subscribe', async (ctx) => {
      return await subscribe.call(this, ctx);
    })

    this.bot.hears('❌ /unsubscribe', async (ctx) => {
      return await unsubscribe.call(this, ctx);
    })

    this.bot.hears('📋 /subscribers', async (ctx) => {
      return await subscribers.call(this, ctx);
    })

    this.bot.hears('⚙️ /settings', async (ctx) => {
      return await settingsInfo.call(this, ctx);
    })

    this.bot.action(/^\/show .*$/gm, async (ctx) => {
      return await show.call(this, ctx);
    })

    this.bot.hears('📸 /show', async (ctx) => {
      return await show.call(this, ctx);
    })

    this.bot.command('models', async (ctx) => {
      return await models.call(this, ctx);
    });

    this.bot.command('subscribe', async (ctx) =>  {
      return await subscribe.call(this, ctx);
    })

    this.bot.command('unsubscribe', async (ctx) => {
      return await unsubscribe.call(this, ctx);
    })

    this.bot.command('subscribers', async (ctx) => {
      return await subscribers.call(this, ctx);
    })

    this.bot.command('settings', async (ctx) => {
      return await settingsInfo.call(this, ctx);
    });

    this.bot.command('show', async (ctx) => {
      return await show.call(this, ctx);
    });

    this.bot.command('start', async (ctx) => {
      const { user } = ctx.session;
      return ctx.reply(`Hello ${user.username}! You can see bot's commands by /commands.`, addCommandsKeyBoard());
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
      `, addCommandsKeyBoard());
    });

    this.bot.action('getSettings', async (ctx) => {
      return await settings.call(this, ctx);
    })

    this.bot.action('configureSettings', async (ctx) => {
      return await configureNotifications.call(this, ctx);
    })
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

  /**
   * Отправить текстовое сообщение подписчику.
   *
   * @param {{ user: User, message: string }} { user, message }
   * @return {Promise} Promise void
   * @memberof BotService
   */
  public async sendMessage({ user, message } : { user: User, message: string }): Promise<void> {
    const promises = [];
    user.telegramChats.forEach((telegramChat: TelegramChat) => {
      promises.push(this.bot.telegram.sendMessage(telegramChat.chatId, message));
    })

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
  public async getChat(): Promise<void> {
    await this.bot.telegram.sendMessage(-1001428618911, 'You\'re so lucky');
    // const result = await this.bot.context.getChat('@verberden');
    // console.log(result);
  }
}

function addCommandsKeyBoard(): import("telegraf/typings/telegram-types").ExtraReplyMessage {
  throw new Error('Function not implemented.');
}
