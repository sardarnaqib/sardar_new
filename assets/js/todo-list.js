// Get the task input and task list elements
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#task-list");

// Load tasks from local storage, if any
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Add a task to the list
document.getElementById("todo-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const task = taskInput.value;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskInput.value = "";
});

// Display tasks when the page loads
displayTasks();
