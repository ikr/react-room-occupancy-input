(function () {
    'use strict';

    module.exports = function () {
        return {
            en: {
                'react-room-occupancy-input': {
                    children: 'Children',
                    childrenAge: '{children, plural, =1 {Child age} other {Children ages}}',
                    adults: 'Adults',
                    childAgeWarning: 'A child\'s age should be from 0 to 11 years'
                }
            },

            de: {
                'react-room-occupancy-input': {
                    children: 'Kinder',
                    childrenAge: '{children, plural, =1 {Kind Alter} other {Alter der Kinder}}',
                    adults: 'Erwachsene',
                    childAgeWarning: 'Alter der Kinder sollte zwischen 0 und 11 Jahren liegen'
                }
            },
            
            zh: {
                'react-room-occupancy-input': {
                    'children': '儿童',
                    'childrenAge': '儿童年龄',
                    'adults': '成人',
                    'childAgeWarning': '儿童（0-12岁，不包括12岁）'
                }
            }
        };
    };
}());
