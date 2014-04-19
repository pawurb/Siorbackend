angular.module('SiorbStats').factory('Statistics', ['$http', ($http) ->

  error = ->
    console.log 'Error'

  #callbacks approach
  query: (success) ->
    $http(
      method: "GET"
      url: "/statistics"
    ).success(success)
  uniqCount: (success) ->
    $http(
      method: "GET"
      url: "/statistics/uniq_count"
    ).success(success)
  sharesCount: (success) ->
    $http(
      method: "GET"
      url: "http://graph.facebook.com/?id=http://siorb.dobreziele.pl"
    ).success(success)

  remove: (id, success) ->
    $http(
      method: "DELETE"
      url: "/statistics/#{id}")
    .success(success)
    .error(error)

])