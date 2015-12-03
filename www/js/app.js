// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('open_schedule', ['ionic', 'ngCordova']) 

// home page controller that loads the page... may be this can be put in as a service later on
/* TODO : put in service */

.controller('mainController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.huskyModel.buildModel();
  var t=1;
  
  self.selectClub = function(club) {
    self.huskyModel.setSelectedClub(club);
  };
  
  self.selectCategory = function(category) {
    self.huskyModel.setSelectedCategory(category);
  };
  
  self.selectLevel = function(level) {
    self.huskyModel.setSelectedLevel(level);
  };
  
  self.selectTeam = function(team) {
    self.huskyModel.setSelectedTeam(team);
  };
  
}])

.controller('gameController', ['$http', '$cordovaCalendar','huskyModel', function($http, $cordovaCalendar, huskyModel) {
  var self = this;
  var foundDate = null;
  self.huskyModel = huskyModel;
  self.huskyModel.findEvents().then(function(events){
    console.log("events", events);
  });
  
  self.huskyModel.loadGameAPI();
  
  self.createEvents = function() {
    self.huskyModel.createEvents();
  };
  
  self.createEvent = function(date, event) {
    self.huskyModel.createEvent(date, event);
  }

  
  self.selectAllEvents = function() {
    self.huskyModel.selectAllEvents(self.huskyModel.selectedTeam.allEventsSelected);
  };
  
  var calendarList = [];
  var calNameList = [];
  var selectedCalendarName = null;
 
  
}])


.service('huskyModel', ['$cordovaCalendar', '$q', '$http', '$timeout', function ($cordovaCalendar, $q, $http, $timeout) {
  var self = this;
  
  self.ViewState = null;
  self.isClubSelected = null;
  self.isGameSelected = false;
  self.isTeamSelected = false;
  self.isLevelSelected = false;
  self.isCategorySelected = false;
  self.calEventCollection = [];
  
  self.foundDates = [];
 
  // this is the complete model
  self.clubList = [];
  
 // this has to return the array... not the name
  self.selectedClub = null;
  self.setSelectedClub = function(club) {
    self.clubList.forEach(function(clb) {
        if (clb.name == club.name) {
          self.selectedClub = clb;
        }
    });
  };

  self.selectedLevel = null;
  self.setSelectedLevel = function(lvl) {
    self.selectedClub.Levels.forEach(function(level) {
        if (level.level == lvl.level) {
          self.selectedLevel = level;
        }
    });
  };
  
  self.selectedTeam = null;
  self.setSelectedTeam = function(tm) {
    self.selectedLevel.Teams.forEach(function(team) {
        if (team.team == tm.team) {
          self.selectedTeam = team;
          self.isTeamSelected = true;
        }
    });
  };
  
  self.buildModel = function() {
    var aURL = "http://lcrse.qc.ca/api/getTeams";
    
    $http({
      url: aURL,
      method: "GET"
    }).then(function (response) {
      response.data.data.forEach(function(club){
        var newClub = new dmClub(club);
        club.levels.forEach(function(level){
          var newLevel = new dmLevel(level);
          level.teams.forEach(function(team){
            var newTeam = new dmTeam(team);
            newLevel.Teams.push(newTeam); 
          });
          newClub.Levels.push(newLevel);
        });
        self.clubList.push(newClub);
      });
    }); 
  } 
 
  self.selectAllEvents = function(selected) {
    angular.forEach(self.selectedTeam.Dates, function(date){
      angular.forEach(date.Events, function(event){
        event.isSelected = selected;
      });
    });
  }
  
  self.findEvent = function(date, event) {
    var tmpTmStr = event.time.split(":");
 	  var tt = "Hockey - " + event.adversary +" - " + event.id;
    var loc = event.Location.city + event.Location.arena;
    var nt = "Bonne partie! -" + event.id;
    var stDate = date.date;
    stDate = addHours(stDate, parseInt(tmpTmStr[0]));
    stDate = addMinutes(stDate, parseInt(tmpTmStr[1]));
    var enDate = addMinutes(stDate, 120);
    $cordovaCalendar.findEvent({
 	    title: tt,
      location: loc,
      notes: nt,
			startDate: stDate,
			endDate: enDate
    }).then(function (result) {
      if(result >=1){
        event.onCalendar = true;
      }
    }, function (err) {
      // error
    });
  }
  
  self.findEventRecurse = function(date, ctr) {
    // this function is recursive through the events
    
    var event = date.Events[ctr];
    if(event != null) {
      var tmpTmStr = event.time.split(":");
   	  var tt = "Hockey - " + event.adversary +" - " + event.id;
      var loc = event.Location.city + event.Location.arena;
      var nt = "Bonne partie! -" + event.id;
      var stDate = date.date;
      stDate = addHours(stDate, parseInt(tmpTmStr[0]));
      stDate = addMinutes(stDate, parseInt(tmpTmStr[1]));
      var enDate = addMinutes(stDate, 120);
      
      $cordovaCalendar.findEvent({
   	    title: tt,
        location: loc,
        notes: nt,
  			startDate: stDate,
  			endDate: enDate
      }).then(function (result) {
        if(ctr < date.Events.length) {
          self.findEventRecurse(date, ctr+1);
        }
        if(result.length >=1){
          date.Events[ctr].onCalendar = true;
        }
      }, function (err) {
        // error
      });
    }
  }
  
  self.findEvents = function(){
    var deferred = $q.defer();

		/*
		Logic is:
		For each, see if it exists an event.
		*/
		var promises = [];
		self.selectedTeam.Events.forEach(function(event) {
			
			console.log('try to find '+event.id);
			promises.push($cordovaCalendar.findEvent({
          title: "Hockey - " + event.adversary +" - " + event.id,
          location: event.arenaCity + event.arenaName,
          notes: "Bonne partie! -" + event.id,
          startDate: event.dateTime,
          endDate: addMinutes(event.dateTime, 120)
      }));
		});
		
		$q.all(promises).then(function(results) {
			console.log("in the all done");	
			//should be the same len as events
			for(var i=0;i<results.length;i++) {
				self.selectedTeam.Events[i].onCalendar = results[i].length === 1;
			}
			deferred.resolve(self.selectedTeam.Events);
		});
		
		return deferred.promise;
 	}
  
  self.findEventsWithPromises = function() {
		var deferred = $q.defer();

		/*
		Logic is:
		For each, see if it exists an event.
		*/
		var promises = [];
		for(var i=0; i<self.selectedTeam.Dates.length; i++){
		  var date = self.selectedTeam.Dates[i];
		  for(var j=0; j<date.Events.length; j++){
  		  var event = date.Events[j];
		    var tmpTmStr = event.time.split(":");
     	  var tt = "Hockey - " + event.adversary +" - " + event.id;
        var loc = event.Location.city + event.Location.arena;
        var nt = "Bonne partie! -" + event.id;
        var stDate = date.date;
        stDate = addHours(stDate, parseInt(tmpTmStr[0]));
        stDate = addMinutes(stDate, parseInt(tmpTmStr[1]));
        var enDate = addMinutes(stDate, 120);
			  console.log('try to find '+ event.id);
			  promises.push($cordovaCalendar.findEvent({
				  title: tt,
          location: loc,
          notes: nt,
  			  startDate: stDate,
  			  endDate: enDate
			  }));
		  }
		}
		
		/*for (var promiseIndex = 0; promiseIndex < promises.length; promiseIndex++) {
		  promises[promiseIndex].then(function (result) {
		    console.log("I have successfully ended");
		  }, function (result) {
		    console.log("I have failed");
		  })
		}
		
		console.log(promises.length);
		if(promises.length >0) {
		  console.log(promises[0].status);
		}*/
		
		$q.all(promises).then(function(results) {
			console.log("in the all done");	
			//should be the same len as events
			for(var i=0;i<results.length;i++) {
			  if(results[i].length >= 1){
				  self.selectedTeam.Dates[3].Events[0].onCalendar = true;
			  }
			}
			deferred.resolve(self.selectedTeam.Dates[3].Events[0].onCalendar);
		}, function (err) {
		  console.log("prob man!!");	
		});
		
		
		return deferred.promise;
  }
  
  self.findEventsRange = function() {
 		
 		var stDate = null;
 		var enDate = null;
 		
 		//Logic is:
  	//For each, see if it exists an event.
		//For each, see if there is existing event and change the onCalendar member and tag the event onCalendar member
		// trying  listEventsInRange

 		self.selectedTeam.Dates.forEach(function (date){
 		  if (stDate == null && enDate == null) {
 		    stDate = enDate = date.date;
 		  } else if (date.date < stDate) {
 		    stDate = date.date;
 		  } else if (date.date > enDate) {
 		    enDate = date.date;
 		  }
 		});
 		
 		enDate = addHours(enDate, 23); // till end of day
    //var st = new Date(1449365400000);
    //var en = new Date(1449372600000);
     $cordovaCalendar.listEventsInRange(
      stDate,
      enDate
      ).then(function (results) {
        results.forEach( function(ev) {
          if(ev.title != null) {
            if(ev.title.indexOf("Hockey") != -1) {
              self.calEventCollection.push(ev);
              self.selectedTeam.Dates.forEach(function (date){
                date.Events.forEach(function (event){
                  if(ev.title.indexOf(event.id)!= -1) {
                    event.onCalendar = true;
                  }
                });
              });
            }
          }
        });
      }, function (err) {
      // error
    });
  }

  self.loadGameAPI = function() {
    
    if(self.selectedTeam.Events.length == 0) {  // veirfy if model is loaded to avoid calling http 
    
      var aURL = "http://lcrse.qc.ca/api/getSchedules?teamId="+self.selectedTeam.id;
      
      $http({
        url: aURL,
        method: "GET",
      }).then(function (response) {
        response.data.data.forEach(function(ev){
          var newEvent = new dmEvent(ev);
          if (self.selectedTeam.team == ev.localTeamName) {
            newEvent.isHomeGame = true;
            newEvent.adversary = ev.visitorTeamName;
            newEvent.adversaryId = ev.visitorTeamId;
          } else {
            newEvent.isHomeGame = false;
            newEvent.adversary = ev.localTeamName;
            newEvent.adversaryId = ev.localTeamId;
          }
          // will have to add calcs for victory
          self.selectedTeam.Events.push(newEvent);
        });
      });
    }
  }
  
  self.createEvents = function() {
    var stDate = null; // start date in Date format
    
    angular.forEach(self.selectedTeam.Dates, function (date){
      angular.forEach(date.Events, function(event){
        if (event.isSelected && !event.onCalendar) { // create event
          // Format date
          var tmpTmStr = event.time.split(':');
          stDate = date.date;
          stDate = addHours(stDate, parseInt(tmpTmStr[0]));
          stDate = addMinutes(stDate, parseInt(tmpTmStr[1]));
          $cordovaCalendar.createEvent({
            title: "Hockey - " + event.adversary +" - " + event.id,
            location: event.Location.city + event.Location.arena,
            notes: "Bonne partie! -" + event.id,
            startDate: stDate,
            endDate: addMinutes(stDate, 120)
            //calendarName:selectedCalendarName
          }).then (function(result){
            event.onCalendar = true;
            alert("Event created (" + event.id + ")");
          }, function(err){
            alert(err);
          });
        } else if(event.isSelected && event.onCalendar){
          alert("Event already exists");
        }
      });
    });
  }
  
  self.createEvent = function(event) {
      //remove
    if(event.onCalendar) {
      $cordovaCalendar.deleteEvent({
        title: "Hockey - " + event.adversary +" - " + event.id,
        location: event.arenaCity + event.arenaName,
        notes: "Bonne partie! -" + event.id,
        startDate: event.dateTime,
        endDate: addMinutes(event.dateTime, 120)
      }).then (function(result){
        event.onCalendar = true;
        alert("Event removed (" + event.id + ")");
        // success
      }, function (err) {
        // error
      });
    } else {
     //add
      $cordovaCalendar.createEvent({
        title: "Hockey - " + event.adversary +" - " + event.id,
        location: event.arenaCity + event.arenaName,
        notes: "Bonne partie! -" + event.id,
        startDate: event.dateTime,
        endDate: addMinutes(event.dateTime, 120)
      }).then (function(result){
        event.onCalendar = true;
        alert("Event created (" + event.id + ")");
      }, function(err){
        alert(err);
      });
    }
  }
  
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

/* ==============================================

Data model

================================================*/

function dmClub(cl) {
  this.id = cl.franchiseId;
  this.name = cl.franchiseName;
  this.currentLevel = null;
  this.Levels = [];
  
  this.setCurrentLevel = function(lvl) {
    if (this.Levels.length == 0) {
      this.currentLevel = lvl;
    } else {
      this.Levels.forEach(function(level){
        if(lvl.level == level.level) {
          this.currentLevel = level;
        }
      });
    }
  }
}

function dmLevel(lvl) {
  this.id = lvl.levelId;
  this.level = lvl.levelName;
  this.currentTeam = null;
  this.Teams = [];
  
  this.setCurrentTeam = function(tm) {
    this.Teams.forEach(function(team){
      if(tm.id == team.id) {
        this.currentTeam = team;
      }
    });
  }
}

function dmTeam(tm) {
  this.id = tm.id;
  this.team = tm.name;
  this.gameCount = tm.gameCount;
  this.gameVictory = tm.gameVictory;
  this.gameLost = tm.gameLost;
  this.gameDrawn = tm.gameDrawn;
  this.goalFor = tm.goalFor;
  this.goalAgainst = tm.goalAgainst;
  this.goalDiff = tm.goalDiff;
  this.point = tm.point;
  this.pointBehavior = tm.pointBehavior;
  this.pointTotal = tm.pointTotal;
  this.allEventsSelected;
  this.Events = [];
}

function dmEvent(ev) {
    this.id = ev.num;
    this.levelId = ev.levelId;
    this.isHomeGame = null;
    this.adversary = null;
    this.adversaryId = null;
    this.dateTime = new Date(ev.dateTime.replace(' ', 'T'));
    this.type = "Partie";
    this.arenaId = ev.arenaId;
    this.arenaName = ev.arenaName;
    this.arenaCity = ev.arenaCity;
    this.isPassed = false;
    this.isSelected = false;
    this.goalsFor = null;
    this.goalsAgainst = null;
    this.onCalendar = false;
    this.victory = null;
    
    if(this.dateTime < Date.now()) {
      this.isPassed = true;
    }
    /*if (gf != null) {
      if(gf==ga) {
        this.victory = "N";
      } else if (gf > ga) {
        this.victory = "V";
      } else {
        this.victory = "D";
      }
    }*/
    
}

function dmLocation (ar, crd, cty, ph, web) {
  this.arena = ar;
  this.coordinates = crd;
  this.city = cty;
  this.phone = ph;
  this.web = web;
}

/* ==============================================

Model fuctions

================================================*/

function getTeamModel(htmlStr) {

  var foundClub = false;
  var clubList = [];
  var newClub = null;
  var newTeam = null;
  var newLevel = null;
  //var newLvlBool = false;
  var newCategory = null;
  //var newCatBool = false;
  var catStr;
  var lvlStr;
  var clubStr;
  
  
  var trList = parseInitial(htmlStr); // collection of options
  
  for (var i = 0; i < trList.length; i++) {  // loop through teams to single them out and create the vm
    foundClub = false;
    if (trList[i].indexOf('separator') > 0) {   // always a new level in a category
      catStr = getCategoryParse(trList[i]);
      lvlStr = getLevelParse(trList[i]);
      
      newLevel = new dmLevel(lvlStr); // always new level
      
      // check if new category
      if (newCategory != null) {
        if(catStr != newCategory.category) { // new category
          newCategory = new dmCategory(catStr);
        }
      } else {
        newCategory = new dmCategory(catStr);
      }
      
    } else {
      // need to pass strings and create new instances of categories and levels when required
      clubStr = getClubParse(trList[i]);   // club will always contain something prior to team
      newTeam = getTeamParse(trList[i]);   // will always be a new team... constructor is inside function getTeamParse
      newClub = findClub(clubStr, clubList, catStr, lvlStr);   // assign club
      newClub.Categories[findCategoryIndex(newClub.currentCategory.category, newClub.Categories)].Levels[findLevelIndex(newClub.currentCategory.currentLevel.level, newClub.Categories[findCategoryIndex(newClub.currentCategory.category, newClub.Categories)].Levels)].Teams.push(newTeam);
      if (clubList.length == 0) {
        clubList.push(newClub);
      } else {
        angular.forEach(clubList, function(club){
          if(club.name == newClub.name) {
            foundClub = true;
          }
        });
        if (!foundClub) {
          clubList.push(newClub);
        }
      }
    }
  }
  return clubList;
}

function parseInitial(htmlStr) {
  var str = htmlStr.slice(htmlStr.indexOf('id=\"m_pc_cbEquipes\">') +20, htmlStr.length);
  var str2 = str.slice(str.indexOf('<option value'), str.indexOf('</select>'));
  var retStr = str2.split('<option value=\"');
  retStr.splice(retStr.length -1, 1); // remove last element in list which is option 0
  retStr.splice(0,1); // remove first element in list which is an empty string
  
  return retStr;
}

function getTeamParse(str) {
  str.slice(1, str.indexOf('</'));
  var id = str.slice(0, str.indexOf('\"'));
  var name = str.slice(str.indexOf('>') +1, str.indexOf('</'));
  name = convertHTML(name);
  var team = new dmTeam(id, name);
  return team;
}

function getClubParse(str) {
  str.slice(1, str.indexOf('</'));
  var name = str.slice(str.indexOf('>') +1, str.indexOf('</'));
  if (name.lastIndexOf('-') == name.length -2) { // verify and remove hiphen at end of string
    name = name.substring(0, name.length -2);
  } else { 
    if(name.indexOf("-F&#233;m") != -1) {
      name = name.substring(0, name.indexOf("-F&#233;m"));
    }
  }
  name = convertHTML(name);
  return name;
}

// This function gets the category
function getCategoryParse(trs) {
  var temp = trs.split('>');
  return temp[1].slice(0, temp[1].indexOf(' '));
}

function getLevelParse(trs) {
  var temp = trs.split('>');
  var temp2 = temp[1].slice(0, temp[1].indexOf('<')).split(" ");
  return temp2[1];
}

function findCategoryIndex(str, col) {
  var returnVal;
  var found = false;
  
  if (col.length > 0) {
    for(var i =0; i< col.length; i++) {
      if (str == col[i].category) {
        found = true;
        returnVal = i;
      }
    }
    if (!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function findCategory(str, col, lvl) {
  var returnVal;
  var found = false;
  var numArgs = arguments.length;
  
  if (col.length > 0) {
    angular.forEach(col, function(category) {
      if (str == category.category) {
        found = true;
        if(numArgs ==3) { 
          category.Levels.push(lvl);
        }
        returnVal = category;
      }
    });
    if (!found && numArgs == 2) {
      returnVal = false;
    }
  } else {
    if(numArgs ==3) {
      var retCat = new dmCategory(str);
      retCat.Levels.push(lvl);
      returnVal = retCat;
    } else { 
      returnVal = false;
    }
  }
  return returnVal;
}

function findClub(str, col, cat, lvl) { // find club in col of clubs
// str: string to search
// col: collection to search through
// cat: string for category
// lvl: string for level
  var returnVal;
  var foundClub = false;
  var foundCat = false;
  var foundLvl = false;
  var retClub = null;
  
  if (col.length > 0) {
    angular.forEach(col, function(club) {
      if (str == club.name) {
        foundClub = true;
        angular.forEach(club.Categories, function(category){
          if(category.category == cat) {
            foundCat = true;
            //club.currentCategory = club.Categories[findCategoryIndex(cat, club.Categories)];
            angular.forEach(category.Levels, function(level){
              if(level.level == lvl) {
                foundLvl = true;
                //club.Categories[findCategoryIndex(cat, club.Categories)].currentLevel = club.Categories[findCategoryIndex(cat, club.Categories)].Levels[findLevelIndex(lvl, club.Categories[findCategoryIndex(cat, club.Categories)].Levels)];
                
              }
            });
          }
        });
        if (!foundCat) {    // new category - create a new instance
          var newCat = new dmCategory(cat);
          club.Categories.push(newCat);
          club.currentCategory = club.Categories[findCategoryIndex(cat, club.Categories)];
        }
        if (!foundLvl) {    // new level - create a new instance
          var newlvl = new dmLevel(lvl);
          club.Categories[findCategoryIndex(cat, club.Categories)].Levels.push(newlvl);
          club.Categories[findCategoryIndex(cat, club.Categories)].currentLevel = club.Categories[findCategoryIndex(cat, club.Categories)].Levels[findLevelIndex(lvl, club.Categories[findCategoryIndex(cat, club.Categories)].Levels)];
        }
        returnVal = club;
      }
    });
  } else {
    foundClub = false;
  }
  if(!foundClub){
    var nLvl = new dmLevel(lvl);
    var nCat = new dmCategory(cat);
    nCat.Levels.push(nLvl);
    nCat.currentLevel = findLevel(nLvl.level, nCat.Levels);
    retClub = new dmClub(str);
    retClub.Categories.push(nCat);
    retClub.currentCategory = findCategory(nCat.category, retClub.Categories);
    returnVal = retClub;
  }
  return returnVal;
}

function findTeam(str, col) { // find team in collection of teams by using id
  var returnVal;
  var found = false;
  
  if(col.length > 0) {
    angular.forEach(col, function(team) {
      if(str == team.id) {
        returnVal = team;
        found = true;
      }
    });
    if(!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function findLevelIndex(str, col) {
  var returnVal;
  var found = false;
  
  if(col.length > 0) {
    for(var i =0; i<col.length; i++) {
      if(str == col[i].level) {
        returnVal = i;
        found = true;
      }
    }
    if (!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function findLevel(str, col) {
  var returnVal;
  var found = false;
  
  if(col.length > 0) {
    angular.forEach(col, function(level) {
      if(str == level.level) {
        returnVal = level;
        found = true;
      }
    });
    if (!found) {
      returnVal = false;
    }
  }
  return returnVal;
}

function getViewState(htmlStr) {
  var str = htmlStr.slice(htmlStr.indexOf('__VIEWSTATE\" v')+20, htmlStr.length);
  var vst = str.slice(0, str.indexOf('/>')-2);
  return vst;
}

function constructGameModel(htmlstr, hTeam) { // will fill in the model with the corresponding games for the teams
  var returnCollectionDates = [];
  var ctrlId = null;
  var ctrlValue = null;
  var currentDate = null;
  var tdCollection = [];
  var tmpTime=null;
  var tmpArena=null;
  var tmpAdversary=null;
  var tmpCity=null;
  var tmpIsHomeGame=null;
  var tmpEvent = null;
  var tmpLocation = null;
  var tmpID = null;
  var foundLocation = false;
  var gVisitor = null;
  var gLocal = null;
  var dtNow = new Date();
  dtNow = Date.now();
  
  var str = htmlstr.slice(htmlstr.indexOf("<section id=\"m_pc_sctCedule\""), htmlstr.length);
  str = str.slice(str.indexOf("<table"), str.lastIndexOf("</table>"));
  var trCollection = str.split("<tr>");

  angular.forEach(trCollection, function(trStr){ // new game entry
    if(trStr.indexOf("lblCode") != -1) {
      tdCollection = trStr.split("<td");
      
      angular.forEach(tdCollection, function(lineStr){
        lineStr = lineStr.substring(lineStr.indexOf("<span"), lineStr.indexOf("</span>"));
        if(lineStr.length > 0) {
          ctrlId = lineStr.substring(lineStr.lastIndexOf("_") +1, lineStr.lastIndexOf("\""));
          ctrlValue = lineStr.substring(lineStr.indexOf("\">") +2, lineStr.length);
          
          switch (ctrlId) {
            case 'lblID':
                tmpID = ctrlValue;
              break;
            case 'lblDate':
                if(isNewDate(ctrlValue, returnCollectionDates)) {
                  // add date to collection
                  // convert string to Date
                  var dateItems = ctrlValue.split('/');
                  var yr = parseInt(dateItems[2]);
                  var mn = parseInt(dateItems[1]) - 1;
                  var dy = parseInt(dateItems[0]);
                  currentDate = new dmDate(new Date(yr, mn, dy));
                  if (currentDate.date < dtNow) {
                    currentDate.isPassed = true;
                  }
                  
                } else {
                  currentDate = findDate(ctrlValue, returnCollectionDates);
                }
              break;
            case 'lblTime': // assuming this is always going to be unique so save in date
                tmpTime = ctrlValue;
              break;  
            case 'lblVisitor': // assuming this is always going to be unique so save in date
                if(convertHTML(ctrlValue) != hTeam) { // visitor team is adversary, so local game
                  tmpAdversary = convertHTML(ctrlValue);
                  tmpIsHomeGame = true;
                }
              break;
            case 'lblLocal': // assuming this is always going to be unique so save in date
                processed = true;
                if(convertHTML(ctrlValue) != hTeam) { // visitor team is local, so NOT local game
                  tmpAdversary = convertHTML(ctrlValue);
                  tmpIsHomeGame = false;
                }
              break;
            case 'lblArena': // assuming this is always going to be unique so save in date
                tmpCity = convertHTML(ctrlValue.substring(0, ctrlValue.indexOf(":")));
                tmpArena = convertHTML(ctrlValue.substring(ctrlValue.indexOf(":")+2, ctrlValue.length));
              break;
            case 'lblButVisitor':
                gVisitor = ctrlValue;
              break;
            case 'lblButLocal':
                gLocal = ctrlValue;
            default:
              // code
            }
          }
        });
        if(returnCollectionDates.length == 0) {
          tmpLocation = new dmLocation(tmpArena, 0, tmpCity, null, null);
          
          if(tmpIsHomeGame) {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gLocal, gVisitor);
          } else {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gVisitor, gLocal);
          }
          
          currentDate.Events.push(tmpEvent);
        } else {
          angular.forEach(returnCollectionDates, function(date){
            angular.forEach(currentDate.Events, function(event){
              if(event.Location.arena == tmpArena) {
                foundLocation = true;
                tmpLocation = event.Location;
              }
            });
          });
          if(!foundLocation) {
            tmpLocation = new dmLocation(tmpArena, 0, tmpCity, null, null);
          }
          if(tmpIsHomeGame) {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gLocal, gVisitor);
          } else {
            tmpEvent = new dmEvent(tmpID, tmpAdversary, tmpTime, "Partie", tmpLocation, tmpIsHomeGame, gVisitor, gLocal);
          }
          currentDate.Events.push(tmpEvent);
        }
        returnCollectionDates.push(currentDate);
    }
  });
  var t = 1;
  return returnCollectionDates;
}

function isNewDate(date, col) {
  // return bool value , found or mot
   var newDate = true;
   
   if(col.length !=0){
     angular.forEach(col, function(dd){
       if(dd.date == date) {
         newDate = false;
       }
     });
   }
  return newDate;
}

function findDate(date, col) {
  // return bool value , found or mot
   var retDate = null;
   
   if(col.length !=0){
     angular.forEach(col, function(dd){
       if(dd.date == date) {
         retDate = dd;
       }
     });
   }
  return retDate;
}

/* ==============================================

Calendar fuctions

================================================*/

function getStartDate(date, time) {
  var dateItems = date.split('/');
  var timeItems = time.split(':');
  var yr = parseInt(dateItems[2]);
  var mn = parseInt(dateItems[1]) - 1;
  var dy = parseInt(dateItems[0]);
  var hr = parseInt(timeItems[0]);
  var mi = parseInt(timeItems[1]);
  return new Date(yr, mn, dy, hr, mi, 0,0,0);
}

function getEndDate(date, minutes) {
  // date: Date - corresponds to the startdate of the event
  return new Date(date + minutes*60000);
}

/* ==============================================

Various fuctions

================================================*/

function sortIt(lvls, ord) {    // receiving a collection
  var indexFilled = 0;
  angular.forEach(ord, function(ordItem) {
    if (lvls.indexOf(ordItem) != -1) {
      lvls.move(lvls.indexOf(ordItem), indexFilled);
      indexFilled++;
    }
  })
}

function addHours(dt, hour) {
  var hr = hour%24;
  var excDays = Math.floor(hour/24);
  var tmpdt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()+excDays, hr, 0, 0, 0);
  return tmpdt;
}

function addMinutes(dt, min) {
  // assuming it won<t add mor than 24 hours x 60 min
  var mn = min%60;
  var excMin = Math.floor(min/60);
  var tmpdt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours() + excMin, dt.getMinutes()+mn, 0, 0);
  return tmpdt;
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

function convertHTML(str) {
  var returnVal = null;
  var tempStr = str.substr(str.indexOf("&"), 6);
  switch (tempStr) {
    case '&#201;':
      returnVal = str.replace(tempStr,"É");
      break;
    case '&#233;':
      returnVal = str.replace(tempStr,"é");
      break;
    default:
      returnVal = str;
  }
  return returnVal;
}