export class KeyboardService {
     /**
     * Создаём меню кнопок для бота.
     *
     * @return {*} 
     */
         addCommandsKeyBoard() {
        return Markup
            .keyboard([
                ['➕ /subscribe', '❌ /unsubscribe'], // Row1 with 2 buttons
                ['📸 /show', '👯‍♀️ /models', '⚙️ /settings'], // Row2 with 3 buttons '📋 /subscribers'
            ])
        .resize()
        .extra()
      }
  
}