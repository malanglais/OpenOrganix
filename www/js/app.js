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
  
  // The main controller should be used to get the initial VIEWSTATE value
  // The VIEWSTATE will be used throughout the communications between the site and the app
  var aURL = "http://lcrse.qc.ca/cedules.saison.aspx";
  
  var fData = new FormData();
  fData.append("__EVENTTARGET", "m$pc$cbCategories");
  fData.append("__EVENTARGUMENT", "");
  fData.append("__LASTFOCUS", "");
  fData.append("m$txtLogin", "");
  fData.append("m$txtPassword", "");
  fData.append("m$pc$cbYear", "2015");
  fData.append("m$pc$cbCategories", "-1");
  fData.append("m$pc$cbSemaine", "2015-10-26");
  fData.append("m$pc$cbArenaFilter", "-1");
  fData.append("m$hdnOnLoadMessage", "");
  fData.append("m$hdnOnLoadMessageOptions", "");
  
  
  var aURL = "http://lcrse.qc.ca/cedules.saison.aspx";
  
  $http({
      url: aURL,
      method: "GET",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function (response) {
        self.huskyModel.ViewState = getViewState(response.data);
        fData.append("__VIEWSTATE", self.huskyModel.ViewState);
        
        $http({
          url: aURL,
          method: "POST",
          data: fData,
          headers: { 'Content-Type': undefined }
          }).then(function (response2) {
            self.huskyModel = getTeamModel(response2);
            //self.huskyModel.setCategoryList();
          });
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
  
  self.ViewState = null;
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

function getTeamModel(htmlStr) {

  
  var found = false;
  //var day = '';
  //var newGame;
  //var newDate;
  //var newTeam;
  var newLevel;
  var newCategory;
  var catStr;
  var lvlStr;
  
  var trList = parseInitial(htmlStr); // collection of options
  var teamList = parseTeamList(trList);
  
  for (var i = 1; i < trList.length; i++) {  // loop through teams to single them out and create the vm
    found = false;
    if (trList[i].indexOf('separator') > 0) {   // got a new level in a category
      catStr = getCategoryParse(trList[i]);
      lvlStr = getLevelParse(trList[i]);
    } else {
      angular.forEach(teamList, function(team) {
        if(team.categories.length == 0) {
          newLevel = new dmLevels(lvlStr);
          newCategory = new dmCategories(catStr);
          newCategory.levels.push(newLevel);
          team.push(newCategory);
        } else {
          angular.forEach(team.categories, function(category) {
            if(category.levels.length ==0) {
              newLevel = new dmLevels(lvlStr);
              category.levels.push(newLevel);
            } else {
              angular.forEach(category.levels, function(level) {
                if(level.level == lvlStr) {
                  found = true;
                }
              });
              if (!found) {
                newLevel = new dmLevels(lvlStr);
                category.levels.push(newLevel);
              }
              found = true;
            }
          });
          if (!found) {
            newLevel = new dmLevels(lvlStr);
            newCategory = new dmCategories(catStr);
            newCategory.levels.push(newLevel);
          }
          found = true;
        }
      });
    }
  }
  return teamList;
}

function dmTeams(id, tm) {
  this.id;
  this.team = tm;
  this.categories = [];
}

function dmCategories(cat) {
  this.category = cat;
  this.levels = [];
}

function dmLevels(lvl) {
  this.level = lvl;
  this.dates = [];
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

function parseInitial() {
  var str = htmlStr.slice(htmlStr.indexOf('id=\"m_pc_cbEquipes\">' +20, htmlStr.length));
  var str2 = str.slice(str.indexOf('option value'), str.indexOf('</select>'));
  var retStr = str2.split('<option value=\"');
  return retStr;
}

// parse team list first
function parseTeamList(cols) {
  var teamCol = [];
  var found = false;
  
  var optionsCol = cols;
  var newTeam;
  
  for (var i=0; i <= optionsCol.length; i++) {
    if (optionsCol[i].indexOf('separator') == -1) { // team item
      newTeam = getTeam(optionsCol[i])
      if (teamCol.length ==0) {
        teamCol.push(newTeam);
      } else {
        angular.forEach(teamCol, function(team) {
          if (team.team == newTeam.team) {
            found = true;
          }
        });
        if (!found) {
          teamCol.push(newTeam);
        }
      }
    }
  }
  return teamCol;
}

function getTeam(str) {
  str.slice(str.indexOf('='+2), str.indexOf('</'));
  var id = str.slice(0, str.indexOf('\"'));
  var name = str.slice(str.indexOf('>'+1), str.indexOf('</'));
  var team = new dmTeams(id, name);
  return team;
}

// This function gets the category
function getCategoryParse(trs) {
  var temp = trs.split('>');
  return temp[1].slice(0, temp[1].indexOf(' '));
}

function getLevelParse(trs) {
  var temp = trs.split('>');
  var temp2 = temp[1].split();
  return temp2[1].slice(0, temp[1].indexOf('<'));
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
    this.slice(new_index, 0, this.slice(old_index, 1)[0]);
};

function getViewState(htmlStr) {
  var str = htmlStr.slice(htmlStr.indexOf('__VIEWSTATE\" v')+20, htmlStr.length);
  var vst = str.slice(0, str.indexOf('</option>'));
  return vst;
}