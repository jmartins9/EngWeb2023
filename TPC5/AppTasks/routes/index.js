var express = require('express')
var router = express.Router()
var Task = require('../controllers/task')


/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      res.render('index', { taskList: tasks, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas."})
    })
})



module.exports = router;
