import 'dotenv/config';

export async function siteTracking (ctx: any){
    try {

        const req = await fetch(`${process.env.URL}`)
        console.log('STATUS: ', req.status);
        switch (req.status) {
            case 200:
                // await ctx.replyWithHTML(`[ ${new Date()} ]${'\n'}The website <i>${process.env.URL}</i> is available. ${'\n'}Response code <b>${req.status}</b>`)
                console.log(`[ ${new Date()} ] Success check STATUS CODE: ${req.status}`)
                break;
            case 502:
                await ctx.replyWithHTML(`[ ${new Date()} ]${'\n'}<b>!!!ATTENTION!!!</b> ${'\n'}Site ${process.env.URL} is down. ${'\n'}Status code: <b>${req.status}</b> `)
                break;
            default:
                ctx.reply(`bot default answer`)
                break;
        }

    } catch (error) {
        await ctx.replyWithHTML(`${'\n'} <b>ATTENTION SERVER BOT ERROR ${'\n'} ERROR: ${error} </b> `);
        throw error;
    }
}

export async function siteChecker (ctx: any) {
    try {
        const req = await fetch(`${process.env.URL}`)
        console.log('STATUS: ', req.status);
        switch (req.status) {
            case 200:
                await ctx.replyWithHTML(`[ ${new Date()} ]${'\n'}The website <i>${process.env.URL}</i> is available. ${'\n'}Response code <b>${req.status}</b>`)
                break;
            case 502:
                await ctx.replyWithHTML(`[ ${new Date()} ]${'\n'}<b>!!!ATTENTION!!!</b> ${'\n'}Site ${process.env.URL} is down. ${'\n'}Status code: <b>${req.status}</b> `)
                break;
            default:
                return ctx.reply(`bot default answer`)
        }
    } catch (error) {
        console.log('ERROR: ', error)
        await ctx.replyWithHTML(`${'\n'} <b>ATTENTION&#33;&#33;&#33; SERVER BOT ERROR ${'\n'} ERROR: ${error} </b> `);
        throw error
    }
}