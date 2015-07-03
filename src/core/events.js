
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
