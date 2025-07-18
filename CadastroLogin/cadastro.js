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

        // 1. Validação de campos vazios
        if (nome === '' || email === '' || senha === '' || confirmarSenha === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // 2. Validação do formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // 3. Validação de força da senha (mínimo 6 caracteres)
        if (senha.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        // 4. Validação de confirmação de senha
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            senhaInput.focus(); // Coloca o foco no campo de senha
            return;
        }

        // Se todas as validações passarem, exibe sucesso e redireciona
        alert('Cadastro realizado com sucesso!\nVocê será redirecionado para a página de login.');

        // Limpa os campos do formulário
        cadastroForm.reset();

        // Redireciona para a página de login após 2 segundos
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000); // 2000 milissegundos = 2 segundos
        
        /*
        Em um cenário real, aqui você enviaria os dados (nome, email, senha)
        para um servidor para que eles fossem salvos em um banco de dados.
        A lógica de 'fetch' que você tinha no seu código original entraria aqui.
        */
    });
});