const fs = require('fs');
function req(moduleName){
    //读取文件，并存入content中
    let content = fs.readFileSync(moduleName, 'utf8')
    console.log(content)
    let fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports')
    let module = {
        exports: {}
    }
    /**
     * 函数类似于：
     * function (exports, module, require, __dirname, __filename) {
     *  content
     * return module.exports
     * }
     */
    return fn(module.exports, module, req, __dirname, __filename)
}

let str = req('./modules/a.js')
console.log(str)