angular.module('starter.controllers', [])

.controller('ChampsCtrl', function($scope, Champions, champData, $log) {
  $scope.select = {};
  $scope.allChampions = [];
  $scope.champions = [];
  $scope.listOfOptions = ['All', 'Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];
  $scope.select.optionOne = $scope.listOfOptions[0];
  
  angular.forEach(champData.data.data, function(element) {
    $scope.allChampions.push(element);
    $scope.champions.push(element);
  });
  
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

.controller('ChampDetailCtrl', function($scope, $stateParams, Champions, $log){
  $scope.champData = Champions.getChamp($stateParams.champId).then(function(data){
    $scope.champion = data;
  });
  $log.log("Request Champ: " + $stateParams.champId);
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
