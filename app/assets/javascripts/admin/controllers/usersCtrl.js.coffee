angular.module('SiorbStats').controller('UsersController', ['$scope', 'Users', ($scope, Users) ->

  syncUsers = ->
    success = (results) ->
      $scope.users = results['users']
    Users.asyncQuery(success)
  syncUsers()

  $scope.removeUser = (id) ->
    success = ->
      syncUsers()
    error = ->
      console.log 'error'
    Users.remove(id, success, error)


  # sorting config
  $scope.order =
    attr:'best_score'
    reverse: true

  $scope.order.setAttr = (orderAttr) ->
    if $scope.order.attr == orderAttr
      $scope.order.reverse = !$scope.order.reverse
    else
      $scope.order.attr = orderAttr
      $scope.order.reverse = true
])



