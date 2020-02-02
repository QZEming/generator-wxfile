const Generator = require("yeoman-generator")
const fs = require("fs")

module.exports = class extends Generator{
    prompting(){
        return this.prompt([{ // 询问用户要创建的项目名称
            type:"input",
            name:"projectName",
            message:"your project name is",
            default:this.appname // 项目所在文件夹的名称
        },{ // 询问用户的appID是多少
            type:"input",
            name:"appID",
            message:"your appID is"
        },{ // 询问用户初始化的第一个页面名称是什么
            type:"input",
            name:"pageName",
            message:"the initialized page name is",
            default:"index"
        },{ // 询问用户是否使用plop工具
            type:"confirm",
            name:"isPlop",
            message:"do you use plop",
            default:true
        }]).then(answer=>{
            this.answer = answer // 将回答放到answer属性中
        })
    }
    writing(){
        const answer = this.answer
        const pageName = answer.pageName
        // 处理页面模板文件
        let tempPageFiles = ["tempPage.js","tempPage.json","tempPage.wxml","tempPage.wxss"]
            .map(path=>"tempPage/"+path)
        // 其他文件列表
        let tempOtherFiles = ["app.js","app.json","app.wxss","project.config.json","sitemap.json","package.json"]
        // 合并所有模板文件
        let tempFiles = [...tempPageFiles,...tempOtherFiles]
        // 处理页面输出文件
        let outputPageFile = [`${pageName}.js`,`${pageName}.json`,`${pageName}.wxml`,`${pageName}.wxss`]
            .map(path=>`pages/${pageName}/${path}`)
        // 合并所有输出文件
        let outputFiles = [...outputPageFile,...tempOtherFiles]
        if(answer.isPlop){ // 如果使用plop工具，则将相应的文件写入
            tempFiles=[...tempFiles,...["plop-temp","plopfile.js"]]
            outputFiles=[...outputFiles,...["plop-temp","plopfile.js"]]
        }
        // 创建文件夹，在文件夹创建完成后调用回调函数执行文件写入
        fs.mkdir(`pages/${pageName}`,'1',()=>{
            // 文件写入
            for(let i=0;i<tempFiles.length;i++){
                this.fs.copyTpl(this.templatePath(tempFiles[i]),this.destinationPath(outputFiles[i]),answer) 
            }
        }) 
    }
}