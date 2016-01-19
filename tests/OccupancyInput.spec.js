describe('OccupancyInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        bro = require('jsdom-test-browser'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        OccupancyInput = require('../src/OccupancyInput'),
        AdultsCountInput = require('../src/AdultsCountInput'),
        ChildrenInput = require('../src/ChildrenInput'),
        intlMessages = require('../src/intlMessages');

    ['value', 'onChange'].forEach(function (name) {
        it('declares the ' + name + ' property', function () {
            assert(OccupancyInput.propTypes[name]);
        });
    });

    it('defines the display name', function () {
        assert.strictEqual(typeof OccupancyInput.displayName, 'string');
    });

    describe('instance structure', function () {
        var component,
            element;

        before(function (done) { bro.jQueryify(done); });

        beforeEach(function () {
            component = TestUtils.renderIntoDocument(
                React.createElement(OccupancyInput, {
                    value: {adults: 1, children: []},
                    onChange: function () {},
                    messages: intlMessages().en
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

    describe('instance', function () {
        var spy,
            component;

        beforeEach(function () {
            spy = sinon.spy();

            component = TestUtils.renderIntoDocument(
                React.createElement(OccupancyInput, {
                    value: {adults: 2, children: [{age: 1}]},
                    onChange: spy,
                    messages: intlMessages().en
                })
            );
        });

        describe('handleAdultsChange', function () {
            beforeEach(function () {
                component.handleAdultsChange(1);
            });

            it('triggers onChange', function () {
                assert(spy.calledOnce);
            });

            it('triggers onChange with the new room occupancy value', function () {
                assert.deepEqual(spy.args[0][0], {adults: 1, children: [{age: 1}]});
            });
        });

        describe('handleChildrenChange', function () {
            beforeEach(function () {
                component.handleChildrenChange([]);
            });

            it('triggers onChange', function () {
                assert(spy.calledOnce);
            });

            it('triggers onChange with the new room occupancy value', function () {
                assert.deepEqual(spy.args[0][0], {adults: 2, children: []});
            });
        });
    });
});
