document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();

    const addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const description = document.getElementById('taskDescription').value;
        addTask({ description }); 
    });
});

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:8080/tasks');
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

async function addTask(task) {
    try {
        const response = await fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar tarefa');
        }
        const newTask = await response.json();
        fetchTasks(); 
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
}

async function updateTask(id, updatedTask) {
    try {
        const response = await fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar tarefa');
        }
        fetchTasks(); 
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
        }
        fetchTasks(); 
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            updateTask(task.id, { description: task.description, completed: checkbox.checked });
        });


        const taskText = document.createElement('span');
        taskText.textContent = ` ${task.description}`;
        if (task.completed) {
            taskText.classList.add('completed'); 
        }

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));


        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => {
            const newDescription = prompt('Enter new description:', task.description);
            if (newDescription !== null) {
                updateTask(task.id, { description: newDescription, completed: checkbox.checked });
            }
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(updateButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}
