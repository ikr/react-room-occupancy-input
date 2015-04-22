describe('defaultMessages', function () {
    'use strict';

    var assert = require('assert'),
        defaultMessages = require('../src/defaultMessages');

    ['adults', 'children', 'childrenAge'].forEach(function (property) {
        it('declares the ' + property + ' property', function () {
            assert(defaultMessages()[property]);
        });
    });
});
