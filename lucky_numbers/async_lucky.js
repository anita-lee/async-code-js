"use strict";

const $factsarea = $('#facts-area');

const BASE_URL = "http://numbersapi.com";

/** */

// async function getLuckyNumsFacts() {
//   const response = await axios(`${BASE_URL}/1..3,5?json`);
//   showResults(response);
// }

// /** */

// function showResults(response) {
//   for (let key in response.data) {
//     $factsarea.append(`<p>${response.data[key]}</p>`);
//   }
// }

// getLuckyNumsFacts();




/** Given a lucky number, return 4 facts of that number. */

async function getLuckyNumFacts(evt) {

  evt.preventDefault();

  const favNum = $("#lucky-num").val();

  const c1 = axios(`${BASE_URL}/${favNum}?json`);
  const c2 = axios(`${BASE_URL}/${favNum}?json`);
  const c3 = axios(`${BASE_URL}/${favNum}?json`);
  const c4 = axios(`${BASE_URL}/${favNum}?json`);

  const results = [await c1, await c2, await c3, await c4];

  $factsarea.empty();

  showResults(results);
}

/** Given results from Numbers API call, append the numbers facts to the page */

function showResults(results) {
  for (let fact of results) {
    $factsarea.append(`<p>${fact.data.text}</p>`);
  }
}


$("#lucky-num-form").on("submit", getLuckyNumFacts);