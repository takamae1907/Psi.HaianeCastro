document.addEventListener('DOMContentLoaded', function() {
    const esqueceuSenhaForm = document.getElementById('esqueceuSenhaForm');
    const emailInput = document.getElementById('email');

    esqueceuSenhaForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const email = emailInput.value.trim();

        // 1. Valida se o campo de e-mail está preenchido
        if (email === '') {
            alert('Por favor, digite seu endereço de e-mail.');
            return;
        }

        // 2. Valida o formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail com formato válido.');
            return;
        }

        // 3. Simula o envio e exibe a mensagem de confirmação
        // (Em um projeto real, aqui seria enviado o e-mail para o servidor)
        alert('Se houver uma conta associada a este e-mail, um link para redefinição de senha foi enviado. Por favor, verifique sua caixa de entrada e spam.');

        // 4. Redireciona de volta para a página de login após alguns segundos
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 3000); // 3000 milissegundos = 3 segundos
    });
});