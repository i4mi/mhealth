angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html'
      }
    }
  })
  
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })
  
  .state('app.healthkit', {
    url: '/healthkit',
    views: {
      'menuContent': {
        templateUrl: 'templates/healthkit.html',
        controller: 'healthkitCtrl'
      }
    }
  })
  
  .state('app.ccda', {
    url: '/ccda',
    views: {
      'menuContent': {
        templateUrl: 'templates/ccda.html',
        controller: 'ccdaCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
    .state('app.midata', {
      url: '/midata',
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/midata-tabs.html'
        }
      }
    })
  
    // Each tab has its own nav history stack:
  
    .state('app.midata.list', {
      cache: false,
      url: '/list',
      views: {
        'midata-list': {
          templateUrl: 'templates/midata-list.html',
          controller: 'midataListCtrl'
        }
      }
    })

  .state('app.midata.chart', {
    cache: false,
    url: '/chart',
    views: {
      'midata-chart': {
        templateUrl: 'templates/midata-chart.html',
        controller: 'midataChartCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');

});