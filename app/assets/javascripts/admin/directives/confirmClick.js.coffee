angular.module("SiorbStats").directive "confirmClick", ->
  priority: 1
  terminal: true
  link: (scope, element, attr) ->
    msg = attr.confirmClick or "Are you sure?"
    clickAction = attr.ngClick
    element.bind "click", ->
      scope.$eval clickAction  if window.confirm(msg)
