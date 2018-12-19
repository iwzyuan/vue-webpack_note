#! /usr/bin/env node
//这个文件是描述如何打包的
let entry = './src/index.js'; // 入口文件
let output = './dist/main.js'; // 出口文件
let ejs = require('ejs');
let fs = require('fs');
let script = fs.readFileSync(entry, 'utf8');
let path = require('path');
let styleLoader = function (content) {
    return `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(content).replace(/\\r\\n/g, '')};
        document.head.appendChild(style);
    `
}

let modules = [];
//处理依赖关系
script = script.replace(/require\(['"](.+?)['"]\)/g, function () {
    let name = path.join('./src/',arguments[1]); // ./a.js
    let content =  fs.readFileSync(name, 'utf8');
    if (/\.css$/.test(name)){
        content = styleLoader(content)
    }
    modules.push({
        name,
        content
    })
    return `require('${name}')`;
});

let template = `
 (function(modules) {
 	function require(moduleId) {
 		var module = {
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, require);
 		return module.exports;
 	}
 	return require("<%-entry%>");
 })
 ({
  "<%-entry%>": (function(module, exports, require) {
      eval(\`<%-script%>\`);
  })
  <%for(let i =0; i<modules.length; i++){
  let module = modules[i]%>,
  "<%-module.name%>": (function(module, exports) {
      eval(\`<%-module.content%>\`);
  })
  <%}%>
 });
`
console.log(modules)
let result = ejs.render(template, {
    entry,
    script,
    modules
}); // result为替换后的结果，最终写到output中
fs.writeFileSync(output, result)
console.log('打包成功');
