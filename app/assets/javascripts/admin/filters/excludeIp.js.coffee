angular.module('SiorbStats').filter "excludeIp", ->
  ipExcludingFunction = (input, query) ->

    #filters when query is at least 5 chars
    if input && query && query.ip.length >= 5
      excludeIp = (stat) ->
        stat.ip.toString().indexOf(query.ip) == -1

      _.select(input, excludeIp)
    else
      input


  ipExcludingFunction
