const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 20;
const CHECK_MARK = "✔";

let reps = 0;
let timerInterval;

const title = document.getElementById("title");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const checkMarks = document.getElementById("check-marks");

function startTimer() {
    reps++;
    let time;
    
    if (reps % 2 !== 0) {
        time = WORK_MIN * 60;
        title.textContent = "Work!";
        title.style.color = "#9bdeac";
    } else {
        if (reps % 8 !== 0) {
            time = SHORT_BREAK_MIN * 60;
            title.textContent = "Break";
            title.style.color = "#e2979c";
        } else {
            time = LONG_BREAK_MIN * 60;
            title.textContent = "Break";
            title.style.color = "#e7305b";
        }
    }

    countDown(time);
}

function countDown(seconds) {
    clearInterval(timerInterval);
    
    function updateTimer() {
        let minutes = Math.floor(seconds / 60);
        let sec = seconds % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

        if (seconds > 0) {
            seconds--;
        } else {
            clearInterval(timerInterval);
            startTimer();
            updateCheckMarks();
        }
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerDisplay.textContent = "25:00";
    title.textContent = "Timer";
    title.style.color = "#9bdeac";
    checkMarks.textContent = "";
    reps = 0;
}

function updateCheckMarks() {
    let workSessions = Math.floor(reps / 2);
    checkMarks.textContent = CHECK_MARK.repeat(workSessions);
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
