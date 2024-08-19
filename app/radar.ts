
// Мне надоело здесь гадать с типами, поэтому я перешёл на тайпскрипт
import { Api } from "telegram";
import { AirstrikeSession } from "./common";
import fs from "fs/promises"

// Запускаем клиент
const JET = new AirstrikeSession([ping, confirm]);

async function ping(jet: AirstrikeSession) {
  // Запускаем модуль
  console.log("[RADAR] AirStrike RADAR Версия 1.0.0")

  if (!jet.client) {
    console.log("[RADAR] По невероятной причине клиент не был передан в модуль! Выходим...")
    return;
  }

  let result = await jet.client.getDialogs()

  // Filter only active groups
  result = result.filter((a) => {
    const chat = a.entity as Api.Chat;

    return a.isGroup && !a.isUser && !chat.deactivated && !chat.left;
  });

  let uid: Number[] = []

  for (const group of result) {
    const chat = group.entity as Api.Chat;
    const self = await jet.client.getMe();
    for await (const participant of jet.client.iterParticipants(chat.id)) {
      if (!participant.bot && !participant.deleted && participant.id != self.id && !uid.includes(Number(participant.id))) {
        uid.push(Number(participant.id))
      }
    }
    console.log(`[RADAR] Выполнено ${result.indexOf(group) + 1}/${result.length} [${Math.round(((result.indexOf(group) + 1) / result.length) * 100)}%]`)

  }

  fs.writeFile('list.csv', uid.join(','));
  console.log("[RADAR] Выполнено!")
}
async function confirm(jet: AirstrikeSession) {
  // Запускаем модуль
  console.log("[RADAR] Верификация полученных аккаунтов...")

  if (!jet.client) {
    console.log("[RADAR] По невероятной причине клиент не был передан в модуль! Выходим...")
    return;
  }

  const data = await fs.readFile('list.csv', 'utf8');

  const result = await jet.client.invoke(
    new Api.users.GetUsers({
      id: data.split(','),
    })
  );

  for(let user of result){
    user = user as Api.User
    console.log(`[RADAR] ${user.id} -> ${user.firstName} ${user.lastName} ${user.username}`)
  }

  console.log(`[RADAR] Было проверено (и найдено) ${result.length} `)

  console.log("[RADAR] Выполнено!")
}