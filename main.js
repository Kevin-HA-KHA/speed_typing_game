const randomSourceQuote = 'http://api.quotable.io/random'
const quoteContainer = document.querySelector('.quote-container')
const authorContainer = document.querySelector('.author')
const userInput = document.querySelector('.user-input')
const timer = document.getElementById('timer')
const skip = document.querySelector('.skip')

let myTime
let totalKeysPress = 0
let correctKeysPress
let incorrectKeysPress

skip.addEventListener('click', () => {
    getNextQuote()
    userInput.focus()
})


userInput.addEventListener('input', () => {
    correctKeysPress = 0
    incorrectKeysPress = 0
    const arrayQuote = quoteContainer.querySelectorAll('span')
    const arrayValue = userInput.value.split('')
    let correct = true
    arrayQuote.forEach((letterSpan, index) =>{
        const letter = arrayValue[index]
        if (letter == null){
            letterSpan.classList.remove('incorrect')
            letterSpan.classList.remove('correct')
            correct = false
        }
        else if (letterSpan.innerText === letter) {
            correctKeysPress ++
            letterSpan.classList.add('correct')
            letterSpan.classList.remove('incorrect')
        } else {
            incorrectKeysPress ++
            letterSpan.classList.add('incorrect')
            letterSpan.classList.remove('correct')
            correct = false
        }
    })
    if(correct){
        showStats()
        setTimeout(getNextQuote, 8000)
    }

})

userInput.onkeydown = e =>{    
    if(!(e.key === "Shift" || e.key === "Backspace"))
    totalKeysPress ++;
}

function showStats(){
    myTime = timer.innerText
    quoteContainer.innerText = "Your time: " + myTime + "s.\n" +
    "Your APM = " + (totalKeysPress / (myTime / 60)).toFixed(2) + "APM" + "\n" +
    "Total keys press = " + totalKeysPress + "\n" +
    "Correct keys press = " + correctKeysPress + "\n" +
    "Incorrect keys press = " + (totalKeysPress - correctKeysPress) + "\n" +
    "% of precision = " + ((correctKeysPress * 100 ) / totalKeysPress).toFixed(1) + " %" 
    authorContainer.style.display = "none"
    userInput.style.display = "none"
    timer.style.visibility = "hidden"
    totalKeysPress = 0
    correctKeysPress = 0
    incorrectKeysPress = 0
}

function getRandomQuote() {  
    return fetch(randomSourceQuote)
        .then(response => response.json())
        .then(data => data)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    quoteContainer.innerHTML = ''
    authorContainer.innerText = quote.author
    quote.content.split('').forEach(letter => {
        const letterSpan = document.createElement('span')
        letterSpan.innerText = letter
        quoteContainer.appendChild(letterSpan)
    })

    userInput.value = null
    userInput.style.display = "block"
    authorContainer.style.display = "block"
    timer.style.visibility = "visible"
    updateTimer()
}

let startTime
function updateTimer() {
    timer.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)

}
 
function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

getNextQuote()