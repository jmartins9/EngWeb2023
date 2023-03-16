exports.tasksPage = function(tlist, editTask,d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>To Do</title>
        </head>
        <body>
            <header class="w3-container w3-center">
                <h1><b>Submit Task</b></h1>
            </header>

            <div style="display: flex; align-items:center;">
                <form class="w3-container w3-card-4 w3-half w3-round-large" style="display: inline-block; margin: auto;" method="POST">
                    <p>
                    <label class="w3-text-black w3-center"><b>Id</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="text" name="id" />
                    <p>
                    <label class="w3-text-black  w3-center"><b>Who</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="text" name="who"/>
                    <p>
                    <label class="w3-text-black  w3-center"><b>Due date</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="date" name="due_date"/>
                    <p>
                    <label class="w3-text-black  w3-center"><b>Description</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="text" name="description"/>
                    <p>
                    <input type="text" name="done" value="0" hidden/>
                    <button class="w3-btn w3-black w3-round-large" type="submit">Add</button>
                </form> 
            </div>


    `

    if (editTask) {
        pagHTML += `
            <header class="w3-container w3-center">
                <h1><b>Edit Task</b></h1>
            </header>

            <div style="display: flex; align-items:center;">
                <form class="w3-container w3-card-4 w3-half w3-round-large" style="display: inline-block; margin: auto;" method="POST">
                    <p>
                    <label class="w3-text-black w3-center"><b>Id</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="text" name="id" readonly value="${editTask.id}"/>
                    <p>
                    <label class="w3-text-black  w3-center"><b>Who</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="text" name="who" value="${editTask.who}"/>
                    <p>
                    <label class="w3-text-black  w3-center"><b>Due date</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="date" name="due_date" value="${editTask.due_date}"/>
                    <p>
                    <label class="w3-text-black  w3-center"><b>Description</b></label>
                    <input class="w3-input w3-border w3-light-grey w3-round-large  w3-center" type="text" name="description" value="${editTask.description}"/>
                    <p>
                    <label class="w3-text-black  w3-center"><b>Done</b></label>
        `
        if (editTask.done=="1") {
            pagHTML += `
                    <input class="w3-check" type="checkbox" name="done" value="1" checked/>
            `
        } else {
            pagHTML += `
                    <input class="w3-check" type="checkbox" name="done" value="1"/>
            `
        }

        pagHTML+= `
                    <p>
                    <button class="w3-btn w3-black w3-round-large" type="submit">Add</button>
                </form> 
            </div>        
        `
    }



    pagHTML += `
        </body>
    </html>
    `

    return pagHTML
}
    
    /*
    <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>GitLink</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/alunos/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].gitlink}</td>
                    <td>
                        [<a href="/alunos/edit/${slist[i].id}">Edit</a>][<a href="/alunos/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-blue">
                    <h5>Generated by RPCW2023 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.studentFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Student Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Git</label>
                        <input class="w3-input w3-round" type="text" name="gitlink"/>
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>
                        <input class="w3-check" type="checkbox" name="tpc1" value="1"/>
                        <label>TPC1</label>
                        <input class="w3-check" type="checkbox" name="tpc2" value="1"/>
                        <label>TPC2</label>
                        <input class="w3-check" type="checkbox" name="tpc3" value="1"/>
                        <label>TPC3</label>
                        <input class="w3-check" type="checkbox" name="tpc4" value="1"/>
                        <label>TPC4</label>
                        <input class="w3-check" type="checkbox" name="tpc5" value="1"/>
                        <label>TPC5</label>
                        <input class="w3-check" type="checkbox" name="tpc6" value="1"/>
                        <label>TPC6</label>
                        <input class="w3-check" type="checkbox" name="tpc7" value="1"/>
                        <label>TPC7</label>
                        <input class="w3-check" type="checkbox" name="tpc8" value="1"/>
                        <label>TPC8</label>
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.studentFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Student Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Git</label>
                        <input class="w3-input w3-round" type="text" name="gitlink" value="${a.gitlink}"/>
                    </fieldset>

                    <fieldset>
                        <legend>TPC</legend>
                    `

    for(i=1; i < 9; i++){
        var tpc = "tpc" + i
        if(tpc in a){
            pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1" checked/>
                        <label>TPC${i}</label>
                        `
        }
        else{
            pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1"/>
                        <label>TPC${i}</label>
                        `
        }
    }                

    pagHTML += `
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

// ---------------Student's Page--------------------------------
// Change and adapt to current dataset...
exports.studentPage = function( aluno, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Aluno: ${aluno.Id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.nome}</li>
                    <li><b>Número: </b> ${aluno.id}</li>
                    <li><b>Git (link): </b> <a href="${aluno.gitlink}">${aluno.gitlink}</a></li>
                </ul>
            </div>
            <div class="w3-container w3-margin-8">
                <ul class="w3-ul">
            `
            for(let i=1; i < 9; i++){
                key = `tpc${i}`
                if(key in aluno){
                    pagHTML += `
                        <li><b>TPC${i}</b></li>
                    `
                }
            }
    

    pagHTML +=     `</ul></div>
            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}
*/

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}