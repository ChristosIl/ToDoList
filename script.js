//Get the necessary elements from the DOM
const todoInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');


//load tasks from the browser using loadTasks(they dont get erased!)
document.addEventListener('DOMContentLoaded', loadTasks);
//sd
//debug
console.log('running');

// Function to add a new task
function addTask() {

    //get input value and remove extra spaces
    const taskText = todoInput.value.trim();
    

    //enter task without text
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    //Creating a new list item (task 1, 2, ...)
    const listItem = document.createElement('li');

   

    // Create a span element to hold the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; //the text inside the delete button
    deleteButton.classList.add('delete'); //the delete style button (red box with white letters etc)

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('check-task');

    //Add event listener for deleting the task when the button is clicked
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem);
    });

    //Append the task text and delete button to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(checkBox);
    listItem.appendChild(deleteButton);

    // Add the list item to the list
    todoList.appendChild(listItem);

    //completed task with line
    checkBox.addEventListener('change', () => {
        taskSpan.classList.toggle('completed');
    });

    saveTasks();
    // Clear the input field after adding the task
    todoInput.value = '';
}

// Add event listener for the "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Allow pressing "Enter" key to add a task
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

//save tasks function
function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll('li').forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage when the page loads
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        //new list item
        const listItem = document.createElement('li');

        // Create a span element to hold the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        // Create a checkbox to mark the task as completed
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList.add('check-task');
        checkBox.checked = task.completed; // Set checkbox state based on task data

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');

        

        // Apply the 'completed' class if the task is marked as done
        if (task.completed) {
            taskSpan.classList.add('completed');
        }

        // Add event listener for deleting the task
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            saveTasks(); // Save updated list to localStorage
        });

        // Add event listener to toggle the 'completed' class when checkbox is clicked
        checkBox.addEventListener('change', () => {
            taskSpan.classList.toggle('completed');
            saveTasks(); // Save updated list to localStorage
        });

        // Append the task text, delete button, and checkbox to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(checkBox);
        listItem.appendChild(deleteButton);

        // Add the list item to the todo list
        todoList.appendChild(listItem);
    });
}

function updateClock(){
    const clockElement = document.getElementById('clock');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
