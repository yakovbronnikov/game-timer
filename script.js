let timerElement = document.getElementById('timer')
let timerButton = document.querySelector('.round-timer')
let startButton = document.querySelector('.round-start')
let duration = 30
let timerInterval

let startAudio = document.getElementById('start-audio')
let finishAudio = document.getElementById('finish-audio')
let timerAudio = document.getElementById('timer-audio')


function startTimer() {
    let timer = duration
    timerElement.innerHTML = timer

    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer -= 1
            timerElement.innerHTML = timer
        } else {
            stopGame()
            timer = duration
        }

        if (timer == 4) {
            timerAudio.play()
        }

    }, 1000)
}

function increaseDuration() {
    duration += 10
    document.querySelector('.duration p').innerText = duration
}

function decreaseDuration() {
    if (duration > 10) {
        duration -= 10
        document.querySelector('.duration p').innerText = duration
    }
}


function startGame() {
    timerButton.classList.remove('round-hide')
    startButton.classList.add('round-hide')

    document.querySelector('.duration').classList.add("duration-fade")
    document.querySelector('.duration').classList.remove("duration-appear")

    document.querySelector('.stop').classList.add("duration-appear")
    document.querySelector('.stop').classList.remove("duration-fade")

    document.querySelector('.tip').innerText = 'Tap to pass the turn to another player'

    startAudio.play()
    timerAudio.stop()
    clearInterval(timerInterval)
    startTimer()
}

function stopGame() {
    timerButton.classList.add('round-hide')
    startButton.classList.remove('round-hide')

    document.querySelector('.duration').classList.remove("duration-fade")
    document.querySelector('.duration').classList.add("duration-appear")

    document.querySelector('.stop').classList.remove("duration-appear")
    document.querySelector('.stop').classList.add("duration-fade")

    document.querySelector('.tip').innerText = 'Tap to start a game'
    finishAudio.play()
    timerAudio.stop()
    clearInterval(timerInterval)
}

HTMLAudioElement.prototype.stop = function () {
    this.pause();
    this.currentTime = 0.0;
}

// SW

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => navigator.serviceWorker.ready.then((worker) => {
        worker.sync.register('syncdata');
      }))
      .catch((err) => console.log(err));
  }