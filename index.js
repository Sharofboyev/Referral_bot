const { Telegraf } = require("telegraf");
const config = require("./config");
const bot = new Telegraf(config.token);
const {User} = require("./services/user");
const {Referral} = require("./services/referral")
const userService = new User();
const referralService = new Referral()
const path = require("path")
const TelegrafI18n = require('telegraf-i18n')
const {match} = require("telegraf-i18n")
const i18n = new TelegrafI18n({
    defaultLanguage: 'ru',
    directory: path.resolve(__dirname, 'locales')
})

bot.use(i18n.middleware())

bot.use(async (ctx, next) => {
    ctx.state = await userService.get(ctx.from.id);
    return next();
})

bot.start(async (ctx) => {
    if (!ctx.state){
        await userService.create(ctx.from.id, ctx.from.username, 
            ctx.from.first_name + (ctx.from.last_name ? " " + ctx.from.last_name: ""));
        let referrer = ctx.message.text.substring(7);
        if (referrer.length > 0 && referrer.startsWith("reff")){
            referrer = referrer.substring(4);
        }
        referrer = Number(referrer);
        await referralService.addUser(ctx.from.id, referrer);
    }
    return ctx.reply(ctx.i18n.t("greeting"), {reply_markup: {keyboard: 
        [
            [{text: ctx.i18n.t("get_link")}]
        ],
        resize_keyboard: true}});
})

bot.hears(match("get_link"), (ctx) => {
    const link = referralService.getReferralLink(ctx.from.id)
    return ctx.reply(ctx.i18n.t("your_link") + link);
})

bot.catch((err) => {
    console.log(err.message)
})

bot.launch();
