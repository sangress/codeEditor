'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');

		// register the interceptor as a service


		//$httpProvider.interceptors.push('myHttpInterceptor');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
