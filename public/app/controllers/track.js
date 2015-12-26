angular.module('habittrackr.track', [])

.controller('HabitTrack', function ( $scope, Habits) {

  $scope.username = Habits.username;
  $scope.days = Habits.days;

  //Show Habit count
  $scope.count = Habits.count;

  // Show habit name
  $scope.name = Habits.name;

  //
  $scope.completed = false;

  $scope.increment = function () {
    if ($scope.count >= 5){
      $scope.completed = true;
    } else {
      $scope.count++;
      Habits.increment({ name: Habits.name })
    }
  }

  $scope.decrement = function () {

    if ( $scope.count >= 0 ) {
      $scope.count--;
      Habits.decrement({ name: Habits.name })
    }
  }

});
