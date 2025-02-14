let game = {
    galleon : 0,

    // Rates
    clickRate : 1,
    galleonPS: 0,

    muggleGPS : 0.1,
    goblinGPS : 1,
    dobbyGPS: 8,
    hagridGPS: 47,
    trelawneyGPS: 260,
    lupinGPS: 1400,
    mcGonagallGPS: 7800,
    snapeGPS: 44000,
    ronGPS: 260000,
    hermioneGPS: 1600000,
    dumbledoreGPS: 10000000,
    harryGPS: 65000000,
    voldemortGPS: 430000000,

    // Costs
    muggleCost : 15,
    goblinCost : 100,
    dobbyCost: 1100,
    hagridCost: 12000,
    trelawneyCost: 130000,
    lupinCost: 1400000,
    mcGonagallCost: 20000000,
    snapeCost: 330000000,
    ronCost: 5100000000,
    hermioneCost: 75000000000,
    dumbledoreCost: 1000000000000,
    harryCost: 14000000000000,
    voldemortCost: 170000000000000,

    // Levels
    muggleLevel: 0,
    goblinLevel: 0,
    dobbyLevel: 0,
    hagridLevel: 0,
    trelawneyLevel: 0,
    lupinLevel: 0,
    mcGonagallLevel: 0,
    snapeLevel: 0,
    ronLevel: 0,
    hermioneLevel: 0,
    dumbledoreLevel: 0,
    harryLevel: 0,
    voldemortLevel: 0,

    totalWizards : 0,
}

let gameStats = {
    // time
    timeBegan : new Date().getTime() / 1000,
    currentTime : 0,
    totalTimePlayed : 0,

    totalGalleonsClicked: 0,
    totalGalleonsEarned: 0
}

let yPosition = 0

window.addEventListener('resize',()=>{
    resizer()
})

document.addEventListener('mousemove',(event)=>{
    yPosition = event.clientY - 70
})

function resizer(){
    let gameStatsBar = document.getElementById('gameStatsBar')
    let StoreWizards = document.getElementById('StoreWizards')
    let middleDiv = document.getElementById('middleDiv')
    let leftDiv = document.getElementById('leftDiv')

    StoreWizards.style.height = window.innerHeight - 125 + 'px'

    gameStatsBar.style.height = window.innerHeight - 190 + 'px'
    gameStatsBar.style.width = window.innerWidth - 1060 +  'px'
    middleDiv.style.width = window.innerWidth - 950 +  'px'
    middleDiv.style.height = window.innerHeight - 12 +  'px'

    leftDiv.style.width = window.innerWidth - 900 +  'px'
}

// Saves the game
function saveGame(){
    localStorage.setItem("game",JSON.stringify(game))
    localStorage.setItem("gameStats",JSON.stringify(gameStats))
}

// Opens a div that says that the game is being saved
function saveVerified(){
    let pageTitle = document.getElementById("pageTitle")
    let saveVerified = document.getElementById("saveVerified")

    saveVerified.style.display = 'block'
    saveGame()
    setTimeout(()=> {
        saveGame(), saveVerified.style.display = 'none'
    },1500)

}

function openStatsBar(){
    let gameStatsBar = document.getElementById('gameStatsBar')

    if (gameStatsBar.style.display === 'block') {
        closeStatsBar()
    }
    else {
        gameStatsBar.style.display = 'block'
        update()
    }
}

function closeStatsBar(){
    let gameStatsBar = document.getElementById('gameStatsBar')
    let timePlayed = document.getElementById('timePlayed')
    let galleonsClicked = document.getElementById('galleonsClicked')
    let lifeTimeGalleons = document.getElementById('lifeTimeGalleons')

    gameStatsBar.style.display = 'none'
    timePlayed.innerHTML = ''
    galleonsClicked.innerHTML = ''
    lifeTimeGalleons.innerHTML = ''
}

// Opens a div that asks the user to verify that they want to reset
function verifyReset(){
    document.getElementById("verifyReset").style.display = 'block'
}

// Opens a div that says that the game is being reset
function resetVerified(){
    let resetVerified = document.getElementById("resetVerified")

    document.getElementById('verifyReset').style.display = 'none'
    resetVerified.style.display = 'block'

    setTimeout(()=> {
        resetVerified.style.display = 'none', localStorage.clear(), location.reload()
    },2000)
}

// Updates the numbers in the game
function update(){
    document.getElementById('tabTitle').innerHTML = `${Math.floor(game.galleon).toLocaleString()} Galleon Clicker`
    document.getElementById('displayGalleonNumber').innerHTML = `${Math.floor(game.galleon).toLocaleString()} Galleon`
    document.getElementById('galleonPerSecond').innerHTML = `${game.galleonPS.toFixed(1).toLocaleString()} PER SECOND`
    updateTime()

    let gameStatsBar = document.getElementById('gameStatsBar')
    let timePlayed = document.getElementById('timePlayed')
    let galleonsClicked = document.getElementById('galleonsClicked')
    let lifeTimeGalleons = document.getElementById('lifeTimeGalleons')
    if(gameStatsBar.style.display === 'block'){
        let totalTime = gameStats.totalTimePlayed
        // minutes
        if (totalTime / 60 >= 1) {
            totalTime /= 60
            // hours
            if (totalTime / 60 > 1) {
                totalTime /= 60
                // days
                if (totalTime / 24 > 1) {
                    totalTime /= 24
                    totalTime = Math.round(totalTime).toLocaleString()
                    totalTime += ' days'
                } else {
                    totalTime = Math.round(totalTime)
                    totalTime += ' hours'
                }
            } else {
                totalTime = Math.round(totalTime)
                totalTime += ' minutes'
            }
        }
        // seconds
        else {
            totalTime = Math.round(totalTime)
            totalTime += ' seconds'
        }

        timePlayed.innerHTML = `Total Time Played: ${totalTime}`
        galleonsClicked.innerHTML = `Total Galleons Clicked: ${Math.round(gameStats.totalGalleonsClicked).toLocaleString()}`
        lifeTimeGalleons.innerHTML = `Total Galleons Earned: ${Math.round(gameStats.totalGalleonsEarned).toLocaleString()}`
    }
}

function updateTime(){
    gameStats.currentTime = new Date().getTime() / 1000
    gameStats.totalTimePlayed = gameStats.currentTime - gameStats.timeBegan
}

// updates the wizards stats
function updateWizards(){
    let totalWizards = 0
    for(let key in game){
        if(key.indexOf('Cost') !== -1){
            document.getElementById(key).innerHTML = `Cost: ${game[key].toLocaleString()}`
        }
        else if(key.indexOf('Level') !== -1){
            document.getElementById(key).innerHTML = `${game[key].toLocaleString()}`
            totalWizards += game[key]
        }
    }
    game.totalWizards = totalWizards
}

// Adds currency every time the galleon is clicked
function galleonClicked(){
    let sound = new Audio('Sounds/mouseClick.mp3')
    sound.volume = .1
    sound.play()
    game.galleon += game.clickRate
    gameStats.totalGalleonsClicked += game.clickRate
    gameStats.totalGalleonsEarned += game.clickRate
    update()
}

// Wizard functions when bought
function wizards(idName){
    let wizardName = idName.id
    let cost = `${wizardName}Cost`
    let level = `${wizardName}Level`
    let gps = `${wizardName}GPS`

    if(game.galleon >= game[cost]) {
        game.galleon -= game[cost]
        game[level] += 1
        game.galleonPS += game[gps]
        game[cost] = Math.floor(game[cost] * 1.15)
    }
    updateWizards()
    update()
}

// gets x and y position when you hover over wizards
function getPosition(idName){
    let wizardStats = document.getElementById('wizardStats')
    let e = document.getElementById(idName.id)
    wizardStatsUpdate(idName)
    let xPosition = document.getElementById(idName.id).getBoundingClientRect().x - 425
    e.addEventListener('mousemove',()=>{
        wizardStats.style.top = yPosition + 'px';
        wizardStats.style.left = xPosition + 'px';
        wizardStats.style.display = 'block'
    })
}

// updates wizard stats when you hover over a wizard
function wizardStatsUpdate(idName){
    let wizardName = idName.id
    let level = game[wizardName + 'Level']
    let GPS = game[wizardName + 'GPS']

    let wizardStatsLevel = document.getElementById('wizardStatsLevel')
    let wizardStatsGPSPer = document.getElementById('wizardStatsGPSPer')
    let wizardStatsGPSTotal = document.getElementById('wizardStatsGPSTotal')

    wizardStatsLevel.innerHTML = `owned: ${level}`
    wizardStatsGPSPer.innerHTML = `\neach ${wizardName} produces ${GPS.toLocaleString()} per second\n`
    if(level > 0)
        wizardStatsGPSTotal.innerHTML = `${level} ${wizardName} produces ${(GPS * level).toLocaleString()} per second (${Math.round((GPS * level) * 100 / game.galleonPS, 2)}% of total GPS)\n`
    else
        wizardStatsGPSTotal.innerHTML = `${wizardName} is currently not producing any per second\n`
}

// removes wizards stats once you un-hover from a wizard
function wizardStatsRemove(){
    let wizardStats = document.getElementById('wizardStats')
    let wizardStatsLevel = document.getElementById('wizardStatsLevel')
    let wizardStatsGPSPer = document.getElementById('wizardStatsGPSPer')
    let wizardStatsGPSTotal = document.getElementById('wizardStatsGPSTotal')

    wizardStatsLevel.innerHTML = ''
    wizardStatsGPSPer.innerHTML = ''
    wizardStatsGPSTotal.innerHTML = ''

    wizardStats.style.display = 'none'
}

// self calling function
(()=> {
    // save game items
    if (localStorage.getItem("game") == null)
        localStorage.setItem("game", JSON.stringify(game))
    else
        game = JSON.parse(localStorage.getItem("game"))

    // save game stats
    if (localStorage.getItem("gameStats") == null)
        localStorage.setItem("gameStats", JSON.stringify(gameStats))
    else
        gameStats = JSON.parse(localStorage.getItem("gameStats"))

    updateWizards()
    update()
    saveGame()
    resizer()
    setInterval(() => {
        game.galleon += game.galleonPS
        gameStats.totalGalleonsEarned += game.galleonPS
        update()
    }, 1000)
    setInterval(() => {
        saveVerified()
    }, 30000)
})()
