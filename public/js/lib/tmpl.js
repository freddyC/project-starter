define(['lib/text'], function(text){
	//todo figure out deps paths
	//this plugin expects to be located in same dir as handlebars and the text plugin
	return {
		_rootDir:"",
		_ext:".html",
		_cache:{}, //todo: implement caching with this
		buildMap:{},

		rootDir:function(dir) {
			this._rootDir = dir;
		},

		extension:function(ext) {
			this._ext = ext;
		},

		load:function(name, req, load, config) {
			var path = this._rootDir + name + this._ext,
				_this = this;
			text.get(req.toUrl(path), function(html) {
				var template = Handlebars.compile(html);
				//save the compiled template when building
				if (config.isBuild) {
					var precompiled = Handlebars.precompile(html);
						_this.buildMap[name] = precompiled;
				}
				load(template);
			});
		},

		write:function(pluginName, name, write) {
			if (name in this.buildMap) {
				var content = this.buildMap[name];
				var output = '/* precompiled template */ \n ' +
					'define("' + pluginName + '!' + name + '", ["handlebars"], function(Handlebars){ \n' +
						'return Handlebars.template(' + content + ') \n' +
					'});\n';
				write(output);
			}
		}
	};
});
