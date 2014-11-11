describe('ChildrenInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        ChildrenInput = require('../src/ChildrenInput'),
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        ChildAgeInput = require('../src/ChildAgeInput'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils,
        TestBrowser = require('jsdom-test-browser'),
        bro = new TestBrowser();

    it('declares the value property', function () {
        assert(ChildrenInput.propTypes.value);
    });

    it('declares the onChange property', function () {
        assert(ChildrenInput.propTypes.onChange);
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

            it('has DIV as a top level tag', function () {
                assert.strictEqual(element.tagName, 'DIV');

            });

            it('has the top level class assigned', function () {
                assert(bro.$(element).hasClass('room-occupancy-children'));
            });
        });

        describe('rendering according to its pre-set value', function () {
            var component,
                element;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {value: [{age: 0}, {age: 2}, {age: 12}]})
                );

                element = component.getDOMNode();
            });

            it('has null-ed draft in the state', function () {
                assert.strictEqual(component.state.draft, null);
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

        describe('rendering according to the draft value', function () {
            var component;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {value: []})
                );

                component.setState({draft: [{age: null}, {age: null}]}, done);
            });

            it('overrides the value property for the count', function () {
                assert.strictEqual(component.refs.count.props.value, 2);
            });

            it('overrides the value property for the ages', function () {
                assert.strictEqual(component.refs.age1.props.value, null);
            });
        });

        describe('change handlers wiring', function () {
            var component;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {value: []})
                );
            });

            it('registeres a count change handler', function () {
                assert(component.refs.count.props.onChange);
                assert.strictEqual(component.refs.count.props.onChange, component.handleCountChange);
            });
        });

        describe('handleCountChange', function () {
            var component,
                spy;

            beforeEach(function () {
                spy = sinon.spy();

                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {
                        value: [{age: 4}, {age: 2}],
                        onChange: spy
                    })
                );
            });

            describe('when the count is decreased', function () {
                beforeEach(function () {
                    component.handleCountChange(1);
                });

                it('triggers onChange', function () {
                    assert(spy.calledOnce);
                });

                it('calls onChange with the reduced children array', function () {
                    assert.deepEqual(spy.args[0][0], [{age: 4}]);
                });

                it.skip('clears the draft', function () {
                    component.setState({draft: [{age: null}]});
                    component.handleCountChange(1);
                    assert.strictEqual(component.state.draft, null);
                });
            });

            describe.skip('when the count is increased', function () {
                beforeEach(function () {
                    component.handleCountChange(3);
                });

                it('doesn\'t trigger onChange', function () {
                    assert(!spy.called);
                });

                it('stores an invalid value array to the state', function () {
                    assert.deepEqual(component.state.draft, [{age: 4}, {age: 2}, {age: null}]);
                });
            });
        });
    });
});
