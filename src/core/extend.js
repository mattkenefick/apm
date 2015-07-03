
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
