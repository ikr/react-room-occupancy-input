(function () {
    'use strict';

    module.exports = function () {
        return {
            children: 'Children',
            childrenAge: '{children, plural, =1 {Child age} other {Children ages}}',
            adults: 'Adults'
        };
    }
}());
