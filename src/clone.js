(function () {
    'use strict';

    module.exports = function (x) {
        return JSON.parse(JSON.stringify(x));
    };
}());
