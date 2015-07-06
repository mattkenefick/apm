
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
