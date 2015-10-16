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
      
      for (var i = 0; i < catCnt ; i++) {
        if (catIonElem.children().eq(i).html().indexOf(innTxt) != -1)
        {
          teamNum = i+1;
        }
      }
    };
})

.controller('teamCtrl', function($scope, $http, $window) {
  sendData();
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

function sendData() {
  var xml = new XMLHttpRequest();
  var args      = { url:"http://lcrse.qc.ca/cedules.saison.aspx",method:"POST",data:{ '__EVENTTARGET':'m$pc$cbCategories', '__EVENTARGUMENT':'', 'm$pc$cbYear':'2015', 'm$pc$cbCategories':'4', 'm$pc$cbSemaine':'2015-10-12', 'm$pc$cbArenaFilter': '-1'}, callback:function(){}}
  var multipart ="";
  var context;

  xml.open(args.method,args.url,true);

    if(args.method.search(/post/i)!=-1){
      var boundary=Math.random().toString().substr(2);
      xml.setRequestHeader("content-type",
                  "multipart/form-data; charset=utf-8; boundary=" + boundary);
      for(var key in args.data){
        multipart += "-----------------------------" + boundary
                   + "\r\nContent-Disposition: form-data; name=\"" + key
                   + "\r\n\r\n" + args.data[key] + "\r\n";
      }
      multipart += "-----------------------------"+boundary+"--\r\n";
    }

    xml.onreadystatechange=function(){
      try{
        if(xml.readyState==4){
          context.txt=xml.responseText;
          context.xml=xml.responseXML;
          args.callback();
        }
      }
      catch(e){}
    }

    xml.send(multipart);
}