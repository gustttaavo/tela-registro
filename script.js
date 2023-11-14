document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.querySelector('form');
    const registrarButton = document.querySelector('button[type="submit"]');
    const txtSenha = document.getElementById('txtSenha');

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

        fetch('teste.json')
            .then(response => response.json())
            .then(data => {
                data.usuarios.push(novoUsuario);

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

    // Caps Lock Check
    txtSenha.onkeyup = function(e) {
        var key = e.charCode || e.keyCode;
        
        // Enter, caps lock, and backspace are not of interest
        if (key == 13 || key == 8 || key == 46 || key == 20) {
            return false;
        }

        // Get the last character typed
        var tamanho = this.value.length;
        var ultimo_caracter = this.value.substring(tamanho - 1);

        // Check if it's uppercase and not with shift key
        if (ultimo_caracter.toUpperCase() == ultimo_caracter && ultimo_caracter.toLowerCase() != ultimo_caracter && !e.shiftKey) {
            alert('Caps Lock está pressionado!');
        }
    };
});
