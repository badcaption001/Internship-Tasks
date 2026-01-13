document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        pendingList.innerHTML = '';
        completedList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;

            const actionsDiv = document.createElement('div');

            if (task.completed) {
                const undoBtn = document.createElement('button');
                undoBtn.className = 'undo-btn';
                undoBtn.textContent = 'Undo';
                undoBtn.addEventListener('click', () => toggleComplete(index));
                actionsDiv.appendChild(undoBtn);
            } else {
                const completeBtn = document.createElement('button');
                completeBtn.className = 'complete-btn';
                completeBtn.textContent = 'Complete';
                completeBtn.addEventListener('click', () => toggleComplete(index));
                actionsDiv.appendChild(completeBtn);
            }

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editTask(index));
            actionsDiv.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            actionsDiv.appendChild(deleteBtn);

            li.appendChild(taskText);
            li.appendChild(actionsDiv);

            if (task.completed) {
                completedList.appendChild(li);
            } else {
                pendingList.appendChild(li);
            }
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const li = pendingList.children[index] || completedList.children[index];
        const taskText = li.querySelector('.task-text');
        const currentText = taskText.textContent;

        const editInput = document.createElement('input');
        editInput.className = 'edit-input';
        editInput.value = currentText;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.textContent = 'Save';
        saveBtn.addEventListener('click', () => saveEdit(index, editInput.value));

       
        li.innerHTML = '';
        li.appendChild(editInput);
        li.appendChild(saveBtn);
    }

    function saveEdit(index, newText) {
        if (newText.trim() === '') {
            alert('Task cannot be empty.');
            return;
        }
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
