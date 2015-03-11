'use strict';

angular.module('editor').controller('EditorController', function ($scope, $timeout, fsService) {
    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'javascript'
    };

    $scope.file = "var nodeWebkit = 'Awesome!';\n";

    $scope.save = function () {
        $timeout(function () {
            fsService.writeFile("/home/sangress/shai.js", $scope.file, function(err) {
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
