// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


//var viewSt= '';
//var teamNum = 0;
//var categories = ['Pré-Novice', 'Novice', 'Atome', 'Pee-Wee', 'Bantam', 'Midget', 'Junior', 'Autre'];
//var levels = ['AAA', 'AA', 'BB', 'CC', 'A', 'B', 'C', 'F'];
//var teams = ['1', '2', '3', '4', '5'];

angular.module('open_schedule', ['ionic']) 

// home page controller that loads the page... may be this can be put in as a service later on
/* TODO : put in service */

.controller('catController',  ['$scope', '$http', 'huskyModel', function($scope, $http, huskyModel) {
  $scope.huskyModel = huskyModel;
  
  var promise = $http.get("http://huskyco.com/php/newevents.php").then(function(response) {
     $scope.huskyModel.setModel(response.data);
     $scope.huskyModel.setCategoryList();
     var t= 1;
  });
  
  
  $scope.selectCategory = function(category) {
        $scope.huskyModel.setSelectedCategory(category);
        $scope.huskyModel.setLevelList(category);
  };
  $scope.isCatSelected = function(category) {
      return category === $scope.huskyModel.selectedCategory;
  };
  
}])
  

.controller('levelController',  ['$scope', 'huskyModel', function($scope, huskyModel) {
  
  $scope.selectLevel = function(level) {
        $scope.huskyModel.setSelectedLevel(level);
        $scope.huskyModel.setTeamList(level);
  };
  $scope.isLvlSelected = function(level) {
      return level === $scope.huskyModel.selectedLevel;
  };
}])

.controller('teamController', ['$scope', 'huskyModel', function($scope, huskyModel) {
  
  $scope.selectTeam = function(team) {
        $scope.huskyModel.setSelectedTeam(team);
  };
  $scope.isTeamSelected = function(team) {
      return team === $scope.huskyModel.selectedTeam;
  };

}])


.service('huskyModel', [function () {
  var self = this;
  
  self.gameModel = [];
  self.setModel = function(dm) {
    self.gameModel = getModel(dm);
  };
  
  
  self.categoryList = [];
  self.setCategoryList = function() {
    angular.forEach(self.gameModel, function(category) {
      self.categoryList.push(category.category);
    });
  };
  
  self.levelList = [];
  self.setLevelList = function(category) {
    angular.forEach(category.levels, function(level) {
      self.levelList.push(level.level);
    });
  };

  self.teamList = [];
  self.setTeamList = function(level) {
    angular.forEach(level.teams, function(team) {
        self.levelList.push(team.team);
    });
  };

  
  self.selectedCategory = null;
  self.setSelectedCategory = function(cat) {
    angular.forEach(self.gameModel, function(category) {
        if (category.category == cat) {
          self.selectedCategory = category.category;
        }
    });
  };

  self.selectedLevel = null;
  self.setSelectedLevel = function(lvl) {
    angular.forEach(self.selectedCategory.levels, function(level) {
        if (level.level == level) {
          self.selectedLevel = level.level;
        }
    });
  };
  
  self.selectedTeam = null;
  self.setSelectedTeam = function(tm) {
    angular.forEach(self.selectedLevel.teams, function(team) {
        if (team.team == tm) {
          self.selectedTeam = team.team;
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
        home: {
          templateUrl: 'templates/categories.html'
          //controller: 'catController'
        }
      }
    })
    
    .state('levels', {
      url: '/home',
      views: {
        teams: {
          templateUrl: 'templates/levels.html'
          //controller: 'levelController'
        }
      }
    })
    
    .state('teams', {
      url: '/home',
      views: {
        teams: {
          templateUrl: 'templates/teams.html'
          //controller: 'teamController'
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


function getDay(trStr) {
  return trStr.slice(trStr.indexOf('5\'>')+3, trStr.indexOf('</td>'));
}

function getModel(htmlStr) {
  var categoriesDM = [];
  var found = false;
  var day = '';
  var newGame;
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
      newGame = new dmGame(nEntry.day, nEntry.time, nEntry.loction);             // add game regardless
      if (categoriesDM.length ==0) {                                                    // array is empty
        newTeam = new dmTeams(nEntry.team, newGame);
        newLevel = new dmLevels(nEntry.level, newTeam);
        newCategory = new dmCategories(nEntry.category, newLevel);
        categoriesDM.push(newCategory);
      } else {            // not found, we're going to search
        angular.forEach(categoriesDM, function(category) {
          if (category.category == nEntry.category) {
            angular.forEach(category.levels, function(level) {
              if (level.level == nEntry.level) {
                angular.forEach(level.teams, function(team) {
                  if (team.team == nEntry.team) {
                    team.games.push(newGame);
                    found = true;
                  }
                });
                if (!found) {                                       // team not found
                  newTeam = new dmTeams(nEntry.team, newGame);
                  level.teams.push(newTeam);
                }
                found = true;
              }
            });
            if (!found) {
              newTeam = new dmTeams(nEntry.team, newGame);
              newLevel = new dmLevels(nEntry.level, newTeam);
              category.levels.push(newLevel);
            }
            found = true;
          }
        });
        if (!found) {
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

function dmTeams(tm, gm) {
  this.team = tm;
  this.games = [];
  this.games.push(gm);
}

function dmGame(dt, tm, loc) {
    this.date = dt;
    this.time = tm;
    this.loction = loc; 
}

function dmEntry(cat, lvl, tm, d, t, loc) {
  this.category = cat;
  this.level = lvl;
  this.team = tm;
  this.day = d;
  this.time = t;
  this.loction = loc;
}

function parseTr(trStr, day) { // returns parsed string
  var trs = trStr.split('<td>');
  var time = trs[1].slice(0, trs[1].indexOf(' '));
  var category = trs[2].slice(0, trs[2].indexOf(' '));
  var level = trs[2].slice(trs[2].indexOf(' ')+1, trs[2].indexOf('</td>'));
  var team = trs[3].slice(trs[3].indexOf(' ')+1, trs[3].indexOf('</td>'));
  var loction = trs[4].slice(trs[4].indexOf('blank\'>')+7, trs[4].indexOf('</a>'));
  var newEntry = new dmEntry(category, level, team, day, time, loction);
  return newEntry;
} 