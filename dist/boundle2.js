 (function(modules) {
 	var installedModules = {};
 	function require(moduleId) {
 		var module = installedModules[moduleId] = {
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, require);
 		return module.exports;
 	}
 	return require(require.s = "./src/index.js");
 })
 ({
     "./src/index.js":(function(module, exports, require) {
             eval("require(/*! ./a */ \"./src/a.js\")\r\nconsole.log('index')\r\n\n\n//# sourceURL=webpack:///./src/index.js?");
         }),
	 "./src/a.js":(function(module, exports) {
		eval("module.exports = 'aaaa.js';\r\n\n\n//# sourceURL=webpack:///./src/a.js?");
	 })
 });
