var express = require('express')
var router = express.Router()
var Exame = require('../controllers/exame')

/* GET home page. */
router.get('/emds', function(req, res, next) {
  Exame.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: 'Não foi possível listar os exames.'}))
})

router.get('/emds/modalidades', function(req, res, next) {
  Exame.getModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: 'Não foi possível obter as modalidades dos atletas.'}))
})

router.get('/emds/aptos', function(req, res, next) {
  Exame.getNumeroAptos()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: 'Não foi possível obter o número de atletas aptos.'}))
})

router.get('/emds/atletas', function(req, res, next) {
  Exame.getNomesAtletas()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: 'Não foi possível obter os nomes dos atletas.'}))
})

router.get('/emds/:id', function(req, res, next) {
  Exame.getExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: 'Não foi possível obter o exame.'}))
})

router.post('/emds', function(req, res, next) {
  Exame.addExame(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(525).json({erro: erro, mensagem: 'Não foi possível inserir o exame.'}))
})

router.put('/emds/:id', function(req, res, next) {
  Exame.updateExame(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(526).json({erro: erro, mensagem: 'Não foi possível alterar o exame.'}))
})

router.delete('/emds/:id', function(req, res, next) {
  Exame.deleteExame(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(527).json({erro: erro, mensagem: 'Não foi possível eliminar o exame.'}))
})


module.exports = router
