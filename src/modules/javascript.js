
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
