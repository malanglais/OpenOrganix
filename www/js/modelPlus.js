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
  this.ranking=null;
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
    this.eventStatus = ev.status;
    
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

