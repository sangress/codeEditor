'use strict';

angular.module('editor').controller('EditorController', function ($scope, $timeout) {
    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'javascript'
    };

    $scope.file = "var nodeWebkit = 'Awesome!';\n";

    $scope.save = function () {
        $timeout(function () {
            var fs = require('fs');
            fs.writeFile("/home/sangress/shai.js", $scope.file, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
        });
    };

    $scope.$on('save-file', function () {
        $scope.save();
    });


});
