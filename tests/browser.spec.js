describe('Browser API', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        api = require('../index'),
        browserApi = require('../browser');

    assert(bro);

    it('exports the OccupancyInput class', function () {
        assert.strictEqual(browserApi.Klass, api.Klass);
    });

    it('exports no i18n messages', function () {
        assert.strictEqual(typeof browserApi.intlMessages, 'undefined');
    });
});
