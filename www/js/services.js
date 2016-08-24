angular.module('starter.services', [])

.factory('Champions', function($http, $log){
  var champions = {};
  champions.data = [];
  champions.originalOne;
  champions.origianlTwo;
  
  
  //Filer and Search Champions
  champions.getSearchResults = function(optionOne, optionTwo){
    // Debug
    // $log.log(champions.data);
    // $log.log("Champions loaded: ");
    // angular.forEach(champions.data, function(element){
    //   $log.log(element);
    // });
    $log.log("Option One: " + optionOne);
    $log.log("Option Two: " + optionTwo);
    
    var test, resultArray = [], temp = [], lookUp;
    
    if(optionOne && optionTwo){
      lookUp = "" + optionOne;
      lookUp = lookUp.toLowerCase();
      lookUp = new RegExp(lookUp + '+');
      angular.forEach(champions.data, function(element){
        test = "" + element.name;
        test = test.toLowerCase();
        if(lookUp.test(test))
          // $log.log(element.name);
          temp.push(element);
      });
      
      if(optionTwo != "All"){
        for(var i = 0; i < temp.length; i++){
          if(temp[i].tags[0] == optionTwo) 
            resultArray.push(temp[i]);
          if(temp[i].tags[1])
            if(temp[i].tags[1] == optionTwo) 
              resultArray.push(temp[i]);
        }
      }
      else resultArray = temp;
    }
    else if(optionOne){
      lookUp = "" + optionOne;
      lookUp = lookUp.toLowerCase();
      lookUp = new RegExp(lookUp + '+');
      angular.forEach(champions.data, function(element){
        test = "" + element.name;
        test = test.toLowerCase();
        if(lookUp.test(test))
          // $log.log(element.name);
          resultArray.push(element);
      });
    }else{
      if(optionTwo != "All"){
        angular.forEach(champions.data, function(element){
          if(element.tags[0] == optionTwo) 
            resultArray.push(element);
          if(element.tags[1])
            if(element.tags[1] == optionTwo) 
              resultArray.push(element);
        });
      } else resultArray = champions.data;
      //   for(var i = 0; i < temp.length; i++){
      //     if(temp[i].tags[0] == optionTwo) 
      //       resultArray.push(temp[i]);
      //     if(temp[i].tags[1])
      //       if(temp[i].tags[1] == optionTwo) 
      //         resultArray.push(temp[i]);
      //   }
      // } else resultArray = champions.data;
    }
    return resultArray;
    
  };
  
  champions.getChampTags = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion'
    + '?champData=tags&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .success(function(response){
      var temp = [];
      console.log("Data from Riot was successfuly obtained: Champions"); 
      // angular.copy(response.data, champions.data);
      angular.forEach(response.data, function(element) {
        temp.push(element); 
      });
      
      champions.data = temp;
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
