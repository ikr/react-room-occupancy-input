describe('ChildrenInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        bro = require('jsdom-test-browser'),
        ChildrenInput = require('../src/ChildrenInput'),
        ChildrenCountInput = require('../src/ChildrenCountInput'),
        ChildAgeInput = require('../src/ChildAgeInput'),
        intlMessages = require('../src/intlMessages'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils;

    ['value', 'onChange'].forEach(function (name) {
        it('declares the ' + name + ' property', function () {
            assert(ChildrenInput.propTypes[name]);
        });
    });

    it('defines the display name', function () {
        assert.strictEqual(typeof ChildrenInput.displayName, 'string');
    });

    describe('instance', function () {
        before(function (done) { bro.jQueryify(done); });

        describe('HTML', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {
                        value: [],
                        onChange: function () {},
                        messages: intlMessages().en
                    })
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
                    React.createElement(ChildrenInput, {
                        value: [{age: 0}, {age: 2}, {age: 12}],
                        onChange: function () {},
                        messages: intlMessages().en
                    })
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

        describe('change handlers wiring', function () {
            var component;

            beforeEach(function () {
                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {
                        value: [{age: 3}, {age: 9}],
                        onChange: function () {},
                        messages: intlMessages().en
                    })
                );

                sinon.spy(component, 'handleAgeChange');
            });

            it('registeres a count change handler', function () {
                assert(component.refs.count.props.onChange);
                assert.strictEqual(component.refs.count.props.onChange, component.handleCountChange);
            });

            it('registers an indexed age change handler', function () {
                assert(component.refs.age1.props.onChange);
                component.refs.age1.props.onChange(8);

                assert(component.handleAgeChange.calledOnce);
                assert.deepEqual(component.handleAgeChange.args[0], [1, 8]);
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
                        onChange: spy,
                        messages: intlMessages().en
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
            });

            describe('when the count is increased', function () {
                beforeEach(function () {
                    component.handleCountChange(3);
                });

                it('triggers onChange once', function () {
                    assert(spy.calledOnce);
                });

                it('calls onChange with an augmented children array', function () {
                    assert.deepEqual(spy.args[0][0], [{age: 4}, {age: 2}, {age: null}]);
                });
            });
        });

        describe('handleAgeChange when all ages are present', function () {
            var component,
                spy;

            beforeEach(function () {
                spy = sinon.spy();

                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {
                        value: [{age: 6}, {age: 11}],
                        onChange: spy,
                        messages: intlMessages().en
                    })
                );

                component.handleAgeChange(1, 10);
            });

            it('triggers onChange', function () {
                assert(spy.calledOnce);
            });

            it('triggers onChange with new children array', function () {
                assert.deepEqual(spy.args[0][0], [{age: 6}, {age: 10}]);
            });
        });

        describe('handleAgeChange when some age is absent', function () {
            var component,
                spy;

            beforeEach(function () {
                spy = sinon.spy();

                component = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {
                        value: [{age: null}, {age: null}],
                        onChange: spy,
                        messages: intlMessages().en
                    })
                );

                component.handleAgeChange(0, 0);
            });

            it('triggers onChange once', function () {
                assert(spy.calledOnce);
            });

            it('triggers onChange with the new value', function () {
                assert.deepEqual(spy.args[0][0], [{age: 0}, {age: null}]);
            });
        });

        describe('translatable with react-intl', function () {
            var element;

            beforeEach(function () {
                element = TestUtils.renderIntoDocument(
                    React.createElement(ChildrenInput, {
                        value: [{age: null}, {age: null}],
                        onChange: sinon.spy(),
                        messages: {
                            'react-room-occupancy-input': {
                                children: 'Детей',
                                childrenAge: '{children, plural, =1 {Возраст ребёнка} other {Возраст детей}}',
                                adults: 'Взрослых'
                            }
                        }
                    })
                ).getDOMNode();
            });

            it('has correct translate for 2 children', function () {
                assert(bro.$(element).text().match('Возраст детей'));
            });
        });
    });
});
