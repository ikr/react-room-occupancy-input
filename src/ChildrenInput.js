(function () {
    'use strict';

    var React = require('react'),
        ChildrenCountInput = require('./ChildrenCountInput'),
        ChildAgeInput = require('./ChildAgeInput');

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.array.isRequired,
            onChange: React.PropTypes.func
        },

        getInitialState: function () {
            return {draft: null};
        },

        render: function () {
            return React.DOM.div({className: 'room-occupancy-children'}, this.subElements());
        },

        isValid: function () {
            return this.childrenValueToRender().reduce(function (memo, child, index) {
                return memo && this.refs['age' + index].isValid();
            }.bind(this), true);
        },

        subElements: function () {
            return [this.countElement()].concat(this.ageElements());
        },

        countElement: function () {
            return React.createElement(ChildrenCountInput, {
                ref: 'count',
                value: this.childrenValueToRender().length,
                onChange: this.handleCountChange,
                key: 'count'
            });
        },

        ageElements: function () {
            var onChangeFactory = function (index) {
                    return function (newAge) {
                        this.handleAgeChange(index, newAge);
                    }.bind(this);
                }.bind(this);

            return this.childrenValueToRender().map(function (child, index) {
                var id = 'age' + index;

                return React.createElement(ChildAgeInput, {
                    ref: id,
                    value: child.age,
                    onChange: onChangeFactory(index),
                    key: id
                });
            });
        },

        handleCountChange: function (newCount) {
            if (newCount <= this.props.value.length) {
                this.setState({draft: null});
                this.props.onChange(this.props.value.slice(0, newCount));
            }
            else {
                this.setState({draft: this.prepareDraft(newCount)});
            }
        },

        handleAgeChange: function () {},

        prepareDraft: function (newCount) {
            var draft = this.props.value.slice(),
                i;

            for (i = 0; i < newCount - this.props.value.length; i = i + 1) {
                draft.push({age: null});
            }

            return draft;
        },

        childrenValueToRender: function () {
            return this.state.draft ? this.state.draft : this.props.value;
        }
    });
}());
