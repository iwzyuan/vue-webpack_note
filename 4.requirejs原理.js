// define声明模块 通过require使用一个模块
const factoires = {}
function define(moduleName, dependence, factory) {
    factory.dependencies = dependence
    console.log(factory)
    factoires[moduleName] = factory
}
function require (mods, callback) {
    let result = mods.map(function(mod){
        let exports = [];
        require(factoires[mod].dependencies,function(result){
            exports.push(result)
        })
        return factoires[mod].apply(null, exports)
    })
    callback.apply(null, result)
}



define('name', [], function(){
    return 'wzy'
})
define('age', [], function(){
    return '19'
})
require(['name', 'age'], function(name, age){
    console.log(name, age)
})
define('sex', ['name'], function(name){
    return name +'19'
})
require(['sex'], function(sex){
    console.log(sex)
})