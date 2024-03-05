const idUsuarioStorage = localStorage.getItem('idUser')

const idUsuario = parseInt(idUsuarioStorage)


window.onload = async () => {

    const objUser = await fetch(`http://localhost:8080/usuarios/${idUsuario}`)
    const user = await objUser.json()
    const helloUser = document.getElementById('user')
    const nome = document.createElement('p')

    nome.textContent = `Olá, ${user.nome}`
    nome.className = 'hello'
    helloUser.appendChild(nome)
}



async function newTask() {
    const descricao = document.getElementById('titulo').value
    const dataConclusao = document.getElementById('data').value

    const id = ''


    const newTask = {
        id,
        descricao,
        dataConclusao,
        idUsuario
    }

    const url = 'http://localhost:8080/tarefas'

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newTask)
    }

    await fetch(url, options)

    Toastify({
        text: "Tarefa Cadastrada com Sucesso!",
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            width: '200px',
            height: '30px',
            textAlign: 'center',
            alignItems: 'center',
        }
    }).showToast();

    window.location.href = '../screens/home.html'

}