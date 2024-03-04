async function validarLogin() {

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos!!')
        return false;
    }

    try {
        const users = await fetch('http://localhost:8080/usuarios');
        const listUsers = await users.json();

        listUsers.forEach((user) => {
            if (email === user.email && senha === user.senha) {
                Toastify({
                    text: "Usuário Logado com Sucesso!",
                    duration: 5000,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        width: '200px',
                        height: '30px',
                        textAlign: 'center',
                        alignItems: 'center',
                    }
                }).showToast();

                localStorage.setItem('idUser', user.id)

                window.location.href = '../src/screens/home.html'

            }
        })

    } catch (error) {
        alert('Erro ao acessar a API !')
        console.error(error);
    }

}

const button = document.getElementById('login')

button.addEventListener('click', validarLogin)