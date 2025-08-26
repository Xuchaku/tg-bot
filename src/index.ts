import * as dotenv from 'dotenv';
import { Api, Bot, Context, Keyboard, RawApi } from 'grammy';
import { EmojiFlavor, emojiParser } from '@grammyjs/emoji';
import { readFileAsGrammy } from './utils';

type MyContext = EmojiFlavor<Context>;

dotenv.config();

const bot: Bot<MyContext, Api<RawApi>> = new Bot(process.env.TOKEN_BOT || '');

bot.use(emojiParser());

const readerFileGrammy = readFileAsGrammy();

const array = [
   [Keyboard.text('Актуальное меню')],
   [Keyboard.text('English menu')],
   [Keyboard.text('Наш тг-канал')],
   [Keyboard.text('Отзывы')],
];
const keyboard = Keyboard.from(array).resized().persistent();

bot.command('start', async (ctx) => {
   ctx.reply('Добро пожаловать', { reply_markup: keyboard });
});

bot.on('message:text', async (ctx) => {
   switch (ctx.message.text) {
      case 'Актуальное меню':
         {
            const parsedString = ctx.emoji`К Вашему вниманию ${'mage_light_skin_tone'}`;
            if (ctx.chatId) {
               const file = readerFileGrammy(['./assets/luna-menu-rus.jpg']);
               await ctx.api.sendMessage(ctx.chatId, parsedString);
               await ctx.api.sendPhoto(ctx.chatId, file);
            }
         }
         break;
      case 'English menu':
         {
            const parsedString = ctx.emoji`To your attention`;
            if (ctx.chatId) {
               const file = readerFileGrammy(['./assets/luna-menu-eng.jpg']);
               await ctx.api.sendMessage(ctx.chatId, parsedString);
               await ctx.api.sendPhoto(ctx.chatId, file);
            }
         }
         break;
      case 'Наш тг-канал':
         {
            ctx.reply('https://t.me/moonontheroof');
         }
         break;
      case 'Отзывы':
         {
            ctx.reply('В разработке...');
         }
         break;
      default: {
         ctx.reply('Неизваестная команда', { reply_markup: keyboard });
      }
   }
});

bot.start();
