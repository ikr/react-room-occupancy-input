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
                    },

                    valid: true
                };
            },

            render: function () {
                return React.DOM.div({}, [
                    React.createElement(RoomOccupancyInput, {
                        key: 'k0',
                        value: this.state.value,

                        onChange: function (roomOccupancy) {
                            this.setState({value: roomOccupancy, valid: true});
                        }.bind(this),

                        onInvalidity: function () {
                            this.setState({valid: false});
                        }.bind(this)
                    }),

                    React.DOM.div({key: 'k1'}, this.state.valid ? 'Valid' : 'Invalid')
                ]);
            }
        });

    React.render(React.createElement(Container), global.document.body);
}());
