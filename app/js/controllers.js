'use strict';

/* Shared functions */
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

/* Controllers */

function TodoCtrl($scope) {
  $scope.finishedTodo = false;
  
  $scope.todos = angular.fromJson(window.localStorage.todos) || [
    {id: 1, text:'learn angular', done: true},
    {id: 2, text:'build an angular app', done: false}];

  // Persist any changes to $scope.todos to local storage
  $scope.$watch('todosJson()', function(result) {
    window.localStorage.todos = result;
  });
  
  // Play victory sound whenever there are no todos left
  $scope.$watch('todos.length', function(length) {
    if (length === 0 && $scope.finishedTodo === true) {
      $scope.playVictorySound();
    }
  });

  // Convert todos to JSON for easy monitoring
  $scope.todosJson = function() {
    return angular.toJson($scope.todos)
  };

  // Add a todo to $scope.todos
  $scope.addTodo = function() {
    $scope.todos.push({id: randomString(5), text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  // Remove a todo from $scope.todos
  $scope.deleteTodo = function(todo) {
    $scope.todos.push.apply($scope.todos.splice($scope.todos.indexOf(todo), $scope.todos.length));
    $scope.finishedTodo = true;
  }

  // Put a todo in edit mode
  $scope.startEditing = function(todo) {
    todo.isEditing = true;
  };

  // Take a todo out of edit mode
  $scope.stopEditing = function(todo) {
    todo.isEditing = false;
  }

  // Count the number of remaining todos
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  // Count the number of completed todos
  $scope.completed = function() {
    return $scope.todos.length - $scope.remaining();
  };
 
  // Delete all completed todos
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
    $scope.finishedTodo = true;
  };

  // Play a victory jingle
  $scope.playVictorySound = function() {
    var sound = document.getElementById("victorySound");
    if (window.chrome) sound.load();
    sound.play()
  };
}
