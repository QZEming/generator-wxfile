const Generator = require("yeoman-generator")
const fs = require("fs")

module.exports = class extends Generator{
    prompting(){
        return this.prompt([{ // 询问用户要创建的文件夹的名字
            type:"input",
            name:"fileName",
            message:"your file name is",
            default:"page"
        }]).then(answer=>{
            this.answer = answer // 将回答放到answer属性中
        })
    }
    writing(){
        const fileName = this.answer.fileName
        const tempFile = ["fileName.js","fileName.json","fileName.wxml","fileName.wxss"]
            .map(path=>this.templatePath(path))
        const outputFile = [`${fileName}.js`,`${fileName}.json`,`${fileName}.wxml`,`${fileName}.wxss`]
            .map(path=>this.destinationPath(`pages/${fileName}/${path}`))
        fs.mkdirSync(`pages/${fileName}`) // 创建文件夹
        fs.readFile('app.json',{},(err,data)=>{ // 读取app.json文件
            let d= JSON.parse(data.toString())
            d.pages.push(`pages/${fileName}/${fileName}`) // 将当前新添加的内容写入app.json
            d = JSON.stringify(d,"","\t")
            fs.writeFile('app.json',d,err=>{
                if(err)
                    throw err
            })
        })
        for(let i=0;i<tempFile.length;i++){
            this.fs.copyTpl(tempFile[i],outputFile[i],this.answer) // 文件写入
        }
    }
}