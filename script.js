document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.querySelector('form');
    const registrarButton = document.querySelector('button[type="submit"]');

    registrarButton.addEventListener('click', function(e) {
        e.preventDefault();

        const email = registroForm.querySelector('input[name="email"]').value;
        const nome = registroForm.querySelector('input[name="nome"]').value;
        const sobrenome = registroForm.querySelector('input[name="sobrenome"]').value;
        const senha = registroForm.querySelector('input[name="senha"]').value;
        const confirmaSenha = registroForm.querySelector('input[name="confirma_senha"]').value;

        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem');
            return;
        }

        const novoUsuario = {
            email: email,
            nome: nome,
            sobrenome: sobrenome,
            senha: senha
        };

        // Carregar o arquivo JSON existente
        fetch('teste.json')
            .then(response => response.json())
            .then(data => {
                // Adicionar o novo usuário à matriz "usuarios"
                data.usuarios.push(novoUsuario);

                // Atualizar o arquivo JSON com os novos dados
                return fetch('teste.json', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => {
                alert('Registro bem-sucedido!');
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    });
});
