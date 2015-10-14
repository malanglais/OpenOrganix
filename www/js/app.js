// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var cats;
var cookie;
var viewSt= '';

angular.module('open_schedule', ['ionic']) 

/*app.controller('TodoCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];
});*/


.controller('catCtrl', function($scope, $http, $cookies, $window, viewSt) {
  
  $http.get("http://lcrse.qc.ca/cedules.saison.aspx")
    .then(function(response) {
      $scope.categories = getArray(response.data);
      viewSt = getVIEWSTATE(response.data);
    });
})

.controller('teamCtrl', function($scope, $http, $cookies, $window, viewSt) {
  
  var dataDetails = { m$pc$cbCategories : 4, __VIEWSTATE : viewSt};  
  $http({
    url: "http://lcrse.qc.ca/cedules.saison.aspx",
    method: 'Post',
    data: dataDetails
  }).then(function (result) {
          var p=1;
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

  $httpProvider.defaults.withCredentials = true;
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
      url: '/home',
      views: {
        home: {
          templateUrl: 'home.html'
        }
      }
    })
    
    .state('help', {
      url: '/help',
      views: {
        help: {
          templateUrl: 'help.html'
        }
      }
    })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
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

function getVIEWSTATE(htmlstr) {
  var index;
  var wholeTxt = htmlstr.split('<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="');
  var halfTxt = wholeTxt[1].split('/>');
  var result = halfTxt[0];
  return result;
}
