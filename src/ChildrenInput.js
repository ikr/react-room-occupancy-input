(function () {
    'use strict';

    var React = require('react'),
        ChildrenCountInput = require('./ChildrenCountInput'),
        ChildAgeInput = require('./ChildAgeInput'),
        ReactIntl = require('react-intl'),
        FormattedMessage = ReactIntl.FormattedMessage,
        IntlMixin = ReactIntl.IntlMixin,
        clone = require('./clone');

    function pad(padWhat, newSize, padWith) {
        var result = padWhat.slice(),
            i;

        for (i = 0; i < newSize - padWhat.length; i = i + 1) {
            result.push(padWith);
        }

        return result;
    }

    module.exports = React.createClass({
        displayName: 'ChildrenInput',
        mixins: [IntlMixin],

        propTypes: {
            value: React.PropTypes.array,
            onChange: React.PropTypes.func
        },

        getInitialState: function () {
            return {drafting: this.props.value.map(function () { return false; })};
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy-children'}, this.subElements());
        },

        subElements: function () {
            return [this.countElement()].concat(this.ageElements());
        },

        countElement: function () {
            return React.DOM.div({className: 'room-occupancy-children-count', key: 'k0'}, [
                React.DOM.label(
                    {key: 'k0'},
                    React.createElement(FormattedMessage, {
                        message: this.getIntlMessage('react-room-occupancy-input.children')
                    })
                ),

                React.createElement(ChildrenCountInput, {
                    ref: 'count',
                    value: this.props.value.length,
                    onChange: this.handleCountChange,
                    key: 'k1'
                })
            ]);
        },

        ageElements: function () {
            var onChangeFactory = function (index) {
                    return function (newAge) {
                        this.handleAgeChange(index, newAge);
                    }.bind(this);
                }.bind(this),

                ageInputs = this.props.value.map(function (child, index) {
                    var id = 'age' + index;

                    return React.createElement(ChildAgeInput, {
                        ref: id,
                        value: child.age,
                        onChange: onChangeFactory(index),
                        key: id
                    });
                }.bind(this)),

                labelElement = React.DOM.label(
                    {key: 'label'},
                    React.createElement(
                        FormattedMessage,
                        {
                            message: this.getIntlMessage('react-room-occupancy-input.childrenAge'),
                            children: ageInputs.length
                        }
                    )
                );

            if (ageInputs.length > 0) {
                return [React.DOM.div(
                    {className: 'room-occupancy-children-ages', key: 'k1'},
                    [labelElement].concat(ageInputs)
                )];
            }

            return [];
        },

        handleCountChange: function (newCount) {
            if (newCount <= this.props.value.length) {
                this.props.onChange(this.props.value.slice(0, newCount));
                this.setState({drafting: this.state.drafting.slice(0, newCount)});
            }
            else {
                this.props.onChange(this.padValue(newCount));
                this.setState({drafting: this.padDrafting(newCount)});
            }
        },

        handleAgeChange: function (index, newAge) {
            var newChildrenValue = clone(this.props.value),
                newDrafting = this.state.drafting.slice();

            newChildrenValue[index].age = newAge;
            this.props.onChange(newChildrenValue);

            newDrafting[index] = !newAge;
            this.setState({drafting: newDrafting});
        },

        padValue: function (newCount) {
            return pad(this.props.value, newCount, {age: null});
        },

        padDrafting: function (newCount) {
            return pad(this.state.drafting, newCount, false);
        }
    });
}());
