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

angular.module('core').directive('fileBrowser', ['FileBrowser',
    function (FileBrowser) {
        return {
            restrict: 'EA',
            templateUrl: 'modules/core/directives/templates/_file-browser.html',
            controller: 'FileBrowserController'
        };
    }
]);
