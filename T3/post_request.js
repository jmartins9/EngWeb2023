const axios = require('axios')

axios.post('http://localhost:3000/pessoas', {
    id: '112',
    CC: '12345',
    nome: 'Maria'
})
    .then(resp => { // como se fosse uma callback para o caso de sucesso
        console.log(resp.status)
    })
    .catch(err => { // forma moderna de criar as funções
        console.log("Erro: " + err) 
    })