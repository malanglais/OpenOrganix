angular.module('starter.services', [])

.factory('Teams', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var teams = [{
    id: 0,
    name: 'Pré-Novice',
    levels : ['MAHG 1', 'MAHG 2' ],
    groupe : ['1','2','3']
  }, {
    id: 1,
    name: 'Novice',
    levels : ['A', 'B', 'C'],
    groupe : ['1', '2', '3', '4', '5', 'Clinique défenseur']
    }, {
    id: 2,
    name: 'Atome',
    levels : ['BB', 'CC', 'A', 'B', 'C'],
    groupe : ['1', '2', '3', 'Féminin', 'Clinique défenseur']
  }, {
    id: 3,
    name: 'Pee-Wee',
    levels : ['AA','BB', 'CC', 'A', 'B', 'C'],
    groupe : ['1', '2', '3', 'Féminin', 'Clinique défenseur']
  }, {
    id: 4,
    name: 'Bantam',
    levels : ['AA','BB', 'CC', 'A', 'B', 'C'],
    groupe : ['1', '2', '3', 'Féminin']
  }, {
    id: 5,
    name: 'Midget',
    levels : ['AA','BB', 'CC', 'A', 'B', 'C'],
    groupe : ['1', '2', '3', 'Féminin']
  }, {
    id: 6,
    name: 'Junior',
    levels : ['A', 'B'],
    groupe : ['1', '2']
  }];

  return {
    all: function() {
      return teams;
    },
    remove: function(team) {
      team.splice(teams.indexOf(team), 1);
    },
    get: function(teamId) {
      for (var i = 0; i < teams.length; i++) {
        if (teams[i].id === parseInt(teamId)) {
          return teams[i];
        }
      }
      return null;
    }
  };
});
