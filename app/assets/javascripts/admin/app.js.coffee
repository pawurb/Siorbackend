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

app.run(['$http', ($http) ->
  setCredentials = (username, password) ->
    encoded = btoa(username + ':' + password)
    $http.defaults.headers.common.Authorization = 'Basic ' + encoded
  setCredentials(gon.admin_login, gon.admin_password)
])

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

  $rootScope.setUnixDate = (object) ->
    array = object.date.trim().split(' ')
    dateData = array[0]
    timeData = array[1]
    dateArray = dateData.split('-')
    timeArray = timeData.split(':')
    year = '20' + dateArray[2]
    month = parseInt(dateArray[1]) - 1
    day = dateArray[0]
    hours = timeArray[0]
    minutes = timeArray[1]
    date = new Date(year, month, day, hours, minutes)
    object.unix_date = date.getTime()
])