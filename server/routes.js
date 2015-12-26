var habitController = require('./controllers/HabitController')


module.exports = function (app, express) {

  app.use(express.static(__dirname + '/../public'));

  app.get('/habits', habitController.getHabits)
  app.post('/habits', habitController.addHabit)

  app.put('/habits/increment', habitController.incrementCounter)
  app.put('/habits/decrement', habitController.decrementCounter)

}
