document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // --- CREDENCIAIS DE ACESSO (substitua pelos dados reais) ---
    const pacienteEmail = 'paciente@email.com';
    const pacienteSenha = '123';

    const psicologaEmail = 'psicologa@email.com';
    const psicologaSenha = '456';
    // -----------------------------------------------------------

    // Carrega o e-mail salvo se a opção "Lembrar" estiver ativa
    if (localStorage.getItem('rememberedEmail')) {
        emailInput.value = localStorage.getItem('rememberedEmail');
        rememberCheckbox.checked = true;
    }

    // Adiciona o evento de 'submit' ao formulário UMA ÚNICA VEZ
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Salva ou remove o e-mail do "Lembrar"
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        // 1. Pega o valor do perfil selecionado ("paciente" ou "psicologa")
        const perfilSelecionado = document.querySelector('input[name="perfil"]:checked').value;

        // 2. Verifica o perfil e DEPOIS as credenciais
        if (perfilSelecionado === 'paciente') {
            // Se o perfil for PACIENTE, valida os dados do paciente
            if (email === pacienteEmail && password === pacienteSenha) {
                // Redireciona para a área do paciente
                window.location.href = 'MinhaArea/MinhaArea.html';
            } else {
                alert('Dados de paciente incorretos.');
            }

        } else if (perfilSelecionado === 'psicologa') {
            // Se o perfil for PSICÓLOGA, valida os dados da psicóloga
            if (email === psicologaEmail && password === psicologaSenha) {
                // Redireciona para a área da psicóloga
                window.location.href = 'MinhaArea/AreaPisicologa.html';
            } else {
                alert('Dados de psicóloga incorretos.');
            }
        }
    });
});