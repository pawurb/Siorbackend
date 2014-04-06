angular.module('SiorbStats').controller('UsersController', ['$scope', 'Users', ($scope, Users) ->

  syncUsers = ->
    success = (response) ->
      users = response.data['users']
      _.each users, $scope.setUnixDate
      $scope.users = users
    Users.query(success)
  syncUsers()

  $scope.removeUser = (id) ->
    success = ->
      syncUsers()
    Users.remove(id, success)
  $scope.reloadData = ->
    syncUsers()

  # sorting config
  $scope.order.attr = 'unix_date'
])



