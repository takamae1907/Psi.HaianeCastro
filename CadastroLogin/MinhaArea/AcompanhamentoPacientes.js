document.addEventListener('DOMContentLoaded', function() {

    // --- DADOS DE EXEMPLO DOS PACIENTES ---
    const patientData = {
        'joao_silva': {
            nome: "João Silva",
            email: "joao.silva@email.com",
            telefone: "(11) 91234-5678",
            dataNascimento: "20/05/1985",
            endereco: "Rua das Amoreiras, 123, São Paulo - SP",
            documentos: [
                { tipo: "Receita Médica", data: "15/07/2025", url: "#" },
                { tipo: "Encaminhamento", data: "15/07/2025", url: "#" }
            ]
        },
        'maria_oliveira': {
            nome: "Maria Oliveira",
            email: "maria.o@email.com",
            telefone: "(21) 98765-4321",
            dataNascimento: "10/11/1992",
            endereco: "Avenida Copacabana, 456, Rio de Janeiro - RJ",
            documentos: [
                { tipo: "Atestado de Comparecimento", data: "18/07/2025", url: "#" }
            ]
        },
        'carlos_souza': {
            nome: "Carlos Souza",
            email: "carlos.souza@email.com",
            telefone: "(31) 99999-8888",
            dataNascimento: "01/02/1978",
            endereco: "Rua dos Inconfidentes, 789, Belo Horizonte - MG",
            documentos: []
        }
    };
    // ------------------------------------

    const modal = document.getElementById('patient-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    // Lógica para abrir o modal
    viewDetailsBtns.forEach(button => {
        button.addEventListener('click', () => {
            const patientId = button.dataset.patientId;
            const data = patientData[patientId];
            if (data) {
                populateModal(data);
                modal.style.display = 'flex';
            }
        });
    });

    // Lógica para fechar o modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Função para preencher o modal com os dados do paciente
    function populateModal(data) {
        document.getElementById('modal-patient-name').textContent = data.nome;
        
        // Preenche dados cadastrais
        const profileDataContainer = document.getElementById('modal-profile-data');
        profileDataContainer.innerHTML = `
            <div class="data-item"><strong>Email:</strong> <span>${data.email}</span></div>
            <div class="data-item"><strong>Telefone:</strong> <span>${data.telefone}</span></div>
            <div class="data-item"><strong>Nascimento:</strong> <span>${data.dataNascimento}</span></div>
            <div class="data-item full-width"><strong>Endereço:</strong> <span>${data.endereco}</span></div>
        `;

        // Preenche a tabela de documentos
        const documentsTableBody = document.querySelector('#modal-documents-table tbody');
        documentsTableBody.innerHTML = '';
        if (data.documentos.length > 0) {
            data.documentos.forEach(doc => {
                const row = `
                    <tr>
                        <td><i class="fas fa-file-alt"></i> ${doc.tipo}</td>
                        <td>${doc.data}</td>
                        <td>
                            <a href="${doc.url}" class="action-button primary small" download>
                                <i class="fas fa-download"></i> Baixar
                            </a>
                        </td>
                    </tr>
                `;
                documentsTableBody.innerHTML += row;
            });
        } else {
            documentsTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhum documento encontrado.</td></tr>';
        }
        
        // Ativa a primeira aba por padrão
        document.querySelector('.modal-tab-link[data-tab="dados-cadastrais"]').click();
    }

    // Lógica das abas dentro do modal
    const tabLinks = document.querySelectorAll('.modal-tab-link');
    const tabContents = document.querySelectorAll('.modal-tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;

            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            tabContents.forEach(content => {
                content.style.display = 'none';
                if (content.id === tab) {
                    content.style.display = 'block';
                }
            });
        });
    });
});
