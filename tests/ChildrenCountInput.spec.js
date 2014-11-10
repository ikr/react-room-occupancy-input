describe('ChildrenCountInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        TestBrowser = require('jsdom-test-browser'),
        bro = new TestBrowser();

    ['value', 'onChange'].forEach(function (p) {
        it('declares the ' + p + ' property', function () {
            assert(ChildrenCountInput.propTypes[p]);
        });
    });

    describe('instance', function () {
        this.timeout(4000);

        beforeEach(function (done) { bro.setUp(done); });
        afterEach(function () { bro.tearDown(); });

        describe('element HTML', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenCountInput, {value: 5})
                ).getDOMNode();
            });

            it('is a select tag', function () {
                assert.strictEqual(element.tagName, 'SELECT');
            });

            it('defines 6 option values', function () {
                var values = [].slice.call(element.options).map(function (o) { return o.value; });
                assert.deepEqual(values, [0, 1, 2, 3, 4, 5]);
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
                    React.createElement(ChildrenCountInput, {onChange: spy})
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
