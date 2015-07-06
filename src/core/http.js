
/**
 * apm/core/http
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.http = apm.core.events.extend({

    /**
     * xmlhttprequest
     */
    xhr: null,

    /**
     * GET
     *
     */
    GET: function(url, callback) {
        var xhr;

        xhr = this.xhr = new XMLHttpRequest;
        this.xhr.open("GET", url, true);
        this.xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // done
                if (xhr.status === 200) { // complete
                    callback && callback(xhr.responseText)
                }
            }
        };
        this.xhr.send();
    },

    POST: function(url, callback) {

    },

    PUT: function(url, callback) {

    },

    DELETE: function(url, callback) {

    }

});
