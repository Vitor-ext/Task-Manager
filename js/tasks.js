const idUserLogado = localStorage.getItem('idUser')


window.onload = async function LoadTask() {

    const objUser = await fetch(`http://localhost:8080/usuarios/${idUserLogado}`)
    const user = await objUser.json()

    const url = 'http://localhost:8080/tarefas'

    const tasks = await fetch(url)
    const listTasks = await tasks.json()

    const container = document.getElementById('cards')
    const helloUser = document.getElementById('user')
    const nome = document.createElement('p')

    nome.textContent = `Olá, ${user.nome}`
    nome.className = 'hello'
    helloUser.appendChild(nome)

    listTasks.forEach(task => {


        if (user.id === task.idUsuario) {

            const card = document.createElement('div')
            const titulo = document.createElement('h2')
            const data = document.createElement('p')
            const buttons = document.createElement('div')
            const comment = document.createElement('button')
            const update = document.createElement('button')
            const discard = document.createElement('button')
            const commentImg = document.createElement('img')
            const updateImg = document.createElement('img')
            const discardImg = document.createElement('img')

            commentImg.src = '../imgs/comment.png'
            commentImg.alt = 'comment task'

            updateImg.src = '../imgs/update.png'
            updateImg.alt = 'update task'

            discardImg.src = '../imgs/delete.svg'
            discardImg.alt = 'delete task'

            comment.id = `${task.id}`
            comment.onclick = LoadComment

            comment.appendChild(commentImg)
            update.appendChild(updateImg)
            discard.appendChild(discardImg)


            card.className = 'myCard'
            buttons.className = 'buttons'
            comment.className = 'buttonTask'
            update.className = 'buttonTask'
            discard.className = 'buttonTask'

            buttons.id = 'buttons'


            titulo.textContent = `${task.descricao}`
            data.textContent = `${task.dataConclusao}`

            buttons.appendChild(comment)
            buttons.appendChild(update)
            buttons.appendChild(discard)

            card.appendChild(titulo)
            card.appendChild(data)
            card.appendChild(buttons)

            container.appendChild(card)
        
        } else {
            const card = document.createElement('div')
            const titulo = document.createElement('h2')
            const data = document.createElement('p')
            const buttons = document.createElement('div')
            const comment = document.createElement('button')
            const commentImg = document.createElement('img')

            commentImg.src = '../imgs/comment.png'
            commentImg.alt = 'comment task'

            const id = task.id
            comment.id = id
            comment.onclick = LoadComment

            comment.appendChild(commentImg)

            card.className = 'card'
            buttons.className = 'buttons'
            comment.className = 'buttonTask'

            titulo.textContent = `${task.descricao}`
            data.textContent = `${task.dataConclusao}`

            buttons.appendChild(comment)

            card.appendChild(titulo)
            card.appendChild(data)
            card.appendChild(buttons)

            container.appendChild(card)
        } 

    });

}

async function validarPremium() {

    const objUser = await fetch(`http://localhost:8080/usuarios/${idUserLogado}`)
    const user = await objUser.json()

    if (user.premium === 1) {
        window.location.href = '../screens/newTask.html'
    } else {
        Toastify({
            text: "Torne-se Usuário Premium !!",
            duration: 3000,
            style: {
                background: "linear-gradient(#C74949, #700606)",
                width: '200px',
                height: '30px',
                textAlign: 'center',
                alignItems: 'center',
            }
        }).showToast();
    }

}

async function LoadComment(){
    const idTask = this.id
    localStorage.setItem('idTask', idTask)
    window.location.href = '../screens/comment.html'
}