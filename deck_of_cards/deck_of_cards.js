"use strict"

const BASE_URL = "http://deckofcardsapi.com/api/deck";
const $cardArea = $("#card-area");

/** Shuffle a new deck and draw a single card. */

async function shuffleAndDrawCard(){

  return await axios(`${BASE_URL}/new/draw/?count=1`);

  // console.log(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
}

// shuffleAndDrawCards();



/** Shuffle a new deck and draw cards from it. */

async function shuffleAndDrawFromSameDeck(evt){

  evt.preventDefault();

  const card1 = await shuffleAndDrawCard();

  const deckId = card1.data.deck_id;

  const card2 = await axios(`${BASE_URL}/${deckId}/draw/?count=1`);
  console.log("clicked");

  // $imgsrc = $('img').attr('src');
  $cardArea.append(`<img src="${card2.data.cards[0].image}">`);

//  console.log(`${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`);
//  console.log(`${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`);
}

// shuffleAndDrawFromSameDeck();


$("#get-card").on("submit", shuffleAndDrawFromSameDeck);
