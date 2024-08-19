import { StoreSession, Session } from "telegram/sessions";
import { TelegramClient } from "telegram";
import * as readline from 'readline/promises';

export class SessionData{
    public api_id: number = 0;
    public api_hash: string = '';
    public phone_number: string = '+70000000000'
    public session:  Session | string = new StoreSession("airstrike_session")

    public constructor(init?:Partial<SessionData>) {
        Object.assign(this, init);
    }
}

export class AirstrikeSession {
    client : TelegramClient | undefined;
    __credits : SessionData | undefined;
    constructor(onReady : Function[]) {
        const input = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        (async () => {
            console.log("[AIRSTRIKE] Инициализация API Telegram");

            this.__credits = this._getSession();

            this.client = new TelegramClient(this.__credits.session, this.__credits.api_id, this.__credits.api_hash, {
                connectionRetries: 5,
            });
            await this.client.start({
                phoneNumber: this.__credits.phone_number,
                //password: async () => await input.text("Please enter your password: "),
                phoneCode: async () => await input.question("[Telegram] Введите код: "),
                onError: (err) => {console.log(err); process.exit(1)},
            });

            for (const f of onReady) {
                console.log(`[AIRSTRIKE] Выполняем модуль ${onReady.indexOf(f) + 1} из ${onReady.length} `)
                await f(this)
            }

            console.log("[AIRSTRIKE] Все модули выполнены! Завершение...");
            this.client.disconnect()
            console.log("[Telegram] Клиент отключен");
            process.exit(0);
        }
        )();
    }
    _getSession() {
        return new SessionData ({
            api_id: Number(process.argv[process.argv.indexOf("-i") + 1]),
            api_hash: process.argv[process.argv.indexOf("-h") + 1],
            phone_number: process.argv[process.argv.indexOf("-p") + 1],
        })
    }
}