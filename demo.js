(function () {
    'use strict';

    var RoomOccupancyInput = require('./index'),
        React = require('react'),

        Container = React.createClass({
            getInitialState: function () {
                return {
                    value: {
                        adults: 2,
                        children: [{age: 5}, {age: 7}]
                    }
                };
            },

            render: function () {
                return React.DOM.div({}, [
                    React.createElement(RoomOccupancyInput, {
                        key: 'k0',
                        value: this.state.value,

                        onChange: function (roomOccupancy) {
                            this.setState({value: roomOccupancy});
                        }.bind(this)
                    }),

                    React.DOM.div({key: 'k1'}, this.isValid() ? 'Valid' : 'Invalid')
                ]);
            },

            isValid: function () {
                return this.state.value.children.reduce(function (memo, child) {
                    return (child.age !== null) && memo;
                }, true);
            }
        });

    React.render(React.createElement(Container), global.document.body);
}());
