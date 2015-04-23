describe('Public API', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        api = require('../index'),
        OccupancyInput = require('../src/OccupancyInput');

    assert(bro);

    it('is simply the OccupancyInput class', function () {
        assert.strictEqual(api, OccupancyInput);
    });

    it('exports default intl messages', function () {
        assert(typeof api.intlMessages === 'function');
    });
});
