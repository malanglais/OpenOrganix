angular.module('open_schedule') 

.controller('sportController', ['huskyModel', function(huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectSport = function(sport) {
    self.huskyModel.setSelectedSport(sport);
  };
}])

.controller('leagueController', ['huskyModel', function(huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectLeague = function(league) {
    self.huskyModel.setSelectedLeague(league);
    self.huskyModel.buildModel(self.huskyModel.selectedLeague.url);
  };
}])

.controller('clubController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectClub = function(club) {
    self.huskyModel.setSelectedClub(club);
  };
}])

.controller('levelController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.huskyModel.createRankings();
  
  self.selectLevel = function(level) {
    self.huskyModel.setSelectedLevel(level);
  };
  
  self.toggleDiv = function(level) {
    if(level.expandDiv) {
      level.expandDiv = false;
    } else {
      level.expandDiv = true;
    }
  };

  self.isDivExpanded = function(event) {
    return event.expandDiv;
  };
  
}])

.controller('teamController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  //self.huskyModel.createRankings();
  
  self.toggleDiv = function(team) {
  if(team.expandDiv) {
    team.expandDiv = false;
  } else {
    team.expandDiv = true;
  }
};

self.isDivExpanded = function(team) {
  return team.expandDiv;
};
  
  self.selectTeam = function(team) {
    self.huskyModel.setSelectedTeam(team);
  };
}])

.controller('gameController', ['$http', '$cordovaCalendar','huskyModel', function($http, $cordovaCalendar, huskyModel) {
  var self = this;
  var foundDate = null;
  self.huskyModel = huskyModel;
  
  self.huskyModel.loadGameAPI();
  
  self.toggleDiv = function(event) {
    if(event.expandDiv) {
      event.expandDiv = false;
    } else {
      event.expandDiv = true;
    }
  };

  self.isDivExpanded = function(event) {
    return event.expandDiv;
  };
  
  self.createEvents = function() {
    self.huskyModel.createEvents();
  };
  
  self.createEvent = function(date, event) {
    self.huskyModel.createEvent(date, event);
  }

  self.selectAllEvents = function() {
    self.huskyModel.selectAllEvents(self.huskyModel.selectedTeam.allEventsSelected);
  };
 
  
}]);