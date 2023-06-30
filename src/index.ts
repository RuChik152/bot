import express from 'express';
import TelegramBot from "node-telegram-bot-api";
import {Telegraf} from "telegraf";
import axios from "axios";
import {siteChecker, siteTracking} from "./lib/siteTracking";
import 'dotenv/config';

const token = String(process.env.TOKEN);
const bot = new Telegraf(token)
const app = express();


interface WeatherTypes {
    command: boolean,
    watch: boolean
}
const watchConfig: WeatherTypes = {
    command: true,
    watch: false
}

bot.telegram.setMyCommands([
    {
        command: 'time',
        description: 'Check Server Date'
    },
    {
        command: 'watcher',
        description: 'Start tracking karga.belivr.tech'
    },
    {
        command: 'watch_stop',
        description: 'Stop tracking karga.belivr.tech'
    },
    {
        command: 'check',
        description: 'Manual status check of karga.belivr.tech'
    },
])

bot.start(ctx => {
    ctx.reply('Welcome, bro')
})


bot.command('time', ctx => {
    ctx.reply(String(new Date()))
})


bot.command('watcher', async (ctx) => {
    if(!watchConfig.watch) {
        watchConfig.watch = true
        watchConfig.command = true
        const watch = setInterval(() => {
            if(watchConfig.command){
                siteTracking(ctx);
            } else {
                clearInterval(watch)
            }
        }, Number(process.env.TIME_WATCH))
    } else {
        ctx.reply('Site tracking is already working')
    }
})

bot.command('watch_stop', ctx => {
    watchConfig.watch = false;
    watchConfig.command = false;
    ctx.reply('Watch site off');
})

bot.command('check', async (ctx) => {
    await siteChecker(ctx)
})


bot.launch()
app.listen(3002, () => console.log(`My server is running on port ${3002}`))