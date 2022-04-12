"use strict"

const BASE_URL = "http://deckofcardsapi.com/api/deck";
const $cardArea = $("#card-area");

/** Shuffle a new deck and draw a single card. */

async function shuffleAndDrawCard(){

  return await axios(`${BASE_URL}/new/draw/?count=1`);

  // console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
}

let deck = {};

/** Shuffle a new deck and draw cards from it. */

async function shuffleDeck() {
  const shuffledDeck = await axios(`${BASE_URL}/new/shuffle/?deck_count=1`);
  deck = shuffledDeck;
}

$("#get-card").on("submit", handleButtonClick);


async function handleButtonClick(evt){
  evt.preventDefault();

  const card = await axios(`${BASE_URL}/${deck.data.deck_id}/draw/?count=1`);
  $cardArea.html(`<img src="${card.data.cards[0].image}">`);

  if (card.data['remaining'] === 0) {
    alert("Deck finished!");
    $cardArea.empty();
    shuffleDeck();
  }
  console.log(card.data['remaining']);
}


shuffleDeck();