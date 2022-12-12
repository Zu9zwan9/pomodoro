let stageTitle,
    displayStatus,
    displayTime,
    displaySwitch,
    timer,
    minutes,
    seconds,
    work = 25,
    shortBreak = 5,
    longBreak = 15,
    timeOn = false,
    time = 1500,
    status = 'work';

function setTime(newTime) {
    time = newTime * 60;
    countdown();
}

function countdown() {
    minutes = Math.floor(time / 60);
    seconds = parseInt(time % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    displayTime.textContent = minutes + ":" + seconds;
    document.title = displayTime.textContent + " - " + status;
}

function resetTimer() {
    if (status === 'work') {
        setTime(work);
    } else if (status === 'shortBreak') {
        setTime(shortBreak);
    }
    if (status === 'longBreak') {
        setTime(longBreak);
    }
}

function startTimer() {
    clearInterval(status); // Ensures only one instance of function is running
    timer = setInterval(function () {
        countdown();
        if (time !== 0) {
            time--;
        } else {
            switchMode();
        }
    }, 1000);
}

function switchMode() {
    if (status === 'work') {
        switchTo('shortBreak', 'work');
        document.getElementsByClassName('nav-link')[0].classList.remove('active');
        document.getElementsByClassName('nav-link')[1].classList.add('active');
    } else if (status === 'shortBreak') {
        switchTo('longBreak', 'shortBreak');
        document.getElementsByClassName('nav-link')[1].classList.remove('active');
        document.getElementsByClassName('nav-link')[2].classList.add('active');
    } else if (status === 'longBreak') {
        switchTo('work', 'longBreak');
        document.getElementsByClassName('nav-link')[2].classList.remove('active');
        document.getElementsByClassName('nav-link')[0].classList.add('active');
    }

}

function switchTo(newStatus, oldStatus) {
    if (newStatus === 'work') {
        status = 'work';
        setTime(work);
        stageTitle.classList.remove(oldStatus);
        stageTitle.classList.add('work');
    } else if (newStatus === 'shortBreak') {
        status = 'shortBreak';
        setTime(shortBreak);
        stageTitle.classList.remove(oldStatus);
        stageTitle.classList.add('shortBreak');
    } else if (newStatus === 'longBreak') {
        status = 'longBreak';
        setTime(longBreak);
        stageTitle.classList.remove(oldStatus);
        stageTitle.classList.add('longBreak');
    }
    displayStatus.innerHTML = status;

}

function workBreak() {
    if (timeOn) {
        timeOn = false;
        displaySwitch.textContent = 'start';
        clearInterval(timer);
    } else {
        timeOn = true;
        displaySwitch.textContent = 'stop';
        startTimer();
    }
}

(function () {
    stageTitle = document.getElementsByClassName('stage')[0];
    displayStatus = document.getElementsByClassName('status')[0];
    displayTime = document.getElementsByClassName('timer')[0];
    displaySwitch = document.getElementById('start');

    document.getElementById('next').onclick = switchMode;
    document.getElementById('reset').onclick = resetTimer;
    document.getElementById('start').onclick = workBreak;

})();
