var express = require('express');
var router = express.Router();
var Exame = require('../controllers/exame')

/* GET home page. */

router.get('/emd', function(req, res) {
  if (req.query.res || req.query.modalidade) {
    if (req.query.res && req.query.res == "OK") {
      Exame.getAprovados()
        .then(dados => {
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
    } else if (req.query.modalidade) {
      Exame.getModalidade(req.query.modalidade)
        .then(dados => {
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
    } else {
      res.status(520).json({mensagem: "Query inválida."})
    }
  } else {
    Exame.list()
      .then(dados => {
        res.status(200).json(dados)
      })
      .catch(erro => {
        res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
  }
});

router.get('/emdlist', function(req, res) {
    Exame.emdlist()
      .then(dados => {
        res.status(200).json(dados)
      })
      .catch(erro => {
        res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
});

router.get('/emd/:id', function(req, res){
  Exame.getExame(req.params.id)
    .then(exame => {
      res.status(200).json(exame)
    })
    .catch(erro => {
      res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame pedido."})
    })
})


router.get('/modalidades', function(req, res){
  Exame.getModalidades()
    .then(dados => {
      res.status(201).json(dados)
    })
    .catch(erro => {
      res.status(522).json({erro: erro, mensagem: "Não consegui obter as modadidades."})
    })
})

router.get('/atletas', function(req, res){
  if (req.query.gen || req.query.clube) {
    if (req.query.gen) {
      Exame.getGenero(req.query.gen)
        .then(dados => {
          res.status(201).json(dados)
        })
        .catch(erro => {
          res.status(522).json({erro: erro, mensagem: "Não consegui inserir o exame."})
        })
    }
    else if (req.query.clube) {
      Exame.getClube(req.query.clube)
      .then(dados => {
        res.status(201).json(dados)
      })
      .catch(erro => {
        res.status(522).json({erro: erro, mensagem: "Não consegui inserir o exame."})
      })
    }
    else {
      res.status(520).json({mensagem: "Query inválida."})
    }
  }
})


module.exports = router;