angular.module('SiorbStats').controller('UsersController', ($scope, $http) ->
  $scope.users = [
  ]

  setCredentials = (username, password) ->
    encoded = btoa(username + ':' + password)
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    # $cookieStore.put('authdata', encoded)

  setCredentials('admin', 'secret')

  $scope.getData = ->


    $http(
      method: "GET"
      url: "/users"

    ).success((data, status, headers, config) ->
      console.log 'succesa'
      console.log data
    ).error (data, status, headers, config) ->
      console.log 'errora'


)



