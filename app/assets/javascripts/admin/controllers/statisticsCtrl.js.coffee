angular.module('SiorbStats').controller('StatisticsController', ['$scope', 'Statistics', ($scope, Statistics) ->

  syncStats = ->
    success = (results) ->
      statistics = results['statistics']
      _.each statistics, $scope.setUnixDate
      $scope.statistics = statistics
    Statistics.query(success)
  syncStats()

  $scope.removeStat = (id) ->
    success = ->
      syncStats()
    Statistics.remove(id, success)

  $scope.reloadData = ->
    syncStats()

  # sorting config
  $scope.order.attr = 'unix_date'
])



