var habitController = require('./../controllers/HabitController')
var helpers = require('../utilities/user.js');


module.exports = function (app, express) {

  app.use(express.static(__dirname + '/../public'));

  app.get('/habits', habitController.getHabits)
  app.post('/habits', habitController.addHabit)

  app.put('/habits/increment', habitController.incrementCounter)
  app.put('/habits/decrement', habitController.decrementCounter)

}
