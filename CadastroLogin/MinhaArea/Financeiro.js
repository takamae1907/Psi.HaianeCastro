document.addEventListener('DOMContentLoaded', function() {

    // --- DADOS DE EXEMPLO (Simula um banco de dados) ---
    const financeData = {
        'joao_silva': {
            nome: "João Silva",
            pagamentos: [
                { id: 'p1', sessao: "25/07/2025", valor: "150,00", status: "Pendente", comprovante: null },
                { id: 'p2', sessao: "18/07/2025", valor: "150,00", status: "Pago", comprovante: null }
            ]
        },
        'maria_oliveira': {
            nome: "Maria Oliveira",
            pagamentos: [
                { id: 'p3', sessao: "22/07/2025", valor: "150,00", status: "Aguardando Confirmação", comprovante: "https://placehold.co/600x800/eee/31343C?text=Comprovante" },
                { id: 'p4', sessao: "15/07/2025", valor: "150,00", status: "Pago", comprovante: null }
            ]
        },
        'carlos_souza': {
            nome: "Carlos Souza",
            pagamentos: [
                { id: 'p5', sessao: "20/07/2025", valor: "150,00", status: "Pendente", comprovante: null }
            ]
        }
    };
    // ----------------------------------------------------

    const patientSelect = document.getElementById('patient-select');
    const paymentsDisplayArea = document.getElementById('payments-display-area');
    const paymentsTitle = document.getElementById('payments-title');
    const paymentsTableBody = document.getElementById('payments-table-body');
    const modal = document.getElementById('receipt-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const receiptImage = document.getElementById('receipt-image');

    // 1. Popula o seletor de pacientes
    for (const id in financeData) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = financeData[id].nome;
        patientSelect.appendChild(option);
    }

    // 2. Evento de mudança no seletor de pacientes
    patientSelect.addEventListener('change', function() {
        const selectedPatientId = this.value;
        if (selectedPatientId) {
            const patient = financeData[selectedPatientId];
            displayPatientPayments(patient);
            paymentsDisplayArea.style.display = 'block';
        } else {
            paymentsDisplayArea.style.display = 'none';
        }
    });

    // 3. Função para exibir os pagamentos do paciente na tabela
    function displayPatientPayments(patient) {
        paymentsTitle.textContent = `Pagamentos de ${patient.nome}`;
        paymentsTableBody.innerHTML = ''; // Limpa a tabela

        if (patient.pagamentos.length > 0) {
            patient.pagamentos.forEach(pag => {
                const row = document.createElement('tr');
                row.dataset.paymentId = pag.id;
                
                let statusClass = '';
                if (pag.status === 'Pago') statusClass = 'status-pago';
                else if (pag.status === 'Pendente') statusClass = 'status-pendente';
                else if (pag.status === 'Aguardando Confirmação') statusClass = 'status-aguardando';

                let actionsHtml = '';
                if (pag.status === 'Pendente') {
                    actionsHtml = `<button class="action-button tertiary small" disabled>Aguardando Paciente</button>`;
                } else if (pag.status === 'Aguardando Confirmação') {
                    actionsHtml = `
                        <button class="action-button secondary small view-receipt-btn"><i class="fas fa-receipt"></i> Ver Comprovante</button>
                        <button class="action-button primary small confirm-payment-btn"><i class="fas fa-check"></i> Confirmar</button>
                    `;
                } else if (pag.status === 'Pago') {
                    actionsHtml = `<button class="action-button pago small" disabled><i class="fas fa-check-circle"></i> Finalizado</button>`;
                }
                
                row.innerHTML = `
                    <td>Sessão de ${pag.sessao}</td>
                    <td>R$ ${pag.valor}</td>
                    <td><span class="payment-status ${statusClass}">${pag.status}</span></td>
                    <td class="action-cell">${actionsHtml}</td>
                `;
                paymentsTableBody.appendChild(row);
            });
        } else {
            paymentsTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Nenhum registro de pagamento encontrado.</td></tr>';
        }
    }
    
    // 4. Lógica de Ações na Tabela (usando delegação de eventos)
    paymentsTableBody.addEventListener('click', function(event) {
        const target = event.target.closest('button');
        if (!target) return;

        const row = target.closest('tr');
        const paymentId = row.dataset.paymentId;
        const patientId = patientSelect.value;
        const payment = financeData[patientId].pagamentos.find(p => p.id === paymentId);

        // Ação: Ver Comprovante
        if (target.classList.contains('view-receipt-btn')) {
            if (payment.comprovante) {
                receiptImage.src = payment.comprovante;
                modal.style.display = 'flex';
            } else {
                alert("Nenhum comprovante disponível.");
            }
        }

        // Ação: Confirmar Pagamento
        if (target.classList.contains('confirm-payment-btn')) {
            if (confirm("Deseja confirmar o pagamento desta sessão?")) {
                payment.status = 'Pago';
                displayPatientPayments(financeData[patientId]); // Re-renderiza a tabela
            }
        }
    });

    // 5. Lógica para fechar o modal
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });
});
