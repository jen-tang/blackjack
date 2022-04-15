document.addEventListener('DOMContentLoaded', main);


function main() {
  const playBtn = document.querySelector('.playBtn');
  playBtn.addEventListener('click', handleClick);
}

async function handleClick(evt) {
  evt.preventDefault();
  document.querySelector('.start').style.display="none";
  start();
}

function start(){
  let startValues = document.querySelector('#startValues').value;
  startValues = startValues.replace(/\s/g, '');
  const splitStart = startValues.split(',');
  let myDeck = new getDeck(); 

  console.log(myDeck);
  let [player, dealer] = firstDeal(myDeck);
  console.log('new game');
  const hit = document.querySelector('.hit');
  const standd = document.querySelector('.stand');
  hit.addEventListener('click', event => {
    deal(myDeck, '.playerCards', player, dealer);
  });
  standd.addEventListener('click', event => {
    stand(myDeck, player, dealer); 
  });
}

// deck inspiration from https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
function getDeck(){
  let startValues = document.querySelector('#startValues').value;
  startValues = startValues.replace(/\s/g, '');
  const splitStart = startValues.split(',');
  const splitStartCopy = splitStart.map((x) => x);
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
  deck = deck.map(x => {
    if(splitStart[0] === x.Value){
      splitStart.shift();
    }
    else{
      return x;
    }
});

deck = deck.filter(function( element ) {
  return element !== undefined;
});
console.log(deck);


  //shuffle deck
  deck = deck.sort( () => Math.random() - 0.5);
   //add form entered cards to top
  splitStartCopy.reverse().forEach(x => {
    x ? deck.push( {Value: x, Suit: "♠"}) : '';
  }); 

  deck = deck.reverse();
  return deck;
}

function firstDeal(deck){
  let startValues = document.querySelector('#startValues').value;
  startValues = startValues.replace(/\s/g, '');
  const splitStart = startValues.split(',');
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




  const playerTotal = elt('div','playerTotal',`Player hand - Total: ${handTotal(Player)}`);
  const dealerTotal = elt('div','dealerTotal','Computer Hand - Total: ?');
  const dealerCards = elt('div', 'dealerCards');
  const playerCards = elt('div', 'playerCards');

  const choice = elt('div', 'choice', elt('button','hit', 'Hit'), elt('button','stand', 'Stand'));
  //document.body.appendChild(ul);
  let game = document.querySelector('.game');
  
  game.appendChild(dealerTotal);
  game.appendChild(dealerCards);
  game.appendChild(playerTotal);
  game.appendChild(playerCards);
  game.appendChild(choice);

  makeCard(Dealer[0], '.dealerCards');
  let dealerHidden = document.querySelector('.dealerCards .card');
  dealerHidden.className = 'hiddenCard';
  makeCard(Player[0], '.playerCards');
  makeCard(Dealer[1], '.dealerCards');
  makeCard(Player[1], '.playerCards');

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
  return [Player, Dealer];
  
}

function makeCard(card, side) {

  const e = elt('p', 'card', `${card.Value} ${card.Suit}`);
  const check = document.querySelector(side);
  check.appendChild(e);
}


function handTotal(side) {
  side = side.map(x => x.Value);
  let aces = 0;
  for(let i=0;i<side.length;i++) {
    if(side[i] === 'A') {
      side[i] = 0;
      aces++;
    }
    else if (side[i] === 'J' || side[i] === 'Q'|| side[i] === 'K'){
      side[i] = 10;
    }
  }
  console.log(side);
  side = side.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  console.log(side);
  for(let i=aces;i>0;i--) {
    if(side + 11 > 21){
      side = side + 1;
    }
    else{
      side = side + 11;
    }
  }
  return side;
}


function stand(deck, Player, Dealer) {
  document.querySelector('.hiddenCard').classList.remove('hiddenCard');
  document.querySelector('.choice').style.display = 'none';
  document.querySelector('.dealerTotal').innerText = `Computer Hand - Total: ${handTotal(Dealer)}`;
  while (handTotal(Dealer) < 17) {
    deal(deck, '.dealerCards', Player, Dealer);
  }
  checkWinner(Player, Dealer);
}

function deal(deck, side, player, dealer) {
  const dealedCard = deck.shift();
  console.log(dealedCard);
  if (side === '.playerCards') {
    player.push(dealedCard);
    let ptotal = document.querySelector('.playerTotal');
    ptotal.innerText = `Player Hand - Total: ${handTotal(player)}`;
  }
  else {
    dealer.push(dealedCard);
    let dtotal = document.querySelector('.dealerTotal');
    dtotal.innerText = `Computer Hand - Total: ${handTotal(dealer)}`;
  }
  makeCard(dealedCard, side);

  if(handTotal(player) > 21) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const lost = elt('div', 'result', 'You lost :(');
    const game = document.querySelector('.game');
    game.appendChild(lost);

    const restart = elt('button', 'restart', 'Restart');
    restart.onclick = () => restartGame();
    game.appendChild(restart);
  }
  else if(handTotal(dealer) > 21) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const won = elt('div', 'result', 'You won :)');
    const game = document.querySelector('.game');
    game.appendChild(won);
    
  }
}


function checkWinner(player, dealer) {
  if(handTotal(dealer) <= 21 && handTotal(player) < handTotal(dealer)) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const lost = elt('div', 'result', 'You lost :(');
    const game = document.querySelector('.game');
    game.appendChild(lost);
  }
  else if(handTotal(player) <= 21 && handTotal(player) > handTotal(dealer)) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const won = elt('div', 'result', 'You won :)');
    const game = document.querySelector('.game');
    game.appendChild(won);
  }
  else if (handTotal(player) === handTotal(dealer)) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const tied = elt('div', 'result', 'You tied :|');
    const game = document.querySelector('.game');
    game.appendChild(tied);
  }
  const restart = elt('button', 'restart', 'Restart');
  restart.onclick = () => restartGame();
  const game = document.querySelector('.game');
  game.appendChild(restart);
}


function restartGame() {
  const game = document.querySelector('.game');
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.style.display = 'none');
  start();
}

function elt(type) {
	const ele = document.createElement(type);
  ele.className = arguments[1];
	// start at 2 or else we'll get the type argument!
	for (let i = 2; i < arguments.length; i++) {
		let child = arguments[i];
		if (typeof child === "string") {
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
}