document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os links da navegação
    const navLinks = document.querySelectorAll('.navigation-grid a');

    // Adiciona um evento de clique para cada link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link (que é navegar para '#')
            event.preventDefault();

            // Pega o texto de dentro do link para usar no alerta
            // Usamos .textContent para pegar o texto de todos os elementos filhos
            const linkText = this.querySelector('span').textContent.trim();
            
            // Exibe um alerta simples para confirmar a interação
            alert(`Você clicou em "${linkText}".`);

            // Aqui você poderia adicionar a lógica para navegar para outra página
            // ou abrir um modal, por exemplo:
            // window.location.href = this.href;
        });
    });

});