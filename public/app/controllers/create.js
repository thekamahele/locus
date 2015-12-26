angular.module('habittrackr.create', [])

.controller('HabitCreate', function ($scope, $timeout, Habits) {
    // Your code here
   $scope.name = ''

   $scope.username = ''

   $scope.counter = 0;

   $scope.days = 0;

   // Boolean for track button
   $scope.created = false;

   $scope.increment = function () {
     $scope.counter++;
     console.log($scope.counter);
   }

   $scope.addHabit = function() {
     Habits.username = $scope.username
     Habits.days = $scope.days;
     var newHabit = {
                   name : $scope.name,
                  count : Habits.count
                    }

     $scope.created = true;

     // Update Habits factor 'name' property
     Habits.name = $scope.name;

     Habits.add(newHabit).then(function() {
       $scope.name = '';
     })

     // Send post request to server with new habit
   }
})
.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
