
var app = angular.module('sounds', []);

//get the tracks from a user endpoint
app.service('soundService', function($http) {
  //our function to get tracks by username
  this.getArtist = function(artist) {
    return $http({
      method: 'GET',
      url: 'https://api.soundcloud.com/users/' + artist + '/tracks.json?client_id=342297131a6c409e310499d2f2d1d476'
    })
  };

})

//app controller
app.controller('MainController', function($scope, soundService, $sce) {
  //get the artist after the user hits submit
  $scope.getArtist = function() {
    console.log($scope.searchArtist); //print out artist entered in form
    if($scope.searchArtist.indexOf(' ') !== -1) { //checks for blank submission
      $scope.searchArtist = $scope.searchArtist.replace(' ', '-')
    }
    //runs our get request from service above
    soundService.getArtist($scope.searchArtist).then(function(data) {
      $scope.artist = data.data;
     // console.log($scope.artist); //our array of songs from user
    })
    $scope.searchArtist = ''; //set artist back to blank
  }

  //function to play song that user ng-clicks on
  $scope.play = function(track_url) {
    console.log(track_url); //display track url
    //SC api embed the player and play the track_url selected
    SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
      $scope.$apply($scope.iFrame = $sce.trustAsHtml(oEmbed.html));
    });
  }

});

