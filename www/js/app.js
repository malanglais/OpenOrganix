// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


var viewSt= '';
var teamNum = 0;

angular.module('open_schedule', ['ionic']) 

// home page controller that loads the page... may be this can be put in as a service later on
/* TODO : put in service */
.controller('catCtrl', function($scope, $http, $window) {
  
  $http.get("http://lcrse.qc.ca/cedules.saison.aspx")
    .then(function(response) {
      $scope.categories = getArray(response.data);
      viewSt = getVIEWSTATE(response.data);
      
    });
    
    // TODO : The following should be put in a directive
    $scope.getTeams=function($event, category) {
      
      var innTxt = $event.target.innerText;
      var catIonElem = angular.element($event.target).parent().parent().parent().eq(0);
      var catCnt = catIonElem.children().length;
      var teamSel = 0;
      
      for (var i = 1; i <= catCnt ; i++) {
        if (innTxt == catIonElem.children(i).eq(0).innerText)
        {
          teamSel = i;
        }
      }
      
      
      /*var el = (function(){
        var t=1;
        if ($event.target.nodeName === 'IMG') {
          return angular.element($event.target).parent(); // get li
        } else {
          return angular.element($event.target);          // is li
        } 
      })(); */
    };
})

.controller('teamCtrl', function($scope, $http, $window) {
  
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

  //$httpProvider.defaults.withCredentials = true;
  
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
          templateUrl: 'templates/home.html'
        }
      }
    })
    
    .state('teams', {
      url: '/teams',
      views: {
        teams: {
          templateUrl: 'templates/teams.html'
        }
      }
    })
    
    .state('help', {
      url: '/help',
      views: {
        help: {
          templateUrl: 'templates/help.html'
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
