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
        if ("done" in editTask) {
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
                    <button class="w3-btn w3-black w3-round-large" type="submit">Save</button>
                </form> 
            </div>        
        `
    }

    dones = []
    notDones = []
    for(let i=0; i<tlist.length; i++) {
        if ("done" in tlist[i]) {
            dones.push(tlist[i])
        } else {
            notDones.push(tlist[i])
        }
    }


    pagHTML += `
            <header class="w3-container w3-center">
                <h1><b>Tasks</b></h1>
            </header>
    `

    pagHTML += `
            <table style="width: 100%;">
                <tr>
                    <th style="width: 50%;">To Do</th>
                    <th style="width: 50%;">Concluded</th>
                </tr>
                <tr>
                    <td>
                        <ul class="w3-ul w3-hoverable w3-center">
    `

    for(let i=0; i<notDones.length; i++) {
        pagHTML += `
                            <li>${notDones[i].description} <a class="w3-btn w3-black w3-round-large w3-tiny" href="/tasks/done/${tlist[i].id}">Done</a>  <a class="w3-btn w3-black w3-round-large w3-tiny" href="/tasks/edit/${tlist[i].id}">Edit</a> <a class="w3-btn w3-black w3-round-large w3-tiny" href="/tasks/delete/${tlist[i].id}">Delete</a></li>
        `
    }


    pagHTML += `

                        </ul>
                    </td>
                    <td>
                        <ul class="w3-ul w3-hoverable w3-center">
    `

    for(let i=0; i<dones.length; i++) {
        pagHTML += `
                            <li>${dones[i].description} <a class="w3-btn w3-black w3-round-large w3-tiny" href="/tasks/edit/${tlist[i].id}">Edit</a> <a class="w3-btn w3-black w3-round-large w3-tiny" href="/tasks/delete/${tlist[i].id}">Delete</a></li>
        `
    }



    pagHTML += `

                    </td>
                </tr>
            </table>
        </body>
    </html>
    `

    return pagHTML
}
    
  
// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}