angular.module('SiorbStats').factory('Statistics', ['$http', ($http) ->

  error = ->
    console.log 'Error'

  #callbacks approach
  query: (success) ->
    $http(
      method: "GET"
      url: "/api/statistics"
    ).success(success).error(error)
  uniqCount: (success) ->
    $http(
      method: "GET"
      url: "/api/statistics/uniq_count"
    ).success(success).error(error)
  sharesCount: (success) ->
    $http(
      method: "GET"
      url: "http://graph.facebook.com/?id=https://siorb.dobreziele.pl"
    ).success(success).error(error)

  remove: (id, success) ->
    $http(
      method: "DELETE"
      url: "/api/statistics/#{id}")
    .success(success).error(error)

])
