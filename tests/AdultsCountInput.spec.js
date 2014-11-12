describe('AdultsCountInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        bro = require('jsdom-test-browser'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        AdultsCountInput = require('../src/AdultsCountInput');

    ['value', 'onChange'].forEach(function (p) {
        it('declares the ' + p + ' property', function () {
            assert(AdultsCountInput.propTypes[p]);
        });
    });

    describe('instance', function () {
        describe('element HTML', function () {
            var element;

            before(function (done) { bro.jQueryify(done); });

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(AdultsCountInput, {value: 5})
                ).getDOMNode();
            });

            it('is a select tag', function () {
                assert.strictEqual(element.tagName, 'SELECT');
            });

            it('defines 5 option values', function () {
                var values = [].slice.call(element.options).map(function (o) { return o.value; });
                assert.deepEqual(values, [1, 2, 3, 4, 5]);
            });

            it('selects the option defined by the component\'s value property', function () {
                assert.strictEqual(bro.$(element).val(), '5');
            });
        });

        describe('selected option change', function () {
            var spy,
                element;

            beforeEach(function () {
                spy = sinon.spy();

                element = TestUtils.renderIntoDocument(
                    React.createElement(AdultsCountInput, {onChange: spy})
                ).getDOMNode();

                TestUtils.Simulate.change(element, {target: {value: '2'}});
            });

            it('triggers an onChange', function () {
                assert(spy.calledOnce);
            });

            it('value is converted from a string to an integer', function () {
                assert.strictEqual(spy.args[0][0], 2);
            });
        });
    });
});
