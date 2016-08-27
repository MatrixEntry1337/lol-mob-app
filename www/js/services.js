angular.module('starter.services', [])

.factory('Champions', function($http, $log){
  var champions = {};
  champions.data = [];
  champions.originalOne;
  champions.origianlTwo;
  
  
  //Filer and Search Champions
  champions.getSearchResults = function(optionOne, optionTwo){
    //Debug
    // $log.log(champions.data);
    // $log.log("Champions loaded: ");
    // angular.forEach(champions.data, function(element){
    //   $log.log(element);
    // });
    // $log.log("Option One: " + optionOne);
    // $log.log("Option Two: " + optionTwo);
    
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
      }else resultArray = champions.data;
    }
    return resultArray;
  };
  
  champions.getChampTags = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion'
    + '?champData=tags&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .success(function(response){
      var temp = [];
      $log.log("Data from Riot was successfuly obtained: Champions"); 
      // angular.copy(response.data, champions.data);
      angular.forEach(response.data, function(element) {
        temp.push(element);
      });
      champions.data = temp;
    });
  };
  
  champions.getChampData = function(champId){
   return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId 
    + '?champData=all&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .then(function(response){
      $log.log("Data from Riot was successfully obtained: Champ Lore");
      return response.data;
    });
  };
  
  return champions;

})

.factory('Items', function($http, $log){
  var items = {};
  
  items.getSearchResults = function(optionOne, optionTwo){
    var test, resultArray = [], temp = [], lookUp;
    
    // $log.log(optionTwo);
    
    if(optionOne && optionTwo){
      lookUp = "" + optionOne;
      lookUp = lookUp.toLowerCase();
      lookUp = new RegExp(lookUp + '+');
      angular.forEach(items.data, function(element){
        test = "" + element.name;
        test = test.toLowerCase();
        if(lookUp.test(test))
          // $log.log(element.name);
          temp.push(element);
      });
      
      if(optionTwo != "All"){
        for(var i = 0; i < temp.length; i++){
          if(!temp[i].tags){
            if(optionTwo == 'Miscellaneous')
              resultArray.push(temp[i]);
          }else{
            if(temp[i].tags[0] == optionTwo) 
              resultArray.push(temp[i]);
            if(temp[i].tags[1])
              if(temp[i].tags[1] == optionTwo) 
                resultArray.push(temp[i]);
          }
        }
      }
      else resultArray = temp;
    }
    else if(optionOne){
      lookUp = "" + optionOne;
      lookUp = lookUp.toLowerCase();
      lookUp = new RegExp(lookUp + '+');
      angular.forEach(items.data, function(element){
        test = "" + element.name;
        test = test.toLowerCase();
        if(lookUp.test(test))
          // $log.log(element.name);
          resultArray.push(element);
      });
    }else{
      if(optionTwo != "All"){
        angular.forEach(items.data, function(element){
          if(!element.tags){
            if(optionTwo == 'Miscellaneous')
              resultArray.push(element);
          }else{
            if(element.tags[0] == optionTwo) 
              resultArray.push(element);
            if(element.tags[1])
              if(element.tags[1] == optionTwo) 
                resultArray.push(element);
          }
        });
      }else resultArray = items.data;
    }
    return resultArray;
  };
  
  items.getItems = function(){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/item'
    + '?itemListData=tags&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')  
    .success(function(response){
      var temp = [];
      angular.forEach(response.data, function(element) {
        temp.push(element); 
      });
      items.data = temp;
      $log.log("Data from Riot was successfuly obtained: Items");
    });
  };
  
  items.getItemData = function(itemData){
    return $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/'
    + itemData + '?itemData=all&api_key=RGAPI-92E49C03-4CA0-4923-8DEB-7011FA9D8E6A')
    .then(function(response){
      $log.log("Data from Riot was successfully obtained: Item Stats");
      return response.data;
    });
  };
  
  return items;
})

.factory('MatchInfo', function($http, $log){
  var matchInfo = {};
  
  matchInfo.displayParameters = function(champName, option){
    $log.log("Champion: " + champName);
    $log.log("Option: " + option);
  };
  
  matchInfo.getFiller = function(){
    return $http.get('https://baconipsum.com/api/?type=all-meat&paras=3&format=html')
    .then(function(response){
        $log.log("Response from server: " +response.data);
        return response.data;
    });
  };
  
  return matchInfo;
})

.factory('ChampCalc', function($http, $log){
  var champCalc = {};
  
  return champCalc;
});
