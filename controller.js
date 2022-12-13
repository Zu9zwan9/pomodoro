let task = new Task(work * 60, document.getElementById('stageTitle'),
    document.getElementById('displayStatus'), document.getElementById('displayTime'),
    document.getElementById('displaySwitch'), null, null, null, false,
    'work');

function setTime(newTime) {
    task.time = newTime * 60;
    countdown();
}

function countdown() {
    task.minutes = Math.floor(task.time / 60);
    task.seconds = parseInt(task.time % 60, 10);
    task.minutes = task.minutes < 10 ? "0" + task.minutes : task.minutes;
    task.seconds = task.seconds < 10 ? "0" + task.seconds : task.seconds;
    task.displayTime.textContent = task.minutes + ":" + task.seconds;
    document.title = task.displayTime.textContent + " - " + task.status;
}

function resetTimer() {
    if (task.status === 'work') {
        setTime(work);
    } else if (task.status === 'shortBreak') {
        setTime(shortBreak);
    }
    if (task.status === 'longBreak') {
        setTime(longBreak);
    }
}

function startTimer() {
    clearInterval(task.status); // Ensures only one instance of function is running
    task.timer = setInterval(function () {
        countdown();
        if (task.time !== 0) {
            task.time--;
        } else {
            switchMode();
        }
    }, 1000);
}

function switchMode() {
    if (task.status === 'work') {
        switchTo('shortBreak', 'work');
        document.getElementsByClassName('nav-link')[0].classList.remove('active');
        document.getElementsByClassName('nav-link')[1].classList.add('active');
    } else if (task.status === 'shortBreak') {
        switchTo('longBreak', 'shortBreak');
        document.getElementsByClassName('nav-link')[1].classList.remove('active');
        document.getElementsByClassName('nav-link')[2].classList.add('active');
    } else if (task.status === 'longBreak') {
        switchTo('work', 'longBreak');
        document.getElementsByClassName('nav-link')[2].classList.remove('active');
        document.getElementsByClassName('nav-link')[0].classList.add('active');
    }

}

function switchTo(newStatus, oldStatus) {
    if (newStatus === 'work') {
        task.status = 'work';
        setTime(work);
        task.stageTitle.classList.remove(oldStatus);
        task.stageTitle.classList.add('work');
    } else if (newStatus === 'shortBreak') {
        task.status = 'shortBreak';
        setTime(shortBreak);
        task.stageTitle.classList.remove(oldStatus);
        task.stageTitle.classList.add('shortBreak');
    } else if (newStatus === 'longBreak') {
        task.status = 'longBreak';
        setTime(longBreak);
        task.stageTitle.classList.remove(oldStatus);
        task.stageTitle.classList.add('longBreak');
    }
    task.displayStatus.innerHTML = task.status;

}

function workBreak() {
    if (task.timeOn) {
        task.timeOn = false;
        task.displaySwitch.textContent = 'start';
        clearInterval(task.timer);
    } else {
        task.timeOn = true;
        task.displaySwitch.textContent = 'stop';
        startTimer();
    }
}

(function () {
    task.stageTitle = document.getElementsByClassName('stage')[0];
    task.displayStatus = document.getElementsByClassName('status')[0];
    task.displayTime = document.getElementsByClassName('timer')[0];
    task.displaySwitch = document.getElementById('start');

    document.getElementById('next').onclick = switchMode;
    document.getElementById('reset').onclick = resetTimer;
    document.getElementById('start').onclick = workBreak;

})();


// todoapp


const form = document.querySelector(".task-form");
const taskInput = document.querySelector("input");
const taskList = document.querySelector(".taskList");

form.addEventListener("submit", addTodo);

function addTodo(e) {
    if (taskInput.value === "") {
        // shake form to indicate that the user must input something
        form.classList.toggle("shake-horizontal");
        setTimeout(() => {
            form.classList.toggle("shake-horizontal");
        }, 500);
    } else {
        // create elements
        const li = document.createElement("li");
        const todoTitle = document.createElement("span");
        const editableInput = document.createElement("input");
        const editButton = document.createElement("button");
        const saveButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        li.classList.add("todo-collection__item");

        todoTitle.classList.add("taskList__item__title");
        todoTitle.innerText = taskInput.value;

        editableInput.classList.add("input");
        editableInput.classList.add("input--todo");
        editableInput.classList.add("hidden");
        editableInput.type = "text";
        editableInput.value = taskInput.value;

        editButton.classList.add("button");
        editButton.classList.add("button--todo");
        editButton.classList.add("button--edit");
        editButton.innerText = "Edit";

        saveButton.classList.add("button");
        saveButton.classList.add("button--todo");
        saveButton.classList.add("button--save");
        saveButton.classList.add("hidden");
        saveButton.innerText = "Save";

        deleteButton.classList.add("button");
        deleteButton.classList.add("button--todo");
        deleteButton.classList.add("button--delete");
        deleteButton.innerText = "Delete";

        // add elements to todo list
        li.appendChild(todoTitle);
        li.appendChild(editableInput);
        li.appendChild(editButton);
        li.appendChild(saveButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        function toggleTodoEditForm() {
            todoTitle.classList.toggle("hidden");
            editableInput.classList.toggle("hidden");
            editButton.classList.toggle("hidden");
            saveButton.classList.toggle("hidden");
        }
        // button event listeners
        editButton.addEventListener("click", () => {
            toggleTodoEditForm();
            editableInput.focus();
        });

        saveButton.addEventListener("click", () => {
            todoTitle.innerText = editableInput.value;
            toggleTodoEditForm();
        });

        deleteButton.addEventListener("click", () => {
            setTimeout(() => {
                taskList.removeChild(li);
            }, 100);
        });
    }
    // clear input
    taskInput.value = "";

    e.preventDefault();
}

