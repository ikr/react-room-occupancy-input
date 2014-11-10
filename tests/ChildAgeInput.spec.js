describe('ChildAgeInput', function () {
    'use strict';

    var assert = require('assert'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        ChildAgeInput = require('../src/ChildAgeInput'),
        TestBrowser = require('jsdom-test-browser'),
        bro = new TestBrowser();

    it('declares the value property', function () {
        assert(ChildAgeInput.propTypes.value);
    });

    it('declares the onChange property', function () {
        assert(ChildAgeInput.propTypes.onChange);
    });

    describe('instance', function () {
        beforeEach(function (done) { bro.setUp(done); });
        afterEach(function () { bro.tearDown(); });

        describe('element', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildAgeInput, {value: 7})
                ).getDOMNode();
            });

            it('is an input tag', function () {
                assert.strictEqual(element.tagName, 'INPUT');
            });

            it('is of type "number"', function () {
                assert.strictEqual(element.getAttribute('type'), 'number');
            });

            it('declares 0 as the minimum', function () {
                assert.strictEqual(element.getAttribute('min'), '0');
            });

            it('declares 12 as the maximum', function () {
                assert.strictEqual(element.getAttribute('max'), '12');
            });

            it('declares 1 as the step', function () {
                assert.strictEqual(element.getAttribute('step'), '1');
            });

            it('passes through its value property value to the input', function () {
                assert.strictEqual(element.getAttribute('value'), '7');
            });
        });
    });
});
