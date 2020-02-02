const fs = require('fs')

module.exports = plop=>{
    plop.setActionType('changeRouter',(answers,config,plop)=>{
        fs.readFile('app.json',{},(err,data)=>{ // 读取app.json文件
            let d= JSON.parse(data.toString())
            d.pages.push(`pages/${answers.fileName}/${answers.fileName}`) // 将当前新添加的内容写入app.json
            d = JSON.stringify(d,"","\t")
            fs.writeFile('app.json',d,err=>{
                if(err)
                    throw err
            })
        })
    })
    plop.setGenerator('wxfile',{ // 这里的wxfile是一个自己设定的名字，在执行命令行的时候会用到
        description:'create the repeat wxfile', // 这里是对这个plop的功能描述
        prompts:[{
            type:'input', // 问题的类型
            name:'pageName', // 问题对应得到答案的变量名，可以在actions中使用该变量
            message:'your pageName is', // 在命令行中的问题
            default:'page' // 问题的默认答案
        }],
        actions:[{
            type:'add', // 操作类型，这里是添加文件
            path:'pages{{pageName}}/{{pageName}}.json', // 添加的文件的路径
            templateFile:'plop-temp/tempPage.json' // 模板文件的路径
        },{
            type:'add', 
            path:'pages{{pageName}}/{{pageName}}.js', 
            templateFile:'plop-temp/tempPage.js' 
        },{
            type:'add', 
            path:'pages{{pageName}}/{{pageName}}.wxss', 
            templateFile:'plop-temp/tempPage.wxss' 
        },{
            type:'add', 
            path:'pages{{pageName}}/{{pageName}}.wxml', 
            templateFile:'plop-temp/tempPage.wxml' 
        },{ // 修改app.json里面的路由
            type:'changeRouter'
        }]
    })
}