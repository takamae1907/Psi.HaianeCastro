document.addEventListener('DOMContentLoaded', function() {

    // --- DADOS DE EXEMPLO (Simula um banco de dados) ---
    const patientDocs = {
        'joao_silva': {
            nome: "João Silva",
            documentos: [
                { tipo: "Receita Médica", data: "15/07/2025", url: "#" },
                { tipo: "Encaminhamento", data: "15/07/2025", url: "#" }
            ]
        },
        'maria_oliveira': {
            nome: "Maria Oliveira",
            documentos: [
                { tipo: "Atestado", data: "18/07/2025", url: "#" }
            ]
        },
        'carlos_souza': {
            nome: "Carlos Souza",
            documentos: []
        }
    };
    // ----------------------------------------------------

    const patientSelect = document.getElementById('patient-select');
    const uploadArea = document.getElementById('upload-area');
    const documentsDisplayArea = document.getElementById('documents-display-area');
    const documentsTitle = document.getElementById('documents-title');
    const documentsTableBody = document.getElementById('documents-table-body');
    const uploadForm = document.getElementById('upload-form');
    const docFileInput = document.getElementById('doc-file');
    const docTypeInput = document.getElementById('doc-type');

    // 1. Popula o seletor de pacientes
    for (const id in patientDocs) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = patientDocs[id].nome;
        patientSelect.appendChild(option);
    }

    // 2. Evento de mudança no seletor de pacientes
    patientSelect.addEventListener('change', function() {
        const selectedPatientId = this.value;
        if (selectedPatientId) {
            const patient = patientDocs[selectedPatientId];
            displayPatientInfo(patient);
            uploadArea.style.display = 'block';
            documentsDisplayArea.style.display = 'block';
        } else {
            uploadArea.style.display = 'none';
            documentsDisplayArea.style.display = 'none';
        }
    });

    // 3. Função para exibir os documentos do paciente
    function displayPatientInfo(patient) {
        documentsTitle.textContent = `Documentos de ${patient.nome}`;
        documentsTableBody.innerHTML = ''; // Limpa a tabela

        if (patient.documentos.length > 0) {
            patient.documentos.forEach(doc => {
                addDocumentToTable(doc);
            });
        } else {
            documentsTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhum documento encontrado para este paciente.</td></tr>';
        }
    }
    
    // 4. Função para adicionar uma linha na tabela de documentos
    function addDocumentToTable(doc) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><i class="fas fa-file-alt"></i> ${doc.tipo}</td>
            <td>${doc.data}</td>
            <td>
                <a href="${doc.url}" class="action-button primary small" download>
                    <i class="fas fa-download"></i> Baixar
                </a>
            </td>
        `;
        documentsTableBody.appendChild(row);
    }

    // 5. Evento de envio do formulário de upload
    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const selectedPatientId = patientSelect.value;
        const file = docFileInput.files[0];
        const docType = docTypeInput.value;

        if (!selectedPatientId) {
            alert("Por favor, selecione um paciente primeiro.");
            return;
        }
        if (!file) {
            alert("Por favor, selecione um arquivo para enviar.");
            return;
        }

        // Simula o upload
        alert(`Documento "${file.name}" (${docType}) enviado com sucesso para ${patientDocs[selectedPatientId].nome}!`);

        // Adiciona o novo documento aos dados e à tabela (simulação)
        const today = new Date();
        const newDoc = {
            tipo: docType,
            data: today.toLocaleDateString('pt-BR'),
            url: "#" // Em um cenário real, seria a URL do arquivo salvo
        };
        patientDocs[selectedPatientId].documentos.push(newDoc);
        
        // Limpa e reexibe os documentos
        displayPatientInfo(patientDocs[selectedPatientId]);
        
        // Reseta o formulário
        uploadForm.reset();
    });
});
