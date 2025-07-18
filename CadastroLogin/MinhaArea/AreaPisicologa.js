document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona TODOS os links que estão dentro do container '.navigation-grid'
    const navLinks = document.querySelectorAll('.navigation-grid a');

    // Para cada link encontrado, ele adiciona o evento de clique
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link (que seria tentar navegar para uma página)
            event.preventDefault();

            // Pega o texto de dentro do 'span' do botão que foi clicado
            const linkText = this.querySelector('span').textContent.trim();
            
            // Exibe um alerta simples para confirmar a interação
            // Este é o local onde você pode adicionar a lógica real no futuro
            alert(`Você clicou em "${linkText}".`);

            /*
            // EXEMPLO DE USO REAL:
            // No futuro, você poderia apagar o 'alert' acima e usar um código
            // como este para levar o usuário para a página correta:

            const linkId = this.id; // Pega o 'id' do link, ex: "agendamentos"

            if (linkId === 'agendamentos') {
                window.location.href = '/proximos-agendamentos.html';
            } else if (linkId === 'documentos') {
                window.location.href = '/documentos.html';
            }
            // ... e assim por diante para cada botão.
            */
        });
    });

});