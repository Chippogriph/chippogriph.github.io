function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-white p-2 rounded shadow my-2";

        // Skapa en div för checkbox + text
        const taskContainer = document.createElement("div");
        taskContainer.className = "flex items-center gap-4";

        const completeBtn = document.createElement("input");
        completeBtn.type = "checkbox";
        completeBtn.className = "cursor-pointer"; 

        const span = document.createElement("span");
        span.textContent = taskInput.value;
        span.className = "text-lg font-bold";

        completeBtn.onchange = () => {
            span.classList.toggle("line-through", completeBtn.checked);
            span.classList.toggle("text-gray-500", completeBtn.checked);
        };

        taskContainer.appendChild(completeBtn);
        taskContainer.appendChild(span);

        const taskHandlerContainer = document.createElement("div");
        taskHandlerContainer.className = "flex items-center gap-4";

        const moveUp = document.createElement("button");
        moveUp.className = "fa-solid fa-square-caret-up bg-signatureGreen";
        moveUp.onclick = () => moveTask(li, "up");

        const moveDown = document.createElement("button");
        moveDown.className ="fa-solid fa-square-caret-down bg-signatureGreen";
        moveDown.onclick = () => moveTask(li, "down");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "text-red-500 p-1 hover:text-red-700";
        deleteBtn.onclick = () => li.remove();

        taskHandlerContainer.appendChild(moveUp);
        taskHandlerContainer.appendChild(moveDown);
        taskHandlerContainer.appendChild(deleteBtn);

        li.appendChild(taskContainer);
        li.appendChild(taskHandlerContainer);
        taskList.appendChild(li);

        taskInput.value = "";
    }
}

// Funktion för att flytta upp eller ner
function moveTask(taskElement, direction) {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children);
    const index = tasks.indexOf(taskElement);
    
    if (direction === "up" && index > 0) {
        taskList.insertBefore(taskElement, tasks[index - 1]);
    } else if (direction === "down" && index < tasks.length - 1) {
        taskList.insertBefore(taskElement, tasks[index + 2]);
    }
}
