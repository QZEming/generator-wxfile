# generator-wxfile

用于快速创建用于微信小程序开发的文件
```
npm i yo -g
npm i generator-wxfile -g
```
执行
```
yo wxfile
```
或者
```
qzm wxfile
```
将文件下载到本地
执行后会通过generator-wxfile这个npm包将模板中的文件下载到本地，根据命令行输入的不同，创建的文件文件名及里面一些相关配置会有所不同
## plop工具的使用
如果有选择使用plop工具，要使用npm i来下载npm包
使用plop工具时在项目根目录命令行输入
```
plop wxfile
```
可以在pages文件下创建对应的页面所需的文件夹和相应的json,js,wxml,wxss文件

## 版本更新

### 1.1.x
### 1.1.2
增加chalk包，在执行命令时给用户不同颜色的提示
给该npm包增加使用qzm命令的功能，通过qzm wxfile来执行yo wxfile

### 1.1.1
解決plop工具出現的問題

### 1.1.0
将整个npm包功能改成初始化小程序基本架构的工具，在当前文件夹创建项目所需的文件，将原来的功能以plop工具的方式实现，在初始化时选择使用plop工具时会在当前文件夹生成相应的plopfile.js文件和相应的模板

### 1.0.x
#### 1.0.1
将命令行的执行放到项目根目录下，将在1.0.0版本中新建的文件放到pages文件夹下，将新添加的内容做为路由写入到根目录下的app.json的pages属性中

#### 1.0.0
执行yo wxfile时在**当前目录**下新建一个文件夹，在该文件夹下新建和文件夹名相同的json,js,wxml,wxss文件，在js文件中写入基本的生命周期函数，在json中写入一个{}