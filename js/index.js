let blocks_container = document.getElementById("blocks");
let alphabet_container = document.getElementById("alfabet");

let currentWord;
let chosenLetter;
let lives = 10;

let alphabetletters = document.getElementsByClassName("letter");
let boxes = document.getElementsByClassName("box");
let steps = document.getElementsByClassName("step");

let reset = document.getElementById("reset");
let tips = document.getElementById("tips");
let chanceMessage = document.getElementById("chance");

let alphabet = [

    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

let words = [
    "community",
    "generation",
    "government",
    "Instagram",
    "management",
    "Kensington",
    "recognize",
    "Coronavirus",
    "professional",
    "performance",
    "Software",
    "technology",
    "traditional",
    "opportunity",
    "environmental"
]

chanceMessage.textContent = "Lives: " + lives;

// generate random word
function generateRandomWord(list){
    currentWord = list[Math.floor(Math.random() * Math.floor(list.length))];

}
generateRandomWord(words);

// generate blocks for letters
function generateWordBlocks(word){
    for (let i = 0; i < word.length; i++) {
        var markup = 
        `<div class ="box"></div>`
        blocks_container.innerHTML += markup;
        
    }
}
generateWordBlocks(currentWord);

// generate alphabet
function generateAlphabet(alphabet){
    
    for (let i = 0; i < alphabet.length; i++) {
        var markup = `

        <div class ="letter" id=${alphabet[i]}>
            <h5>${alphabet[i]}</h5>
        </div>
        
        `
        alphabet_container.innerHTML += markup;
        
    }
}

generateAlphabet(alphabet);

// when clicked on a letter function fires of
function clickLetter(){
   
for (let i of alphabetletters) {
    i.addEventListener('click',function(){
         chosenLetter = i.id;
         if(LetterInWord(chosenLetter)){
             placeLetters(getAllIndexes(currentWord,chosenLetter),chosenLetter);
             i.className+=' correct';
         }
         else{
             i.className +=' uncorrect';
             losingSteps();
         }
         winning();
         losing();
      
    })
 
}

}
clickLetter();

// check if chosenLetter is in the currentword that has to be guesst
function LetterInWord(letter){
    let bool;
    if(currentWord.toUpperCase().includes(letter.toUpperCase())){
        bool = true;
    }
    else{
        bool = false;
    }
    return bool;

}

// get indexes of letters
function getAllIndexes(word, letter) {
    let indexes = []
    let i = -1;
    while ((i = word.toUpperCase().indexOf(letter.toUpperCase(), i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

// place your chosenLetter in the right box
function placeLetters(indexes,letter){

    for (let index of indexes) {
        boxes[index].textContent = letter;  
 
    }

}

// when chosenLetter is incorrect one live less
function losingSteps(){
    lives--;
    for (let index = 0; index < steps.length; index++) {
            steps[lives].style.display = "block"; 
        } 
     
      chanceMessage.textContent = "Lives: " + lives;
      losing();
                    
    }

    
 // you win when length en comparison between guessword and your word is =
 function winning(){
    let winningWord = "";
    for(let box of boxes){
        winningWord += box.textContent;
    }

    if(currentWord.toUpperCase() == winningWord && currentWord.length == winningWord.length){
        chanceMessage.textContent = "You have won!";
    }
   

 }

 // lives = 0, you lose
   function losing(){

    if(lives == 0){
        showCorrectWord();
        chanceMessage.textContent = "You have lost! try again.";
       
    }
   }

   // when game is lost show the correctword
   
   function showCorrectWord(){
       for (let index = 0; index < boxes.length; index++) {
          boxes[index].innerHTML = currentWord[index].toUpperCase();     
           
       }
   }

// when clicked on button tips get letter

tips.addEventListener('click',function(){
     let tipsList = getTipsList();
     let randomChoice = tipsList[Math.floor(Math.random() * Math.floor(tipsList.length))]
     placeLetters(getAllIndexes(currentWord,randomChoice),randomChoice);
     winning();   
});

// reset game

reset.addEventListener('click',function(){
    location.reload();
})

// returns list with tips 

function getTipsList(){
    let chooseList = currentWord.toUpperCase().split('');
    let tips = [];
    for(let box of boxes){
        if(box.textContent != ""){
            tips.push(box.textContent);
        }       
    }
    let listLetters = chooseList.filter(d => !tips.includes(d));
    return listLetters;

}


