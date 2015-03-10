'use strict';

angular.module('editor').directive('nav', [
    function () {
        return {
            templateUrl: 'js/common/directives/nav/_nav.html',
            restrict: 'E',
            controller: function ($scope) {

            },
            link: function postLink(scope, element, attrs) {
                // menu directive logic


                scope.loadFile = function () {
                    console.log('Load file...');
                };

                scope.save = function () {
                    console.log('save');
                    scope.$broadcast('save-file');
                };

                scope.saveAs = function () {
                    console.log('Save as...');
                };

                scope.exit = function () {
                    console.log('exit..');
                };

                scope.changeLanguage = function () {
                    console.log('language');
                };

                scope.navs = {
                    File: [
                        {label: 'Load...', action: scope.loadFile},
                        {label: 'Save', action: scope.save},
                        {label: 'Save As...', action: scope.saveAs},
                        {label: '', divider: true},
                        {label: 'Exit', action: scope.exit}
                    ],

                    Language: [
                        {label: 'javascript', action: scope.changeLanguage}
                    ]
                };
            }
        };
    }
]);

