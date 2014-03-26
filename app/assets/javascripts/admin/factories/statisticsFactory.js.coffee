angular.module('SiorbStats').factory('Statistics', ['$http', ($http) ->

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