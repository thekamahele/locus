var habit = angular.module('habittrackr', [
              'habittrackr.create',
              'habittrackr.track',
              'ngAnimate',
              'ngRoute'])

/////////////// Routes /////////////////
habit.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/create/create.html',
      controller: 'HabitCreate'
    })
    .when('/habit', {
      templateUrl: 'app/track/track.html',
      controller: 'HabitTrack'
    })
  })

/////////////// Factory ////////////////

habit.factory('Habits', function($http) {
        var count = 0;
        var name = '';
        var username = '';
        var days = 0;

         var getAll = function () {
           return $http({
             method: 'GET',
             url: '/habits'
           })
           .then(function (res) {
             return res.data;
           })
         }

         var add = function (habit) {
           return $http({
             method : 'POST',
                url : '/habits',
               data : habit
           })
           .then(function (res) {
             return res.data;
           })
         }

         var increment = function (habit) {
           return $http({
             method : 'PUT',
                url : '/habits/increment',
               data : habit
           })
           .then(function (res) {
             return res.data;
           })
         }

         var decrement = function (habit) {
           return $http({
             method : 'PUT',
                url : '/habits/decrement',
               data : habit
           })
           .then(function (res) {
             return res.data;
           })
         }

         return {
              'days' : days,
          "username" : username,
              "name" : name,
             'count' : count,
            "getAll" : getAll,
               'add' : add,
         'increment' : increment,           'decrement' : decrement
         }
       })


////////////////// Controllers /////////////////

habit.controller('HabitController', function ($scope, $log, Habits) {
         $scope.habitName = '';
         $scope.habit_count;
         $scope.currentHabit = '';

         $scope.addHabit = function() {

           //Initialize count
           if ($scope.habit_count === undefined) {
               $scope.habit_count = 0;

               // Add new habit to database
               Habits.add({
                            "name" : $scope.habitName,
                           "count" : $scope.habit_count
                          })
                    //  .then(function() {
                    //    $scope.currentHabit = $scope.habitName;
                    //    $log.log($scope.currentHabit)
                    //    $('body').find('#habit').append(function() {
                    //      console.log('adding div')
                    //      return
                     //
                    //    })
                    //    $scope.habitName = '';
                    //  });


           }
         }
       })

///////////////////// Directives /////////////////








//        angular.module('shortly', [
//   'shortly.services',
//   'shortly.links',
//   'shortly.shorten',
//   'shortly.auth',
//   'ngRoute'
// ])
// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/signin', {
//       templateUrl: 'app/auth/signin.html',
//       controller: 'AuthController'
//     })
//     .when('/signup', {
//       templateUrl: 'app/auth/signup.html',
//       controller: 'AuthController'
//     })
//     // Your code here
//
//     .when('/links', {
//       templateUrl: 'app/links/links.html',
//       controller: 'LinksController',
//       authenticate: true
//     })
//     .when('/shorten', {
//       templateUrl: 'app/shorten/shorten.html',
//       controller: 'ShortenController',
//       authenticate: true
//     })
//     .otherwise({
//       redirectTo: '/links'
//     });
