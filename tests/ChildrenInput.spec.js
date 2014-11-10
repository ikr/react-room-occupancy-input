describe('ChildrenInput', function () {
    'use strict';

    var assert = require('assert'),
        ChildrenInput = require('../src/ChildrenInput'),
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        TestBrowser = require('jsdom-test-browser'),
        bro = new TestBrowser();

    it('declares a value property', function () {
        assert(ChildrenInput.propTypes.value);
    });

    describe('instance', function () {
        beforeEach(function (done) { bro.setUp(done); });
        afterEach(function () { bro.tearDown(); });

        describe('rendering according to its value', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {value: [{age: 0}, {age: 2}, {age: 12}]})
                ).getDOMNode();
            });

            it('includes a ChildrenCountInput', function () {
                assert(TestUtils.isElementOfType(bro.$('select').get(0), ChildrenCountInput));
            });
        });
    });
});
