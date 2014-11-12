(function () {
    'use strict';

    var React = require('react'),
        AdultsCountInput = require('./AdultsCountInput'),
        ChildrenInput = require('./ChildrenInput'),

        clone = function (x) {
            return JSON.parse(JSON.stringify(x));
        };

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.object.isRequired,
            onChange: React.PropTypes.func.isRequired
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy'}, [
                React.createElement(AdultsCountInput, {
                    ref: 'adults',
                    value: this.props.value.adults,
                    onChange: this.handleAdultsChange,
                    key: 'k0'
                }),

                React.createElement(ChildrenInput, {
                    ref: 'children',
                    value: this.props.value.children,
                    onChange: this.handleChildrenChange,
                    key: 'k1'
                })
            ]);
        },

        handleAdultsChange: function (newAdultsCount) {
            var newRoomOccupancy = clone(this.props.value);
            newRoomOccupancy.adults = newAdultsCount;

            this.props.onChange(newRoomOccupancy);
        },

        handleChildrenChange: function () {}
    });
}());
