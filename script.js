// Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const categorySelect = document.getElementById('category');
const prioritySelect = document.getElementById('priority');
const dueDateInput = document.getElementById('due-date');
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const appContainer = document.querySelector('.app-container');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add Task Functionality
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const taskCategory = categorySelect.value;
    const taskPriority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskText,
        category: taskCategory,
        priority: taskPriority,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
});

// Save Tasks to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item', task.priority.toLowerCase());
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
            <span>${task.text} (Due: ${task.dueDate})</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Mark as Completed Functionality
        const completeCheckbox = taskItem.querySelector('.complete-checkbox');
        completeCheckbox.addEventListener('change', () => {
            task.completed = completeCheckbox.checked;
            saveTasks();
            renderTasks();
        });

        // Edit Task Functionality
        const editBtn = taskItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            taskInput.value = task.text;
            categorySelect.value = task.category;
            prioritySelect.value = task.priority;
            dueDateInput.value = task.dueDate;

            // Remove task from the array for editing
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        // Delete Task Functionality
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(taskItem);
    });
}

// Toggle Dark/Light Mode
themeSwitch.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    appContainer.classList.toggle('dark-mode');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.classList.toggle('dark-mode');
    });
});

// Initial Render
renderTasks();
