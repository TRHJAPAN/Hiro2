// ポモドーロタイマー
let workMinutes = 25;
let breakMinutes = 5;
let isRunning = false;
let isWorkTime = true;
let timerInterval;
let remainingSeconds = workMinutes * 60;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const seconds = String(remainingSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
    statusDisplay.textContent = isWorkTime ? '作業中' : '休憩中';
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            isWorkTime = !isWorkTime;
            remainingSeconds = (isWorkTime ? workMinutes : breakMinutes) * 60;
            updateDisplay();
            // 音や通知を追加したい場合はここに
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    isWorkTime = true;
    remainingSeconds = workMinutes * 60;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
