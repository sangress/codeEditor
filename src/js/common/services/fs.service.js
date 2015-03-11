'use strict';

angular.module('codeEditor').factory('fsService', [
    function () {
        return require('fs');
    }
]);
