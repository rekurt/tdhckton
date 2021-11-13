import { Scenes, Markup } from 'telegraf';

const echoScene = new Scenes.BaseScene<Scenes.SceneContext>('echo')
echoScene.enter((ctx) => show(ctx))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
// echoScene.command('back', leave<Scenes.SceneContext>())
echoScene.hears('xui', (ctx) => console.log('xui tebe'))
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

function show(ctx) {
    let currentPurchase = null;
    const index = 0;

    ctx.session = { hotPurchases: FAKE_PURCHASES };
    ctx.session.hotPurchases = ctx.session.hotPurchases.filter(
        (p) => !p.isProcessed,
    );

    const count = ctx.session.hotPurchases.length;
    if (count === 0) {
        return ctx.reply('Пусто :-(');
    } else {
        currentPurchase = ctx.session.hotPurchases[index];
    }

    ctx.session.currentHotPurchase = index;

    const {
        itemName,
        quantity,
        beforeEnd,
        currentPrice,
        customerName,
        currentPriceOneItem,
        id,
    } = currentPurchase;

    return ctx.reply(
        '1',
        Markup.inlineKeyboard(
            [
                Markup.button.callback('Сделать ставку', 'HOT_PURCHASE_BID'),
                Markup.button.callback(
                    'Автоматические ставки',
                    'HOT_PURCHASE_AUTO_BID',
                ),
                Markup.button.callback('Посмотрю позже', 'HOT_PURCHASE_LATER'),
                Markup.button.callback('Не интересно', 'xui'),
            ],
            // { wrap: () => true },
        ),
    );
}

const FAKE_PURCHASES = [
    {
      itemName: 'Автомат Калашникова',
      quantity: 100,
      beforeEnd: '1 ч. 5 м.',
      currentPrice: 100,
      customerName: 'Управление образованием',
      currentPriceOneItem: 1,
      id: '36к8268563',
      isProcessed: false,
    },
    {
      itemName: 'Автомат Бориса',
      quantity: 100,
      beforeEnd: '1 ч. 5 м.',
      currentPrice: 100,
      customerName: 'Управление образованием',
      currentPriceOneItem: 1,
      id: '36к8268563',
      isProcessed: false,
    },
    {
      itemName: 'Автомат Никиты',
      quantity: 100,
      beforeEnd: '1 ч. 5 м.',
      currentPrice: 100,
      customerName: 'Управление образованием',
      currentPriceOneItem: 1,
      id: '36к8268563',
      isProcessed: false,
    },
    {
      itemName: 'Автомат Олега',
      quantity: 100,
      beforeEnd: '1 ч. 5 м.',
      currentPrice: 100,
      customerName: 'Управление образованием',
      currentPriceOneItem: 1,
      id: '36к8268563',
      isProcessed: false,
    },
    {
      itemName: 'Автомат Влада',
      quantity: 100,
      beforeEnd: '1 ч. 5 м.',
      currentPrice: 100,
      customerName: 'Управление образованием',
      currentPriceOneItem: 1,
      id: '36к8268563',
      isProcessed: false,
    },
  ];
  

export default echoScene