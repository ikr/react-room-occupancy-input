(function () {
    'use strict';

    var React = require('react'),
        AdultsCountInput = require('./AdultsCountInput'),
        ChildrenInput = require('./ChildrenInput'),
        ReactIntl = require('react-intl'),
        FormattedMessage = ReactIntl.FormattedMessage,
        IntlMixin = ReactIntl.IntlMixin,

        clone = function (x) {
            return JSON.parse(JSON.stringify(x));
        };

    module.exports = React.createClass({
        mixins: [IntlMixin],
        propTypes: {
            value: React.PropTypes.object.isRequired,
            onChange: React.PropTypes.func.isRequired
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy'}, [
                React.DOM.div({className: 'room-occupancy-adults-count', key: 'k0'}, [
                    React.DOM.label(
                        {key: 'k0'},
                        React.createElement(FormattedMessage, {message: this.getIntlMessage('adults')})
                    ),

                    React.createElement(AdultsCountInput, {
                        ref: 'adults',
                        value: this.props.value.adults,
                        onChange: this.handleAdultsChange,
                        key: 'k1'
                    })
                ]),

                React.createElement(ChildrenInput, {
                    ref: 'children',
                    value: this.props.value.children,
                    onChange: this.handleChildrenChange,
                    key: 'k1',
                    locales: this.props.locales,
                    messages: this.props.messages
                })
            ]);
        },

        handleAdultsChange: function (newAdultsCount) {
            var newRoomOccupancy = clone(this.props.value);
            newRoomOccupancy.adults = newAdultsCount;

            this.props.onChange(newRoomOccupancy);
        },

        handleChildrenChange: function (newChildrenArray) {
            var newRoomOccupancy = clone(this.props.value);
            newRoomOccupancy.children = newChildrenArray;

            this.props.onChange(newRoomOccupancy);
        }
    });
}());
