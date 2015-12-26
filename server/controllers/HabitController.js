var Habit = require('../models/Habit.js');
    Q = require('q');

module.exports = {

  addHabit : function (req, res, next) {

    var create = Q.nbind(Habit.create, Habit);

    var newHabit = {
            name : req.body.name,
           count : req.body.count
    }

    create(newHabit).done(function(habit) {
      console.log(habit)
      res.sendStatus(201);
    })

  },

  getHabits : function (req, res, next) {

    var find = Q.nbind(Habit.find, Habit);

    find({}).done(function(habits) {
      console.log(habits);
      res.send(habits)
      res.sendStatus(201)

    })
  },

  incrementCounter : function (req, res, next) {
    var find = Q.nbind(Habit.findOne, Habit);

    find({ name : req.body.name }).done(function(habit) {
      habit.count++;
      habit.save(function (err) {
        if(!err) {
          res.sendStatus(201);
        } else {
          res.send(err)
        }

      })
    })
   },

    decrementCounter : function (req, res, next) {
      var find = Q.nbind(Habit.findOne, Habit);

      find({ name : req.body.name }).done(function(habit) {

        habit.count--;
        habit.save(function (err) {
          if(!err) {
            res.sendStatus(201);
          } else {
            res.send(err)
          }

        })
      })

  }
}
