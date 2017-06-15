(function () {
    'use strict';

    if (!Number.isInteger) {
        Number.isInteger = function isInteger (nVal) {
            return (
                (typeof nVal === 'number') &&
                isFinite(nVal) &&
                (nVal > -9007199254740992) &&
                (nVal < 9007199254740992) &&
                (Math.floor(nVal) === nVal)
            );
        };
    }

    module.exports = function (x) {
        var floatX = parseFloat(x);
        return Number.isInteger(floatX) && (floatX >= 0) && (floatX <= 11);
    };
}());
