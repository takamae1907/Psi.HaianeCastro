document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos da página
    const calendarioEl = document.getElementById('calendario-agendamento');
    const horariosGridEl = document.getElementById('horarios-grid');
    const horariosTituloEl = document.getElementById('horarios-titulo');
    const confirmarBtn = document.getElementById('confirmar-agendamento');

    let dataSelecionada = null;
    let horarioSelecionado = null;

    // Horários disponíveis FAKES (para simulação)
    const horariosDisponiveis = {
        'weekday': ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], // Seg a Sex
        'saturday': ["09:00", "10:00", "11:00"], // Sábado
        'sunday': [] // Domingo sem horários
    };

    // 1. INICIALIZAÇÃO DO CALENDÁRIO (FLATPICKR)
    const calendario = flatpickr(calendarioEl, {
        inline: true, // Mostra o calendário diretamente na página
        minDate: "today", // Não permite selecionar datas passadas
        locale: "pt", // Traduz para português
        dateFormat: "d/m/Y",
        
        // Função que é executada toda vez que uma data é selecionada
        onChange: function(selectedDates, dateStr, instance) {
            dataSelecionada = dateStr;
            horarioSelecionado = null; // Reseta o horário ao mudar a data
            confirmarBtn.disabled = true; // Desabilita o botão de confirmar

            const diaDaSemana = selectedDates[0].getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
            
            let horarios = [];
            if (diaDaSemana === 0) { // Domingo
                horarios = horariosDisponiveis.sunday;
            } else if (diaDaSemana === 6) { // Sábado
                horarios = horariosDisponiveis.saturday;
            } else { // Dias de semana
                horarios = horariosDisponiveis.weekday;
            }

            atualizarHorarios(horarios, dateStr);
        },
    });

    // 2. FUNÇÃO PARA ATUALIZAR OS HORÁRIOS NA TELA
    function atualizarHorarios(horarios, dataFormatada) {
        horariosTituloEl.innerText = `2. Horários para ${dataFormatada}`;
        horariosGridEl.innerHTML = ''; // Limpa os horários antigos

        if (horarios.length === 0) {
            horariosGridEl.innerHTML = '<p class="horarios-placeholder">Não há horários disponíveis para esta data.</p>';
            return;
        }

        horarios.forEach(horario => {
            const btn = document.createElement('button');
            btn.className = 'time-slot-btn';
            btn.textContent = horario;
            btn.dataset.horario = horario;
            horariosGridEl.appendChild(btn);
        });
    }

    // 3. LÓGICA DE CLIQUE NOS HORÁRIOS
    horariosGridEl.addEventListener('click', function(event) {
        // Remove a seleção de qualquer outro botão
        const todosBotoes = horariosGridEl.querySelectorAll('.time-slot-btn');
        todosBotoes.forEach(btn => btn.classList.remove('selected'));

        // Se o clique foi em um botão de horário
        if (event.target.classList.contains('time-slot-btn')) {
            const btnClicado = event.target;
            btnClicado.classList.add('selected');
            horarioSelecionado = btnClicado.dataset.horario;
            confirmarBtn.disabled = false; // Habilita o botão de confirmar
        }
    });

    // 4. LÓGICA DO BOTÃO DE CONFIRMAÇÃO
    confirmarBtn.addEventListener('click', function() {
        if (dataSelecionada && horarioSelecionado) {
            alert(`Agendamento confirmado com sucesso!\n\nData: ${dataSelecionada}\nHorário: ${horarioSelecionado}\n\nProfissional: Haiane Castro`);
            
            // Aqui você poderia redirecionar ou limpar a seleção
            calendario.clear();
            horariosGridEl.innerHTML = '<p class="horarios-placeholder">Selecione uma data no calendário para ver os horários disponíveis.</p>';
            horariosTituloEl.innerText = `2. Escolha um horário`;
            confirmarBtn.disabled = true;
        } else {
            alert("Por favor, selecione uma data e um horário.");
        }
    });
});