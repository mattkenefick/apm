
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
     * cache <boolean>
     * @default true
     */
    cache: true,

    /**
     * expires <int>
     *      minute, hour, day, week
     *      60, 3600, 86400, 604800
     * @default 24 hours
     */
    expires: 60,

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
        if (this.cache && this.hasCache()) {
            this._loadCache();
        }
        else {
            this._loadRemote();
        }
    },

    render: function() {
        console.warn("Core module render hasn't been setup yet");
    },

    save: function(response) {
        var key = this.getStorageKey(),
            storage = {
                created_at: Date.now(),
                expires   : this.expires,
                version   : this.version,
                data      : response
            };

        // log
        apm.core.log.debug("     Saved: " + Date.now());

        localStorage.setItem(key, JSON.stringify(storage));
    },

    _loadRemote: function() {
        var url  = this.getUrl(),
            http = new apm.core.http;

        // log
        apm.core.log.debug("Loading remote: " + url);

        // fetch
        http.GET(url, this._onRemoteSuccess.bind(this), this._onRemoteFailure.bind(this));
    },

    _loadCache: function() {
        var key = this.getStorageKey(),
            stored,
            json;

        // get data
        try {
            stored = localStorage.getItem(key);
            json = JSON.parse(stored);
        }

        // if local errors out, try remote
        catch (e) {
            console.warn(e);

            return this._loadRemote();
        }

        // log
        apm.core.log.debug("Loaded from cache, " + key + " - version: " + json.version);

        // check for data
        if (json.data == undefined) {
            apm.core.log.debug("No data found `" + this.filename + "`, loading remote.");

            return this._loadRemote();
        }

        // check if it expired
        if (json.created_at + (json.expires * 1000) <= Date.now()) {
            apm.core.log.debug("Cache expired for `" + this.filename + "`, loading remote.");

            return this._loadRemote();
        }

        this._onSuccess(json.data);
    },


    // Getters / Setters
    // -------------------------

    hasCache: function() {
        var key = this.getStorageKey();

        return !!localStorage.getItem(key);
    },

    getStorageKey: function() {
        return "apm." + apm.core.md5(this.getUrl());
    },

    getUrl: function() {
        var baseUrl = this.appUrl.replace(/\/$/, ""),
            appName = this.appName.replace(/\/$/, ""),
            filename = this.filename.replace(/\/$/, ""),
            version = this.version,
            url;

        // apply version to filename
        filename = filename.replace(/(\.[a-z]+)$/, "-" + version + "$1");

        url = [baseUrl, appName, filename].join("/")

        return url;
    },


    // Event Handlers
    // -------------------------

    _onRemoteFailure: function(xhr) {
        var error = [
            "Couldn't find remote library. Do you have the correct version (" + this.version + ") set?",
            this.getUrl()
        ].join("\n");

        console.error(error);

        // events
        this.onRemoteFailure(xhr);
    },

    _onRemoteSuccess: function(response) {
        // save
        this.save(response);

        // woo
        this._onSuccess(response);

        // events
        this.onRemoteSuccess(response);
    },

    _onSuccess: function(response) {
        this.response = response;

        // do we auto render after load?
        if (this.autoRender) {
            this.render(response);
        }

        // events
        this.onSuccess(response);
    },

    onRemoteFailure: function(xhr) {

    },

    onRemoteSuccess: function(response) {

    },

    onSuccess: function() {

    }

});
