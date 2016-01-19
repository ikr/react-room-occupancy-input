(function () {
    'use strict';

    var React = require('react');

    module.exports = function (options) {
        return React.createClass({
            displayName: 'IntegerValueSelect',

            propTypes: {
                value: React.PropTypes.number,
                onChange: React.PropTypes.func
            },

            render: function () {
                return React.DOM.select(
                    {value: this.props.value, onChange: this.handleSelectionChange},

                    options.map(function (v) {
                        return React.DOM.option({value: v, key: 'k' + v}, v);
                    })
                );
            },

            handleSelectionChange: function (event) {
                this.props.onChange(parseInt(event.target.value, 10));
            }
        });
    };
}());
