document.addEventListener('DOMContentLoaded', function() {
    
    // --- DADOS DE EXEMPLO (Simula um banco de dados) ---
    const agendamentosMarcados = {
        "2025-07-25": [
            { horario: "10:00", paciente: "João Silva" },
            { horario: "14:00", paciente: "Maria Oliveira" }
        ],
        "2025-07-28": [
            { horario: "09:00", paciente: "Carlos Souza" }
        ],
        "2025-08-01": [
            { horario: "11:00", paciente: "Ana Pereira" },
            { horario: "15:00", paciente: "Pedro Martins" },
            { horario: "16:00", paciente: "Juliana Costa" }
        ]
    };
    // ----------------------------------------------------

    const listaAgendamentosEl = document.getElementById('lista-agendamentos');
    const detalhesTituloEl = document.getElementById('detalhes-titulo');

    // 1. INICIALIZAÇÃO DO CALENDÁRIO
    const calendario = flatpickr("#calendario-doutora", {
        inline: true,
        locale: "pt",
        dateFormat: "Y-m-d", // Formato padrão para facilitar a busca nos dados
        
        // Função executada quando um dia é clicado
        onChange: function(selectedDates, dateStr, instance) {
            const dataSelecionada = dateStr;
            const agendamentosDoDia = agendamentosMarcados[dataSelecionada];
            
            // Atualiza o título com a data formatada
            const dataFormatada = instance.formatDate(selectedDates[0], "d/m/Y");
            detalhesTituloEl.textContent = `Agendamentos de ${dataFormatada}`;

            exibirDetalhesDoDia(agendamentosDoDia);
        },

        // Função executada na criação de cada dia do calendário
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            // Formata a data do dia atual para o formato "YYYY-MM-DD"
            const dataFormatada = fp.formatDate(dayElem.dateObj, "Y-m-d");
            
            // Se a data existe nos nossos dados de agendamento, adiciona a classe
            if (agendamentosMarcados[dataFormatada]) {
                dayElem.classList.add("tem-agendamento");
            }
        }
    });

    // 2. FUNÇÃO PARA EXIBIR OS DETALHES DOS AGENDAMENTOS
    function exibirDetalhesDoDia(agendamentos) {
        listaAgendamentosEl.innerHTML = ''; // Limpa a lista anterior

        if (!agendamentos || agendamentos.length === 0) {
            listaAgendamentosEl.innerHTML = '<p class="placeholder-text">Não há agendamentos para este dia.</p>';
            return;
        }

        // Cria um card de agendamento para cada item
        agendamentos.forEach(agendamento => {
            const card = document.createElement('div');
            card.className = 'agendamento-card-detalhe';
            
            card.innerHTML = `
                <div class="horario-info">
                    <i class="fas fa-clock"></i>
                    <span>${agendamento.horario}</span>
                </div>
                <div class="paciente-info">
                    <i class="fas fa-user"></i>
                    <span>${agendamento.paciente}</span>
                </div>
            `;
            
            listaAgendamentosEl.appendChild(card);
        });
    }
});
