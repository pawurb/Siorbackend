angular.module('SiorbStats').controller('StatisticsController', ['$scope', 'Statistics', ($scope, Statistics) ->

  syncStats = ->
    successQuery = (results) ->
      $scope.statistics = results['statistics']
    successUniqCount = (results) ->
      $scope.uniqCount = results['count']
    Statistics.query(successQuery)
    Statistics.uniqCount(successUniqCount)


  syncStats()

  $scope.removeStat = (id) ->
    success = ->
      syncStats()
    Statistics.remove(id, success)

  $scope.reloadData = ->
    syncStats()

  # sorting config
  $scope.order.attr = 'created_at_unix'
])



