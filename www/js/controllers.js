angular.module('starter.controllers', [])

.controller('ChampsCtrl', function($scope, Champions, champData, $log) {
  
  $scope.allChampions = []; //all champs
  $scope.champions = []; //champs sent to view
  
  $scope.searchedChamps;
  $scope.filterChamps;
  
  $scope.listOfOptions = ['All', 'Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  $scope.select = {};
  $scope.select.optionOne;
  $scope.select.optionTwo = $scope.listOfOptions[0];
  
  //Grab Champions and tags
  angular.forEach(champData.data.data, function(element) {
    $scope.allChampions.push(element);
    $scope.champions.push(element);
  });
  
  $scope.getSearchResults = function(){
    $scope.champions = Champions.getSearchResults($scope.select.optionOne, $scope.select.optionTwo);
  // Debug
    $log.log("Champions loaded: ");
    for(var j = 0; j < $scope.champions.length; j++){
      $log.log($scope.champions[j].name);
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
