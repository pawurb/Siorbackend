angular.module('SiorbStats').controller('StatisticsController', ['$scope', 'Statistics', ($scope, Statistics) ->

  $scope.statistics = []
  $scope.uniqCount = 0
  $scope.sharesCount = 0

  syncStats = ->
    successQuery = (results) ->
      $scope.statistics = results['statistics']
    successUniqCount = (results) ->
      $scope.uniqCount = results['count']
    successSharesCount = (results) ->
      $scope.sharesCount = results['shares']
    Statistics.query(successQuery)
    Statistics.uniqCount(successUniqCount)
    Statistics.sharesCount(successSharesCount)

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



