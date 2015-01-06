'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.controllers'
]).
    run(function($rootScope){
        $rootScope.title = 'Famous Books';
        $rootScope.name = 'Root Scope';
    });
