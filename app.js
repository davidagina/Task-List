const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector(".filter");
const taskInput = document.querySelector("#task");

//Load event listeners
loadEventListeners();

// Load event listeners
function loadEventListeners(){
    form.addEventListener("submit", addTask);
    //remove task event
    taskList.addEventListener("click", removeTask);

    // Clear task
    clearBtn.addEventListener("click", clearTask);

    // Filter task event
    filter.addEventListener("keyup", filterTasks);
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

    taskInput.value = " ";

    e.preventDefault();
}

// Remove task
function removeTask(e){
    if (e.target.parentElement.classList.contains("delete-item")){
        if (confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
        }
        
    }
}


// Clear task
function clearTask(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
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