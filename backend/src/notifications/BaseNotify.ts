import { TelegramService } from './../modules/telegram/telegram.service';
export abstract class BaseNotify {

    constructor(telegramService: TelegramService) {

    }

    handle(): Promise<any> {

        return '';
    }
}