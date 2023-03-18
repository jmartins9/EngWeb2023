var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.list()
    .then(alunos => {
      res.render('index', { slist: alunos, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

/* GET student from page. */
router.get('/alunos/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addAlunoForm', {d: data})
});

/* GET student delete confirmation page. */
router.get('/alunos/delete/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.getAluno(req.params.id)
    .then(aluno => {
      res.render('deleteAlunoForm', { a: aluno, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno para remoção"})
    })
});

/* GET delete student. */
router.get('/alunos/delete/:id/confirm', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.deleteAluno(req.params.id)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno para remoção"})
    })
});

/* GET student delete confirmation page. */
router.get('/alunos/delete/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.getAluno(req.params.id)
    .then(aluno => {
      res.render('deleteAlunoForm', { a: aluno, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno para remoção"})
    })
});


/* GET Student page. */
router.get('/alunos/:idAluno', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.getAluno(req.params.idAluno)
    .then(aluno => {
      res.render('aluno', { a: aluno, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
});

/* Post Student Form. */
router.post('/alunos/registo',(req, res) => {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.addAluno(req.body)
    .then(aluno => {
      res.render('addAlunoConfirm', {a: aluno, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de aluno"})
    })
})

/* Post Student Edit Page. */
router.post('/alunos/edit',(req, res) => {
  var data = new Date().toISOString().substring(0, 16)
  Aluno.updateAluno(req.body) // mudar para put
    .then(aluno => {
      res.render('addAlunoConfirm', {a: aluno, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo alterado de aluno"})
    })
})

module.exports = router;
