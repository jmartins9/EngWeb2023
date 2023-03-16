var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tasks --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks?_sort=nome")
                        .then(response => {
                            var tasks = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.tasksPage(tasks,null,d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                        })
                }
                // GET /tasks/edit/:id --------------------------------------------------------------------
                else if(/\/tasks\/edit\/t[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    // Get task record
                    axios.get('http://localhost:3000/tasks/' + idTask)
                        .then(function(resp){
                            var task = resp.data

                            axios.get('http://localhost:3000/tasks')
                                .then(function(rp) {
                                    var tasks = rp.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.tasksPage(tasks,task, d))
                                })
                                .catch(er => {
                                    console.log("Erro: " + erro)
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect record: " + tasks, d))
                                })
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to collect record: " + task, d))
                        })
                }
                // GET /tasks/delete/:id --------------------------------------------------------------------
                else if(/\/tasks\/delete\/t[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/tasks/' + idTask)
                        .then(resp => {
                            axios.get('http://localhost:3000/tasks')
                                .then(function(rp) {
                                    var tasks = rp.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.tasksPage(tasks,null, d))
                                })
                                .catch(er => {
                                    console.log("Erro: " + erro)
                                    res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to collect record: " + tasks, d))
                                })
                        }).catch(error => {
                            console.log('Erro: ' + error);
                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.errorPage("Unable to delete record: " + idTask, d))
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if((req.url == '/') || (req.url == '/tasks')){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/tasks', result)
                                .then(resp => {
                                    console.log(resp.data);

                                    axios.get('http://localhost:3000/tasks')
                                        .then(function(rp) {
                                            var tasks = rp.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end(templates.tasksPage(tasks,null, d))
                                        })
                                        .catch(er => {
                                            console.log("Erro: " + erro)
                                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end(templates.errorPage("Unable to collect record: " + tasks, d))
                                        })

                                 })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/tasks\/edit\/t[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/tasks/' + result.id, result)
                                .then(resp => {
                                    console.log(resp.data);

                                    axios.get('http://localhost:3000/tasks')
                                        .then(function(rp) {
                                            var tasks = rp.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end(templates.tasksPage(tasks,null, d))
                                        })
                                        .catch(er => {
                                            console.log("Erro: " + erro)
                                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.end(templates.errorPage("Unable to collect record: " + tasks, d))
                                        })
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.errorPage("Unable to insert record...", d))
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



