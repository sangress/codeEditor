'use strict';

angular.module('editor').directive('nav', ['$timeout', 'guiService',
    function ($timeout, guiService) {
        return {
            templateUrl: 'js/common/directives/nav/_nav.html',
            restrict: 'E',
            controller: function ($scope) {

            },
            link: function postLink(scope, element, attrs) {
                // menu directive logic


                scope.loadFile = function () {
                    $timeout(function () {
                        var fileInput = document.getElementById('selectFile');
                        fileInput.addEventListener('change', function (e) {
                            console.log(this.value);
                            scope.$broadcast('load-file', {path: this.value});
                        }, false);

                        fileInput.click();
                    });
                };

                scope.save = function () {
                    scope.$broadcast('save-file');
                };

                scope.saveAs = function () {
                    console.log('Save as...');
                };

                scope.exit = function () {
                    console.log('exit..');
                    guiService.App.quit();
                };

                scope.changeLanguage = function () {
                    console.log('language');
                };

                scope.navs = {
                    File: [
                        {label: 'Load...', action: scope.loadFile},
                        {label: 'Save', action: scope.save},
                        //{label: 'Save As...', action: scope.saveAs},
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

