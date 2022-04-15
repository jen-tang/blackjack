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

  console.log(myDeck);
  let [player, dealer] = firstDeal(myDeck,splitStart);
  console.log('game begun');
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
  side = side.map(x => ['J', 'Q', 'K'].includes(x.Value) ? 10 : x.Value);
  let aces = 0;
  for(let i=0;i<side.length;i++) {
    if(side[i] === 'A') {
      aces++;
    }
  }
  side = side.filter(x => x === 'A' ? '' : x);
  side = parseInt(side.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0));
  for(let i=aces;i>0;i--) {
    side = aces ? (side + 11 > 21 ? side + 1 : side + 11) : side; 
  }
  console.log(side);
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
    console.log("hi");
    dtotal.innerText = `Computer Hand - Total: ${handTotal(dealer)}`;
  }
  makeCard(dealedCard, side);

  if(handTotal(player) > 21) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const lost = elt('div', 'lost', 'You lost :(');
    const game = document.querySelector('.game');
    game.appendChild(lost);

/*     const restart = document.createElement('button');
    restart.innerText = 'Restart?';
    restart.className = 'restart';
    restart.onclick = () => restartGame();
    document.querySelector('.game').appendChild(restart); */
  }
  else if(handTotal(dealer) > 21) {
    const choice = document.querySelector('.choice');
    choice.style.display = 'none';
    const won = elt('div', 'won', 'You won :)');
    const game = document.querySelector('.game');
    game.appendChild(won);
  }
  return handTotal(player);
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