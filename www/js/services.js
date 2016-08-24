angular.module('starter.services', [])

.factory('Champions', function($http, $log){
  var champions = {};
  
  // champions.getSearchResults = function(option){
  //   var test;
  //   var resultArray = [];
  //   if(option){
  //     var lookUp = "" + option;
  //     lookUp = lookUp.toLowerCase();
  //     lookUp = new RegExp(lookUp + '+');
      
  //     angular.forEach(champions.data, function(element){
  //       test = "" + element.name;
  //       test = test.toLowerCase();
  //       if(lookUp.test(test))
  //         // $log.log(element.name);
  //         resultArray.push(element);
  //     });
  //   }
    
  // };
  
  champions.getChampTags = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion'
    + '?champData=tags&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .success(function(response){
      angular.copy(response.data, champions.data);
      console.log("Data from Riot was successfuly obtained: Champions");
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

})

.factory('Items', function($http, $log){
  var items = {};
  
  items.getItems = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/item'
    + '?api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')  
    .success(function(response){
      console.log("Data from Riot was successfuly obtained: Items");
    });
  };
  
  return items;
});
