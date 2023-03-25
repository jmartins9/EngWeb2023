var Pessoa = require('../models/pessoa');

/* Persons list */
module.exports.list = () => {
    return Pessoa
            .find()
            .sort({nome: 1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

/* Get person */
module.exports.getPessoa = id => {
    return Pessoa.findOne({_id : id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

/* Add person */
module.exports.addPessoa = p => {
    return Pessoa.create(p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

/* Update person */
module.exports.updatePessoa = p => {
    return Pessoa.updateOne({_id: p._id}, p)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

/* Delete person */
module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({_id: id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}