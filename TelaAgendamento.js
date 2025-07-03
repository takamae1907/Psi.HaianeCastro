document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM totalmente carregado. Iniciando script.');

    const monthYearDisplay = document.getElementById('monthYear');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const calendarGrid = document.querySelector('.calendar-grid');
    const scheduleButton = document.getElementById('scheduleButton');
    const fullNameInput = document.getElementById('fullName');
    const consultationTimeInput = document.getElementById('consultationTime');

    // Usamos a data atual para iniciar o calendário
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = null; // Para armazenar a data selecionada no calendário

    const today = new Date(); // Para destacar o dia atual

    // Função para renderizar o calendário
    function renderCalendar() {
        console.log(`Renderizando calendário para: ${currentYear}-${currentMonth + 1}`);

        // Limpa o grid do calendário, mas adiciona os nomes dos dias da semana
        calendarGrid.innerHTML = `
            <div class="day-name">Dom</div>
            <div class="day-name">Seg</div>
            <div class="day-name">Ter</div>
            <div class="day-name">Qua</div>
            <div class="day-name">Qui</div>
            <div class="day-name">Sex</div>
            <div class="day-name">Sab</div>
        `;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Obtém o dia da semana do primeiro dia do mês (0=Dom, 1=Seg...)
        // Ajusta para que a semana comece na Segunda-feira (1=Seg, 7=Dom)
        let firstDayOfWeek = firstDayOfMonth.getDay();
        if (firstDayOfWeek === 0) { // Se for domingo (0), ajusta para 7 para que a segunda seja 1
            firstDayOfWeek = 7;
        }

        // Atualiza o texto do cabeçalho do calendário (ex: "Julho 2025")
        monthYearDisplay.textContent = new Date(currentYear, currentMonth).toLocaleString('pt-BR', {
            month: 'long',
            year: 'numeric'
        }).replace(/(^\w|\s\w)/g, m => m.toUpperCase()); // Formata a primeira letra maiúscula

        // Preencher os dias vazios antes do primeiro dia do mês
        // O calendário começa na segunda-feira, então 'firstDayOfWeek - 1' é o número de células vazias
        for (let i = 1; i < firstDayOfWeek; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDiv);
        }
        console.log(`Adicionados ${firstDayOfWeek - 1} dias vazios.`);


        // Preencher os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.textContent = day; // **AQUI O NÚMERO DA DATA É ADICIONADO**
            dayDiv.dataset.day = day;
            dayDiv.dataset.month = currentMonth;
            dayDiv.dataset.year = currentYear;

            // Adicionar classe 'today' se for o dia atual
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            // Adicionar classe 'selected' se já for a data previamente selecionada
            if (selectedDate && day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
                dayDiv.classList.add('selected');
            }

            // Adicionar evento de clique para seleção da data
            dayDiv.addEventListener('click', () => {
                // Remover seleção anterior
                const previouslySelected = document.querySelector('.calendar-day.selected');
                if (previouslySelected) {
                    previouslySelected.classList.remove('selected');
                }
                // Adicionar nova seleção
                dayDiv.classList.add('selected');
                selectedDate = new Date(currentYear, currentMonth, day);
                console.log('Data selecionada:', selectedDate.toLocaleDateString('pt-BR'));
            });
            calendarGrid.appendChild(dayDiv);
            // console.log(`Adicionado dia ${day}`); // Descomente para ver cada dia sendo adicionado
        }
        console.log(`Adicionados ${daysInMonth} dias do mês.`);
    }

    // Navegação do calendário
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
        console.log('Mês anterior. Novo mês/ano:', currentMonth + 1, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
        console.log('Próximo mês. Novo mês/ano:', currentMonth + 1, currentYear);
    });

    // Lógica para o botão "Marcar"
    scheduleButton.addEventListener('click', () => {
        console.log('Botão "Marcar" clicado.');
        const fullName = fullNameInput.value.trim();
        const consultationTime = consultationTimeInput.value;

        if (!fullName) {
            alert('Por favor, preencha o nome completo.');
            return;
        }
        if (!selectedDate) {
            alert('Por favor, selecione uma data no calendário.');
            return;
        }
        if (!consultationTime) {
            alert('Por favor, selecione um horário para a consulta.');
            return;
        }

        const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const confirmationMessage = `
            Confirmar agendamento:
            Nome: ${fullName}
            Data: ${formattedDate}
            Hora: ${consultationTime}
        `;

        if (confirm(confirmationMessage)) {
            // **Aqui entraria a LÓGICA DE BACKEND para salvar o agendamento no banco de dados**
            // Por enquanto, é apenas uma simulação no front-end.

            alert('Agendamento simulado com sucesso!\n' + confirmationMessage);
            // Limpa o formulário após a "confirmação"
            fullNameInput.value = '';
            consultationTimeInput.value = '';
            selectedDate = null; // Limpa a data selecionada
            renderCalendar(); // Renderiza novamente para remover a seleção visual no calendário
            console.log('Agendamento simulado e formulário limpo.');
        } else {
            console.log('Agendamento cancelado.');
        }
    });

    // Renderiza o calendário na primeira carga da página
    renderCalendar();
});