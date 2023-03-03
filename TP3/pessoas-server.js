var http = require('http')
var axios = require('axios')
var myPages = require('./my-pages.js')
var fs = require('fs')


http.createServer(function(req, res) {
   var d = new Date().toISOString().substring(0,16)
   console.log(req.method + ' ' + req.url + ' ' + d);

    if (req.url == '/pessoas') {
        axios.get('http://localhost:3000/pessoas') 
        .then(resp => { // como se fosse uma callback para o caso de sucesso
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(myPages.genMainPage(pessoas,d));

        }).catch(err => {
            console.log("Erro: " + err);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<p>Erro na obtenção dos dados' + err + '</p>');

        })
    } else if (req.url == '/pessoasOrdenadas') {
        axios.get('http://localhost:3000/pessoas?_sort=nome') 
        .then(resp => { // como se fosse uma callback para o caso de sucesso
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(myPages.genMainPage(pessoas,d))

        }).catch(err => {
            console.log("Erro: " + err)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtenção dos dados' + err + '</p>')

        })
    } else if (req.url.match(/^\/pessoas\/p\d+$/)) {
        axios.get('http://localhost:3000/pessoas/p' + req.url.substring(10))
        .then( resp => {
            var pessoa = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(myPages.genPersonPage(pessoa,d))
        })
        .catch(err => {
            console.log("Erro: " + err)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtenção dos dados' + err + '</p>')
        })
    } else if (req.url.match(/w3\.css$/)) {
        fs.readFile("w3.css", function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + err + '</p>')
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(data)
            }

        }) 
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')

    }

}).listen(7777);