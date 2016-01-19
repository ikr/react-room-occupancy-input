(function () {
    'use strict';

    var assert = require('assert');

    exports.cssClass = function (element, className) {
        var cn = element.className;

        assert(cn.split(' ').indexOf(className) >= 0, className + ' not found in ' + cn);
    };

    exports.contains = function (haystack, needle) {
        assert(haystack.indexOf(needle) >= 0, needle + ' not found in ' + haystack);
    };
}());
