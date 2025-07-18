document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');

    if(profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio real do formulário
            
            // Aqui, em um projeto real, você pegaria os dados e enviaria para um servidor
            const nome = document.getElementById('nomeCompleto').value;
            console.log("Salvando dados para:", nome);

            // Simula uma resposta de sucesso
            alert("Dados salvos com sucesso!");
        });
    }
});