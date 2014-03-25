angular.module('SiorbStats').directive "navigation", ->
  restrict: "E"
  template: "<div>" +
   "<a href='/admin/#/users'>Users</a> " + "<a href='/admin/#/statistics'>Statistics</a>" +
   "</div>"
