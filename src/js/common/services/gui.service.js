'use strict';

angular.module('codeEditor').factory('guiService', [
    function () {
        return require('nw.gui');
    }
]);

