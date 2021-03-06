(function () {
    'use strict';

    var React = require('react'),
        isValidChildAge = require('./isValidChildAge'),

        isEmpty = function (txt) {
            return ('undefined' === typeof txt) || (null === txt) || (txt.length === 0);
        };

    module.exports = React.createClass({
        displayName: 'ChildAgeInput',

        propTypes: {
            value: React.PropTypes.number,
            onChange: React.PropTypes.func.isRequired
        },

        getInitialState: function () {
            return {draft: null};
        },

        render: function () {
            return React.DOM.input({
                type: 'number',
                min: 0,
                max: 11,
                step: 1,
                value: this.inputValueToRender(),
                onChange: this.handleInputChange,
                className: 'form-control'
            });
        },

        inputValueToRender: function () {
            if (!isEmpty(this.state.draft)) {
                return this.state.draft;
            }

            if(!isEmpty(this.props.value)) {
                return this.props.value;
            }

            return '';
        },

        handleInputChange: function (event) {
            if (isValidChildAge(event.target.value)) {
                this.setState({draft: null});
                this.props.onChange(parseInt(event.target.value));
            }
            else {
                this.setState({draft: event.target.value});

                if (null !== this.props.value) {
                    this.props.onChange(null);
                }
            }
        }
    });
}());
