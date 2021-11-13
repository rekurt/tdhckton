import { Markup } from 'telegraf';

export class KeyboardService {
  addCommandsKeyBoard() {
    return Markup.keyboard([
      ['➕ /subscribe', '❌ /unsubscribe'], // Row1 with 2 buttons
      ['📸 /show', '👯‍♀️ /models', '⚙️ /settings'], // Row2 with 3 buttons '📋 /subscribers'
    ]).resize();
  }
}
