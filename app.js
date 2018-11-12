// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Creat li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        // Create new link 
        const link = document.createElement('a');
        // Add Class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Clear task
function clearTasks(e){
    // taskList.innerHTML = '';

    // Faster method - https://jsperf.com/innterhtml-vs-removeChild
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();

}

// clear tasks
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }        
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Creat li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link 
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Sotre in LocalStorage
    storeTaskInputLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInputLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

