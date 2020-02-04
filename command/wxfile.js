const exec = require('child_process').exec
const chalk = require('chalk')
const co = require('co')
const prompt = require('co-prompt')
const config = require('../config')
const fs = require('fs')
chalk.level=3
module.exports = ()=>{
    console.log(chalk.green("Welcome to use generator-wxfile"))
    co(function *() {
        console.log(chalk.bgGray("answer the questions to init project"))
        // 处理用户输入
        let projectName = yield prompt(`Project name:`)
        let appID = yield prompt(`appID:(${config.prop.appID})`)
        let pageName = yield prompt(`pageName:(${config.prop.pageName})`)
        let isPlop = yield prompt.confirm('use plop?')
        fs.readFile(__dirname+'../config.json',{},(err,data)=>{ // 读取app.json文件
            let d= require('../config')
            d.prop = {projectName,appID,pageName,isPlop}
            console.log('d: ', d);
            d = JSON.stringify(d,"","\t")
            fs.writeFile(__dirname+'/../config.json',d,err=>{
                if(err)
                    throw err
            })
        })
        console.log(chalk.white('\n Start generating...'))
        exec('yo wxfile', (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            }
            console.log(chalk.green('\n √ Generation completed!'))
            process.exit()
        })
    })
}