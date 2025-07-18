// Função para abrir as abas
function openTab(evt, tabName) {
    // Esconde todo o conteúdo das abas
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Remove a classe "active" de todos os links das abas
    let tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Mostra a aba atual e adiciona a classe "active" ao botão que abriu a aba
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Garante que a primeira aba esteja aberta por padrão ao carregar a página
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.tab-link').click();
});