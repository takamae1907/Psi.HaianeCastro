document.addEventListener('DOMContentLoaded', () => {
    const appointmentList = document.getElementById('appointmentList'); // Obter a lista pelo ID
    const scrollDownButton = document.getElementById('scrollDownButton'); // Obter o botão pelo ID

    if (scrollDownButton && appointmentList) {
        scrollDownButton.addEventListener('click', () => {
            // Rola a lista de agendamentos para o final
            appointmentList.scrollTo({
                top: appointmentList.scrollHeight,
                behavior: 'smooth' // Rolagem suave
            });
        });
    }

    const scheduleButton = document.querySelector('.schedule-button'); // Se você reativar este botão no HTML

    if (scheduleButton && appointmentList) {
        scheduleButton.addEventListener('click', () => {
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const formattedDate = `Dia ${day}/${month < 10 ? '0' + month : month}`;

            const newAppointmentItem = document.createElement('div');
            newAppointmentItem.classList.add('appointment-item');
            newAppointmentItem.innerHTML = `
                <span>Consulta</span>
                <span>${formattedDate}</span>
                <span class="status gray">Pendente</span>
            `;
            appointmentList.appendChild(newAppointmentItem);
            newAppointmentItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
            alert('Novo agendamento adicionado à lista (apenas visualmente)!');
        });
    }
    
});