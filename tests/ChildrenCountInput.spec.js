describe('ChildrenCountInput', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        massert = require('./helpers/massert.js');

    assert(bro);

    describe('instance', function () {
        this.timeout(4000);

        describe('element HTML', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenCountInput)
                ).getDOMNode();
            });

            it('has the form-control CSS class', function () {
                massert.cssClass(element, 'form-control');
            });

            it('defines 6 option values', function () {
                var values = [].slice.call(element.options).map(function (o) { return o.value; });
                assert.deepEqual(values, [0, 1, 2, 3, 4, 5]);
            });
        });
    });
});
