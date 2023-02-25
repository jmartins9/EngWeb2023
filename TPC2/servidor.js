var http = require('http')
var url = require('url')
var fs = require('fs')
const re = new RegExp("\/c[0-9][0-9]?[0-9]?")


var server = http.createServer(function(req, res) {
    console.log(req.method + " " + req.url)

    var pathname = url.parse(req.url, true).pathname
    
    if (pathname === "/") {
        fs.readFile("./Pages/index.html", function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            if (err) {
                res.write("Erro na leitura do ficheiro: " + err)
            } else {
                res.write(data)
                res.end()
            }
        })
    } else if (pathname.match(re) != null) {
        fs.readFile("./Pages" + pathname + ".html", function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            if (err) {
                res.write("Erro na leitura do ficheiro: " + err)
            } else {
                res.write(data)   
                res.end()
            }
        })
    }   
    else {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
        res.write("Pathname inválido.")
        res.end()
    }
})


server.listen(7777)