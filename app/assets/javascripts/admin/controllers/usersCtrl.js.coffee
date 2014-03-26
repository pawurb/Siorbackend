angular.module('SiorbStats').controller('UsersController', ['$scope', '$http', ($scope, $http) ->
  $scope.users = [
  ]

  $scope.order =
    attr:'best_score'
    reverse: true

  $scope.order.reverse = true
  $scope.order.setAttr = (orderAttr) ->
    if $scope.order.attr == orderAttr
      $scope.order.reverse = !$scope.order.reverse
    else
      $scope.order.attr = orderAttr
      $scope.order.reverse = true

  setCredentials = (username, password) ->
    encoded = btoa(username + ':' + password)
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    # $cookieStore.put('authdata', encoded)
  getData = ->
    $http(
      method: "GET"
      url: "/users"

    ).success((data, status, headers, config) ->
      $scope.users = data['users']
    ).error (data, status, headers, config) ->
      console.log 'errora'

  setCredentials(gon.admin_login, gon.admin_password)
  getData()

])



