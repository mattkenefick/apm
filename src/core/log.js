
/**
 * apm/core/http
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.log = {

    /**
     * debug
     *
     */
    debug: function() {
        var args = Array.prototype.slice.apply(arguments);

        args[0] = "%c apm > " + args[0];
        args.push("background: #0E5342; color: #93d9c7 !important;");

        console.log.apply(console, args);
    }

};
