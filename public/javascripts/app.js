var app = window.angular.module('app', [])

app.factory('addressFetcher', addressFetcher)
app.controller('mainCtrl', mainCtrl)

function addressFetcher ($http) {

  var API_ROOT = 'addresses'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    } 
  }
}

function mainCtrl ($scope, addressFetcher) {

  $scope.addresses = []

  addressFetcher.get()
    .then(function (data) {
      $scope.addresses = data
    })

  $scope.addAddress = function() {
    var formData = {name:$scope.Name,homeAddress:$scope.hA,phone:$scope.phoneNumber,pictureUrl:$scope.Picture};
    console.log(formData);
    addressFetcher.post(formData); 
    $scope.addresses.push(formData); 
  }

}
