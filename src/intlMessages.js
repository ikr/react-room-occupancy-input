(function () {
    'use strict';

    module.exports = function () {
        return {
            en: {
                'react-room-occupancy-input': {
                    children: 'Children',
                    childrenAge: '{children, plural, =1 {Child age} other {Children ages}}',
                    adults: 'Adults',
                    childAgeWarning: 'A child\'s age should be from 0 to 12 years'
                }
            },

            de: {
                'react-room-occupancy-input': {
                    children: 'Kinder',
                    childrenAge: '{children, plural, =1 {Kind Alter} other {Alter der Kinder}}',
                    adults: 'Erwachsene',
                    childAgeWarning: 'Alter der Kinder sollte zwischen 0 und 12 Jahren liegen'
                }
            }
        };
    };
}());
