describe('Full public API', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        api = require('../index'),
        OccupancyInput = require('../src/OccupancyInput');

    assert(bro);

    it('exports the OccupancyInput class', function () {
        assert.strictEqual(api.Klass, OccupancyInput);
    });

    it('exports the i18n messages', function () {
        assert.strictEqual(typeof api.intlMessages, 'function');
    });
});
