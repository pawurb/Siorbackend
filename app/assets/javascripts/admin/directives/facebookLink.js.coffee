angular.module("SiorbStats").directive "facebookLink", ->
  restrict: 'A'
  require: '^ngUser'
  scope:
    ngUser: '='
  template: "<a ng-href='https://www.facebook.com/{{ngUser.fb_nickname}}' target='_blank'><img src='{{ngUser.image_url}}'></img></a>"
