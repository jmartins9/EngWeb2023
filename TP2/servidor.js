var http = require('http') // funcionalidades do módulo http

http.createServer(function(req,res) { // espera por pedido
    res.writeHead(200, {'Content-Type': 'text/plain'}) // cabeçalho e resposta - código e Content-Type (só texto neste caso) 
    res.end('Olá'); // Fechar pacote e só se executa uma vez
}).listen(7777) 

console.log("Servidor à escuta na porta 7777...")

// node servidor.js -> Faz por defenição um Get 

