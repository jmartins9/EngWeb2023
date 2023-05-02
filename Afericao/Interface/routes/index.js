var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7007/api/emdlist')
    .then(resposta => {
      console.log(resposta)
      res.render('index', { list : resposta} )
    })
    .catch(erro => {
      res.render('error', { error: erro });
    })
});

module.exports = router;
