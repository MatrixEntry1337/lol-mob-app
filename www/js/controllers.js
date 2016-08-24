angular.module('starter.controllers', [])

.controller('ChampsCtrl', function($scope, Champions, champData, $log) {
  
  $scope.select = {};
  $scope.allChampions = [];
  $scope.champions = [];
  $scope.searchedChamps;
  $scope.filterChamps;
  $scope.listOfOptions = ['All', 'Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  $scope.select.optionOne = $scope.listOfOptions[0];
  $scope.select.optionTwo;

  
  //Grab Champions and tags
  angular.forEach(champData.data.data, function(element) {
    $scope.allChampions.push(element);
    $scope.champions.push(element);
    $log.log("Got all champions.");
  });
  
  $scope.getSearchResults = function(){
    // Debug
    // $log.log("Start Seearch");
    // $log.log("Looking for: " + $scope.select.optionTwo);
    
    var test;
    var resultArray = [];
    if($scope.select.optionTwo){
      var lookUp = "" + $scope.select.optionTwo;
      lookUp = lookUp.toLowerCase();
      lookUp = new RegExp(lookUp + '+');
      
      angular.forEach($scope.allChampions, function(element){
        test = "" + element.name;
        test = test.toLowerCase();
        if(lookUp.test(test))
          // $log.log(element.name);
          resultArray.push(element);
      });
      
      $scope.searchedChamps = resultArray;
      $scope.selectedItemChange();
      $log.log("Search Completed.");
    }else{
      // $scope.champions = $scope.allChampions;
      $scope.selectedItemChange();
      $log.log("Search not activated");
    }
  };
  
  //Execute filter changes for the champion tab
  $scope.selectedItemChange = function(){
    var temp = [];
    if($scope.select.optionTwo){
      $log.log("Entered");
      if($scope.select.optionOne != "All"){
        for(var i = 0; i < $scope.searchedChamps.length; i++){
          $log.log($scope.searchedChamps[i].tags[0]);
          if($scope.searchedChamps[i].tags[0] == $scope.select.optionOne) 
            temp.push($scope.searchedChamps[i]);
          if($scope.searchedChamps[i].tags[1])
            if($scope.searchedChamps[i].tags[1] == $scope.select.optionOne) 
              temp.push($scope.searchedChamps[i]);
        }
        $scope.champions = temp;
      }
      else $scope.champions = $scope.searchedChamps;
      
      //Debug
      $log.log("Champions loaded: ");
      for(var j = 0; j < $scope.champions.length; j++){
        $log.log($scope.champions[j].name);
      }
    }
    else {if($scope.select.optionOne != "All"){
      $log.log("Executing filter search");
      for(var i = 0; i < $scope.allChampions.length; i++){
        
        if($scope.allChampions[i].tags[0] == $scope.select.optionOne) 
          temp.push($scope.allChampions[i]);
        if($scope.allChampions[i].tags[1])
          if($scope.allChampions[i].tags[1] == $scope.select.optionOne) 
            temp.push($scope.allChampions[i]);
      }
      $scope.champions = temp;
      //Debug
      $log.log("Champions loaded: ");
      for(var j = 0; j < $scope.champions.length; j++){
        $log.log($scope.champions[j].name);
      }
    }
    else {
      $scope.champions = $scope.allChampions;
      $log.log("changes to all champs here");}
    }
  };
  
})

//Controller for Champion Details
.controller('ChampDetailCtrl', function($scope, $stateParams, Champions, $log){
  
  $scope.spells;
  $scope.stats;
  
  $scope.champLore = Champions.getChampLore($stateParams.champId).then(function(data){
    $scope.champion = data;
  });
  
  $scope.champStats = Champions.getChampStats($stateParams.champId).then(function(data){
    $scope.stats = data.stats;
  });
  
  $scope.champSpells = Champions.getChampSpells($stateParams.champId).then(function(data){
   $scope.spells = data.spells;
  });
  
  $scope.select = {};
  $scope.showOptions = { showLore: false, showStats: true, showSpells: false};
  $scope.listOfOptions = ['Lore', 'Stats', 'Spells'];
  
  $scope.selectedItemChange = function(){
    if($scope.select.option == $scope.listOfOptions[0]){
      $scope.showOptions.showStats = false;
      $scope.showOptions.showSpells = false;
      $scope.showOptions.showLore = true;
    }
    else if($scope.select.option == $scope.listOfOptions[1]){
      $scope.showOptions.showStats = true;
      $scope.showOptions.showSpells = false;
      $scope.showOptions.showLore = false;
    }
    else{
      $scope.showOptions.showStats = false;
      $scope.showOptions.showSpells = true;
      $scope.showOptions.showLore = false;
    }
    
  };
  
  $scope.max = function(base, perLevel){
    var calc = base + (perLevel * 18);
    if(calc > 0)
      calc = calc.toFixed(3);
    else return base;
    return calc;
  };
  
})

.controller('ItemsCtrl', function($scope, Items , ItemData, $log){
  $scope.items = [];
  
  angular.forEach(ItemData.data.data, function(element){
    $scope.items.push(element);
  });
})

.controller('ItemsDetailCtrl', function($scope, $stateParams, Items, $log){
  $log.log("Selected $scope item: " + $stateParams.itemId);
});
