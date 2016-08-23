angular.module('starter.controllers', [])

.controller('ChampsCtrl', function($scope, Champions, champData, $log) {
  
  $scope.select = {};
  $scope.allChampions = [];
  $scope.items = [];
  $scope.champions = [];
  $scope.championImages = [];
  $scope.listOfOptions = ['All', 'Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  $scope.select.optionOne = $scope.listOfOptions[0];
  
  //Grab Champions and tags
  angular.forEach(champData.data.data, function(element) {
    $scope.allChampions.push(element);
    $scope.champions.push(element);
  });
  
  //Execute filter changes for the champion tab
  $scope.selectedItemChange = function(){
    var temp = [];
    $log.log("here");
    if($scope.select.optionOne != "All"){
      for(var i = 0; i < this.allChampions.length; i++){
        
        if(this.allChampions[i].tags[0] == $scope.select.optionOne) temp.push(this.allChampions[i]);
        if(this.allChampions[i].tags[1])
          if(this.allChampions[i].tags[1] == $scope.select.optionOne) temp.push(this.allChampions[i]);
      }
      
      this.champions = temp;
      
      //Debug
      $log.log("Champions loaded: ");
      for(var j = 0; j < this.champions.length; j++){
        $log.log(this.champions[j].name);
      }
    }
    else this.champions = this.allChampions;
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
    if(this.select.option == this.listOfOptions[0]){
      this.showOptions.showStats = false;
      this.showOptions.showSpells = false;
      this.showOptions.showLore = true;
    }
    else if(this.select.option == this.listOfOptions[1]){
      this.showOptions.showStats = true;
      this.showOptions.showSpells = false;
      this.showOptions.showLore = false;
    }
    else{
      this.showOptions.showStats = false;
      this.showOptions.showSpells = true;
      this.showOptions.showLore = false;
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
  $log.log("Selected this item: " + $stateParams.itemId);
});
