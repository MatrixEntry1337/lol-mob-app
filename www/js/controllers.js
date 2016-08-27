angular.module('starter.controllers', [])

.controller('ChampsCtrl', function($scope, Champions, champData, $log) {
  
  $scope.champions = []; //champs sent to view
  
  $scope.listOfOptions = ['All', 'Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  $scope.select = {optionOne: null, optionTwo: $scope.listOfOptions[0]};
  
  //Grab Champions and tags
  angular.forEach(champData.data.data, function(element) {
    $scope.champions.push(element);
  });
  
  $scope.getSearchResults = function(){
    $scope.champions = Champions.getSearchResults($scope.select.optionOne, $scope.select.optionTwo);
  };
  
})

//Controller for Champion Details
.controller('ChampDetailCtrl', function($scope, $stateParams, Champions, $log){
  $scope.champData = Champions.getChampData($stateParams.champId).then(function(data){
    $scope.champion = data;
  });
  
  $scope.showOptions = { showLore: false, showStats: true, showSpells: false};
  $scope.listOfOptions = ['Stats', 'Spells', 'Lore'];
  $scope.select = {option: $scope.listOfOptions[0]};
  
  $scope.selectedItemChange = function(){
    if($scope.select.option == $scope.listOfOptions[0]){
      $scope.showOptions.showStats = true;
      $scope.showOptions.showSpells = false;
      $scope.showOptions.showLore = false;
    }
    else if($scope.select.option == $scope.listOfOptions[1]){
      $scope.showOptions.showStats = false;
      $scope.showOptions.showSpells = true;
      $scope.showOptions.showLore = false;
    }
    else{
      $scope.showOptions.showStats = false;
      $scope.showOptions.showSpells = false;
      $scope.showOptions.showLore = true;
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
  
  $scope.listOfOptions = [ 'All','Active', 'Armor', 'ArmorPenetration',
    'AttackSpeed', 'Aura', 'Boots', 'Consumable', 'CooldownReduction',
    'CriticalStrike', 'Damage', 'GoldPer', 'Health', 'HealthRegen',
    'Jungle', 'Lane', 'LifeSteal', 'MagicPenetration', 'Mana',
    'ManaRegen', 'Miscellaneous', 'NonbootsMovement', 'OnHit', 'Slow', 'SpellBlock',
    'SpellDamage', 'SpellVamp', 'Stealth', 'Tenacity', 'Trinket', 
    'Vision'];
    
  $scope.select = {};
  $scope.select.optionOne;
  $scope.select.optionTwo = $scope.listOfOptions[0];
  
  angular.forEach(ItemData.data.data, function(element){
    $scope.items.push(element);
  });
  
  $scope.getSearchResults = function(){
    $scope.items = Items.getSearchResults($scope.select.optionOne, $scope.select.optionTwo);
  };
  
})

.controller('ItemsDetailCtrl', function($scope, $stateParams, Items, $log){
  $scope.showOptions = {showStats: true};
  $scope.listOfOptions = ['Stats'];
  $scope.select = {option: $scope.listOfOptions[0]};
  $log.log("Selected $scope item: " + $stateParams.itemId);
  
  $scope.getItemData = Items.getItemData($stateParams.itemId).then(function(data){
    $scope.item = data;
  });
  
  $scope.selectedItemChange = function(){
    if($scope.select.option == 'Stats')
      $scope.showStats = true;
  };
})

.controller('MatchInfoCtrl', function($scope, MatchInfo, Champions, $log){
  $scope.champions;
  $scope.championPositions = [];
  $scope.select = { optionOne: null };
  $scope.listOfOptions = ['Bot', 'Mid', 'Jungle', 'Support', 'Top'];
  
  $scope.givePosition = function(champ){
    $log.log("Checking");
    var i = 0, found = false;
    if($scope.championPositions.length > 0){
      while( i < $scope.championPositions.length && !found){
        if($scope.championPositions[i].champName == champ){
          $log.log("Found Champ");
          $scope.championPositions[i].showPos = !$scope.championPositions[i].showPos;
          found = true;
        }
        i++;
      }
      if(!found)
        $scope.championPositions.push({ champName: champ, showPos: true });
    }else $scope.championPositions.push({ champName: champ, showPos: true });
  };
  
  $scope.showPositions = function(champ){
    for(var i = 0; i < $scope.championPositions.length; i++){
      if($scope.championPositions[i].champName == champ && $scope.championPositions[i].showPos)
        return true;
    }
    return false;
  };
  
  $scope.getSearchResults = function(){
    $log.log("Search executed.");
    $scope.champions = Champions.getSearchResults($scope.select.optionOne, null);
  };
  
})

.controller('MatchInfoDetailCtrl', function($scope, $stateParams, MatchInfo, $log){
  
  MatchInfo.displayParameters($stateParams.champ, $stateParams.option);
  
  $scope.getFiller = MatchInfo.getFiller().then(function(data){
    $scope.filler = data;
  });
})

.controller('ChampCalcCtrl', function($scope, Champions, ChampCalc, $log){
  $scope.select = {optionOne: null};
  
  
  $scope.getSearchResults = function(){
    $log.log("Search executed.");
    $scope.champions = Champions.getSearchResults($scope.select.optionOne, null);
  };
  
});
