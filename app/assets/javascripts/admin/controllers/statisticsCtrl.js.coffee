angular.module('SiorbStats').controller('StatisticsController', ['$scope', 'Statistics', ($scope, Statistics) ->

  syncStats = ->
    success = (results) ->
      $scope.statistics = results['statistics']
    Statistics.query(success)
  syncStats()

  $scope.removeStat = (id) ->
    success = ->
      syncStats()
    Statistics.remove(id, success)

  $scope.reloadData = ->
    syncStats()


  # sorting config
  $scope.order.attr = 'date'
])



