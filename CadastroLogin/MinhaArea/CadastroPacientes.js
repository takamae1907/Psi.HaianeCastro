document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroPacienteForm');
    const nomeInput = document.getElementById('nomeCompleto');
    const emailInput = document.getElementById('email');

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio real do formulário

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();

        // Validação básica (verifica se os campos obrigatórios estão preenchidos)
        if (nome === '' || email === '') {
            alert('Por favor, preencha pelo menos o Nome e o E-mail do paciente.');
            return;
        }

        // Simulação de cadastro bem-sucedido
        alert(`Paciente "${nome}" cadastrado com sucesso!`);

        // Em um cenário real, aqui você enviaria os dados para um banco de dados
        // Ex: saveDataToServer({ nome, email, ... });

        // Limpa o formulário para um novo cadastro
        cadastroForm.reset();

        // Coloca o foco de volta no primeiro campo para facilitar o próximo cadastro
        nomeInput.focus();
    });
});
