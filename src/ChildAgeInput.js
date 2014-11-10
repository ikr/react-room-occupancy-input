(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.number,
            onChange: React.PropTypes.func
        },

        render: function () {
            return React.DOM.input({
                type: 'number',
                min: 0,
                max: 12,
                step: 1,
                value: this.props.value
            });
        }
    });
}());
