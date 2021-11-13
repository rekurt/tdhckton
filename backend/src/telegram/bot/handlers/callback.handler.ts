export default function CallbackService(ctx, err): any {
    if (ctx.update.callback_query) {
      if (ctx.update.callback_query.data === 'cancel') {
        ctx.reply('Notification settings are cancelled.');
        return ctx.scene.leave();
      }
      if (ctx.update.callback_query.data === 'next') {
        ctx.session.data.interval = {};
        ctx.session.data.interval.id = ctx.session.user.settings.screenshotTimeInterval.id;
        ctx.session.data.interval.interval = ctx.session.user.settings.screenshotTimeInterval.screenshotTimeInterval;
        ctx.wizard.next();
        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
      }
      const { chat } = ctx.update.callback_query.message;
      ctx.telegram.sendChatAction(chat.id, 'typing');
      try {
        const dataObject = JSON.parse(ctx.update.callback_query.data);
        ctx.session.data.interval = {};
        ctx.session.data.interval.id = dataObject.intervalId;
        ctx.session.data.interval.interval = dataObject.interval;
        ctx.answerCbQuery('Interval succesfuly saved.')
        ctx.wizard.next();
        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
      } catch (error) {
        ctx.answerCbQuery('Oops! Something goes wrong.1');
        ctx.wizard.back();
        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
      }
    } else {
      ctx.reply('You have to choose interval first.');
      ctx.wizard.back();
      return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    }
}