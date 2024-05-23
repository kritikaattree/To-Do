// function addTask() {
//     var taskInput = document.getElementById("taskInput");
//     var taskList = document.getElementById("taskList");
  
//     if (taskInput.value === "") {
//       alert("Please enter a task!");
//       return;
//     }
  
//     var task = document.createElement("li");
  
//     var taskText = document.createElement("span");
//     taskText.textContent = taskInput.value;
  
//     var checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.onclick = function() {
//       taskText.classList.toggle("completed");
//     };
  
//     var checkboxContainer = document.createElement("label");
//     checkboxContainer.className = "checkbox-container";
//     var checkmark = document.createElement("span");
//     checkmark.className = "checkmark";
  
//     checkboxContainer.appendChild(checkbox);
//     checkboxContainer.appendChild(checkmark);
  
//     var deleteButton = document.createElement("button");
//     deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
//     deleteButton.className = "delete-button";
//     deleteButton.onclick = function() {
//       task.remove();
//     };
  
//     task.appendChild(checkboxContainer);
//     task.appendChild(taskText);
//     task.appendChild(deleteButton);
//     taskList.appendChild(task);
  
//     taskInput.value = "";
//   }
  

let tasks = [];

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskDateTime = document.getElementById("taskDateTime");
  var taskPriority = document.getElementById("taskPriority");
  var taskCategory = document.getElementById("taskCategory");
  var taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Please enter a task!");
    return;
  }

  var task = {
    id: Date.now(),
    text: taskInput.value,
    dateTime: taskDateTime.value,
    priority: taskPriority.value,
    category: taskCategory.value,
    completed: false
  };

  tasks.push(task);
  displayTasks(tasks);

  taskInput.value = "";
  taskDateTime.value = "";
  taskPriority.value = "low";
  taskCategory.value = "work";
}

function displayTasks(tasksToDisplay) {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasksToDisplay.forEach(task => {
    var taskItem = document.createElement("li");

    var taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = function() {
      task.completed = !task.completed;
      displayTasks(tasks);
    };

    var checkboxContainer = document.createElement("label");
    checkboxContainer.className = "checkbox-container";
    var checkmark = document.createElement("span");
    checkmark.className = "checkmark";

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.className = "delete-button";
    deleteButton.onclick = function() {
      tasks = tasks.filter(t => t.id !== task.id);
      displayTasks(tasks);
    };

    var taskDetails = document.createElement("div");
    taskDetails.className = "task-details";

    var taskDateTimeSpan = document.createElement("span");
    taskDateTimeSpan.className = "task-date-time";
    taskDateTimeSpan.textContent = task.dateTime ? `Due: ${new Date(task.dateTime).toLocaleString()}` : "";

    var taskPrioritySpan = document.createElement("span");
    taskPrioritySpan.className = "task-priority";
    taskPrioritySpan.textContent = `Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;

    var taskCategorySpan = document.createElement("span");
    taskCategorySpan.className = "task-category";
    taskCategorySpan.textContent = `Category: ${task.category.charAt(0).toUpperCase() + task.category.slice(1)}`;

    taskDetails.appendChild(taskText);
    taskDetails.appendChild(taskDateTimeSpan);
    taskDetails.appendChild(taskPrioritySpan);
    taskDetails.appendChild(taskCategorySpan);

    taskItem.appendChild(checkboxContainer);
    taskItem.appendChild(taskDetails);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

function filterTasks() {
  var filterCategory = document.getElementById("filterCategory").value;
  if (filterCategory === "all") {
    displayTasks(tasks);
  } else {
    var filteredTasks = tasks.filter(task => task.category === filterCategory);
    displayTasks(filteredTasks);
  }
}

function sortTasksByDate() {
  tasks.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  displayTasks(tasks);
}

// Initial display of tasks
displayTasks(tasks);
