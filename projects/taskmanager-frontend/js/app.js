
const API_URL = "/api/tasks";

const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

// Load tasks when the page starts
document.addEventListener("DOMContentLoaded", loadTasks);

// Fetch all tasks
async function loadTasks() {
    try {
        hideError();

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load tasks.");
        }

        const tasks = await response.json();

        renderTasks(tasks);
    } catch (error) {
        showError(error.message);
    }
}

// Render tasks in the UI
function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "list-group-item text-muted";
        emptyMessage.textContent = "No tasks available.";
        taskList.appendChild(emptyMessage);
        return;
    }

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        if (task.isCompleted) {
            title.classList.add("task-completed");
        }

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const toggleButton = document.createElement("button");
        toggleButton.className = task.isCompleted
            ? "btn btn-sm btn-outline-secondary"
            : "btn btn-sm btn-outline-success";

        toggleButton.textContent = task.isCompleted
            ? "Undo"
            : "Complete";

        toggleButton.addEventListener("click", () => {
            updateTask(task, !task.isCompleted);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-sm btn-outline-danger";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.appendChild(toggleButton);
        actions.appendChild(deleteButton);

        listItem.appendChild(title);
        listItem.appendChild(actions);

        taskList.appendChild(listItem);
    });
}

// Create a new task
taskForm.addEventListener("submit", async event => {
    event.preventDefault();

    const title = taskTitleInput.value.trim();

    if (!title) {
        return;
    }

    try {
        hideError();

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                isCompleted: false
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create task.");
        }

        taskTitleInput.value = "";

        await loadTasks();
    } catch (error) {
        showError(error.message);
    }
});

// Update task completion status
async function updateTask(task, isCompleted) {
    try {
        hideError();

        const response = await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                isCompleted: isCompleted
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update task.");
        }

        await loadTasks();
    } catch (error) {
        showError(error.message);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        hideError();

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete task.");
        }

        await loadTasks();
    } catch (error) {
        showError(error.message);
    }
}

// Display an error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("d-none");
}

// Hide the error message
function hideError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("d-none");
}