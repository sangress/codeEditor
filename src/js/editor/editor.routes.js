'use strict';

angular.module('editor').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'js/editor/editor.view.html',
                controller: 'EditorController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
