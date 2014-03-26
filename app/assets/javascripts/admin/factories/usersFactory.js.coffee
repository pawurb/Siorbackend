angular.module('SiorbStats').factory('Users', ['$http', ($http, $q) ->

  init = ->
    setCredentials = (username, password) ->
      encoded = btoa(username + ':' + password)
      $http.defaults.headers.common.Authorization = 'Basic ' + encoded
    setCredentials(gon.admin_login, gon.admin_password)

  init()

  #promises approach
  error = (response) ->
    console.log 'Error'
    $q.reject(response.data)

  query: (success) ->
    $http.get('/users').then(success, error)
  remove: (id, success) ->
    $http.delete("/users/#{id}").then(success, error)
])