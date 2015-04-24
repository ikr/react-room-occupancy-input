[![Build Status](https://travis-ci.org/ikr/react-room-occupancy-input.svg?branch=master)](https://travis-ci.org/ikr/react-room-occupancy-input)

# About

React.js component for specifying a hotel room occupancy: how many adults, how many kids, how old
kids are. See [the demo.](http://ikr.su/h/react-room-occupancy-input/demo.html)

# Installation

Made for [Browserify.](http://browserify.org/)

    npm install --save react-room-occupancy-input
    
# Usage
    
See [the code](https://github.com/ikr/react-room-occupancy-input/blob/master/demo.js) of the demo
mentioned above.

## Internationalization

[react-intl](https://github.com/yahoo/react-intl)-based. To translate the component, please pass the
`messages` property, having the following format:

```js
{
    'react-room-occupancy-input': {
        children: 'Children',
        childrenAge: '{children, plural, =1 {Child age} other {Children ages}}',
        adults: 'Adults'
    }
}
```

`react-intl` allows using `react-room-occupancy-input` uniformly in bigger applications, and passing
all the namespaced translations, from the root, down the React components hierarchy, --
automatically, with the help of `IntlMixin`.

Please note, that `react-intl` depends on global `Intl` object. You can polyfill it with
[intl](https://github.com/andyearnshaw/Intl.js) package:

```js
if (!global.Intl) {
    require('intl');
}
```
