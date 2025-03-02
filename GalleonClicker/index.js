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
    yPosition = event.clientY - 80
})

// resizes the divs according to the window size
function resizer(){
    let gameStatsBar = document.getElementById('gameStatsBar')
    let gameDescription = document.getElementById('gameDescription')
    let StoreWizards = document.getElementById('StoreWizards')
    let middleDiv = document.getElementById('middleDiv')

    StoreWizards.style.height = window.innerHeight - 125 + 'px'

    gameStatsBar.style.height = window.innerHeight - 180 + 'px'
    gameStatsBar.style.width = window.innerWidth - 1055 +  'px'

    gameDescription.style.height = window.innerHeight - 180 + 'px'
    gameDescription.style.width = window.innerWidth - 1055 +  'px'

    middleDiv.style.width = window.innerWidth - 945 +  'px'
    middleDiv.style.height = window.innerHeight - 16 +  'px'
}

// Saves the game
function saveGame(){
    localStorage.setItem("game",JSON.stringify(game))
    localStorage.setItem("gameStats",JSON.stringify(gameStats))
}

// Opens a div that says that the game is being saved
function saveVerified(){
    let saveVerified = document.getElementById("saveVerified")

    saveVerified.style.display = 'block'
    saveGame()
    setTimeout(()=> {
        saveGame(); saveVerified.style.display = 'none'
    },1500)

}

// opens the game stats bar
function openStatsBar(){
    let gameStatsBar = document.getElementById('gameStatsBar')
    let gameDescription = document.getElementById('gameDescription')

    if (gameStatsBar.style.display === 'block') {
        closeStatsBar()
    }
    else {
        gameDescription.style.display = 'none'
        gameStatsBar.style.display = 'block'
        update()
    }
}

// closes the game stats bar
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

// opens the game description bar
function openGameDescription(){
    let gameDescription = document.getElementById('gameDescription')
    let gameStatsBar = document.getElementById('gameStatsBar')

    if (gameDescription.style.display === 'block') {
        closeGameDescription()
    }
    else {
        gameStatsBar.style.display = 'none'
        gameDescription.style.display = 'block'
        update()
    }
}

// closes the game description bar
function closeGameDescription(){
    let gameDescription = document.getElementById('gameDescription')

    gameDescription.style.display = 'none'
}

// Opens a div that asks the user to verify that they want to reset
function verifyReset(){
    let verifyReset = document.getElementById('verifyReset')

    if (verifyReset.style.display === 'block') {
        verifyReset.style.display = 'none'
    }
    else {
        verifyReset.style.display = 'block'
    }
}

// Opens a div that says that the game is being reset
function resetVerified(){
    let resetVerified = document.getElementById("resetVerified")

    document.getElementById('verifyReset').style.display = 'none'
    resetVerified.style.display = 'block'

    setTimeout(()=> {
        resetVerified.style.display = 'none'; localStorage.clear(); location.reload()
    },2000)
}

// adds a bounce in to an img
function bounceIn(img){
    let heightPercent = img.height / 100
    let widthPercent = img.width / 100
    img.height -= heightPercent * 2
    img.width -= widthPercent * 2
    document.addEventListener('mouseup',()=> {bounceOut(img,heightPercent, widthPercent)})
}

// adds a bounce out to an img
function bounceOut(img, heightPercent, widthPercent){
    img.height = heightPercent * 100
    img.width = widthPercent * 100
}

// Updates the numbers in the game
function update(){
    document.getElementById('tabTitle').innerHTML = `${numberString(game.galleon)} Galleon Clicker`
    document.getElementById('displayGalleonNumber').innerHTML = `${numberString(game.galleon)} Galleons`
    document.getElementById('galleonPerSecond').innerHTML = `${numberString(game.galleonPS)} PER SECOND`
    updateTime()
    updateWizards()

    let gameStatsBar = document.getElementById('gameStatsBar')
    let timePlayed = document.getElementById('timePlayed')
    let galleonsClicked = document.getElementById('galleonsClicked')
    let lifeTimeGalleons = document.getElementById('lifeTimeGalleons')
    if(gameStatsBar.style.display === 'block'){
        let totalTime = gameStats.totalTimePlayed

        totalTime = timeString(totalTime)

        timePlayed.innerHTML = `Total Time Played: ${totalTime}`
        galleonsClicked.innerHTML = `Total Galleons Clicked: ${numberString(gameStats.totalGalleonsClicked)}`
        lifeTimeGalleons.innerHTML = `Total Galleons Earned: ${numberString(gameStats.totalGalleonsEarned)}`
    }

    // checks if cheated
    if(gameStats.totalGalleonsEarned < game.galleon){
        location.reload()
    }
}

// the time in seconds, mins, etc.
function timeString(time){
    let single = false
    // minutes
    if (time / 60 >= 1) {
        time /= 60
        // hours
        if (time / 60 > 1) {
            time /= 60
            // days
            if (time / 24 > 1) {
                time /= 24
                if (time / 365 > 1) {
                    time /= 365
                    time = parseFloat(time.toFixed(1)).toLocaleString()
                    if (time === 1){
                        single = true
                    }
                    time += ' years'
                }
                else {
                    time = parseFloat(time.toFixed(1)).toLocaleString()
                    if (time === 1){
                        single = true
                    }
                    time += ' days'
                }
            } else {
                time = Math.round(time)
                if (time === 1){
                    single = true
                }
                time += ' hours'
            }
        } else {
            time = Math.round(time)
            if (time === 1){
                single = true
            }
            time += ' minutes'
        }
    }
    // seconds
    else {
        time = Math.round(time)
        if (time === 1){
            single = true
        }
        time += ' seconds'
    }
    if (single)
        time = time.substring(0,time.length - 1)
    return time
}

// converts number to string
function numberString(number){
    // million
    if(number >= 1000000){
        // billion
        if (number >= 1000000000){
            // trillion
            if (number >= 1000000000000){
                // quadrillion
                if (number >= 1000000000000000){
                    number /= 1000000000000000
                    return  parseFloat(number.toFixed(2)).toLocaleString() + ' Quadrillion'
                }
                else{
                    number /= 1000000000000
                    return  parseFloat(number.toFixed(2)).toLocaleString() + ' Trillion'
                }
            }
            else{
                number /= 1000000000
                return  parseFloat(number.toFixed(2)).toLocaleString() + ' Billion'
            }
        }
        else {
            number /= 1000000
            return  parseFloat(number.toFixed(2)).toLocaleString() + ' Million'
        }
    }
    return number.toLocaleString()
}

// updates the time played
function updateTime(){
    gameStats.currentTime = new Date().getTime() / 1000
    gameStats.totalTimePlayed = gameStats.currentTime - gameStats.timeBegan
}

// updates the wizards stats
function updateWizards(){
    let totalWizards = 0
    for(let key in game){
        if(key.indexOf('Cost') !== -1){
            document.getElementById(key).innerHTML = `${numberString(game[key])}`
            if(game.galleon > game[key]){
                let wizard = document.getElementById(key.substring(0,key.indexOf('Cost')))
                wizard.style.opacity = '100%'

                document.getElementById(key).style.color = 'green'
            }
            else{
                document.getElementById(key).style.color = '#942121'
            }
        }
        else if(key.indexOf('Level') !== -1){
            document.getElementById(key).innerHTML = `${game[key].toLocaleString()}`
            totalWizards += game[key]
            if (game[key] >= 1){
                let wizard = document.getElementById(key.substring(0,key.indexOf('Level')))
                wizard.style.opacity = '100%'
            }
        }
    }
    game.totalWizards = totalWizards
}

// Adds currency every time the galleon is clicked
function galleonClicked(){
    game.galleon += game.clickRate
    gameStats.totalGalleonsClicked += game.clickRate
    gameStats.totalGalleonsEarned += game.clickRate
    update()
}

// noise when the galleon is clicked
function galleonNoise(){
    let randomize = Math.floor(Math.random() * 7 + 1)
    let sound = new Audio(`Sounds/click${randomize}.mp4`)
    sound.volume = .5
    sound.pause()
    sound.play()
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

        playWizardNoise(wizardName)
    }
    updateWizards()
    update()
}

// plays wizard sounds
function playWizardNoise(wizardName){
    let sound = new Audio(`Sounds/${wizardName}Sound.mp4`)
    sound.volume = 1
    sound.play()
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
    let GPSPercent = ((GPS * level) * 100 / game.galleonPS).toFixed(1)
    let timeLeftToBuy = 0
    if(game.galleon < game[wizardName + 'Cost'])
        timeLeftToBuy = (game[wizardName + 'Cost'] - game.galleon)/ game.galleonPS

    wizardName = wizardName[0].toUpperCase() + wizardName.substring(1)

    if (GPSPercent * 10 % 10 === 0){
        GPSPercent -= '.0'
    }

    let wizardStatsLevel = document.getElementById('wizardStatsLevel')
    let wizardStatsGPSPer = document.getElementById('wizardStatsGPSPer')
    let wizardStatsGPSTotal = document.getElementById('wizardStatsGPSTotal')
    let wizardStatsTimeLeft = document.getElementById('wizardStatsTimeLeft')

    wizardStatsLevel.innerHTML = `Owned: ${level}`
    wizardStatsGPSPer.innerHTML = `\nEach ${wizardName} produces ${numberString(GPS)} per second\n`
    if(level > 0)
        wizardStatsGPSTotal.innerHTML = `${level} ${wizardName} produces ${numberString(GPS * level)} per second (${GPSPercent}% of total GPS)\n`
    else
        wizardStatsGPSTotal.innerHTML = `${wizardName} is currently not producing any per second\n`

    if(game.galleonPS === 0){
        wizardStatsTimeLeft.innerHTML = 'Time Left: N/A'
    }
    else{
        wizardStatsTimeLeft.innerHTML = `Time Left: ${timeString(timeLeftToBuy)}`
    }
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

    // startup sound
    let sound = document.getElementById('startupSound')
    sound.volume = .7

    setInterval(() => {
        game.galleon += game.galleonPS
        gameStats.totalGalleonsEarned += game.galleonPS
        update()
    }, 1000)
    setInterval(() => {
        saveVerified()
    }, 30000)
})()
