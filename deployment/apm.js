
/**
 * apm
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */


// Application Package Manager
// ---------------------------------------------------------

_apm = {

    null   : null,
    core   : {},
    modules: {},
    options: {},
    nothing: function() { },

    load: function(options) {
        options || (options = {});

        // save options
        this.options = options;

        // create modules based on options
        this.loadModules();
    },

    loadModules: function() {
        var module, value;

        // cycle through options to see what modules to load
        for (var key in this.options) {
            value = this.options[key];

            // if a module exists in our repo, create it
            if (this.modules[key]) {
                module = this[key] = this.loadModule(key, this.options[key], {
                    appName: this.options.appName,
                    appUrl: this.options.appUrl
                });

                // load it
                module.load();
            }
        };
    },

    loadModule: function(type, moduleOptions, appOptions) {
        var module = new this.modules[type];

        // add options specific to this module
        if (moduleOptions) {
            for (var i in moduleOptions) {
                module[i] = moduleOptions[i];
            }
        }

        // add general application options required
        if (appOptions) {
            for (var i in appOptions) {
                module[i] = appOptions[i];
            }
        }

        return module;
    }

};


// Apply to DOM
// ---------------------------------------------------------

if (window['apm']) {
    window._apm = _apm;
}
else {
    window.apm = _apm;
}



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


/**
 * apm/core/md5
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.md5 = function(s) {

    /*
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    /*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
    var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }

    function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
    function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
    function hex_hmac_md5(k, d)
      { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function b64_hmac_md5(k, d)
      { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function any_hmac_md5(k, d, e)
      { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function md5_vm_test()
    {
      return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of a raw string
     */
    function rstr_md5(s)
    {
      return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    function rstr_hmac_md5(key, data)
    {
      var bkey = rstr2binl(key);
      if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

      var ipad = Array(16), opad = Array(16);
      for(var i = 0; i < 16; i++)
      {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
      return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex(input)
    {
      try { hexcase } catch(e) { hexcase=0; }
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var output = "";
      var x;
      for(var i = 0; i < input.length; i++)
      {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
               +  hex_tab.charAt( x        & 0x0F);
      }
      return output;
    }

    /*
     * Convert a raw string to a base-64 string
     */
    function rstr2b64(input)
    {
      try { b64pad } catch(e) { b64pad=''; }
      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var output = "";
      var len = input.length;
      for(var i = 0; i < len; i += 3)
      {
        var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
        for(var j = 0; j < 4; j++)
        {
          if(i * 8 + j * 6 > input.length * 8) output += b64pad;
          else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
        }
      }
      return output;
    }

    /*
     * Convert a raw string to an arbitrary string encoding
     */
    function rstr2any(input, encoding)
    {
      var divisor = encoding.length;
      var i, j, q, x, quotient;

      /* Convert to an array of 16-bit big-endian values, forming the dividend */
      var dividend = Array(Math.ceil(input.length / 2));
      for(i = 0; i < dividend.length; i++)
      {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
      }

      /*
       * Repeatedly perform a long division. The binary array forms the dividend,
       * the length of the encoding is the divisor. Once computed, the quotient
       * forms the dividend for the next step. All remainders are stored for later
       * use.
       */
      var full_length = Math.ceil(input.length * 8 /
                                        (Math.log(encoding.length) / Math.log(2)));
      var remainders = Array(full_length);
      for(j = 0; j < full_length; j++)
      {
        quotient = Array();
        x = 0;
        for(i = 0; i < dividend.length; i++)
        {
          x = (x << 16) + dividend[i];
          q = Math.floor(x / divisor);
          x -= q * divisor;
          if(quotient.length > 0 || q > 0)
            quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
      }

      /* Convert the remainders to the output string */
      var output = "";
      for(i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

      return output;
    }

    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    function str2rstr_utf8(input)
    {
      var output = "";
      var i = -1;
      var x, y;

      while(++i < input.length)
      {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
        {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }

        /* Encode output as utf-8 */
        if(x <= 0x7F)
          output += String.fromCharCode(x);
        else if(x <= 0x7FF)
          output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                        0x80 | ( x         & 0x3F));
        else if(x <= 0xFFFF)
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                        0x80 | ((x >>> 6 ) & 0x3F),
                                        0x80 | ( x         & 0x3F));
        else if(x <= 0x1FFFFF)
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                        0x80 | ((x >>> 12) & 0x3F),
                                        0x80 | ((x >>> 6 ) & 0x3F),
                                        0x80 | ( x         & 0x3F));
      }
      return output;
    }

    /*
     * Encode a string as utf-16
     */
    function str2rstr_utf16le(input)
    {
      var output = "";
      for(var i = 0; i < input.length; i++)
        output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                      (input.charCodeAt(i) >>> 8) & 0xFF);
      return output;
    }

    function str2rstr_utf16be(input)
    {
      var output = "";
      for(var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                       input.charCodeAt(i)        & 0xFF);
      return output;
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl(input)
    {
      var output = Array(input.length >> 2);
      for(var i = 0; i < output.length; i++)
        output[i] = 0;
      for(var i = 0; i < input.length * 8; i += 8)
        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
      return output;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input)
    {
      var output = "";
      for(var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
      return output;
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5(x, len)
    {
      /* append padding */
      x[len >> 5] |= 0x80 << ((len) % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;

      var a =  1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d =  271733878;

      for(var i = 0; i < x.length; i += 16)
      {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t)
    {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
    }
    function md5_ff(a, b, c, d, x, s, t)
    {
      return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t)
    {
      return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t)
    {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t)
    {
      return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y)
    {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt)
    {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    return hex_md5(s);

};


/**
 * apm/core/extend
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

;(function(){
    var initializing = false,
        fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    apm.class = function() {};

    // Create a new Class that inherits from this class
    apm.class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        var name = prop['name'] ? prop['name'] : 'apm_class';

        delete prop['name'];

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) :
            prop[name];
        }

        // create class with custom names
        eval([
            "function " + name + "() {",
            "    if ( !initializing && this.init ) {",
            "        this.init.apply(this, arguments); ",
            "    }",
            "};",
            name + ".prototype = prototype;",
            name + ".prototype.constructor = " + name + ";",
            name + ".extend = arguments.callee;"
        ].join(''));

        return eval(name);
    };
})();


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
    GET: function(url, callback, error) {
        var xhr;

        xhr = this.xhr = new XMLHttpRequest;
        this.xhr.open("GET", url, true);
        this.xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // done
                if (xhr.status === 200) { // complete
                    callback && callback(xhr.responseText)
                }
                else if (xhr.status >= 400) {
                    error && error(xhr);
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


/**
 * apm/modules/font
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.font = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_font",

});


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
            docfrag = this.createFragment(response),
            nodeCount = docfrag.children.length;

        // target.parentNode.insertBefore(docfrag, target);

        for (var i = 0; i < nodeCount; i++) {
            target.parentNode.insertBefore(docfrag.children[0], target);
        };
        target.parentNode.removeChild(target);
    },

    beforeElement: function(find, response) {
        var target = document.querySelector(find),
            docfrag = this.createFragment(response),
            nodeCount = docfrag.children.length;

        // target.parentNode.insertBefore(docfrag, target);

        for (var i = 0; i < nodeCount; i++) {
            target.parentNode.insertBefore(docfrag.children[0], target);
        };
    },

    appendToElement: function(find, response) {
        var target = document.querySelector(find);
            docfrag = this.createFragment(response),
            nodeCount = docfrag.children.length;

        for (var i = 0; i < nodeCount; i++) {
            target.appendChild(docfrag.children[0]);
        };
    },

    createFragment: function(response) {
        // return document.createRange().createContextualFragment(response);

        var node = document.createElement('div');
            node.innerHTML = response;

        return node;
    }

});


/**
 * apm/modules/image
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.image = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_image",

});


/**
 * apm/modules/javascript
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.modules.javascript = apm.core.module.extend({

    /**
     * class name
     */
    name: "apm_modules_javascript",

    render: function(response) {
        return this._renderByFunction(response);
        // return this._renderByEval(response);
    },


    // Private Methods
    // -------------------------------------------

    _renderByEval: function(response) {
        window.eval(response);
    },

    _renderByFunction: function(response) {
        var f = new Function(response);
        f();
    }

});
