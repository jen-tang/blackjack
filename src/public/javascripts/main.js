document.addEventListener('DOMContentLoaded', main);


function main() {
  const playBtn = document.querySelector('.playBtn');
  playBtn.addEventListener('click', handleClick);

}

async function handleClick(evt) {
  evt.preventDefault();
  let startValues = document.querySelector('#startValues').value;
  const splitStart = startValues.split(',');
  document.querySelector('.start').style.display="none";
  start(splitStart);
}

function start(splitStart){
  let myDeck = new getDeck(splitStart); 

  //console.log(myDeck);
  let [player, dealer] = firstDeal(myDeck,splitStart);
  /*console.log('called start');
  const hit = document.querySelector('.hit');
  const stand = document.querySelector('.stand');
  hit.onclick = () => dealer(deck, '.player', player, dealer);
  stand.onclick = () => standDeal(deck, player, dealer); */
}

// deck inspiration from https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
function getDeck(splitStart){
  //create deck array
  const suits = ["♠", "♥", "♣", "♦"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	let deck = new Array();
	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
	
  



/* console.log(splitStart);
check = deck.filter(function(objFromA) {
  return !splitStart.find(function(objFromB) {
      return (objFromA.Value === objFromB) && (objFromA.Value === "♠");
  })
}) */

  //shuffle deck
  deck = deck.sort( () => Math.random() - 0.5);
  
   //add form entered cards to top
  splitStart.reverse().forEach(x => {
    x ? deck.push( {Value: x, Suit: "♠"}) : '';
  });

  deck = deck.reverse();
  console.log(deck);
  return deck;
}

function firstDeal(deck, splitStart){
  let playerNum = 1;
  let dealerNum = 0;
  const length = splitStart.length;
  let Player = [];
  let Dealer = [];
  //deal 4 cards
  Dealer.push(deck.shift());
  Player.push(deck.shift());
  Dealer.push(deck.shift());
  Player.push(deck.shift());

/* let i = 0;
   while(i < length){
    if(i%2 === 0){
      Dealer.push(deck[0]);
      deck.shift();
      i++;
    }
    else{
      Player.push(deck[0]);
      deck.shift();
      i++;
    }

  } */
  //console.log(Dealer);
  return [Player, Dealer];
  
}