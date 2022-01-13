const chalk = require('chalk');
const moment = require('moment');

module.exports = async (type, content) => {

    const Time = chalk.whiteBright(moment().format('HH:mm:ss'));

    /*
    bara inke console tamizi dashte bashid ba chalk va in function ye logger zdm ke easy log konid
     */

    switch (type) {
        case 'log':
            console.log(`${Time} - [${chalk.white(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'error':
            console.error(`${Time} - [${chalk.red(type.toUpperCase())}]`, `${chalk.whiteBright(content)}`)
            break;
        case 'warn':
            console.log(`${Time} - [${chalk.yellow(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'debug':
            console.log(`${Time} - [${chalk.blue(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'join':
            console.log(`${Time} - [${chalk.green(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'leave':
            console.log(`${Time} - [${chalk.red(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'ready':
            console.log(`${Time} - [${chalk.green(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'unhandle':
            console.error(`${Time} - [${chalk.redBright('UNHANDLED REJECTION PROMISE')}]`, `${chalk.whiteBright(content)}\nAT : ${content.stack}`)
            break;
        case 'newz':
            console.log(`${Time} - [${chalk.cyan(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'slash':
            console.log(`${Time} - [${chalk.magenta(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'reading':
            console.log(`${Time} - [${chalk.greenBright(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'api':
            console.log(`${Time} - [${chalk.blueBright(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'website':
            console.log(`${Time} - [${chalk.blueBright(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
        case 'topgg':
            console.log(`${Time} - [${chalk.cyanBright(type.toUpperCase())}] : ${chalk.whiteBright(content)}`)
            break;
    
        default:
            throw new Error(`:x: | Type Logger Invalid Ast!`)
            break;
    }



}