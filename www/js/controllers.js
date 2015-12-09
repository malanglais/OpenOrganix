angular.module('open_schedule') 

// home page controller that loads the page... may be this can be put in as a service later on
/* TODO : put in service */

.controller('clubController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.huskyModel.buildModel();
  
  self.selectClub = function(club) {
    self.huskyModel.setSelectedClub(club);
  };
}])

.controller('levelController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectLevel = function(level) {
    self.huskyModel.setSelectedLevel(level);
  };
}])

.controller('teamController', ['$http', 'huskyModel', function($http, huskyModel) {
  var self = this;
  self.huskyModel = huskyModel;
  
  self.selectTeam = function(team) {
    self.huskyModel.setSelectedTeam(team);
  };
}])

.controller('gameController', ['$http', '$cordovaCalendar','huskyModel', function($http, $cordovaCalendar, huskyModel) {
  var self = this;
  var foundDate = null;
  self.huskyModel = huskyModel;
  
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
 
  
}]);