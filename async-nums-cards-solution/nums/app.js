const FAV_NUMBER = 5;
const FAV_NUMBERS = [7, 11, 22];
const BASE_URL = "http://numbersapi.com";

// 1.

async function part1() {
  const resp = await axios({ url: `${BASE_URL}/${FAV_NUMBER}?json` });
  console.log(resp.data);
}

part1();


// 2.

async function part2() {
  const resp = await axios({ url: `${BASE_URL}/${FAV_NUMBERS}?json` });
  console.log(resp.data);
}

part2();


// 3.

async function part3() {
  const promises = Array.from(
      { length: 4 },
      () => axios({ url: `${BASE_URL}/${FAV_NUMBER}?json` }));

  const facts = [];
  for (p of promises) {
    facts.push((await p).data);
  }

  for (f of facts) {
    $("body").append(`<p>${f.text}</p>`);
  }
}

part3();
