
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
        var value;

        // cycle through options to see what modules to load
        for (var key in this.options) {
            value = this.options[key];

            // if a module exists in our repo, create it
            if (this.modules[key]) {
                this[key] = this.loadModule(key, this.options[key]);
            }
        };
    },

    loadModule: function(type, options) {
        var module = new this.modules[type];

        if (options) {
            for (var i in options) {
                module[i] = options[i];
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

