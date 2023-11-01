// rd51625 grN1 lab b app.js

document.addEventListener("DOMContentLoaded", function() {
    // aktualizacja zegara co sekunde
    function updateClock() {
        const now = new Date();
        const clockElement = document.getElementById("clock");
        clockElement.textContent = now.toLocaleString();
    }

    setInterval(updateClock, 1000);
//class Todo {
	//constructor() {
		//this.tasks = this.loadFromLocalStorage() || [];
    const taskList = document.getElementById("task-list");
    const taskTitleInput = document.getElementById("task-title");
    const dueDateInput = document.getElementById("due-date");
    const addButton = document.getElementById("add-button");
	const editButton = document.getElementById("edit-button");
	const searchInput = document.getElementById("search");
		//}

    // dodawanie nowego zadania
	//metoda draw()
    function addTask(title, dueDate) {
         // nowe zadanie - element 
		const li = document.createElement("li");

		// dodawanie daty wykonania - opcjonalne!
		if (dueDate) {
			// formatowanie daty do "dd.mm.yyyy hh:mm:ss"
			const formattedDueDate = new Date(dueDate).toLocaleString("pl-PL", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			});
			
			// wpisanie do paska z przyciskami
			li.innerHTML = `${title} (Due: ${formattedDueDate}) <button class="edit-button">Edit</button> <button class="delete-button">X</button>`;
		} else {
			li.innerHTML = `${title} <button class="edit-button">Edit</button> <button class="delete-button">X</button>`;
		}
		
		// usuwanie zadania
		li.querySelector(".edit-button").addEventListener("click", function() {
			//editTask(li);
			alert("Edit Button is not working.");
			// funkcja edytowania i zapisu
			const target = e.target;
			if (target.classList.contains(".edit-button")){
				const li = target.parentElement;
				const editButton = target;
				const saveButton = li.querySelector(".save-button");
				const titleSpan = li.querySelector(".title-span");
				//const dueDateSpan = li.querySelector(".due-date-span");
				
				if (editButton.style.display !== "none"){
					titleSpan.contentEditable = true;
					//dueDateSpan.contentEditable = true;
					editButton.style.display = "none";
					saveButton.style.display = "inline";
				}
			} else if (target.classList.contains(".save-button")){
				const li = target.parentElement;
				const editButton = li.querySelector(".edit-button");
				const saveButton = target;
				const titleSpan = li.querySelector(".title-span");
				//const dueDateSpan = li.querySelector(".due-date-span");
				
				titleSpan.contentEditable = false;
				//dueDateSpan.contentEditable = false;
				editButton.style.display = "inline";
				saveButton.style.display = "none";
				
				const newTitle = title.Span.textContent;
				//const newDueDate = dueDateSpan.textContent;
				
				// aktualizacja
				li.innerHTML = `${newTitle} <button class="edit-button">Edit</button> <button class="delete-button">X</button>`;
				updateLocalStorage();
			}
		});
		
		// usuwanie zadania
		li.querySelector(".delete-button").addEventListener("click", function() {
			li.remove();
			updateLocalStorage();
		});
	
		// dodawanie zadania do listy
		taskList.appendChild(li);
	
		// czyszczenie pol input
		taskTitleInput.value = "";
		dueDateInput.value = "";

		// aktualizacja Local Storage
		updateLocalStorage();
    }
	
	// edytowanie nowego zadania - cos nie dziala
    //function editTask(li) {}

    // funkcja aktualizacji Local Storage
    function updateLocalStorage() {
        const tasks = [];
        const taskElements = taskList.querySelectorAll("li");
        taskElements.forEach(function(taskElement) {
            const title = taskElement.textContent.replace(" Edit X", "");
			// dodawanie Edit po kazdym wczytaniu?
            tasks.push(title);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // wczytanie zadan po odswiezeniu strony
	function loadTasks() {
		const tasks = JSON.parse(localStorage.getItem("tasks"));
		if (tasks && tasks.length > 0) {
			tasks.forEach(function(title) {
				addTask(title);
			});
		} else {
			// dodanie defaultowego zadania
			//metoda draw()
			addTask("Finish my project");
		}
	}

    loadTasks();

    // funkcja przycisk add
    addButton.addEventListener("click", function() {
		const title = taskTitleInput.value;
		const dueDate = dueDateInput.value;
		const currentDateTime = new Date().toISOString();

		if (title.length >= 3 && title.length <= 255) {
			if (!dueDate || dueDate > currentDateTime) {
				addTask(title, dueDate);
			} else {
				alert("You can't turn back time - change the due date to a future date.");
			}
		} else {
			alert("The title of the task must be between 3 and 255 characters.");
		}
		
		deleteBtn.addEventListener('click', function() {
			this.parentElement.remove();
			editBtn.addEventListener('click', function() {})
		})
	});
	
	// funkcja przycisku edit-save
	//editButton.addEventListener("click", function(e) {});
	
	// funkcja task checked
	const list = document.querySelector('ul');
	list.addEventListener('click', function(ev) {
		if (ev.target.tagName === 'LI') {
			ev.target.classList.toggle('checked');
		}
	}, false);

    // wyszukiwanie
    searchInput.addEventListener("input", function() {
        const searchQuery = searchInput.value.toLowerCase();
        const taskElements = taskList.querySelectorAll("li");
        taskElements.forEach(function(taskElement) {
            const title = taskElement.textContent.toLowerCase();
            if (searchQuery.length >= 2) {
                if (title.includes(searchQuery)){
					taskElement.style.display = "block";
					taskElement.innerHTML = title.replace(searchQuery, `<span class="highlight">${searchQuery}</span>`);
				} else {
					taskElement.style.display = "none";
				}
			} else {
				//wyswietlona cala lista jesli brak dopasowan
                taskElement.style.display = "block";
            }
        });
    });
});

//const todoList = new Todo();