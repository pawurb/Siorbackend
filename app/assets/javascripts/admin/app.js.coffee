app = angular.module('SiorbStats', ['ngRoute', 'ng-rails-csrf', 'ngAnimate'])

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

app.run(['$rootScope', ($rootScope) ->

  # common sorting config
  $rootScope.order = {}
  $rootScope.order.reverse = true

  $rootScope.order.setAttr = (orderAttr) ->
    if $rootScope.order.attr == orderAttr
      $rootScope.order.reverse = !$rootScope.order.reverse
    else
      $rootScope.order.attr = orderAttr
      $rootScope.order.reverse = true
])