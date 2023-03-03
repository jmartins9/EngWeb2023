// my-pages.js
// 2023-03-03
// HTML generation templates


exports.genMainPage = function(lista, data) {
    var pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UFT-8"/>
            <title> About People...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>

            <div class="w3-card-4">
                <header class="w3-container w3-deep-purple">
                    <h1>Lista de Pessoas</h1>
                </header>

                <div class="w3-table-all">
                    <table> 
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
    `
    for (let i = 0; i < lista.length; i++) {
        pagHtml += `
            <tr>
                <td>${lista[i].id}</td>
                <td>
                    <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
                </td>
                <td>${lista[i].idade}</td>
                <td>${lista[i].sexo}</td>
                <td>${lista[i].morada.cidade}</td>
            </tr>
            `
    }
    
    pagHtml += `
                </table> 
            </div>
                <footer class="w3-container w3-deep-purple">
                    <h5>Generated in EnbWeb ${data}</h5>
                </footer>
            </div> 
        </body>
    </html>
    `

    return pagHtml
}

exports.genPersonPage = function(pessoa, data) {
    var pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UFT-8"/>
            <title> ${pessoa.nome}...</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>

            <div class="w3-card-4">
                <header class="w3-container w3-deep-purple">
                    <h1>${pessoa.nome}</h1>
                </header>

                <div class="w3-table-all">
                    <table> 
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>
    `

    pagHtml += `
                    </table>
                </div>
                <footer class="w3-container w3-deep-purple">
                    <h5>Generated in EnbWeb ${data}</h5>
                </footer>
            </div>
        </body>
    <html>
    `
    return pagHtml
}