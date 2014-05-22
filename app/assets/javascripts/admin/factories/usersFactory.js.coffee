angular.module('SiorbStats').factory('Users', ['$http', ($http, $q) ->

  #promises approach
  error = (response) ->
    console.log 'Error'
    $q.reject(response.data)

  query: (success) ->
    $http.get('/api/users').then(success, error)
  remove: (id, success) ->
    $http.delete("/api/users/#{id}").then(success, error)
])