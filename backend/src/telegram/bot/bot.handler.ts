// import { Scene } from "nestjs-telegraf";
// import { WizardContextWizard } from "telegraf/typings/scenes";

// function superWizard(): Stage {

//   return new WizardContextWizard('schedule-wizard',
//     async (ctx) => {
//       const timeInterval = ctx.session.user.settings.screenshotTimeInterval.screenshotTimeInterval;
//         // Markup.callbackButton(`${timeInterval.screenshotTimeInterval} min`, JSON.stringify({ intervalId: timeInterval.id, interval: timeInterval.screenshotTimeInterval }))
//         // так как используются коллбэк баттоны, то после каждого шага мы проверяем был ли callback_query
//         // и как бы устаналиваем свой обработчик данных в завизимости от того, что было передано.
//         // ctx.reply('Step 1. Choose time interval of making screenshots:',
//         // Markup.inlineKeyboard([
//         //   [...array],
//         //   [
//         //     Markup.callbackButton('❌ Cancel', 'cancel')
//         //   ]
//         // ]).extra());
     
//       return ctx.wizard.next()
//     }
//     // (ctx) => {
//     //   ctx.reply('Step 2. Enter schedule time in format(from-to) xx:xx-xx:xx. Minutes should be multiple of 5: 0, 5, 10 etc.', 
//     //   Markup.inlineKeyboard([
//     //     Markup.callbackButton('❌ Cancel', 'cancel'),
//     //     Markup.callbackButton('⬅️ Back', 'back')
//     //   ]).extra());
//     //   return ctx.wizard.next()
//     // },
//     // // коллбэк обработчик
//     // (ctx) => {
//     //   if (ctx.update.callback_query) {
//     //     if (ctx.update.callback_query.data === 'cancel') {
//     //       ctx.reply('Notification settings are cancelled.');
//     //       return ctx.scene.leave();
//     //     }
//     //     // возврат на шаг назад - сделал его очень ручным но не смог найти как это автоматизировать.
//     //     if (ctx.update.callback_query.data === 'back') {
//     //       ctx.wizard.selectStep(0);
//     //       return ctx.wizard.steps[0](ctx);
//     //     }
//     //     ctx.answerCbQuery('Oops! Something goes wrong.');
//     //     ctx.wizard.back();
//     //     return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //   }
//     //   const str = ctx.message.text;
//     //   const regex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0,5]-(([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0,5]|(24:00))$/;
//     //   if (regex.test(str)) {
//     //     const [time1, time2] = str.split('-');
//     //     const [hourse1, minutes1] = time1.split(':');
//     //     const [hourse2, minutes2] = time2.split(':');
//     //     if ((Number(hourse2) < Number(hourse1)) || (Number(hourse2) === Number(hourse1) && Number(minutes2) <= Number(minutes1))) {
//     //       ctx.reply(`Time from ${time1} less than time to ${time2}. Try again.`);
//     //       ctx.wizard.back();
//     //       return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //     }

//     //     ctx.session.data.hours = str;
//     //     ctx.wizard.next();
//     //     return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //   } 
//     //   ctx.reply('Message doesn\'t match time format xx:xx-xx:xx. Try again.');
//     //   ctx.wizard.back();
//     //   return ctx.wizard.steps[ctx.wizard.cursor](ctx);     
//     // },
//     // (ctx) => {
//     //   ctx.reply('Step 3. Do you want recieve notification when model is online?',  
//     //   Markup.inlineKeyboard([
//     //     [
//     //       Markup.callbackButton('Yes', 'yes'),
//     //       Markup.callbackButton('No', 'no')
//     //     ],
//     //     [
//     //     Markup.callbackButton('❌ Cancel', 'cancel'),
//     //     Markup.callbackButton('⬅️ Back', 'back')
//     //     ]
//     //   ]).extra());
//     //   return ctx.wizard.next()
//     // },
//     // (ctx) => {
//     //   if (ctx.update.callback_query) {
//     //     if (ctx.update.callback_query.data === 'cancel') {
//     //       ctx.reply('Notification settings are cancelled.');
//     //       return ctx.scene.leave();
//     //     }
//     //     if (ctx.update.callback_query.data === 'back') {
//     //       ctx.wizard.selectStep(2);
//     //       return ctx.wizard.steps[2](ctx);
//     //     }
//     //     if (ctx.update.callback_query.data === 'yes') {
//     //       ctx.session.data.ifOnline = true;
//     //       ctx.wizard.next();
//     //       ctx.answerCbQuery('Saved.');
//     //       return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //     }

//     //     if (ctx.update.callback_query.data === 'no') {
//     //       ctx.session.data.ifOnline = false;
//     //       ctx.wizard.next();
//     //       ctx.answerCbQuery('Saved.');
//     //       return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //     }
//     //     ctx.answerCbQuery('Oops! Something goes wrong.');
//     //     ctx.wizard.back();
//     //     return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //   }
//     // },
//     // (ctx) => {
//     //   ctx.reply('Step 4. Do you want recieve notification when model is offline.',  
//     //   Markup.inlineKeyboard([
//     //     [
//     //       Markup.callbackButton('Yes', 'yes'),
//     //       Markup.callbackButton('No', 'no')
//     //     ],
//     //     [
//     //     Markup.callbackButton('❌ Cancel', 'cancel'),
//     //     Markup.callbackButton('⬅️ Back', 'back')
//     //     ]
//     //   ]).extra());
//     //   return ctx.wizard.next()
//     // },
//     // (ctx) => {
//     //   if (ctx.update.callback_query) {
//     //     if (ctx.update.callback_query.data === 'cancel') {
//     //       ctx.reply('Notification settings are cancelled.');
//     //       return ctx.scene.leave();
//     //     }
//     //     if (ctx.update.callback_query.data === 'back') {
//     //       ctx.wizard.selectStep(4);
//     //       return ctx.wizard.steps[4](ctx);
//     //     }
//     //     if (ctx.update.callback_query.data === 'yes') {
//     //       ctx.session.data.ifOffline = true;
//     //       ctx.wizard.next();
//     //       ctx.answerCbQuery('Saved.');
//     //       return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //     }
//     //     if (ctx.update.callback_query.data === 'no') {
//     //       ctx.session.data.ifOffline = false;
//     //       ctx.wizard.next();
//     //       ctx.answerCbQuery('Saved.');
//     //       return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //     }
//     //     ctx.answerCbQuery('Oops! Something goes wrong.');
//     //     ctx.wizard.back();
//     //     return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //   }
//     // },
//     // async (ctx) => {
//     //   // const nameDays = { '1-7': 'Mon - Sun', '1-5': 'Mon - Fri' };
//     //   const boolStat = { 'true': 'yes', 'false': 'no' }
//     //   const { data } = ctx.session; 
//     //   ctx.reply(`Yours settings are: 
//     //     1. Screenshot timer: ${data.interval.interval} min;
//     //     2. Day schedule time: ${data.hours};
//     //     3. Recieve notification when model is online: ${boolStat[ctx.session.data.ifOnline]};
//     //     4. Recieve notification when model is offline: ${boolStat[ctx.session.data.ifOffline]}`,  
//     //     Markup.inlineKeyboard([
//     //       [
//     //         Markup.callbackButton('Save', 'save'),
//     //       ],
//     //       [
//     //       Markup.callbackButton('❌ Cancel', 'cancel'),
//     //       Markup.callbackButton('⬅️ Back', 'back')
//     //       ]
//     //   ]).extra());
//     //   return ctx.wizard.next()
//     // },
//     // async (ctx) => {
//     //   if (ctx.update.callback_query) {
//     //     if (ctx.update.callback_query.data === 'cancel') {
//     //       ctx.reply('Notification settings are cancelled.');
//     //       return ctx.scene.leave();
//     //     }
//     //     if (ctx.update.callback_query.data === 'back') {
//     //       ctx.wizard.selectStep(6);
//     //       return ctx.wizard.steps[6](ctx);
//     //     }
//     //     if (ctx.update.callback_query.data === 'save') {
//     //       try {
//     //         const { data } = ctx.session;
//     //         ctx.telegram.sendChatAction(data.chatId, 'typing');
//     //         const telegramChat = await this.telegramChatRepository.findOne({ chatId: data.chatId, telegramId: data.telegramId });
//     //         telegramChat.screenshotTimeIntervalId = data.interval.id;
//     //         // telegramChat.days = data.days;
//     //         telegramChat.hours = data.hours;
//     //         telegramChat.ifOnline = data.ifOnline;
//     //         telegramChat.ifOffline = data.ifOffline;
//     //         delete telegramChat.screenshotTimeInterval;
//     //         await telegramChat.save();
//     //         delete ctx.session.data;
//     //         ctx.answerCbQuery('Notification settings succesfuly saved.');
//     //         ctx.reply('Notification settings succesfuly saved.');
//     //         return ctx.scene.leave()
//     //       } catch(er) {
//     //         console.log(er);
//     //         ctx.answerCbQuery('Oops! Something goes wrong.');
//     //         ctx.wizard.back();
//     //         return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //       }
//     //     }
//     //     ctx.answerCbQuery('Oops! Something goes wrong.');
//     //     ctx.wizard.back();
//     //     return ctx.wizard.steps[ctx.wizard.cursor](ctx);
//     //   }
//     // },
//   )
// }

// export default superWizard;