
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
            docfrag = this.createFragment(response);

        target.parentNode.insertBefore(docfrag, target);
        target.parentNode.removeChild(target);
    },

    beforeElement: function(find, response) {
        var target = document.querySelector(find),
            docfrag = this.createFragment(response);

        target.parentNode.insertBefore(docfrag, target);
    },

    appendToElement: function(find, response) {
        var target = document.querySelector(find);
            docfrag = this.createFragment(response);

        target.appendChild(docfrag);
    },

    createFragment: function(response) {
        // return document.createRange().createContextualFragment(response);

        var node = document.createElement('div');
            node.innerHTML = response;

        return node.firstChild;
    }

});
