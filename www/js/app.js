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

.controller('mainController', ['$scope', '$http', 'huskyModel', function($scope, $http, huskyModel) {
  $scope.huskyModel = huskyModel;

  /*var promise = $http.get("http://huskyco.com/php/newevents.php").then(function(response) {
    $scope.huskyModel.setModel(response.data);
    $scope.huskyModel.setCategoryList();
  });*/
  
  var req = {
     method: 'POST',
     url: 'http://huskyco.com/php/newevents.php',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
     },
     data: { eventType: 'EVENT_PRACTICES' } //EVENT_GAMES <-- this is the param to get the games 
  }
  
  var promise = $http(req).then(function(response) {
    $scope.huskyModel.setModel(response.data, 'Pratique');
    $scope.huskyModel.setCategoryList();
  });

  
}])


.controller('catController',  ['$scope', 'huskyModel', function($scope, huskyModel) {
  $scope.huskyModel = huskyModel;
  
  $scope.selectCategory = function(category) {
        $scope.huskyModel.setSelectedCategory(category);
        $scope.huskyModel.resetLists(3);
        $scope.huskyModel.setLevelList();
  };
  $scope.isCatSelected = function(category) {
      return category === $scope.huskyModel.selectedCategory;
  };
  
}])
  

.controller('levelController',  ['$scope', 'huskyModel', function($scope, huskyModel) {
  $scope.huskyModel = huskyModel;
  
  
  $scope.selectLevel = function(level) {
        $scope.huskyModel.setSelectedLevel(level);
        $scope.huskyModel.resetLists(2);
        $scope.huskyModel.setTeamList();
  };
  $scope.isLvlSelected = function(level) {
      return level === $scope.huskyModel.selectedLevel;
  };
}])

.controller('teamController', ['$scope', 'huskyModel', function($scope, huskyModel) {
  $scope.huskyModel = huskyModel;
  
  $scope.selectTeam = function(team) {
        $scope.huskyModel.setSelectedTeam(team);
        $scope.huskyModel.resetLists(1);
        $scope.huskyModel.setGameList();
  };
  $scope.isTeamSelected = function(team) {
      return team === $scope.huskyModel.selectedTeam;
  };

}])

.controller('gameController', ['$scope', 'huskyModel', function($scope, huskyModel) {
  $scope.huskyModel = huskyModel;
  
  $scope.selectTeam = function(team) {
        $scope.huskyModel.setSelectedTeam(team);
  };
  $scope.isTeamSelected = function(team) {
      return team === $scope.huskyModel.selectedTeam;
  };
  
  // functions for toggle section ** Don't need as we're expanding all groups
  
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  /*$scope.toggleDate = function(date) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };*/

}])


.service('huskyModel', [function () {
  var self = this;
  
  self.resetLists = function(num) {
    if (num >= 1) {
      self.gameList = [];               // Assuming this is the only reference
      self.selectedGame = null;         // reset is selected to null
    }
    if (num >= 2) {
      self.teamList = [];               // Assuming this is the only reference
      self.selectedTeam = null;         // reset is selected to null
    }
    if (num >= 3) {
      self.levelList = [];
      self.selectedLevel = null;
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
    });
  };

  self.teamList = [];
  self.setTeamList = function() {
    angular.forEach(self.selectedLevel.teams, function(team) {
        self.teamList.push(team.team);
    });
  };
  
  self.gameList = [];                       // This structure should respect the data model
  self.setGameList = function() {
    angular.forEach(self.selectedTeam.dates, function(date) {
      self.gameList.push(date);
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
        newDate = new dmDate(nEntry.date);
        newTeam = new dmTeams(nEntry.team, newGame);
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
              newTeam = new dmTeams(nEntry.team, newGame);
              newLevel = new dmLevels(nEntry.level, newTeam);
              category.levels.push(newLevel);
            }
            found = true;
          }
        });
        if (!found) {
              newDate = new dmDate(nEntry.date, newGame);
              newTeam = new dmTeams(nEntry.team, newGame);
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