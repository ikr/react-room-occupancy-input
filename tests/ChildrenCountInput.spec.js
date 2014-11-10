describe('ChildrenCountInput', function () {
    'use strict';

    var assert = require('assert'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        TestBrowser = require('jsdom-test-browser'),
        bro = new TestBrowser();

    describe('instance', function () {
        this.timeout(4000);

        beforeEach(function (done) { bro.setUp(done); });
        afterEach(function () { bro.tearDown(); });

        describe('element HTML', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenCountInput)
                ).getDOMNode();
            });

            it('defines 6 option values', function () {
                var values = [].slice.call(element.options).map(function (o) { return o.value; });
                assert.deepEqual(values, [0, 1, 2, 3, 4, 5]);
            });
        });
    });
});
