angular.module('SiorbStats').controller('StatisticsController', ['$scope', 'Statistics', ($scope, Statistics) ->

  syncUsers = ->
    success = (results) ->
      $scope.statistics = results['statistics']
    Statistics.asyncQuery(success)
  syncUsers()

  $scope.removeStat = (id) ->
    success = ->
      syncUsers()
    error = ->
      console.log 'error'
    Statistics.remove(id, success, error)


  # sorting config
  $scope.order.attr = 'date'
])



