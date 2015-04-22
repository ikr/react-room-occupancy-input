(function () {
    'use strict';

    var React = require('react'),
        ChildrenCountInput = require('./ChildrenCountInput'),
        ChildAgeInput = require('./ChildAgeInput'),
        ReactIntl = require('react-intl'),
        defaultMessages = require('./defaultMessages'),
        FormattedMessage = ReactIntl.FormattedMessage,
        IntlMixin = ReactIntl.IntlMixin,

        clone = function (x) {
            return JSON.parse(JSON.stringify(x));
        };

    module.exports = React.createClass({
        mixins: [IntlMixin],
        propTypes: {
            value: React.PropTypes.array,
            onChange: React.PropTypes.func
        },

        getDefaultProps: function () {
            return {
                messages: defaultMessages()
            };
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy-children'}, this.subElements());
        },

        subElements: function () {
            return [this.countElement()].concat([this.agesElement()]);
        },

        countElement: function () {
            return React.DOM.div({className: 'room-occupancy-children-count', key: 'k0'}, [
                React.DOM.label(
                    {key: 'k0'},
                    React.createElement(FormattedMessage, {message: this.getIntlMessage('children')})
                ),

                React.createElement(ChildrenCountInput, {
                    ref: 'count',
                    value: this.props.value.length,
                    onChange: this.handleCountChange,
                    key: 'k1'
                })
            ]);
        },

        agesElement: function () {
            var onChangeFactory = function (index) {
                    return function (newAge) {
                        this.handleAgeChange(index, newAge);
                    }.bind(this);
                }.bind(this),

                ageElements = this.props.value.map(function (child, index) {
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
                        {message: this.getIntlMessage('childrenAge'), children: ageElements.length}
                    )
                );

            return React.DOM.div(
                {className: 'room-occupancy-children-ages', key: 'k1'},
                (ageElements.length > 0) ? [labelElement].concat(ageElements) : []
            );
        },

        handleCountChange: function (newCount) {
            if (newCount <= this.props.value.length) {
                this.props.onChange(this.props.value.slice(0, newCount));
            }
            else {
                this.props.onChange(this.prepareDraft(newCount));
            }
        },

        handleAgeChange: function (index, newAge) {
            var newChildrenValue = clone(this.props.value);
            newChildrenValue[index].age = newAge;
            this.props.onChange(newChildrenValue);
        },

        prepareDraft: function (newCount) {
            var draft = this.props.value.slice(),
                i;

            for (i = 0; i < newCount - this.props.value.length; i = i + 1) {
                draft.push({age: null});
            }

            return draft;
        }
    });
}());
