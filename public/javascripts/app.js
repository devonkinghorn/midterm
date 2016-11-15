angular.module('comment', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $scope.dogs = [];
      $scope.addDog = function () {
        var newDog = { name: $scope.name, upvotes: 0, breed: $scope.breed };
        $scope.name = '';
        $scope.breed = '';
        $http.post('/dogs', newDog).success(function (dog) {
          $scope.dogs.push(dog);
        });
      };
      $scope.upvote = function (dog) {
        return $http.put('/dogs/' + dog._id + '/upvote')
          .success(function (data) {
            console.log("upvote worked");
            dog.upvotes = data.upvotes;
            console.log($scope.dogs)
          });
      };
      $scope.incrementUpvotes = function (dog) {
        $scope.upvote(dog);
      };
      $scope.delete = function (comment) {
        $http.delete('/dogs/' + comment._id)
          .success(function (data) {
            console.log("delete worked");
          });
        $scope.getAll();
      };
      $scope.getAll = function () {
        return $http.get('/dogs').success(function (data) {
          angular.copy(data, $scope.dogs);
        });
      };
      $scope.getAll();

    }
  ]);
