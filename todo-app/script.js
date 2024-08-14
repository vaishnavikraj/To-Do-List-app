const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");

        // Create a span for the task text
        let taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.innerHTML = inputBox.value;
        li.appendChild(taskText);

        // Create a span for the date
        let dateSpan = document.createElement("span");
        let currentDate = new Date();
        dateSpan.innerHTML = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
        dateSpan.className = "date-span";
        li.appendChild(dateSpan);

        // Create a span for the delete '×' icon
        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = "\u00D7";
        deleteSpan.className = "delete-span";
        li.appendChild(deleteSpan);
        
        listContainer.appendChild(li);

        saveData(); // Save the task immediately after adding it
    }
    inputBox.value = ''; // Clear the input after adding the task
}

listContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains('task-text')) {
        e.target.parentElement.classList.toggle("checked");
        if (e.target.parentElement.classList.contains("checked")) {
            // Update the date to show task completion date
            let currentDate = new Date();
            let dateSpan = e.target.nextElementSibling;
            dateSpan.innerHTML = "Completed: " + currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
        } else {
            // Restore the original date when unchecked
            let dateSpan = e.target.nextElementSibling;
            let originalDate = e.target.dataset.date;
            dateSpan.innerHTML = originalDate;
        }
        saveData();
    } else if (e.target.classList.contains('delete-span')) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    let data = localStorage.getItem("data");
    if (data) {
        listContainer.innerHTML = data;
    }
}

showTask(); // Load tasks when the page is loaded
