(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.object.isRequired,
            onChange: React.PropTypes.func.isRequired
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy'}, '');
        }
    });
}());
