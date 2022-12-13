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
