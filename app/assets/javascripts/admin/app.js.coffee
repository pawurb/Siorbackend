app = angular.module('SiorbStats', ['ngRoute'])

app.config [
  "$routeProvider"
  ($routeProvider) ->
    $routeProvider.when("/users",
      templateUrl: "/admin/users.html"
      controller: "UsersController"
    ).when("/statistics",
      templateUrl: "/admin/statistics.html"
      controller: "StatisticsController"
    ).otherwise redirectTo: "/users"
]