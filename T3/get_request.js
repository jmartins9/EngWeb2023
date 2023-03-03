const axios = require('axios')

axios.get('http://localhost:3000/pessoas')
    .then(resp => { // como se fosse uma callback para o caso de sucesso
        var pessoas = resp.data
        console.log("Recuperei " + pessoas.length + " registos.")
        console.log(pessoas[3].nome)
    })
    .catch(err => { // forma moderna de criar as funções
        console.log("Erro: " + err) 
    })