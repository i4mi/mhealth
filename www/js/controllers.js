angular.module('app.controllers', [])
  
.controller('menuCtrl', function($scope, I4MIMidataService, I4MIHealthKitService, I4MIDefaultsService) {
	$scope.openLogin = function() {
		I4MIMidataService.login();
	}
	
	$scope.openImport = function() {
		I4MIHealthKitService.doWhenAvailable(function(){
			I4MIHealthKitService.import([
				
			]/*,{ options... }*/);
		},function(message){console.warn(message)});
	}
	
	var entry = {};
	
	var fields = [
		{
			key: 'weight',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'Weight [kg]',
				placeholder: 80
			}
		}
	]
	
	var scheme = {
		weight: {
			$scheme: I4MIDefaultsService.get('I4MISchemes.weight.midata'),
			$set: "data.valueQuantity.value"
		}
	}
	
	$scope.newEntry = function() {
		I4MIMidataService.newEntry(entry, fields, scheme, {/* options */});
	}
})

.controller('settingsCtrl', function($scope, I4MIMidataService, I4MIHealthKitService, I4MIDefaultsService, I4MIMappingService) {
	
	$scope.user = {
		server: 'https://test.midata.coop:9000'
	}
	
	$scope.loggedIn = I4MIMidataService.loggedIn();
	
	//$scope.syncActive = I4MIHealthKitService.syncActive();
})
   
.controller('midataChartCtrl', function($scope, I4MIMidataService) {
	
	$scope.openCharts = function() {
		if ( navigator && navigator.app ) {
			navigator.app.loadUrl('http://krispo.github.io/angular-nvd3', { openExternal:true });
			console.log('http://krispo.github.io/angular-nvd3');
		} else {
			window.open('http://krispo.github.io/angular-nvd3','_system');
		}
	}
	
	if ( I4MIMidataService.loggedIn() ) {
		I4MIMidataService.search().then(function(response){
			$scope.records = response.data;
		},function(reason){
			
		});
	} else {
		I4MIMidataService.login();
	}
})

.controller('midataListCtrl', function($scope, I4MIMidataService) {
	
	if ( I4MIMidataService.loggedIn() ) {
		I4MIMidataService.search().then(function(response){
			$scope.records = response.data;
		},function(reason){
			
		});
	} else {
		I4MIMidataService.login();
	}
})

.controller('healthkitCtrl', function($scope, I4MIMidataService) {
	
})

.controller('cdaCtrl', function($scope) {
	
});
    