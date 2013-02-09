'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('containsHashTags', function() {
    return function(text) {
      var tags   = text.match(/#[\w]*/g),
          result = String(text);
          
      if (tags !== null) {
        for (var i = 0; i < tags.length; i++) {
          result = result.replace(new RegExp(tags[i]), "<span class='muted'>"+ tags[i] +"</span>");
        }
      }
      return result;
    }
  });