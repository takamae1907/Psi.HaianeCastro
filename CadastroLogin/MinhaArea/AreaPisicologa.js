document.addEventListener('DOMContentLoaded', function() {
    // Seleciona TODOS os links que estão dentro do container '.navigation-grid'
    const navLinks = document.querySelectorAll('.navigation-grid a');

    // Exemplo: adicionar um evento de clique a cada link (se for necessário)
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            console.log('Link clicado:', link.href);
            // Aqui você pode adicionar qualquer ação ao clique
        });
    });
});
