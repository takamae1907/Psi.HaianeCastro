document.addEventListener('DOMContentLoaded', function() {
    const redefinirSenhaForm = document.getElementById('redefinirSenhaForm');
    const novaSenhaInput = document.getElementById('novaSenha');
    const confirmarNovaSenhaInput = document.getElementById('confirmarNovaSenha');

    redefinirSenhaForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const novaSenha = novaSenhaInput.value;
        const confirmarNovaSenha = confirmarNovaSenhaInput.value;

        // 1. Valida se os campos não estão vazios
        if (novaSenha === '' || confirmarNovaSenha === '') {
            alert('Por favor, preencha os dois campos de senha.');
            return;
        }

        // 2. Valida a força da senha (ex: mínimo 6 caracteres)
        if (novaSenha.length < 6) {
            alert('A nova senha deve ter no mínimo 6 caracteres.');
            return;
        }

        // 3. Valida se as senhas digitadas são iguais
        if (novaSenha !== confirmarNovaSenha) {
            alert('As senhas não coincidem. Por favor, digite novamente.');
            // Limpa os campos para o usuário tentar de novo
            novaSenhaInput.value = '';
            confirmarNovaSenhaInput.value = '';
            novaSenhaInput.focus();
            return;
        }

        // 4. Simula o sucesso e redireciona
        // Em um projeto real, aqui você enviaria a nova senha para o servidor
        alert('Sua senha foi redefinida com sucesso! Você será redirecionado para a tela de login.');

        // Redireciona para a página de login após 2 segundos
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000);
    });
});