describe('OccupancyInput', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        OccupancyInput = require('../src/OccupancyInput'),
        AdultsCountInput = require('../src/AdultsCountInput'),
        ChildrenInput = require('../src/ChildrenInput');

    it('declares the value property', function () {
        assert(OccupancyInput.propTypes.value);
    });

    it('declares the onChange property', function () {
        assert(OccupancyInput.propTypes.onChange);
    });

    describe('instance', function () {
        before(function (done) { bro.jQueryify(done); });

        describe('structure', function () {
            var component,
                element;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(OccupancyInput, {
                        value: {adults: 1, children: []},
                        onChange: function () {}
                    })
                );

                element = component.getDOMNode();
            });

            it('has DIV as a top level tag', function () {
                assert.strictEqual(element.tagName, 'DIV');
            });

            it('has the top level class assigned', function () {
                assert(bro.$(element).hasClass('room-occupancy'));
            });

            it('aggregates an AdultsCountInput', function () {
                assert(
                    TestUtils.isCompositeComponentWithType(component.refs.adults, AdultsCountInput)
                );
            });

            it('passes down the adults count', function () {
                assert.strictEqual(component.refs.adults.props.value, 1);
            });

            it('provides the adults count change handler', function () {
                assert(component.handleAdultsChange);

                assert.strictEqual(
                    component.refs.adults.props.onChange,
                    component.handleAdultsChange
                );
            });

            it('aggregates a ChildrenInput', function () {
                assert(
                    TestUtils.isCompositeComponentWithType(component.refs.children, ChildrenInput)
                );
            });

            it('passes down the children array', function () {
                assert.deepEqual(component.refs.children.props.value, []);
            });

            it('provides the children change handler', function () {
                assert(component.handleChildrenChange);

                assert.strictEqual(
                    component.refs.children.props.onChange,
                    component.handleChildrenChange
                );
            });
        });
    });
});
