
/**
 * apm
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

_apm = {
    core: {},
    modules: {},
    options: {}
};

if (window['apm']) {
    window._apm = _apm;
}
else {
    window.apm = _apm;
}


// Application Package Manager
// ---------------------------------------------------------

_apm.load = function(options) {
    options || (options = {});

    // save options
    this.options = options;

    // create modules based on options
    this.loadModules();
};

_apm.loadModules = function() {
    var value;

    for (var key in this.options) {
        value = this.options[key];

        if (this.modules[key]) {
            this.loadModule(key, this.options[key]);
        }
    };
};

_apm.loadModule = function(type, options) {
    var module = this.modules[type].extend(options);

    if (options.options) {
        module = module.extend(options.options);
    }
};



// helpers
_apm.nothing = function() { };
_apm.null = null;
