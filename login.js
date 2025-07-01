document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // Carregar credenciais salvas se "Relembrar" foi marcado
    if (localStorage.getItem('rememberedEmail')) {
        emailInput.value = localStorage.getItem('rememberedEmail');
        rememberCheckbox.checked = true;
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const email = emailInput.value;
        const password = passwordInput.value;

        // Validação básica (apenas para demonstração)
        if (email === '' || password === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simulação de login
        if (email === 'teste@sitelbra.com.br' && password === '12345') {
            alert('Login realizado com sucesso!');

            // Salvar ou remover credenciais com base no checkbox "Relembrar"
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Redirecionar ou fazer outras ações após o login
            // window.location.href = '/dashboard';
        } else {
            alert('E-mail ou senha incorretos.');
        }
    });
});