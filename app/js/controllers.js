'use strict';

/* Controllers */

function TodoCtrl($scope) {
  $scope.todos = [
    {id: 1, text:'learn angular', done: true},
    {id: 2, text:'build an angular app', done: false}];

  $scope.addTodo = function() {
    $scope.todos.push({id: Math.floor(Math.random()*1000), text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.startEditing = function(todo) {
    todo.isEditing = true;
  };

  $scope.stopEditing = function(todo) {
    todo.isEditing = false;
  }
}
