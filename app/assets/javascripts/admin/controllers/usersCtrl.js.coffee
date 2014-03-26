angular.module('SiorbStats').controller('UsersController', ['$scope', 'Users', ($scope, Users) ->

  # fetch Users json
  Users.queryAsync((results)->
    $scope.users = results['users']
  )

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



