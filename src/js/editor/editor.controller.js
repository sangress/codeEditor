'use strict';

angular.module('editor').controller('EditorController', function ($scope, $timeout, fsService) {
    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        mode: 'javascript'
    };

    $scope.file = {};
    $scope.file.content = "var nodeWebkit = 'Awesome!';\n";

    $scope.save = function () {
        $timeout(function () {
            if ($scope.file.path) {
                fsService.writeFile($scope.file.path, $scope.file.content, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
            }
        });
    };

    $scope.$on('save-file', function () {
        $scope.save();
    });

    $scope.$on('load-file', function (e, data) {
        if (data.path) {
            $timeout(function () {
                $scope.file.path = data.path;
                $scope.file.content = fsService.readFileSync(data.path).toString();
            });

        }

    });


});
