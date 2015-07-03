
/**
 * apm/core/extend
 *
 * @author Matt Kenefick  <matt@polymermallard.com>
 * @version 0.0.1
 */

apm.core.extend = function(target, source) {
    if (!source) {
        source = target;
        target = this || {
            extend: apm.core.extend
            // extend: function(source) {
            //     return apm.core.extend(this, source);
            // }
        };
    };

    var a = Object.create(target);

    Object.keys(source).map(function (prop) {
        // used for interfaced classes
        // prop in a && (a[prop] = source[prop]);

        // used for greedy extending
        a[prop] = source[prop];
    });

    return a;
};
