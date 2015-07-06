
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
        var div = document.createElement('div');
            div.innerHTML = response;

        if (this.options.replaceElement) {
            this.replaceElement(this.options.replaceElement, div);
        }
        else if (this.options.appendToElement) {
            this.appendToElement(this.options.appendToElement, div);
        }
    },


    // Private Methods
    // ----------------------------------------------------

    replaceElement: function() {

    },

    appendToElement: function(find, replace) {
        // note, this is incorrect, but functions
        var target = document.querySelector(find);

        target.innerHTML = replace.innerHTML;
    }

});
