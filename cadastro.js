document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('emailCadastro');
    const senhaInput = document.getElementById('senhaCadastro');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

        // Validação básica dos campos
        if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validação de formato de e-mail (simples)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Validação de força da senha (exemplo: mínimo 6 caracteres)
        if (senha.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        // Validação de confirmação de senha
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, digite novamente.');
            return;
        }

        // Se todas as validações passarem, simula o cadastro
        alert('Cadastro realizado com sucesso!\n\nNome: ' + nome + '\nE-mail: ' + email);

        // Em um cenário real, você enviaria esses dados para um servidor
        // fetch('/api/cadastro', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ nome, email, senha }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         alert('Cadastro realizado com sucesso!');
        //         window.location.href = '/login'; // Redireciona para a página de login
        //     } else {
        //         alert('Erro no cadastro: ' + data.message);
        //     }
        // })
        // .catch(error => {
        //     console.error('Erro:', error);
        //     alert('Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.');
        // });

        // Limpa os campos do formulário após o cadastro bem-sucedido
        cadastroForm.reset();
    });
});