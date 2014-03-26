angular.module('SiorbStats').controller('StatisticsController', ['$scope', 'Statistics', ($scope, Statistics) ->

  syncStats = ->
    success = (results) ->
      $scope.statistics = results['statistics']
    Statistics.asyncQuery(success)
  syncStats()

  $scope.removeStat = (id) ->
    success = ->
      syncStats()
    error = ->
      console.log 'error'
    Statistics.remove(id, success, error)


  # sorting config
  $scope.order.attr = 'date'
])



