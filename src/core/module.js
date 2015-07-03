
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
