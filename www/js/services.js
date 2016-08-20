angular.module('starter.services', [])

.factory('Champions', function($http, $log, $q){
  var champions = {};
  champions.champPool;
  
  champions.getChampData = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion'
    + '?champData=tags&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .success(function(data){
      console.log("Data from Riot was successfuly obtained");
    });
  };
  
  champions.getChamp = function(champId){
    
   return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId 
    + '?champData=lore&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .then(function(response){
      console.log("Data from Riot was successfully obtained");
      return response.data;
    });
  };
  
  return champions;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
