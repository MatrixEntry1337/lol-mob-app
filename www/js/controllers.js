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
  
  $scope.spells;
  $scope.stats;
  
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
  
});
