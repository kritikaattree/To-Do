// Define an object to store tasks categorized by category
let tasks = {
  work: [],
  personal: [],
  shopping: []
};

// Function to add a new task
function addTask() {
  // Get task details from input fields
  let taskInput = document.getElementById("taskInput").value;
  let taskDateTime = document.getElementById("taskDateTime").value;
  let taskCategory = document.getElementById("taskCategory").value;
  let taskPriority = document.getElementById("taskPriority").value;

  // Create a new task object
  let newTask = {
    id: Date.now(), // Generate unique ID based on current timestamp
    task: taskInput,
    dateTime: taskDateTime,
    priority: taskPriority,
    completed: false
  };

  // Add the new task to the tasks object based on category
  tasks[taskCategory].push(newTask);

  // Call the function to display tasks
  displayTasks();
}

// Function to display tasks
function displayTasks() {
  // Get references to task lists
  let workTasksList = document.getElementById("workTasks");
  let personalTasksList = document.getElementById("personalTasks");
  let shoppingTasksList = document.getElementById("shoppingTasks");

  // Clear existing tasks from lists
  workTasksList.innerHTML = "";
  personalTasksList.innerHTML = "";
  shoppingTasksList.innerHTML = "";

  // Iterate over tasks object and display tasks in respective lists
  Object.keys(tasks).forEach(category => {
    tasks[category].forEach(task => {
      // Create list item element for the task
      let listItem = document.createElement("li");

      // Set task details as inner HTML of list item
      listItem.innerHTML = `
        <div class="checkbox-container">
          <input type="checkbox" onchange="toggleCompletion(${task.id})" ${task.completed ? 'checked' : ''}>
          <div class="task-details">
            <p>${task.task}</p>
            <p class="task-due">Due: ${task.dateTime}</p>
            <p class="task-priority">Priority: ${task.priority}</p>
          </div>
        </div>
        <button class="delete-button" onclick="deleteTask(${task.id})">
          <i class="material-icons">delete</i>
        </button>
      `;

      // Append the list item to the respective task list based on category
      switch (category) {
        case 'work':
          workTasksList.appendChild(listItem);
          break;
        case 'personal':
          personalTasksList.appendChild(listItem);
          break;
        case 'shopping':
          shoppingTasksList.appendChild(listItem);
          break;
      }
    });
  });
}

// Function to toggle task completion status
function toggleCompletion(id) {
  Object.keys(tasks).forEach(category => {
    tasks[category].forEach(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
  });
  displayTasks();
}

// Function to delete a task
function deleteTask(id) {
  Object.keys(tasks).forEach(category => {
    tasks[category] = tasks[category].filter(task => task.id !== id);
  });
  displayTasks();
}
