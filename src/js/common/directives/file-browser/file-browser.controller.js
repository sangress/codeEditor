/*------------------------------------------------------------------------------
* Project   		 : Vtool
 * Author   		 : Shai Angress
 *-------------------------------------------------------------------------------
 *====================================================================
 *   	 COPYRIGHT (C) 2014 Vtool Ltd
 * This software and the associated documentations are the sole proprietary to
 * Vtool Ltd and are confidential.
 * Your use or disclosure of this software is subject to the terms and
 * conditions of the written agreement and consents between you, or your company,
 * and Vtool Ltd. In any case of publications, you must add the following notice:
 *   	 ALL RIGHTS RESERVED
 * The entire notice above must be reproduced on all authorized copies.
 *====================================================================*/

'use strict';

angular.module('core').controller('FileBrowserController', ['$scope', '$rootScope', 'FileBrowser', '$document',
    function ($scope, $rootScope, FileBrowser, $document) {
        var overlay = angular.element('.overlay');
        var userHomePath = '~/';
        var keyEvents = {home: null, end: null};
        $scope.fileListTree = {};
        $scope.currentPath = userHomePath;
        $scope.selectedPath = '';
        $scope.currFile = null;
        $scope.history = [$scope.currentPath];
        $scope.fileList = [];
        $scope.showFileBrowser = false;
        $scope.filters = [];
        $scope.isFolderSelection = true;
        $scope.labels = {};
        $scope.labels.selectTitle = 'Select Directory';
        $scope.labels.selectedTitle = 'Selected Directory Name';
        var target = {scope: null, propName: ''};

        // START: autocomplete
        var $selectedDirectory = $("#selectedDirectory");
        
        $scope.$watch('fileList', function (newList) {
            var autocompleteList = FileBrowser.createAutocompleteList(newList);
            $selectedDirectory.autocomplete({
                source: autocompleteList,
                focus: function( event, ui ) {
                    return false;
                },
                select: function( event, ui ) {
                    $scope.openFile(ui.item);
                    $selectedDirectory.val('');
                    return false;
                }
            })
            .autocomplete( "instance" )._renderItem = function( ul, item ) {
                ul.addClass('file-browser');
                // highlight
                var re = new RegExp( "(" + this.term + ")", "gi" ),
                    template = "<i>$1</i>",
                    label = item.label.replace( re, template );
                // build list item
                return $("<li>").data("item.autocomplete", item).append('<span>' + label + '</span><span class="small">' + item.path + '</span>').appendTo(ul);
            }

        });
        // END: autocomplete


        function refreshScroll(e) {
            var fileBrowserTbody = $('#file-browser-tbody');
            fileBrowserTbody.scrollTop(0);
            fileBrowserTbody.perfectScrollbar('update');
        }


        function scrollToFile(e) {
            // TODO: work in progress, find folder by key value
            var o = _.chain($scope.fileList)
                .filter(function(file) {
                    // TODO: catch word
                    return file.fileName.toLowerCase().indexOf(e.key) == 0;
                })
                .first().value();

            if (angular.isDefined(o)) {
                // TODO: scroll doesn't scroll good
                $('#file-browser-tbody').scrollTop(angular.element('[data-item-id="' + o.fileName + '"]').parent().position().top);
                $('#file-browser-tbody').perfectScrollbar('update');
            }

        };

        function removeKeyboardEvents() {
            _.each(keyEvents, function (e) {
                e.clear();
            });
        }

        function setKeyboardEvents() {
            keyEvents.home = KeyboardJS.on('home', function (e) {
                var fileBrowserTbody = $('#file-browser-tbody');
                fileBrowserTbody.scrollTop(0);
            });
            keyEvents.end = KeyboardJS.on('end', function (e) {
                var fileBrowserTbody = $('#file-browser-tbody');
                fileBrowserTbody.scrollTop(fileBrowserTbody.find('table').height());
            });
        }

        $scope.goBack = function() {
            if ($scope.currentPath == userHomePath) {
                return FileBrowser.browse('/', false, $scope.filters, function(res) {
                    $scope.currentPath = $scope.selectedPath = '/';
                    $scope.fileList = res.data;
                    refreshScroll();
                });
            }
            if (! $scope.history.length)
                return;

            $scope.history.pop();
            var last = _.last($scope.history);
            $scope.currentPath = $scope.selectedPath = last;
            FileBrowser.browse(last, false, $scope.filters, function(res) {
                $scope.fileList = res.data;
                refreshScroll();
            });
        };

        $scope.openFile = function(file, deepScan) {
            if (!file.isFolder) {
                $scope.currentPath = $scope.selectedPath = file.path;
                return $scope.save();

            }
            if (!deepScan) {
                deepScan = false;
            }
            FileBrowser.browse(file.path, deepScan, $scope.filters, function(res) {
                $scope.history.push(file.path);
                $scope.currentPath = file.path;
                $scope.fileList = res.data;
                refreshScroll();
            });
        };

        $scope.gotoPath = function() {
            $scope.history.push($scope.selectedPath);
            $scope.currentPath = $scope.selectedPath;

            FileBrowser.browse($scope.selectedPath, false, $scope.filters, function(res) {
                $scope.fileList = res.data;
                refreshScroll();
            });
        };

        $scope.save = function() {
            if (target.token) {
                $rootScope.$broadcast(target.token, {value: $scope.selectedPath, propName: target.propName});
            } else {
                target.scope[target.propName] = $scope.selectedPath;
            }

            target = {scope: null, propName: ''};
            $scope.showFileBrowser = false;
            $scope.currentPath = $scope.selectedPath = _.last($scope.history);
            overlay.css('display', 'none');
            removeKeyboardEvents();
        };

        $scope.$watch('fileListTree.currentNode', function(newVal,oldVal) {
            if (newVal) {
                $scope.selectedPath = newVal.path;
            }
        }, true);

        $scope.selectPath = function (file) {
            $scope.currFile = file;
            $scope.selectedPath = file.path;
        };

        $scope.isSelectDisabled = function () {
            var isDisabled = true;
            if (!$scope.currFile)
                return isDisabled;

            if ($scope.isFolderSelection && $scope.currFile.isFolder) {
                isDisabled = false;;
            } else if (!$scope.isFolderSelection && !$scope.currFile.isFolder) {
                isDisabled = false;
            }

            return isDisabled;
        };

        $scope.getClassName = function(file) {
            var className = 'folder';
            if ( ! file.isFolder) {
                var fileTypeClass = file.fileName.split('.')[1];
                if (fileTypeClass) {
                    className += ' file file-'  + fileTypeClass;
                } else {
                    className = ' file'
                }

            }

            return className;
        };

        $scope.$on('selectFile', function(e, options) {
            target.scope = e.targetScope;
            target.propName = options.propName;
            $scope.filters = options.filters || [];
            if (options.token) {
                target.token = options.token;
            }
            if (options.deepScan) {
                //$scope.openFile({path: '/'}, options.deepScan);
            }
            if (options.isFolderSelection === false) {
                $scope.isFolderSelection = options.isFolderSelection;
                $scope.labels.selectTitle = 'Select File';
                $scope.labels.selectedTitle = 'Selected File Name';
            } else {
                $scope.isFolderSelection = true;
                $scope.labels.selectTitle = 'Select Directory';
                $scope.labels.selectedTitle = 'Selected Directory Name';
            }

            setKeyboardEvents();
            FileBrowser.browse($scope.currentPath, false, $scope.filters, function(res) {
                $scope.fileList = res.data;
                $scope.showFileBrowser = true;
                overlay.css('display', 'block');
            });

            //overlay.addClass('enter');
        });

        $scope.cancel = function () {
            removeKeyboardEvents();
            $scope.showFileBrowser = false;
            overlay.css('display', 'none');
        };

        $scope.$watch('showFileBrowser', function (newVal, oldVal) {
            if (newVal != oldVal) {
                if (newVal == true) {
                    $document.on('keydown', scrollToFile);
                } else {
                    $document.off('keydown', scrollToFile);
                }
            }

        });
    }
]);
