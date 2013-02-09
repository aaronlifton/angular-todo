'use strict';

/* Controllers */

function TodoCtrl($scope) {

  $scope.todos = angular.fromJson(window.localStorage['todos']) || [
    {id: 1, text:'learn angular', done: true},
    {id: 2, text:'build an angular app', done: false}];

  $scope.$watch('todosJson()', function(result) {
    window.localStorage['todos'] = result;
  });

  $scope.todosJson = function() {
    return angular.toJson($scope.todos)
  };

  $scope.addTodo = function() {
    $scope.todos.push({id: Math.floor(Math.random()*1000), text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.deleteTodo = function(todo) {
    $scope.todos.push.apply($scope.todos.splice($scope.todos.indexOf(todo), $scope.todos.length));
    if ($scope.todos.length === 0) {
      $scope.playVictorySound()
    }
  }

  $scope.startEditing = function(todo) {
    todo.isEditing = true;
  };

  $scope.stopEditing = function(todo) {
    todo.isEditing = false;
  }

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.completed = function() {
    return $scope.todos.length - $scope.remaining();
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });

    if ($scope.todos.length == 0) {
      $scope.playVictorySound()
    }
  };

  $scope.playVictorySound = function() {
    var sound = document.getElementById("victorySound");
    if (window.chrome) sound.load();
    sound.play()
  };
}
