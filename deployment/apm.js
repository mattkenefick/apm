
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



/**
 * apm/core/extend
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

;(function(){
    var initializing = false,
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    apm.class = function() {};

    // Create a new Class that inherits from this class
    apm.class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        var name = prop['name'] ? prop['name'] : 'apm_class';

        delete prop['name'];

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
        }

        // create class with custom names
        eval([
            "function " + name + "() {",
            "    if ( !initializing && this.init ) {",
            "        this.init.apply(this, arguments); ",
            "    }",
            "};",
            name + ".prototype = prototype;",
            name + ".prototype.constructor = " + name + ";",
            name + ".extend = arguments.callee;"
        ].join(''));

        return eval(name);
    };
})();


/**
 * apm/core/events
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.events = apm.class.extend({

    /**
     * class name
     */
    name: "apm_core_events",

    /**
     * on
     */
    on: function(event, callback) {
        console.log("events: on", event);
    },

    /**
     * off
     */
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

apm.core.http = apm.core.events.extend({

    /**
     * xmlhttprequest
     */
    xhr: null,

    /**
     * GET
     *
     */
    GET: function(url, callback) {
        var xhr;

        xhr = this.xhr = new XMLHttpRequest;
        this.xhr.open("GET", url, true);
        this.xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // done
                if (xhr.status === 200) { // complete
                    callback && callback(xhr.responseText)
                }
            }
        };
        this.xhr.send();
    },

    POST: function(url, callback) {

    },

    PUT: function(url, callback) {

    },

    DELETE: function(url, callback) {

    }

});


/**
 * apm/core/module
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.module = apm.core.events.extend({

    /**
     * class name
     */
    name: "apm_core_module",

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

    /**
     * autoRender <boolean>
     * @default true
     */
    autoRender: true,

    /**
     * reponse from the server
     */
    response: null,


    // Public Methods
    // -------------------------

    load: function() {
        var scope = this,
            url   = this.getUrl(),
            http  = new apm.core.http;

        http.GET(url, function(response) {
            scope.response = response;

            // do we auto render after load?
            if (scope.autoRender) {
                scope.render(response);
            }

        });
    },

    render: function() {
        console.warn("Core module render hasn't been setup yet");
    },


    // Getters / Setters
    // -------------------------

    getUrl: function() {
        var baseUrl = this.appUrl.replace(/\/$/, ""),
            appName = this.appName.replace(/\/$/, ""),
            filename = this.filename.replace(/\/$/, ""),
            url;

        url = [baseUrl, appName, filename].join("/")

        return url;
    },


    // Event Handlers
    // -------------------------

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

    /**
     * class name
     */
    name: "apm_modules_css",

    render: function(response) {
        return this._renderByHeadTags(response);
    },


    // Private Methods
    // ---------------------------------------------------

    _renderByHeadTags: function(response) {
        var style = document.createElement("style");
            style.innerHTML = response;

        document.head.appendChild(style);
    },

    _renderByStylesheets: function(response) {

    }

});


/**
 * apm/modules/font
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.font = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_font",

});


/**
 * apm/modules/html
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.html = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_html",

    render: function(response) {
        if (this.options.replaceElement) {
            this.replaceElement(this.options.replaceElement, response);
        }
        else if (this.options.beforeElement) {
            this.beforeElement(this.options.beforeElement, response);
        }
        else if (this.options.appendToElement) {
            this.appendToElement(this.options.appendToElement, response);
        }
    },


    // Private Methods
    // ----------------------------------------------------

    replaceElement: function(find, response) {
        var target = document.querySelector(find),
            docfrag = document.createRange().createContextualFragment(response);

        target.parentNode.insertBefore(docfrag, target);
        target.parentNode.removeChild(target);
    },

    beforeElement: function(find, response) {
        var target = document.querySelector(find),
            docfrag = document.createRange().createContextualFragment(response);

        target.parentNode.insertBefore(docfrag, target);
    },

    appendToElement: function(find, response) {
        var target = document.querySelector(find),
            docfrag = document.createRange().createContextualFragment(response);

        target.appendChild(docfrag);
    }

});


/**
 * apm/modules/image
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.image = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_image",

});


/**
 * apm/modules/javascript
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.javascript = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_javascript",

    render: function(response) {
        return this._renderByFunction(response);
        // return this._renderByEval(response);
    },


    // Private Methods
    // -------------------------------------------

    _renderByEval: function(response) {
        window.eval(response);
    },

    _renderByFunction: function(response) {
        var f = new Function(response);
        f();
    }

});
