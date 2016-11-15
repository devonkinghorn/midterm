angular.module('comment', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $scope.cars = [];
      $scope.addCar = function () {
        var newCar = {
          make: $scope.make,
          upvotes: 0,
          model: $scope.model,
          year: $scope.year,
          miles: $scope.miles,
          picture: $scope.picture,
          email: $scope.email
        };
        if(!(newCar.make && newCar.model && newCar.year && newCar.miles )){
          alert("Failed to insert. \n need to have a make, model, year, and miles")
          return;
        }
        $scope.make = '';
        $scope.model = '';
        $scope.year = '';
        $scope.miles = '';
        $scope.picture = '';

        $http.post('/cars', newCar).success(function (car) {
          $scope.cars.push(car);
        });
      };
      $scope.upvote = function (car) {
        return $http.put('/cars/' + car._id + '/upvote')
          .success(function (data) {
            console.log("upvote worked");
            car.upvotes = data.upvotes;
            console.log($scope.cars)
          });
      };
      $scope.incrementUpvotes = function (dog) {
        $scope.upvote(dog);
      };
      $scope.delete = function (comment) {
        console.log(comment)
        $http.delete('/cars/' + comment._id)
          .success(function (data) {
            console.log("delete worked");
          });
        $scope.getAll();
      };
      $scope.getAll = function () {
        return $http.get('/cars').success(function (data) {
          angular.copy(data, $scope.cars);
        });
      };
      $scope.getAll();

    }
  ]);
