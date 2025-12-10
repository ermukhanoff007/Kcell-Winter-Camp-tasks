const input = document.querySelector(".input");
const button = document.querySelector(".btn-add");
const tasks = document.querySelector(".todo-container");
const activeCount = document.querySelector(".active-tasks");

button.addEventListener("click", addTask);

function updateCount() {
  const activeTasks = document.querySelectorAll(".task-text:not(.completed)");
  activeCount.textContent = activeTasks.length;
}

function addTask() {
  const task = input.value.trim();
  if (!task) return;

  const taskContainer = document.createElement("div");
  taskContainer.classList = "task-container";
  const taskText = document.createElement("p");
  taskText.textContent = task;
  taskText.className = "task-text";

  taskText.addEventListener("click", () => {
    taskText.classList.toggle("completed");
    updateCount();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    taskContainer.remove(taskText);
    updateCount();
  });
  taskContainer.appendChild(taskText);
  taskContainer.appendChild(deleteButton);
  tasks.appendChild(taskContainer);

  input.value = "";
  updateCount();
}
