# airstrike
 Telegram target ad bot

## Что для чего нужно?
 - AirStrike RADAR -- сбор ID пользователей в группах
 - AirStrike NAPALM -- рассылка сообщений пользователям по их ID

## TODO
 - RADAR -- поиск пользователей в обсуждениях каналов
 - NAPALM -- ^https://github.com/cd-con^ - Враппинг ссылок в трекер для отслеживания переходов по ссылке
 - NAPALM -- >>путь_до_вложения<< - вложение файлов в сообщение

## Поддерживаемое форматирование сообщений
Смотри `message.md`

## Как запустить?
### Вариант А -- Скачать исходники
1. Установить Node
2. Перейти в директорию проекта и прописать `npm install`
3. Указать данные аккаунта в `package.json`
4. Запустить одну из команд: `npm run radar` `npm run napalm-test` `npm run napalm`

### Вариант Б -- Скачать билд (СКОРО)
1. Скачать билд
2. Открыть консоль в директории скачанного билда

Команды запуска и параметры:

- `"napalm-test": "napalm.exe -i <app_id> -h <app_hash> -p <phone> -m message.md -test"`
- `"napalm": "napalm.exe -i <app_id> -h <app_hash> -p <phone> -m message.md -l list.csv"`
- `"radar": "radar.exe -i <app_id> -h <app_hash> -p <phone>"`

### Вариант В -- Лаунчер (СКОРО)
Мультиаккаунт, большая скорость, автоматическое управление инстансами. В разработке.