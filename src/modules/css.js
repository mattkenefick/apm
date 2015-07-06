
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
