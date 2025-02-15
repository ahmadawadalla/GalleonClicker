let word = wordMaker()
let temp = word;
let hangMan = ['head', 'torso', 'arm1', 'arm2', 'leg1', 'leg2' ]
let showHM = 0

function wordMaker() {
    let fruits = ["apple", "banana", "strawberry", "raspberry", "blueberry", "orange", "carrot", "pear", "mango", "avocado", "guava", "cranberry", "nectarine", "plum", "pomegranate", "peach",
        "blackberry", "grape", "boysenberry", "watermelon", "cantaloupe", "date", "lemon", "lychee", "fig", "lime", "pineapple", "olive", "apricot", "celery", "cucumber"]

    let school = ["computer", "science", "physics", "math", "calculus", "pencil", "pen", "notes", "notebook", "university", "eraser", "ruler", "paper", "algebra", "trigonometry", "backpack",
        "calculator", "textbook", "chalk", "board", "marker"]

    let combined_list = []
    fruits.forEach((word) => {
        combined_list.push(word)
    })
    school.forEach((word) => {
        combined_list.push(word)
    })

    return combined_list[Math.floor(Math.random() * combined_list.length)] // chooses a random word from the list
}

let wordChosen = () => {
    return word
}

function inputChecker(){
    let p = document.getElementById("hiddenWord").children[0]
    let input = document.getElementById("input")
    if(input.value === "" || /^[A-Za-z]+$/.test(input.value) == false){
        input.value = ''
        return
    }
    input = input.value.toLowerCase()
    let index = word.indexOf(input)
    if(index < 0) {
        document.getElementById(hangMan[showHM++]).style.display = "block";
        if(showHM === hangMan.length) {
            p.innerHTML = [...temp].join(' ');
            setTimeout(()=>{
                alert("Game over!");
                document.location.reload();
                },350)
        }
    }

    while(index > -1){
        let t = p.innerHTML
        t = t.replaceAll(' ', '')
        t = t.slice(0,index) + word[index] + t.slice(index+1)
        t = [...t].join(' ')
        word = word.replace(input, '_')
        p.innerHTML = t
        index = word.indexOf(input)
    }

    if(word.replaceAll('_','').length === 0){
        setTimeout(()=>{
            alert("Good Job, You Won!");
            document.location.reload();
        },350)
    }

    if(document.getElementById('lettersUsed').innerHTML.indexOf(input) == -1)
        document.getElementById('lettersUsed').innerHTML += input + " "
    // clear input text
    document.getElementById('input').value = ''
}

(() => {
    let c = wordChosen()
    let p = document.getElementById("hiddenWord").children[0]
    p.innerHTML = "_ ".repeat(c.length);
    document.getElementById("input").focus()
    document.getElementById("input").addEventListener("keypress", (event) => {if(event.key === "Enter") inputChecker()});
})()