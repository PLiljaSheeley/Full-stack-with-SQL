var app = angular.module("app", []);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {
  $scope.taskArray = [];
  $scope.taskObject = {};
  $scope.edit = false;
  $scope.toggle = true;
  $scope.count = 0;
  $scope.complete = false;

  $scope.getTasks = function() {
    $http.get("/tasks").then(function(response) {
      $scope.taskObject = {};
      $scope.taskArray = response.data;
      console.log(response.data);
    });
  };
  $scope.getTasks();

  $scope.add = function(task){
    $http.post('/tasks', task).then(function(response){
      $scope.getTasks()
    });
  };

  $scope.complete = function(task){
    if(task.complete===true){
    $http.put('/tasks/complete/' + task.id, task);
    }else{
    $http.put('/tasks/notComplete/' + task.id, task);
    }
  
  }
  $scope.setColor = function(task){
    if(task.complete===true){
      return {"background-color": "green"};
    }
  }

  $scope.deleteTask = function(task) {
    var x = confirm("Are you sure you want to delete this task?");
    if(x===true){
    $http.delete("/tasks/deleteTask/" + task.id, task).then(function(response) {
      $scope.getTasks()
      console.log("Deleted");
    }); 
  }
  };  

}]);