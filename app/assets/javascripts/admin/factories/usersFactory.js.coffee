angular.module('SiorbStats').factory('Users', ['$http', ($http) ->

  init = ->
    setCredentials = (username, password) ->
      encoded = btoa(username + ':' + password)
      $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    setCredentials(gon.admin_login, gon.admin_password)

  init()


  #public intefrace

  queryAsync: (callback) ->
    $http(
      method: "GET"
      url: "/users"
    ).success(callback)
])