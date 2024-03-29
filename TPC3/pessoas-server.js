var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

function distSexo(pessoas) {
    var dist = {}
    for(let i = 0; i < pessoas.length; i++) {
        if (!dist.hasOwnProperty(pessoas[i].sexo)) {
            dist[pessoas[i].sexo] = 0
        }
        dist[pessoas[i].sexo] += 1
    }
    return dist
}

function distDesporto(pessoas) {
    var dist = {}
    for(let i = 0; i < pessoas.length; i++) {
        if(pessoas[i].hasOwnProperty('desportos')) {
            desportos = pessoas[i].desportos 
            for(let j = 0; j < desportos.length; j++) {
                if (!dist.hasOwnProperty(desportos[j])) {
                    dist[desportos[j]] = 0
                }
                dist[desportos[j]] += 1
            }
        }
    }
    return dist
}

function distTop10Profissoes(pessoas) {
    var dist = {}
    for(let i = 0; i < pessoas.length; i++) {
        if (!dist.hasOwnProperty(pessoas[i].profissao)) {
            dist[pessoas[i].profissao] = 0
        }
        dist[pessoas[i].profissao] += 1
    }
    let distSorted = Object.entries(dist)
                    .sort((a, b) => b[1] - a[1])
                    .reduce((acc, [chave, valor]) => ({ ...acc, [chave]: valor }), {})
            
    let top10 = Object.fromEntries(Object.entries(distSorted).slice(0,10))
    
    return top10
}


http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtrenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/pessoasOrdenadas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genMainPage(pessoas, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtrenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url.match(/\/pessoas\/p\d+/)){
        console.log('Pedindo ' + req.url.substring(9))
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(mypages.genPersonPage(pessoa, d))
                res.end()
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na obtrenção de dados: ' + erro + '</p>')
            })
    }
    else if(req.url == '/sexo'){
        axios.get('http://localhost:3000/pessoas')
        .then(response => {
            var pessoas = response.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genDistPage(distSexo(pessoas), 'Sexo', d, 'pessoas?sexo='))
        })
        .catch(error => {
            console.log("Erro: " + error)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtrenção de dados: ' + error + '</p>')
        })
    }
    else if(req.url.match(/\/pessoas\?sexo=[a-zA-Z]+/)){
        axios.get('http://localhost:3000/pessoas?sexo=' + req.url.substring(14) + '&_sort=nome&_order')
        .then(response => {
            var pessoas = response.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas))
        })
        .catch(error => {
            console.log("Erro: " + error)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtrenção de dados: ' + error + '</p>')
        })
    }
    else if(req.url == '/desporto'){
        axios.get('http://localhost:3000/pessoas')
        .then(response => {
            var pessoas = response.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genDistPage(distDesporto(pessoas), 'Desporto', d, '/pessoas?desportos_like='))
        })
        .catch(error => {
            console.log("Erro: " + error)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtrenção de dados: ' + error + '</p>')
        })
    }
    else if(req.url.match(/\/pessoas\?desportos_like=.*/)){
        axios.get('http://localhost:3000/pessoas?desportos_like=' + req.url.substring(24) + '&_sort=nome&_order')
        .then(response => {
            var pessoas = response.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(error => {
            console.log("Erro: " + error)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtrenção de dados: ' + error + '</p>')
        })
    }
    else if(req.url == '/profissao') {
        axios.get('http://localhost:3000/pessoas')
        .then(response => {
            var pessoas = response.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genDistPage(distTop10Profissoes(pessoas), 'Profissão', d, '/pessoas?profissao='))
        })
        .catch(error => {
            console.log("Erro: " + error)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtrenção de dados: ' + error + '</p>')
        })
    }
    else if(req.url.match(/\/pessoas\?profissao=.*/)){
        axios.get('http://localhost:3000/pessoas?profissao=' + req.url.substring(19) + '&_sort=nome&_order')
        .then(response => {
            var pessoas = response.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(error => {
            console.log("Erro: " + error)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p>Erro na obtrenção de dados: ' + error + '</p>')
        })
    }
    else if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p>Operação não suportada: ' + req.url + '</p>')
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')

