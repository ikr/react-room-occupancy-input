describe('isValidChildAge', function () {
    'use strict';

    var assert = require('assert'),
        isValidChildAge = require('../src/isValidChildAge');

    [
        ['0', true],
        [7, true],
        ['-1', false],
        ['bla', false],
        ['11', true],
        ['12', false],
        ['13', false],
        [2.5, false],
        ['Infinity', false],
        ['', false]
    ].forEach(function (testCase) {
        var value = testCase[0],
            expectedResult = testCase[1];

        it('is ' + expectedResult + ' for "' + value + '"', function () {
            assert.strictEqual(isValidChildAge(value), expectedResult);
        });
    });
});
