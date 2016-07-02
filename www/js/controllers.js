angular.module('app.controllers', [])
  
.controller('menuCtrl', function($scope, I4MIMidataService, I4MIHealthKitService, I4MIDefaultsService) {
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

.controller('settingsCtrl', function($scope, I4MIMidataService, I4MIHealthKitService, I4MISettingsService, I4MIDefaultsService, I4MIMappingService) {
	$scope.user = {
		server: 'https://test.midata.coop:9000'
	}
	$scope.loggedIn = I4MIMidataService.loggedIn();
	
	var check = function() {
		if ( I4MIHealthKitService.available() ) {
			var now = new Date();
			var last = new Date($scope.sync.last);
			I4MIHealthKitService.querySampleType({
				'startDate': last,
				'endDate': now,
				'sampleType': 'HKQuantityTypeIdentifierBodyMass',
				'unit': 'kg'
		    }).then(function(records){
		    	$scope.sync.last = now;
		    	I4MISettingsService.set('sync',$scope.sync);
		    	var mrecords = I4MIMappingService.map("healthkit","midata",records);
		    	I4MIMidataService.add(mrecords);
    		},function(){});
    	}
	}
	var setup = function() {
		if ( $scope.sync.active ) {
			check();
			if ( $scope.sync.interval !== '-1' ) {
				if ( typeof $scope.sync.ref !== 'undefined' ) {
					window.clearInterval($scope.sync.ref);
				}
				$scope.sync.ref = window.setInterval(function(){
					check();
				}, $scope.sync.interval*1);
			}
		} else {
			if ( typeof $scope.sync.ref !== 'undefined' ) {
				window.clearInterval($scope.sync.ref);
			}
		}
	}
	
	$scope.sync = I4MISettingsService.get('sync');
	if ( typeof $scope.sync.interval === 'undefined' ) {
		$scope.sync.interval = "60000";
	}
	if ( typeof $scope.sync.last === 'undefined' ) {
		$scope.sync.last = new Date("2007");
	}
	setup();
	
	$scope.toggleSync = function(){
		I4MISettingsService.set('sync',$scope.sync);
		setup();
	}
	$scope.resetSync = function() {
		$scope.sync.last = new Date("2007");
		I4MISettingsService.set('sync',$scope.sync);
		setup();
	}
})
   
.controller('midataChartCtrl', function($scope, I4MIMidataService) {
	$scope.openCharts = function() {
		if ( navigator && navigator.app ) {
			navigator.app.loadUrl('http://krispo.github.io/angular-nvd3', { openExternal:true });
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

.controller('healthkitCtrl', function($scope, I4MIMidataService, I4MIHealthKitService) {
	$scope.update = function(data) {
		/* do something with the healthkit data */
	}
})

.controller('ccdaCtrl', function($scope) {
	$scope.url = "https://raw.githubusercontent.com/chb/sample_ccdas/master/HL7%20Samples/CCD.sample.xml";
	$scope.record;
	$scope.callback = function(record) {
		// do something
	}
	$scope.action = function(record) {
		record = null;
	}
});
    