document.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
});

// Array local para armazenar as tarefas
let localTasks = [];

function fetchTasks() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(tasks => {
            localTasks = tasks.slice(0, 1000); 
            renderTasks();
        })
        .catch(error => console.error('Erro ao buscar tarefas:', error));
}

function renderTasks() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    localTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - 
                <strong class="${task.completed ? 'concluida' : 'pendente'}">
                    ${task.completed ? ' Concluída' : ' Pendente'}
                </strong>
            </span>
            <div class="task-actions">
                <button onclick="toggleTaskStatus(${task.id})">
                    Marcar como ${task.completed ? 'Pendente' : 'Concluída'}
                </button>
                <button onclick="editTask(${task.id})">Editar</button>
                <button onclick="deleteTask(${task.id})">Excluir</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const userId = document.getElementById('user-id').value;
    const completed = document.getElementById('task-completed').checked; // Verifica se foi marcada como concluída

    if (!title || !userId) {
        alert("Preencha o título e o ID do usuário.");
        return;
    }

    const newTask = {
        id: localTasks.length + 1, // Criamos um ID manualmente
        title: title,
        completed: completed, // Adiciona o status da tarefa
        userId: userId
    };

    localTasks.push(newTask);
    renderTasks();
    alert("Tarefa adicionada com sucesso!");
}

function editTask(taskId) {
    const task = localTasks.find(t => t.id === taskId);
    if (!task) return;

    const newTitle = prompt("Digite o novo título da tarefa:", task.title);
    if (!newTitle) return;

    task.title = newTitle;
    renderTasks();
    alert("Tarefa editada com sucesso!");
}

function deleteTask(taskId) {
    localTasks = localTasks.filter(t => t.id !== taskId);
    renderTasks();
    alert("Tarefa excluída com sucesso!");
}

// ✅ Função para alternar entre "Pendente" e "Concluída"
function toggleTaskStatus(taskId) {
    const task = localTasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed; // Alterna o estado
    renderTasks();
}
