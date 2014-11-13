(function () {
    'use strict';

    var RoomOccupancyInput = require('./index'),
        React = require('react'),

        Container = React.createClass({
            getInitialState: function () {
                return {value: {adults: 2, children: [{age: 5}, {age: 7}]}};
            },

            render: function () {
                return React.createElement(RoomOccupancyInput, {
                    value: this.state.value,

                    onChange: function (roomOccupancy) {
                        this.setState({value: roomOccupancy});
                    }.bind(this)
                });
            }
        });

    React.render(React.createElement(Container), global.document.body);
}());
