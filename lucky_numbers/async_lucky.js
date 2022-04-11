"use strict";

const $factsarea = $('#facts-area');

const BASE_URL = "http://numbersapi.com";

// async function getLuckyNumsFacts() {
//   const response = await axios(`${BASE_URL}/1..3,5?json`);
//   showResults(response);
// }

// function showResults(response) {
//   for (let key in response.data) {
//     $factsarea.append(`<p>${response.data[key]}</p>`);
//   }
// }

// getLuckyNumsFacts();


async function getLuckyNumFacts() {

  const c1 = axios(`${BASE_URL}/1?json`);
  const c2 = axios(`${BASE_URL}/1?json`);
  const c3 = axios(`${BASE_URL}/1?json`);
  const c4 = axios(`${BASE_URL}/1?json`);

  const results = [await c1, await c2, await c3, await c4];

  showResults(results);
}

function showResults(results) {
  for (let fact of results) {
    $factsarea.append(`<p>${fact.data.text}</p>`);
  }
}

getLuckyNumFacts();
