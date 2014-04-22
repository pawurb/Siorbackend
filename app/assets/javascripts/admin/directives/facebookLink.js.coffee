angular.module("SiorbStats").directive "facebookLink", ->
  priority: 1
  terminal: true
  link: (scope, element, attr) ->
    element.bind "click", ->
      fbUser = attr.facebookLink or ""
      window.open "https://www.facebook.com/" + fbUser
