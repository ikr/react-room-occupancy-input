describe('ChildrenInput', function () {
    'use strict';

    var assert = require('assert'),
        ChildrenInput = require('../src/ChildrenInput'),
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        ChildAgeInput = require('../src/ChildAgeInput'),
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

        describe('HTML', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {value: []})
                ).getDOMNode();
            });

            it('has the top level class assigned', function () {
                assert(bro.$(element).hasClass('room-occupancy-children'));
            });
        });

        describe('rendering according to its value', function () {
            var component,
                element;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {value: [{age: 0}, {age: 2}, {age: 12}]})
                );

                element = component.getDOMNode();
            });

            it('includes a referenced ChildrenCountInput', function () {
                assert(
                    TestUtils.isCompositeComponentWithType(component.refs.count, ChildrenCountInput)
                );
            });

            it('sets the count value', function () {
                assert.strictEqual(component.refs.count.props.value, 3);
            });

            it('displays the correct amount of age inputs', function () {
                assert.strictEqual(bro.$('input[type=number]', element).size(), 3);
            });

            [0, 2, 12].forEach(function (age, index) {
                it('includes the reference to the ChildAgeInput #' + index, function () {
                    assert(
                        TestUtils.isCompositeComponentWithType(
                            component.refs['age' + index],
                            ChildAgeInput
                        )
                    );
                });

                it('sets the age #' + index + ' value', function () {
                    assert.strictEqual(component.refs['age' + index].props.value, age);
                });
            });
        });
    });
});
