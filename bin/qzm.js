#!/usr/bin/env node --harmony
'use strict'

// 定义脚手架的文件路径，__dirname是当前项目所在的路径
process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')
const exec = require('child_process').exec

program.version(require('../package').version)

// 定义使用方法
program.usage('<command>')

program
    .command('wxfile')
    .description('wxfile')
    .alias('wx')
    .action(() => {
        require('../command/wxfile')()
    })

program.parse(process.argv)

// if (!program.args.length) {
//     program.help()
// }