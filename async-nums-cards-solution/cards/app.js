const BASE_URL = "https://deckofcardsapi.com/api/deck";


// 1.

async function part1() {
  const data = await axios({ url: `${BASE_URL}/new/draw` });
  const { suit, value } = data.data.cards[0];
  console.log(value.toLowerCase(), "of", suit.toLowerCase());
}

part1();


// 2.

async function part2() {
  const firstCardResp = await axios({ url: `${BASE_URL}/new/draw` });
  const deckId = firstCardResp.data["deck_id"];

  const secondCardResp = await axios({ url: `${BASE_URL}/${deckId}/draw` });

  for (let respData of [firstCardResp, secondCardResp]) {
    const { suit, value } = respData.data.cards[0];
    console.log(value.toLowerCase(), "of", suit.toLowerCase());
  }
}

part2();


// 3.

const $cardArea = $("#card-area");
const $btn = $("button");
let deckId;

async function handleButtonClick() {
  let cardResp = await axios({ url: `${BASE_URL}/${deckId}/draw` });
  let cardSrc = cardResp.data.cards[0].image;

  let deg = Math.random() * 90 - 45;
  let x = Math.random() * 40 - 20;
  let y = Math.random() * 40 - 20;

  $cardArea.append(
      $("<img>", {
        src: cardSrc,
        css: { transform: `translate(${x}px, ${y}px) rotate(${deg}deg)` },
      }));

  if (cardResp.data['remaining'] === 0) $btn.remove();
}

async function setup() {
  const deckResp = await axios({ url: `${BASE_URL}/new/shuffle/` });
  debugger;
  deckId = deckResp.data["deck_id"];
  $btn.show().on("click", handleButtonClick);
}

setup();
