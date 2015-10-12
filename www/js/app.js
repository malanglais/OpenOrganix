// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var cats;
var cookie;

angular.module('open_schedule', ['ionic', 'ngCookies']) 

/*app.controller('TodoCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eat mushrooms' },
    { title: 'Get high enough to grab the flag' },
    { title: 'Find the Princess' }
  ];
});*/


.controller('teamCtrl', function($scope, $http, $cookies, $window) {
    
  $http.get("http://lcrse.qc.ca/cedules.saison.aspx")
    .success(function(response) {
      $scope.categories = getArray(response);
      
      cookie = $cookies.session;
      var b =1;
    })
    .error(function(response) {
      $window.alert("d'oh!"); 
    });
    
    $http.post('http://lcrse.qc.ca/cedules.saison.aspx',
    {
        headers: {
          'Content-type': 'multipart/form-data;boundary=---------------------------455803651565016223847951505',
          
        },
        data: {
            '__EVENTTARGET': 'm$pc$cbCategories',
            '__EVENTARGUMENT':'',	
            '__LASTFOCUS':'',
            '__VIEWSTATEGENERATOR': 'FEF83A11',
            '__VIEWSTATE' : '/wEPDwUKMTcwOTc0MjgyNQ8WCB4RQ2hhbmdlc1NvcnRDb2x1bW4FBlAuZGF0ZR4UQ2hhbmdlc1NvcnREaXJlY3Rpb24FA0FTQx4TQ2VkdWxlU29ydERpcmVjdGlvbgUDQVNDHhBDZWR1bGVTb3J0Q29sdW1uBQZQLmRhdGUWAmYPZBYCAgEPZBYIZg8PFgIeBFRleHQFB0hvcmFpcmVkZAIFDxYCHgVjbGFzcwUGYWN0aXZlZAIKD2QWBgIBDw8WBB4IQ3NzQ2xhc3MFBmhpZGRlbh4EXyFTQgICZBYEAgEPD2QWAh4LcGxhY2Vob2xkZXIFDzwgSWRlbnRpZmlhbnQgPmQCAw8PZBYCHwgFEDwgTW90IGRlIHBhc3NlID5kAgMPDxYEHwZlHwcCAmQWAgIBDw8WAh8EBRFBY2PDqHMgc8OpY3VyaXPDqWRkAgUPDxYEHwYFBmhpZGRlbh8HAgJkZAILDxYCHwUFB2NvbnRlbnQWAgIBD2QWCmYPFgIeB1Zpc2libGVnFgICAQ8PFgIfBAUkMjggc2VwdGVtYnJlIDIwMTUgYXUgOCBub3ZlbWJyZSAyMDE1ZGQCAQ8WAh4JaW5uZXJodG1sBQZTYWlzb25kAgIPFgIfCWhkAgMPZBYEAgEPEA8WAh4MQXV0b1Bvc3RCYWNrZ2QPFgVmAgECAgIDAgQWBRAFCTIwMTEtMjAxMgUEMjAxMWcQBQkyMDEyLTIwMTMFBDIwMTJnEAUJMjAxMy0yMDE0BQQyMDEzZxAFCTIwMTQtMjAxNQUEMjAxNGcQBQkyMDE1LTIwMTYFBDIwMTVnFgECBGQCAw8QDxYCHgdDaGVja2VkaGRkZGQCBA9kFgRmD2QWCAIBDxYCHwoFkwU8ZGl2PjxzcGFuPkFOPC9zcGFuPjogUGFydGllIGFubnVsw6llPC9kaXY+PGRpdj48c3Bhbj5DQTwvc3Bhbj46IENoYW5nZW1lbnQgZCdhcsOpbmE8L2Rpdj48ZGl2PjxzcGFuPkNDPC9zcGFuPjogQ2hhbmdlbWVudCBkZSBjw6lkdWxlPC9kaXY+PGRpdj48c3Bhbj5DRDwvc3Bhbj46IENoYW5nZW1lbnQgZGUgZGF0ZTwvZGl2PjxkaXY+PHNwYW4+Q0U8L3NwYW4+OiBDaGFuZ2VtZW50IGQnw6lxdWlwZTwvZGl2PjxkaXY+PHNwYW4+Q0c8L3NwYW4+OiBDaGFuZ2VtZW50IGRlbWFuZMOpIHBhciB1biBnb3V2ZXJuZXVyPC9kaXY+PGR…me',
            'm$pc$cbYear':'2015',
            'm$pc$cbCategories': '4',
            'm$pc$cbEquipes': '0',	
            'm$pc$cbSemaine': '2015-10-5',
            'm$pc$cbArenaFilter': '-1',
            'm$pc$gvCedule$ctl02$hdnID' : '3778',
            'm$pc$gvCedule$ctl03$hdnID' : '3779',
            'm$pc$gvCedule$ctl04$hdnID' : '3780',
            'm$pc$gvCedule$ctl05$hdnID' : '3781',
            'm$pc$gvCedule$ctl06$hdnID' : '3782',
            'm$pc$gvCedule$ctl07$hdnID' : '3783',
            'm$pc$gvCedule$ctl08$hdnID' : '3784',
            'm$pc$gvCedule$ctl09$hdnID' : '3785'

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

  $httpProvider.defaults.withCredentials = true;
  
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
