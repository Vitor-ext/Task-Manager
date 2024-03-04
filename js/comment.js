const idUserLogado = localStorage.getItem('idUser')
const idTarefa = localStorage.getItem('idTask')

window.onload = async function LoadComment(){

    const objUser = await fetch(`http://localhost:8080/usuarios/${idUserLogado}`)
    const user = await objUser.json()

    const helloUser = document.getElementById('user')
    const nome = document.createElement('p')

    nome.textContent = `Olá, ${user.nome}`
    nome.className = 'hello'
    helloUser.appendChild(nome)


    const containerTitulo = document.getElementById('titulo');
    const objTask = await fetch(`http://localhost:8080/tarefas/${idTarefa}`)
    const task = await objTask.json()
    const titulo = document.createElement('h1')

    titulo.textContent = task.descricao

    containerTitulo.appendChild(titulo)

    const url = 'http://localhost:8080/comentarios'

    const objComentarios = await fetch(url)

    const listComentarios = await objComentarios.json()

    const container = document.getElementById('container')

    listComentarios.forEach(comentario => {
        if(comentario.idTarefa === idTarefa){

            const containerComentario = document.createElement('div')
            const descricao = document.createElement('p')
            
            containerComentario.className = 'comentarios'   

            descricao.textContent = `${comentario.descricao}`
            containerComentario.appendChild(descricao)            

            container.appendChild(containerComentario)

        }
    });

}


async function newComentario() { 
    const descricao = document.getElementById('comentario').value

    const id = ''
    const idUsuario = idUserLogado

    const newComentario = {
        id,
        descricao,
        idUsuario,
        idTarefa        
    }

    const url = 'http://localhost:8080/comentarios'

    const options = {
        method: 'Post', 
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newComentario)
    }

    await fetch(url, options)

    Toastify({
        text: "Comentário realizado com Sucesso!",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            width: '200px',
            height: '30px',
            textAlign: 'center',
            alignItems: 'center',
        }
    }).showToast();

    window.location.reload()

}