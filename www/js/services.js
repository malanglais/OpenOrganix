angular.module('open_schedule') 


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
    
    
    var aURL = "http://lcrse.qc.ca/api/getTeams?includeStats=1";
    
    $http({
      url: aURL,
      method: "GET"
    }).then(function (response) {
      if (self.clubList.length == 0) {
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
      }
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

 		self.selectedTeam.Events.forEach(function (event){
 		  if (stDate == null && enDate == null) {
 		    stDate = enDate = event.dateTime;
 		  } else if (event.dateTime < stDate) {
 		    stDate = event.dateTime;
 		  } else if (event.dateTime > enDate) {
 		    enDate = event.dateTime;
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
              self.selectedTeam.Events.forEach(function(event){
                if(ev.title.indexOf(event.id)!= -1) {
                  event.onCalendar = true;
                } else if(!event.onCalendar) {
                  event.onCalendar = false;
                }
              });
            }
          }
        });
      }, function (err) {
      // error
    });
  }

  self.loadGameAPI = function() {
    var foundTeam = false;
    if(self.selectedTeam.Events.length == 0) {  // veirfy if model is loaded to avoid calling http 
    
      var aURL = "http://lcrse.qc.ca/api/getSchedules?teamId="+self.selectedTeam.id+"&includeStats=1";
      
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
            newEvent.goalsFor = ev.localGoal;
            newEvent.goalsAgainst = ev.visitorGoal;
            if(newEvent.goalsFor > newEvent.goalsAgainst) {
              newEvent.victory = 1;
            } else if (newEvent.goalsFor < newEvent.goalsAgainst) {
              newEvent.victory = 0;
            } else {
              newEvent.victory = 2; // tied game
            }
          } else {
           
            newEvent.isHomeGame = false;
            newEvent.adversary = ev.localTeamName;
            newEvent.adversaryId = ev.localTeamId;
            newEvent.goalsAgainst = ev.localGoal;
            newEvent.goalsFor = ev.visitorGoal;
            if(newEvent.goalsFor > newEvent.goalsAgainst) {
              newEvent.victory = 1;
            } else if (newEvent.goalsFor < newEvent.goalsAgainst) {
              newEvent.victory = 0;
            } else {
              newEvent.victory = 2; // tied game
            }
          }
           // get adversary team's stats
           foundTeam = false;
            for (var i=0; i<self.clubList.length; i++) {
              if(!foundTeam) {
                for(var j=0; j<self.clubList[i].Levels.length; j++) {
                  if(!foundTeam) {
                    for(var k=0; k<self.clubList[i].Levels[j].Teams.length; k++) {
                      if(!foundTeam){
                        if (newEvent.adversaryId == self.clubList[i].Levels[j].Teams[k].id) {
                          foundTeam = true;
                          newEvent.advPoints = self.clubList[i].Levels[j].Teams[k].point;
                          newEvent.advGP = self.clubList[i].Levels[j].Teams[k].gameCount;
                          newEvent.advVictories = self.clubList[i].Levels[j].Teams[k].gameVictory;
                          newEvent.advLosses = self.clubList[i].Levels[j].Teams[k].gameLost;
                          newEvent.advTies = self.clubList[i].Levels[j].Teams[k].gameDrawn;
                          newEvent.advGF = self.clubList[i].Levels[j].Teams[k].goalFor;
                          newEvent.advGA = self.clubList[i].Levels[j].Teams[k].goalAgainst;
                          newEvent.advDiff = self.clubList[i].Levels[j].Teams[k].goalDiff;
                        }
                      }
                    }
                  }
                }
              }
            }
          self.selectedTeam.Events.push(newEvent);
        });
        self.findEventsRange();
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
    if(!event.onCalendar) {
      $cordovaCalendar.deleteEvent({
        title: "Hockey - " + event.adversary +" - " + event.id,
        location: event.arenaCity + event.arenaName,
        notes: "Bonne partie! -" + event.id,
        startDate: event.dateTime,
        endDate: addMinutes(event.dateTime, 120)
      }).then (function(result){
        if (result){
          //event.onCalendar = false;
          alert("Event removed (" + event.id + ")");
        } else {
          alert("Event not found/removed");
        }
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
        if(result) {
          //event.onCalendar = true;
          alert("Event created (" + event.id + ")");
        } else {
          alert("Event not created");
        }
      }, function(err){
        alert(err);
      });
    }
  }
  
}])