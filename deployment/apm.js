
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


/**
 * apm/core/extend
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.extend = function(target, source) {
    if (!source) {
        source = target;
        target = this || {
            extend: apm.core.extend
            // extend: function(source) {
            //     return apm.core.extend(this, source);
            // }
        };
    };

    var a = Object.create(target);

    Object.keys(source).map(function (prop) {
        // used for interfaced classes
        // prop in a && (a[prop] = source[prop]);

        // used for greedy extending
        a[prop] = source[prop];
    });

    return a;
};


/**
 * apm/core/events
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.events = apm.core.extend({

    on: function(event, callback) {
        console.log("events: on", event);
    },

    off: function(event) {
        console.log("events: off");
    }

});


/**
 * apm/core/http
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

// apm.core.http = apm.core.events.extend({

// });


/**
 * apm/core/module
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.module = apm.core.events.extend({

    /**
     * filename <string>
     * @default null
     */
    filename: null,

    /**
     * version <string>
     * @default latest
     */
    version: "latest",


    // Event Handlers
    // ------------------------------------------------------------

    onRemoteFailure: function() {

    },

    onRemoteSuccess: function() {

    },

    onSuccess: function() {

    }

});


/**
 * apm/modules/css
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.css = apm.core.module.extend({

});



/**
 * apm/modules/html
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.html = apm.core.module.extend({

});



/**
 * apm/modules/javascript
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.javascript = apm.core.module.extend({

});
