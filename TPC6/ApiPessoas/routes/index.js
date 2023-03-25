var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa');

/* GET persons. */
router.get('/persons', function(req, res, next) {
  Pessoa.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: 'Não foi possível listar as pessoas.'}))
});

/* GET person. */
router.get('/persons/:id', function(req, res, next) {
  Pessoa.getPessoa(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: 'Não foi possível obter o registo da pessoa.'}))
});

/* POST person. */
router.post('/persons', function(req, res, next) {
  Pessoa.addPessoa(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: 'Não foi possível adicionar o registo da pessoa.'}))
});

/* PUT person. */
router.put('/persons/:id', function(req, res, next) {
  Pessoa.updatePessoa(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: 'Não foi possível atualizar o registo da pessoa.'}))
});

/* DELETE person. */
router.delete('/persons/:id', function(req, res, next) {
  Pessoa.deletePessoa(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: 'Não foi possível eliminar o registo da pessoa.'}))
});

module.exports = router;
