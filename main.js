const doc = document;
const cardImage = doc.querySelector("#testImage");
const PlayerValueTxt = doc.querySelector("#PlayerValue");
const DealerVlaueTxt = doc.querySelector("#DealerValue");
const DealerCardContainer = doc.querySelector("#DealerCardsDiv");
const PlayerCardContainer = doc.querySelector("#PlayerCardsDiv");
const HitButton = doc.querySelector("#HitButton");
const StayButton = doc.querySelector("#StayButton");
const resultTxt = doc.querySelector("#Result");
//Dealer CARD Position
let DealerCardStartMarginTop = -10000;
let DealerCardStartMarginLeft = 500;
let DealerCardStartPadding = 200;
let DealerCardDistant = -850;
let hiddenCard;

let PlayerCardValue = 0;
let DealerCardValue = 0;

let Result;
//Kartenanzahl
let DealerCardAmount = 0;
let PlayerCardAmount = 0;

const symbols = ['clubs', 'diamonds', 'hearts', 'spades'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
const HighCards = ['jack', 'queen', 'king', 'ace'];

let cardPictures = [];
let cardValues = [];


for(let i = 0; i < symbols.length; i++){
    for(let j = 0; j < numbers.length; j++){
        cardPictures.push("Cards/"+numbers[j] + '_of_' + symbols[i] + '.png')  ;
        cardValues.push(numbers[j]);
    }
    for(let j = 0; j < HighCards.length ; j++){
        cardPictures.push("Cards/"+HighCards[j] + '_of_' + symbols[i] + '2.png');
        cardValues.push(getCardValue(cardPictures[cardPictures.length - 1]));
    }

}



GameStart();





function GameStart(){
    PlayerCardValue = 0;
    DealerCardValue = 0;

    
    DealerCardValue = eval(DealerCardValue+"+"+ spawnCard("Dealer"));
    hiddenCard = doc.createElement("img");
    hiddenCard.src = "pictures/card_back_red.png";
    DealerCardContainer.appendChild(hiddenCard);
    hiddenCard.style.height = "720px";

    PlayerCardValue = spawnCard("Player");
    PlayerCardValue = eval(PlayerCardValue+"+"+ spawnCard("Player"));
    
    UpdateUi();
}


function HitCard(){
    PlayerCardValue = eval(PlayerCardValue+"+"+ spawnCard("Player"));
    UpdateUi();
}

 function DealerTurn(){
    hiddenCard.remove();
    
    if(DealerCardValue < 17){

        DealerCardValue = eval(DealerCardValue+"+"+ spawnCard("Dealer"));
        UpdateUi();
        window.setTimeout("DealerTurn()", 1000);
    }
    else{
        CalculateWin();
    }
    
}

function CalculateWin(){
    if(PlayerCardValue > 21){
        Result = "lose";
    }
    else if(DealerCardValue > 21){
        Result = "win";
    }
    else if(PlayerCardValue > DealerCardValue){
        Result = "win";
    }
    else if(DealerCardValue > PlayerCardValue){
        Result = "lose";
    }
    else{
        Result = "draw";
    }
    resultTxt.innerHTML = Result;  
}

function DealerHit(){

}

function getRandomCard(){
    return cardPictures[getRandomCardIndex()];
}


function getRandomCardIndex(){
    return Math.round(Math.random() * 52);
}

function getCardValue(card){
    console.log(card.substring(5,8));
  if(card.substring(6,9) == 'ace'){
      return 11;
  }
  else return 10;
}

//Joa was sagt der Name
function spawnAllCards(){
    for(let i = 0; i < cardPictures.length; i++){
    let img = doc.createElement('img');
    img.src = cardPictures[i];
    doc.body.appendChild(img);    
}
}

function spawnCard(Player){
    let img = doc.createElement('img');
    let rndNum = getRandomCardIndex();
    img.src = cardPictures[rndNum]; 
    doc.body.appendChild(img);
    if(Player === "Dealer")
    {
        DealerCardAmount++;
        DealerCardContainer.appendChild(img);
        
    }
    else{
        PlayerCardAmount++;
        PlayerCardContainer.appendChild(img);
        
    }
    return cardValues[rndNum];
    
}

function UpdateUi(){
    PlayerValueTxt.innerHTML = PlayerCardValue;
    DealerVlaueTxt.innerHTML = DealerCardValue;
}


HitButton.addEventListener("click", HitCard);
StayButton.addEventListener("click", DealerTurn);
