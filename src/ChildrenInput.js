(function () {
    'use strict';

    var React = require('react'),
        ChildrenCountInput = require('./ChildrenCountInput'),
        ChildAgeInput = require('./ChildAgeInput');

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.array
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy-children'}, this.subElements());
        },

        subElements: function () {
            return [this.countElement()].concat(this.ageElements());
        },

        countElement: function () {
            return React.createElement(ChildrenCountInput, {
                ref: 'count',
                value: this.props.value.length,
                key: 'count'
            });
        },

        ageElements: function () {
            return this.props.value.map(function (child, index) {
                var id = 'age' + index;

                return React.createElement(ChildAgeInput, {
                    ref: id,
                    value: child.age,
                    key: id
                });
            });
        }
    });
}());
