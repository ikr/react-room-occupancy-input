describe('OccupancyInput', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        OccupancyInput = require('../src/OccupancyInput');

    it('declares the value property', function () {
        assert(OccupancyInput.propTypes.value);
    });

    it('declares the onChange property', function () {
        assert(OccupancyInput.propTypes.onChange);
    });

    describe('instance', function () {
        before(function (done) { bro.jQueryify(done); });

        describe('HTML', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(OccupancyInput, {
                        value: {adults: 1, children: []},
                        onChange: function () {}
                    })
                ).getDOMNode();
            });

            it('has DIV as a top level tag', function () {
                assert.strictEqual(element.tagName, 'DIV');
            });

            it('has the top level class assigned', function () {
                assert(bro.$(element).hasClass('room-occupancy'));
            });
        });
    });
});
