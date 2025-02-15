let centiSecondsElapsed = 0
let interval = null
let isPaused = false
const time = document.getElementById("time")

function padStart(value){
    return String(value).padStart(2, "0")
}

function setTime(){
    const minutes = Math.floor(centiSecondsElapsed / 6000)
    const seconds = Math.floor((centiSecondsElapsed / 100)) % 60
    const centi = centiSecondsElapsed % 100
    time.innerHTML = `${padStart(minutes)}:${padStart(seconds)}.${padStart(centi)}`
}

function timer(){
    centiSecondsElapsed+=1
    setTime()
}

function startClock(){
    if(interval && centiSecondsElapsed != 0 && isPaused == false)
        return
    interval = setInterval(timer, 10)
    isPaused = false
}

function stopClock(){
    clearInterval(interval)
    isPaused = true
}

function resetClock(){
    stopClock()
    centiSecondsElapsed = 0
    setTime()
}