var Exame = require('../models/exame');

module.exports.list = () => {
    return Exame
            .find({},{"nome" : 1,  "dataEMD" : 1, "resultado" : 1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.emdlist = () => {
    return Exame
            .find()
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.getExame = id => {
    return Exame.findOne({_id : id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidades = () => {
    return Exame.distinct("modalidade")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getAprovados = () => {
    return Exame.find({"resultado" : true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getAprovados = () => {
    return Exame.find({"resultado" : true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidade = mod => {
    return Exame.find({"modalidade" : mod})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.getGenero = gen => {
    return Exame.aggregate([{ $match: { "género": gen } }, {$project: { _id: 0,nomeCompleto: { $concat: [ "$nome.primeiro", " ", "$nome.último" ] }}},{ $sort: { nomeCompleto: 1 } }])
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getClube = clube => {
    return Exame.aggregate([{ $match: { "clube": clube } }, {$project: { _id: 0,nomeCompleto: { $concat: [ "$nome.primeiro", " ", "$nome.último" ] }}},{ $sort: { nomeCompleto: 1 } }])
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}