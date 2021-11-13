import { Scenes, Markup } from 'telegraf';

export const hotPurchasesScene = new Scenes.BaseScene<Scenes.SceneContext>(
  'HOT_PURCHASES_SCENE',
);

hotPurchasesScene.enter((ctx: any) => {
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

  return ctx.reply('8',
    Markup.inlineKeyboard(
      [
        Markup.button.callback('Сделать ставку', 'HOT_PURCHASE_BID'),
        Markup.button.callback(
          'Автоматические ставки',
          'HOT_PURCHASE_AUTO_BID',
        ),
        Markup.button.callback('Посмотрю позже', 'HOT_PURCHASE_LATER'),
        Markup.button.callback('Не интересно', 'zzz'),
      ],
      { wrap: () => true },
    ),
  );
});

hotPurchasesScene.action('HOT_PURCHASE_BID', (ctx) => {
  ctx.reply('You choose theater');
  //   ctx.session.hotPurchases = 'Theater';
  return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
});

hotPurchasesScene.action('HOT_PURCHASE_AUTO_BID', (ctx) => {
  ctx.reply('You choose theater');
  //   ctx.session.hotPurchases = 'Theater';
  return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
});

hotPurchasesScene.action('HOT_PURCHASE_LATER', (ctx) => {
  ctx.reply('You choose movie, your loss');
  //   ctx.session.hotPurchases.preferenceType = 'Movie';
  return ctx.scene.leave(); // exit global namespace
});

hotPurchasesScene.action('zzz', (ctx) => {
  console.log('qqq');


  ctx.reply('You choose movie, your loss');
  //   ctx.session.hotPurchases.preferenceType = 'Movie';
  // return ctx.scene.leave(); // exit global namespace
});

hotPurchasesScene.leave((ctx) => {
  ctx.reply('Thank you for your time!');
});

// What to do if user entered a raw message or picked some other option?
hotPurchasesScene.use((ctx) => ctx.replyWithMarkdown('Please choose '));

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

export default hotPurchasesScene