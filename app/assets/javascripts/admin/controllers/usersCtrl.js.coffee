angular.module('SiorbStats').controller('UsersController', ($scope, $http) ->
  $scope.users = [
  ]

  setCredentials = (username, password) ->
    encoded = btoa(username + ':' + password)
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    # $cookieStore.put('authdata', encoded)
  getData = ->
    $http(
      method: "GET"
      url: "/users"

    ).success((data, status, headers, config) ->
      console.log data
      $scope.users = data['users']
    ).error (data, status, headers, config) ->
      console.log 'errora'


  setCredentials(gon.admin_login, gon.admin_password)
  getData()



)



