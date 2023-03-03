exports.myDateTime = function () {
    var d = new Date().toISOString().substring(0,16)
    return d
}

exports.myName = function () {
    return "João"
}

exports.turma = "EngWeb2023::TP1"