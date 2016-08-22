angular.module('starter.services', [])

.factory('Champions', function($http, $log, $q){
  var champions = {};
  champions.champPool;
  
  champions.getChampTags = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion'
    + '?champData=tags&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .success(function(data){
      console.log("Data from Riot was successfuly obtained: Tags");
    });
  };
  
  champions.getChampLore = function(champId){
   return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId 
    + '?champData=lore&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .then(function(response){
      console.log("Data from Riot was successfully obtained: Lore");
      return response.data;
    });
  };
  
  champions.getChampStats = function(champId){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId 
    + '?champData=stats&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .then(function(response){
      console.log("Data from Riot was successfully obtained: Stats");
      return response.data;
    });
  };
  
  champions.getChampSpells = function(champId){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId 
    + '?champData=spells&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .then(function(response){
      console.log("Data from Riot was successfully obtained: Spells");
      return response.data;
    });
  };
  
  return champions;

});
