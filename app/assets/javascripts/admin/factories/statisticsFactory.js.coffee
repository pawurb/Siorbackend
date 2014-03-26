angular.module('SiorbStats').factory('Statistics', ['$http', ($http) ->

  init = ->
    setCredentials = (username, password) ->
      encoded = btoa(username + ':' + password)
      $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    setCredentials(gon.admin_login, gon.admin_password)

  init()


  #public interface

  asyncQuery: (callback) ->
    $http(
      method: "GET"
      url: "/statistics"
    ).success(callback)
  remove: (id, success, error) ->
    $http(
      method: "DELETE"
      url: "/statistics/#{id}")
    .success(success)
    .error(error)

])