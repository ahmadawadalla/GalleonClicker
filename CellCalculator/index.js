function entered(input){
    if (event.key === 'Enter') {
        evaluate(input)
    }
}

function evaluate(input){
    let cells = input.parentElement.parentElement
    let numberOfCells = cells.childElementCount
    let tempInput = input.value.toLowerCase()
    for(let i = 0; i < numberOfCells;i++) {
        let cellReplaced = `c${i + 1}`
        if (!tempInput.includes(`c${input.parentElement.id.substring(4)}`)) {
            let replaced = `${cells.children[i].children[3].innerHTML.substring(7)}`
            tempInput = tempInput.replaceAll(cellReplaced, replaced)
        }
        else{
            input.parentElement.children[3].innerHTML = 'Answer: N/A'
            return
        }
    }
    let answer = eval(tempInput)
    if(answer !== undefined) {
        cells = input.parentElement
        let lastDiv = cells.parentElement.children[numberOfCells - 1]
        if(cells.children[3].innerHTML === "") {
            if (!lastDiv.children[3].innerHTML === "" || cells === lastDiv)
                clone(cells)
        }
        cells.children[3].innerHTML = `Answer: ${answer}` // answer
    }
}

function clone(cells){
    let cellNumber = parseInt(cells.id.charAt(4))
    let originalCell = document.getElementById('cells').children[0]

    let clone = originalCell.cloneNode(true)
    clone.id = `cell${cellNumber + 1}`
    clone.children[0].innerHTML = `c${cellNumber + 1}` // the cell name
    clone.children[1].value = "" // input value
    clone.children[3].innerHTML = "" // answer
    document.getElementById('cells').append(clone)
    clone.children[1].focus()
}

function remove(cell) {
    cell = cell.parentElement // the cell you want to remove
    let numberOfCells = cell.parentElement.childElementCount // number of cells
    let cellNumber = parseInt(cell.id.substring(4)) // the cell we want to get  rid of
    cell = cell.parentElement
    if (cellNumber != cell.children[numberOfCells - 1].id.substring(4)) {
        cell.children[cellNumber - 1].remove() // we removed the cell
        for (let i = cellNumber - 1; i < numberOfCells - 1; i++) {
            cell.children[i].children[0].innerHTML = `c${i + 1}`
            cell.children[i].id = `cell${i + 1}`
        }
    }
    else{
        cell.children[numberOfCells - 1].children[1].value = ""
        cell.children[numberOfCells - 1].children[3].innerHTML = ""
    }
    for (let i = 1;i < numberOfCells;i++){
        evaluate(document.getElementById(`cell${i}`).children[1])
    }
}
