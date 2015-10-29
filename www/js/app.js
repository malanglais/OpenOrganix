// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


//var viewSt= '';
//var teamNum = 0;
var orderCategories = ['Pré-Novice', 'Novice', 'Atome', 'Pee-Wee', 'Bantam', 'Midget', 'Junior', 'Autre'];
var orderLevels = ['AAA', 'AA', 'BB', 'CC', 'A', 'B', 'C', 'F'];
//var teams = ['1', '2', '3', '4', '5'];

angular.module('open_schedule', ['ionic']) 

// home page controller that loads the page... may be this can be put in as a service later on
/* TODO : put in service */

.controller('mainController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  /*var req = {
     method: 'POST',
     url: 'http://huskyco.com/php/newevents.php',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
     },
     data: { eventType: 'EVENT_PRACTICES' } //EVENT_GAMES <-- this is the param to get the games 
  }
  
  var promise = $http(req).then(function(response) {
    self.huskyModel.setModel(response.data, 'Pratique');
    self.huskyModel.setCategoryList();
  }); */
  
  var fData = new FormData();
  var vSt ="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UtZGUtTGF1em9uKTogQ2VudHJlIEJydW5vIFZlcnJldCwgZ2xhY2UgT2x5bXBpcXVlLEzDqXZpcyAoU2FpbnQtUm9tdWFsZCk6IEFyw6luYSBkZSBTdC1Sb211YWxkOUzDqXZpcyAoU2FpbnQtUm9tdWFsZCk6IENvbXBsZXhlIDIgZ2xhY2VzIEhvbmNvLCBnbGFjZSAjMTlMw6l2aXMgKFNhaW50LVJvbXVhbGQpOiBDb21wbGV4ZSAyIGdsYWNlcyBIb25jbywgZ2xhY2UgIzIyTMOpdmlzIChTdC1FdGllbm5lLWRlLUxhdXpvbik6IENlbnRyZSBCcnVubyBWZXJyZXQfTMOpdmlzIChTdC1OaWNvbGFzKTogQXLDqW5hIEJTUiFMb3JldHRldmlsbGU6IFBhdmlsbG9uIGRlcyBTcG9ydHMeTW9udG1hZ255OiBBcsOpbmEgZGUgTW9udG1hZ255KlBvbnQtUm91Z2U6IENlbnRyZS1Sw6ljcsOpYXRpZiBKb8OpLUp1bmVhdRVRdcOpYmVjOiBBcsOpbmEgQmFyZHkYUXXDqWJlYzogQXLDqW5hIER1YmVyZ2VyGlF1w6liZWM6IEFyw6luYSBMZXMgU2F1bGVzLFF1w6liZWM6IEFyw6luYSBOZXVmY2jDonRlbCAoTWljaGVsIExhYmFkaWUpF1F1w6liZWM6IENvbGlzw6llIFBlcHNpK1NhaW50LUFnYXBpdDogQ2VudHJlIFNwb3J0aWYgRy4tSC4gVmVybWV0dGVHU2FpbnQtQW5zZWxtZSAvIEhvbmZsZXVyIGRlIEJlbGxlY2hhc3NlOiBDLiBTLiBCZWxsZWNoYXNzZSAvIERvcmNoZXN0ZXIxU2FpbnQtQXVndXN0aW46IENlbnRyZSBTcG9ydGlmIEFjdGktVml0YWwgR2xhY2UgQTFTYWludC1BdWd1c3RpbjogQ2VudHJlIFNwb3J0aWYgQWN0aS1WaXRhbCBHbGFjZSBCRVNhaW50LUF1Z3VzdGluLWRlLURlc21hdXJlczogQ29tcGxleGUgc3BvcnRpZiBkZSBTdC1BdWd1c3RpbiwgR2xhY2UgQUVTYWludC1BdWd1c3Rpbi1kZS1EZXNtYXVyZXM6IENvbXBsZXhlIHNwb3J0aWYgZGUgU3QtQXVndXN0aW4sIEdsYWNlIEIyU2FpbnQtQ2hhcmxlcyBkZSBCZWxsZWNoYXNzZTogQXLDqW5hIGRlIFN0LUNoYXJsZXMoU2FpbnQtQ8O0bWUtTGluacOocmU6IEFyw6luYSBkZSBTdC1Dw7RtZTxTYWludC1EYW1pZW4gZGUgQmVsbGVjaGFzc2U6IEFyw6luYSBSw6lnaW9uYWxlIEogRSBNw6l0aXZpZXJAU2FpbnQtw4lkb3VhcmQgZGUgRnJhbXB0b246IExvaXNpcnMgZGUgU2FpbnQtRWRvdWFyZC1kZS1GcmFtcHRvbitTYWludC1FcGhyZW0gZGUgQmVhdWNlOiBBcsOpbmEgZGUgU3QtRXBocmVtNVNhaW50LUhlbnJpLWRlLUzDqXZpczogQ2VudHJlIHLDqWNyw6lhdGlmIGRlIFN0LUhlbnJpLFNhaW50LUlzaWRvcmUgZGUgQmVhdWNlOiBBcmVuYSBkZSBTdC1Jc2lkb3JlJVNhaW50LUplYW4gUG9ydCBKb2xpOiBDZW50cmUgUm91c3NlYXUrU2FpbnQtSm9zZXBoIGRlIEJlYXVjZTogQXLDqW5hIGRlIFN0LUpvc2VwaDlTYWludC1Kb3NlcGggZGUgQ29sZXJhaW5lOiBDZW50cmUgU3BvcnRpZiBPZGlsbG9uIEdyZW5pZXI7U2FpbnQtTWFyYyBkZXMgQ2FycmnDqHJlczogQXLDqW5hIGRlIFN0LU1hcmMgZGVzIENhcnJpw6hyZXMlU2FpbnQtUGFtcGhpbGU6IEFyw6luYSBkZSBTdC1QYW1waGlsZS9TYWludC1QYXNjYWwgZGUgS2Ftb3VyYXNrYTogQXLDqW5hIGRlIFN0LVBhc2NhbC1TYWludC1Qcm9zcGVyIGRlIEJlYXVjZTogQXLDqW5hIGRlIFN0LVByb3NwZXIjU2FpbnQtUmF5bW9uZDogQXLDqW5hIGRlIFN0LVJheW1vbmQyU2FpbnRlLUNsYWlyZSBkZSBCZWxsZWNoYXNzZTogQXLDqW5hIGRlIFN0ZS1DbGFpcmVEU2FpbnRlLUNyb2l4IGRlIExvdGJpbmnDqHJlOiBDZW50cmUgU3BvcnRpZiBldCBjdWx0dXJlbCBkZSBTdGUtQ3JvaXgrU2FpbnRlLUZveTogQXLDqW5hIGRlIFN0ZS1Gb3kgKFIuQ291aWxsYXJkKSNTYWludGUtRm95OiBBcsOpbmEgUm9iZXJ0IENoZXZhbGllchdTYWludGUtRm95OiBQYXRpbm9kcm9tZSdTYWludGUtRm95OiBQRVBTIGRlIEwnVW5pdmVyc2l0w6kgTGF2YWwxU2FpbnRlLU1hcmllIGRlIEJlYXVjZTogQ2VudHJlIENhenRlbCwgRGVzamFyZGlucy1TYWludGUtTWFyaWUgZGUgQmVhdWNlOiBDZW50cmUgQ2F6dGVsLCBQb3VsaW4eU2lsbGVyeTogQXLDqW5hIEphY3F1ZXMgQ8O0dMOpIFN0LUfDqWTDqW9uOiBBcsOpbmEgTWFyY2VsLUR1dGlsHVN0LUdlb3JnZXM6IFBhbGFpcyBkZXMgU3BvcnRzKlN0LUdpbGxlczogQ2VudHJlIFLDqWNyw6lhdGlmIGRlIFN0LUdpbGxlcyVUaGV0Zm9yZC1NaW5lczogQ2VudHJlIE1hcmlvIEdvc3NlbGluL1ZhbC1Cw6lsYWlyOiBBcsOpbmEgTGVzIDIgR2xhY2VzIGRlIFZhbC1Cw6lsYWlyJVZhbGNhcnRpZXI6IEFyw6luYSBDbMOpbWVudCBCb3VsYW5nZXIYVmFuaWVyOiBBcsOpbmEgZGUgVmFuaWVyFUgBMQI2NgI2NwEyATMBNAE1ATYBNwE5AjEwAjExAjEzAjE0AjE1AjE2AjE4AjE3AjE5AjIwAjEyAjY1AjU4AjcwAjcxAjQwATgCMjECMjICMjMCMjYCMjcCMjgCMjkCMjUCMzACMzECMzICNjgCNzMCNzQCMzMCMzUCMzcCMzgCMzkCNDcCNDgCNDkCNTACNTECNTICNTQCNTUCNTYCNTcCMzQCMzYCNjkCNDECNDMCNDICNTMCNjQCNTkCNDQCNDUCNDYCNjACNjECNjICNjMUKwNIZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnFgBkAh8PD2QWAh4Fc3R5bGUFDWRpc3BsYXk6bm9uZTtkGAMFGG0kcGMkZ3ZDZWR1bGVBbHRlcm5hdGl2ZQ9nZAUNbSRwYyRndkNlZHVsZQ9nZAUObSRwYyRndkNoYW5nZXMPZ2QNP92ERrBZgYh7EAlqs5IvoWmHxQ=="
  /*fData = JSON.stringify({ __EVENTTARGET: "m$pc$cbCategories", __EVENTARGUMENT: "",
  __LASTFOCUS: "", __VIEWSTATE: vSt, __VIEWSTATEGENERATOR: "FEF83A11", m$txtLogin: "",
  m$txtPassword: "", m$pc$cbYear: "2015", m$pc$cbCategories: "11", m$pc$cbSemaine: "2015-10-26",
  m$pc$cbArenaFilter: "-1", m$hdnOnLoadMessage: "", m$hdnOnLoadMessageOptions: ""});*/
  fData.append("__EVENTTARGET", "m$pc$cbCategories");
  fData.append("__EVENTARGUMENT", "");
  fData.append("__LASTFOCUS", "");
  fData.append("__VIEWSTATE", vSt);
  fData.append("m$txtLogin", "");
  fData.append("m$txtPassword", "");
  fData.append("m$pc$cbYear", "2015");
  fData.append("m$pc$cbCategories", "11");
  fData.append("m$pc$cbSemaine", "2015-10-26");
  fData.append("m$pc$cbArenaFilter", "-1");
  fData.append("m$hdnOnLoadMessage", "");
  fData.append("m$hdnOnLoadMessageOptions", "");
  
  
  var ajaxURL = "http://lcrse.qc.ca/cedules.saison.aspx";
 
  /*$.ajax({
       type: "POST",
       data: fData,
       url: ajaxURL,
       processData: false,
       contentType: false,
       cache: false,
       dataType: "json",
  }).success(function(data,textStatus,jqXHR) {
        var t=1;
    })
    .error(function (jqXHR, textStatus, errorThrown) {
        var t=1;
    })
    .always(function () {
        var t=1;
    });*/
    
    $http({
      url: ajaxURL,
      method: "POST",
      data: fData,
      headers: { 'Content-Type': undefined },       
      transformRequest: function (data) { return data; }
      }).success(function (response) {      
      }).error(function () {  
    });

  
}])

.controller('catController',  ['huskyModel', function(huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectCategory = function(category) {
        self.huskyModel.setSelectedCategory(category);
        self.huskyModel.resetLists(3);
        self.huskyModel.setLevelList();
  };
  
  
}])
  
.controller('levelController',  ['huskyModel', function(huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  
  self.selectLevel = function(level) {
        self.huskyModel.setSelectedLevel(level);
        self.huskyModel.resetLists(2);
        self.huskyModel.setTeamList();
  };
  
}])

.controller('teamController', ['huskyModel', function(huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectTeam = function(team) {
        self.huskyModel.setSelectedTeam(team);
        self.huskyModel.resetLists(1);
        self.huskyModel.setGameList();
  };
  
}])

.controller('gameController', ['huskyModel', function(huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectTeam = function(team) {
        self.huskyModel.setSelectedTeam(team);
  };
  

}])


.service('huskyModel', [function () {
  var self = this;
  
  self.isGameSelected = false;
  self.isTeamSelected = false;
  self.isLevelSelected = false;
  self.isCategorySelected = false;
  
  self.resetLists = function(num) {
    if (num >= 1) {
      self.gameList = [];               // Assuming this is the only reference
      self.selectedGame = null;         // reset is selected to null
      self.isTeamSelected = false;
    }
    if (num >= 2) {
      self.teamList = [];               // Assuming this is the only reference
      self.selectedTeam = null;         // reset is selected to null
      self.isLevelSelected = false;
    }
    if (num >= 3) {
      self.levelList = [];
      self.selectedLevel = null;
      self.isCategorySelected = false;
    }
    if (num >= 4) {
      self.categoryList = [];
      self.selectedCategory = null;
      
    }
               
  }
  
  self.gameModel = [];
  self.setModel = function(dm, et) {
    self.gameModel = getModel(dm, et);
  };
  
  self.categoryList = [];
  self.setCategoryList = function() {
    angular.forEach(self.gameModel, function(category) {
      self.categoryList.push(category.category);
      sortIt(self.categoryList, orderCategories);
    });
  };
  
  self.levelList = [];                      // make sure it's ordered. These are the levels AA first
  self.setLevelList = function() {
    angular.forEach(self.selectedCategory.levels, function(level) {
      self.levelList.push(level.level);
      sortIt(self.levelList, orderLevels);
      self.isCategorySelected = true;
    });
  };

  self.teamList = [];
  self.setTeamList = function() {
    angular.forEach(self.selectedLevel.teams, function(team) {
        self.teamList.push(team.team);
        self.isLevelSelected = true;
    });
  };
  
  self.gameList = [];                       // This structure should respect the data model
  self.setGameList = function() {
    angular.forEach(self.selectedTeam.dates, function(date) {
      self.gameList.push(date);
      self.isTeamSelected = true;
    });
  };


  // this has to return the array... not the name
  self.selectedCategory = null;
  self.setSelectedCategory = function(cat) {
    angular.forEach(self.gameModel, function(category) {
        if (category.category == cat) {
          self.selectedCategory = category;
        }
    });
  };

  self.selectedLevel = null;
  self.setSelectedLevel = function(lvl) {
    angular.forEach(self.selectedCategory.levels, function(level) {
        if (level.level == lvl) {
          self.selectedLevel = level;
        }
    });
  };
  
  self.selectedTeam = null;
  self.setSelectedTeam = function(tm) {
    angular.forEach(self.selectedLevel.teams, function(team) {
        if (team.team == tm) {
          self.selectedTeam = team;
        }
    });
  };
  
}])


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
    /*.state('app', {
      abstract: true,
      templateUrl: 'templates/main.html'
    }) */
    
    .state('home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'templates/categories.html'
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


function getDay(trStr) {
  return trStr.slice(trStr.indexOf('5\'>')+3, trStr.indexOf('</td>'));
}

function getModel(htmlStr, eventType) {
  var categoriesDM = [];
  var found = false;
  var day = '';
  var newGame;
  var newDate;
  var newTeam;
  var newLevel;
  var newCategory;
  
  var trList = htmlStr.split("<tr");
  
  for (var i = 2; i < trList.length; i++) {                                           // loop through teams to single them out and create the vm
    found = false;                                            
    if (trList[i].indexOf('eventListDayRowHeader') > 0) {                             // modify this to get the date
      day = getDay(trList[i]);                                                        // get the displayed day
    } else {
      var nEntry = parseTr(trList[i], day);                                       // parsed data (cat, lvl, tm, d, t, loc)
      newGame = new dmGame(nEntry.time, eventType, nEntry.loction);             // add game regardless
      if (categoriesDM.length ==0) {                                                    // array is empty
        newDate = new dmDate(nEntry.date, newGame);
        newTeam = new dmTeams(nEntry.team, newDate);
        newLevel = new dmLevels(nEntry.level, newTeam);
        newCategory = new dmCategories(nEntry.category, newLevel);
        categoriesDM.push(newCategory);
      } else {            // not found, we're going to search
        angular.forEach(categoriesDM, function(category) {
          if (category.category == nEntry.category) {
            angular.forEach(category.levels, function(level) {
              if (level.level == nEntry.level) {
                angular.forEach(level.teams, function(team) {                     // Adding a class date to check. This date class contains game
                  if (team.team == nEntry.team) {
                    angular.forEach(team.dates, function(date) {                     // Adding a class date to check. This date class contains game
                      if (date.date == nEntry.team) {
                        date.games.push(newGame);
                        found = true;
                      }
                    });
                    if (!found) {                                       // date not found
                      newDate = new dmDate(nEntry.date, newGame);
                      team.dates.push(newDate);
                    }
                    found = true;
                  }
                });
                if (!found) {                                       // team not found
                  newDate = new dmDate(nEntry.date, newGame);
                  newTeam = new dmTeams(nEntry.team, newDate);
                  level.teams.push(newTeam);
                }
                found = true;
              }
            });
            if (!found) {
              newDate = new dmDate(nEntry.date, newGame);
              newTeam = new dmTeams(nEntry.team, newDate);
              newLevel = new dmLevels(nEntry.level, newTeam);
              category.levels.push(newLevel);
            }
            found = true;
          }
        });
        if (!found) {
              newDate = new dmDate(nEntry.date, newGame);
              newTeam = new dmTeams(nEntry.team, newDate);
              newLevel = new dmLevels(nEntry.level, newTeam);
              newCategory = new dmCategories(nEntry.category, newLevel);
              categoriesDM.push(newCategory);
        }
      }
    }
  }
  return categoriesDM;
}

function dmCategories(cat, lvl) {
  this.category = cat;
  this.levels = [];
  this.levels.push(lvl);
}

function dmLevels(lvl,tm) {
  this.level = lvl;
  this.teams = [];
  this.teams.push(tm);
}

function dmTeams(tm, gd) {
  this.team = tm;
  this.dates = [];
  this.dates.push(gd);
}

function dmDate (dt, gm) {
  this.date = dt;
  this.games = [];
  this.games.push(gm);
}

function dmGame(tm, pg, loc) {
    this.time = tm;
    this.type = pg;
    this.loction = loc; 
}

function dmEntry(cat, lvl, tm, d, t, pg, loc) {
  this.category = cat;
  this.level = lvl;
  this.team = tm;
  this.date = d;
  this.time = t;
  this.type = pg;
  this.loction = loc;
}

function parseTr(trStr, day) { // returns parsed string
  var trs = trStr.split('<td>');
  var time = trs[1].slice(0, trs[1].indexOf(' '));
  var category = trs[2].slice(0, trs[2].indexOf(' '));
  var level = trs[2].slice(trs[2].indexOf(' ')+1, trs[2].indexOf('</td>'));
  var team = trs[3].slice(trs[3].indexOf(' ')+1, trs[3].indexOf('</td>'));
  var loction = trs[4].slice(trs[4].indexOf('blank\'>')+7, trs[4].indexOf('</a>'));
  var newEntry = new dmEntry(category, level, team, day, time, '',loction);
  return newEntry;
} 

function sortIt(lvls, ord) {    // receiving a collection
  var indexFilled = 0;
  angular.forEach(ord, function(ordItem) {
    if (lvls.indexOf(ordItem) != -1) {
      lvls.move(lvls.indexOf(ordItem), indexFilled);
      indexFilled++;
    }
  })
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
};