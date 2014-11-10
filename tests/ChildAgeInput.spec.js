describe('ChildAgeInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
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
            var component,
                element;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildAgeInput, {value: 7})
                );

                element = component.getDOMNode();
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

            it('has null draft in the state', function () {
                assert.strictEqual(component.state.draft, null);
            });
        });

        describe('element value change', function () {
            var spy,
                component,
                element;

            beforeEach(function () {
                spy = sinon.spy();

                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildAgeInput, {value: null, onChange: spy})
                );

                element = component.getDOMNode();
            });

            it('happens with an initially empty value', function () {
                assert.strictEqual(bro.$(element).val(), '');
            });

            describe('in case of a valid new value', function () {
                beforeEach(function () {
                    TestUtils.Simulate.change(element, {target: {value: '0'}});
                });

                it('triggers the onChange', function () {
                    assert(spy.calledOnce);
                });

                it('converts the new new value to integer', function () {
                    assert.strictEqual(spy.args[0][0], 0);
                });
            });

            describe('in case of an invalid new value', function () {
                beforeEach(function () {
                    TestUtils.Simulate.change(element, {target: {value: 'moo'}});
                });

                it('doesn\'t trigger an onChange', function () {
                    assert(!spy.called);
                });

                it('gets saved in the state as a draft', function () {
                    assert.strictEqual(component.state.draft, 'moo');
                });

                it('gets rendered', function () {
                    assert.strictEqual(bro.$(element).val(), 'moo');
                });
            });

            it('nulls the draft when a valid value is entered', function () {
                TestUtils.Simulate.change(element, {target: {value: 'boo'}});
                TestUtils.Simulate.change(element, {target: {value: '5'}});

                assert.strictEqual(component.state.draft, null);
            });
        });
    });
});
