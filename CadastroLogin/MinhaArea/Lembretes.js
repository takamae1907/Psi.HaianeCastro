document.addEventListener('DOMContentLoaded', function() {
    
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const placeholder = document.querySelector('.placeholder-task');

    // Carrega tarefas salvas do localStorage
    loadTasks();

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    });

    taskList.addEventListener('click', function(event) {
        const target = event.target;
        
        // Marcar como concluída
        if (target.classList.contains('complete-btn')) {
            const taskItem = target.closest('li');
            taskItem.classList.toggle('completed');
            saveTasks();
        }

        // Remover tarefa
        if (target.classList.contains('delete-btn')) {
            const taskItem = target.closest('li');
            taskItem.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                taskItem.remove();
                saveTasks();
                checkIfEmpty();
            }, 300);
        }
    });

    function addTask(text, isCompleted = false) {
        if (placeholder) {
            placeholder.style.display = 'none';
        }

        const li = document.createElement('li');
        li.className = 'task-item';
        if (isCompleted) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span class="task-text">${text}</span>
            <div class="task-actions">
                <button class="icon-button complete-btn">
                    <i class="fas fa-check"></i>
                </button>
                <button class="icon-button delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    }
    
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('.task-item');
        taskItems.forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks && tasks.length > 0) {
            tasks.forEach(task => addTask(task.text, task.completed));
        }
        checkIfEmpty();
    }
    
    function checkIfEmpty() {
        if (taskList.children.length === 1 && placeholder) { // Apenas o placeholder
             placeholder.style.display = 'block';
        }
    }
});
