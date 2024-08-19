/*
    AirStrike NAPALM
    Версия 1.0.0 от 18.08.24

    Автоматическая рассылка сообщений списку пользователей.

    Для генерации списка используй AirStrike RADAR (npm radar)
    или попробуй его в действии "npm napalm-test".

    Запустить всё вместе: "npm mission" -- В РАЗРАБОТКЕ
*/

import fs from 'node:fs/promises';
import {AirstrikeSession} from './common';

async function GetStrikeTarget() {
    // Получение пользователей в рассылке
    if (process.argv.includes("-test")) {
        // Тестовый режим
        console.log("[NAPALM] Запущен тестовый режим. \n[NAPALM] В тестовом режиме будет отправлено сообщение, каким его увидят другие пользователи. Сообщение придёт в Ваше избранное.")
        return ["me"]
    }

    const result = await fs.readFile('list.csv', 'utf8');
    return result.split(',');
}

async function GetBomb() {
    // Получение сообщения для рассылки
    try {
        return await fs.readFile(process.argv[process.argv.indexOf("-m") + 1], 'utf8');
    } catch (e) {
        console.log("[FS] Ошибка чтения файла сообщения: " + e)
    }
}

// Запускаем клиент
const JET = new AirstrikeSession([execute]);

async function execute(jet : AirstrikeSession){
    // Запускаем модуль
    console.log("[NAPALM] AirStrike NAPALM Версия 1.0.0")

    if (!jet.client) {
        console.log("[RADAR] По невероятной причине клиент не был передан в модуль! Выходим...")
        return;
      }

    const strikeTarget = await GetStrikeTarget();
    const message = await GetBomb();

    for (const target of strikeTarget) {
        await jet.client.sendMessage(target, { message: message });
        console.log(`[NAPALM] Выполнено ${strikeTarget.indexOf(target) + 1}/${strikeTarget.length} [${((strikeTarget.indexOf(target) + 1) / strikeTarget.length) * 100}%]`)
    }
}

