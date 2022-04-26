const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector(".filter");
const taskInput = document.querySelector("#task");

//Load event listeners
loadEventListeners();

// Load event listeners
function loadEventListeners(){

    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);

    form.addEventListener("submit", addTask);
    //remove task event
    taskList.addEventListener("click", removeTask);

    // Clear task
    clearBtn.addEventListener("click", clearTask);

    // Filter task event
    filter.addEventListener("keyup", filterTasks);
}


// Get tasks from LS
function getTasks(){
    let tasks;

    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function(task){
        // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append li
    li.appendChild(document.createTextNode(task));
    // Create a link element
    const link = document.createElement("a");
    // Add a class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    })
}

// Add Task
function addTask(e){
    if (taskInput.value === ""){
        alert("Add a task")
    }


    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create a link element
    const link = document.createElement("a");
    // Add a class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = " ";

    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){

    let tasks;

    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if (e.target.parentElement.classList.contains("delete-item")){
        if (confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();


            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
        
    }
}


// Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;

    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Clear task
function clearTask(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage();
}

// Clear tasks from LS
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

// Filter task
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
}