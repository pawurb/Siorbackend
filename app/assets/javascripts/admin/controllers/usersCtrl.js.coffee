angular.module('SiorbStats').controller('UsersController', ['$scope', 'Users', ($scope, Users) ->

  $scope.users = []

  syncUsers = ->
    success = (response) ->
      $scope.users = response.data['users']
    $scope.users = []
    Users.query(success)
  syncUsers()

  $scope.removeUser = (id) ->
    success = ->
      syncUsers()
    Users.remove(id, success)
  $scope.reloadData = ->
    syncUsers()

  # sorting config
  $scope.order.attr = 'created_at_unix'
])



