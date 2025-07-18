document.addEventListener('DOMContentLoaded', function() {

    // Seleciona todos os botões de upload da página
    const uploadButtons = document.querySelectorAll('.upload-btn');

    uploadButtons.forEach(button => {
        // Para cada botão, encontra o input de arquivo correspondente na mesma linha da tabela
        const row = button.closest('.payment-row');
        const fileInput = row.querySelector('.file-input');
        
        // Adiciona o evento de clique ao BOTÃO
        button.addEventListener('click', () => {
            // Quando o botão é clicado, ele aciona o clique no INPUT escondido
            fileInput.click();
        });

        // Adiciona o evento de 'change' ao INPUT
        fileInput.addEventListener('change', function() {
            // Verifica se um arquivo foi realmente selecionado
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                
                // Simula o sucesso do envio
                alert(`Comprovante "${fileName}" anexado com sucesso! O status será atualizado após a confirmação.`);

                // Atualiza a interface para refletir o envio
                const statusCell = row.querySelector('.payment-status');
                const actionCell = row.querySelector('.action-cell');

                // Muda o status para "Aguardando Confirmação"
                statusCell.textContent = 'Aguardando Confirmação';
                statusCell.className = 'payment-status status-aguardando';

                // Desabilita o botão e muda o texto/ícone
                actionCell.innerHTML = `
                    <button class="action-button secondary small" disabled>
                        <i class="fas fa-hourglass-half"></i> Enviado
                    </button>
                `;
            }
        });
    });

});