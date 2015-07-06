
/**
 * apm
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */


// Application Package Manager
// ---------------------------------------------------------

_apm = {

    null   : null,
    core   : {},
    modules: {},
    options: {},
    nothing: function() { },

    load: function(options) {
        options || (options = {});

        // save options
        this.options = options;

        // create modules based on options
        this.loadModules();
    },

    loadModules: function() {
        var module, value;

        // cycle through options to see what modules to load
        for (var key in this.options) {
            value = this.options[key];

            // if a module exists in our repo, create it
            if (this.modules[key]) {
                module = this[key] = this.loadModule(key, this.options[key], {
                    appName: this.options.appName,
                    appUrl: this.options.appUrl
                });

                // load it
                module.load();
            }
        };
    },

    loadModule: function(type, moduleOptions, appOptions) {
        var module = new this.modules[type];

        // add options specific to this module
        if (moduleOptions) {
            for (var i in moduleOptions) {
                module[i] = moduleOptions[i];
            }
        }

        // add general application options required
        if (appOptions) {
            for (var i in appOptions) {
                module[i] = appOptions[i];
            }
        }

        return module;
    }

};


// Apply to DOM
// ---------------------------------------------------------

if (window['apm']) {
    window._apm = _apm;
}
else {
    window.apm = _apm;
}

