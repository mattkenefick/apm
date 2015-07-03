
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
