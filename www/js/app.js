// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  
  .state('tab.champions', {
    url: '/champions',
    views: {
      'tab-champions': {
        templateUrl: 'templates/tab-champions.html',
        controller: 'ChampsCtrl',
        resolve: {
          champData: function(Champions){
            return  Champions.getChampTags();
          }
        }
      }
    }
  })

  .state('tab.champs-detail', {
    url: '/champion/:champId',
      views: {
        'tab-champions': {
          templateUrl: 'templates/champ-detail.html',
          controller: 'ChampDetailCtrl',
        }
      }
  })
  
  .state('tab.items', {
    url: '/items',
    views: {
      'tab-items': {
        templateUrl: 'templates/tab-items.html',
        controller: 'ItemsCtrl',
        resolve: {
          ItemData: function(Items){
           return Items.getItems();
          }
        }
      }
    }
  })
  
  .state('tab.items-detail',{
    url:'/item/:itemId',
    views: {
      'tab-items': {
        templateUrl: 'templates/item-detail.html',
        controller: 'ItemsDetailCtrl'
      }
    }
  })

  .state('tab.champ-calc', {
      url: '/champ-calc',
      views: {
        'tab-champ-calc': {
          templateUrl: 'templates/tab-champ-calc.html',
          controller: ''
        }
      }
  })
    
  .state('tab.match-info', {
    url: '/match-info',      
    views: {
      'tab-match-info': {
        templateUrl: 'templates/tab-match-info.html',
        controller: ''
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/champions');

});
