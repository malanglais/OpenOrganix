// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var cats;

angular.module('open_schedule', ['ionic']) 

/*app.controller('TodoCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];
});*/


.controller('teamCtrl', function($scope, $http, $window) {
  /*$http.get("http://lcrse.qc.ca/cedules.saison.aspx")
    .success(function(response) {
      $scope.categories = getArray(response);
      var b =1;
    })
    .error(function(response) {
      $window.alert("d'oh!"); 
    }); */
    
    $http.post('http://lcrse.qc.ca/cedules.saison.aspx',
    {
        headers: {
          'Content-type': 'multipart/form-data'
        },
        data: {
            __EVENTTARGET: "m$pc$cbCategories",
            m$pc$cbYear:"2015",
            m$pc$cbCategories: "4",
            m$pc$cbEquipes: "0",	
            m$pc$cbSemaine: "2015-10-5",
            m$pc$cbArenaFilter: "-1"
        }
    })
    .success(function(response) {
      $scope.categories = getArray(response);
      var b =1;
    })
    .error(function(response) {
      $window.alert("d'oh!"); 
    });
    
})

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

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
}); 

function getArray(htmlStr) {
  var index;
  var wholeList = htmlStr.split("<select");
  var cleanList = wholeList[2].slice(wholeList[2].indexOf("<option value"),wholeList[2].lastIndexOf("<option value")).split("<option value");
  for (index = 1; index < cleanList.length; index++)
  {
    cleanList[index] = cleanList[index].slice(cleanList[index].indexOf('>')+1, cleanList[index].indexOf('<'))
  }
  cleanList.splice(0, 1);
  return cleanList;
  
};
