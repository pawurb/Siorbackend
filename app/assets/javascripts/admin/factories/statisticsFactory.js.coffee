angular.module('SiorbStats').factory('Statistics', ['$http', ($http) ->

  init = ->
    setCredentials = (username, password) ->
      encoded = btoa(username + ':' + password)
      $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    setCredentials(gon.admin_login, gon.admin_password)

  init()


  error = ->
    console.log 'Error'

  #callbacks approach
  query: (success) ->
    $http(
      method: "GET"
      url: "/statistics"
    ).success(success)
  remove: (id, success) ->
    $http(
      method: "DELETE"
      url: "/statistics/#{id}")
    .success(success)
    .error(error)

])