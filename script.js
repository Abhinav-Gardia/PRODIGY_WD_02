let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapList = [];
let lapCount = 1;

const display = document.getElementById('display');
const lapListElem = document.getElementById('lapList');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    lapList = [];
    lapListElem.innerHTML = '';
    lapCount = 1;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formattedHours = (hours < 10) ? "0" + hours : hours;
    const formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
    const formattedSeconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        lapList.push(`Lap ${lapCount}: ${lapTime}`);
        lapCount++;
        updateLapList();
    }
}

function updateLapList() {
    lapListElem.innerHTML = '';
    lapList.forEach(lap => {
        const li = document.createElement('li');
        li.textContent = lap;
        lapListElem.appendChild(li);
    });
}
