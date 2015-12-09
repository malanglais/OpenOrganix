// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('open_schedule', ['ionic', 'ngCordova']) 


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
      StatusBar.styleLightContent();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  
  $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
  $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https:/
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    /*.state('app', {
      abstract: true,
      templateUrl: 'templates/main.html'
    }) */
    
    .state('home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'templates/clubs.html'
        }
      }
    })
    
    .state('levels', {
      url: '/levels',
      views: {
        'home': {
          templateUrl: 'templates/levels.html'
        }
      }
    })
    
    .state('teams', {
      url: '/teams',
      views: {
        'home': {
          templateUrl: 'templates/teams.html'
        }
      }
    })
    
    .state('games', {
      url: '/games',
      views: {
        'home': {
          templateUrl: 'templates/games.html'
        }
      }
    })
    
    .state('help', {
      url: '/help',
      views: {
        'help': {
          templateUrl: 'templates/help.html'
        }
      }
    })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
}); 

