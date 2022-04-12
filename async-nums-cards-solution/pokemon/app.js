const BASE_URL = "https://pokeapi.co/api/v2";


// 1.

async function part1() {
  const data = await axios({ url: `${BASE_URL}/pokemon/?limit=1000` });
  console.log(data.data);
}

part1();


// 2.

async function part2() {
  const allPokemon = (
      await axios({ url: `${BASE_URL}/pokemon/?limit=1000` }))
      .data.results;

  let urls = [];

  for (let i = 0; i < 3; i++) {
    let randIdx = Math.floor(Math.random() * allPokemon.length);
    let url = allPokemon.splice(randIdx, 1)[0].url;
    urls.push(url);
  }

  const pokemonResponses = await Promise.all(urls.map(url => axios({ url })));
  const pokemonData = pokemonResponses.map(r => r.data);
  pokemonData.forEach(console.log);
}

part2();


// 3.

async function part3() {
  const allPokemon = (
      await axios({ url: `${BASE_URL}/pokemon/?limit=1000` }))
      .data.results;

  const urls = [];

  for (let i = 0; i < 3; i++) {
    let randIdx = Math.floor(Math.random() * allPokemon.length);
    let url = allPokemon.splice(randIdx, 1)[0].url;
    urls.push(url);
  }

  const pokemonResponses = await Promise.all(urls.map(url => axios({ url })));
  const pokemonData = pokemonResponses.map(r => r.data);

  const speciesResponses = await Promise.all(
      pokemonData.map(p => axios({ url: p.species.url })),
  );
  const speciesData = speciesResponses.map(sr => sr.data);

  let descriptions = speciesData.map(d => {
    const descriptionObj = d["flavor_text_entries"].find(
        entry => entry.language.name === "en",
    );

    const description = descriptionObj
        ? descriptionObj["flavor_text"]
        : "No description available.";
    return description;
  });

  descriptions.forEach((desc, i) => {
    console.log(`${pokemonData[i].name}: ${desc}`);
  });
}

part3();


// 4.

const $btn = $("button");
const $pokeArea = $("#pokemon-area");

async function handleButtonClick() {
  const allPokemon = (
      await axios({ url: `${BASE_URL}/pokemon/?limit=1000` }))
      .data.results;

  const urls = [];

  for (let i = 0; i < 3; i++) {
    let randIdx = Math.floor(Math.random() * allPokemon.length);
    let url = allPokemon.splice(randIdx, 1)[0].url;
    urls.push(url);
  }

  const pokemonResponses = await Promise.all(urls.map(url => axios({ url })));
  const pokemonData = pokemonResponses.map(r => r.data);

  const speciesResponses = await Promise.all(
      pokemonData.map(p => axios({ url: p.species.url })),
  );
  const speciesData = speciesResponses.map(sr => sr.data);

  let descriptions = speciesData.map(d => {
    const descriptionObj = d["flavor_text_entries"].find(
        entry => entry.language.name === "en",
    );

    const description = descriptionObj
        ? descriptionObj["flavor_text"]
        : "No description available.";

    return description;
  });

  $pokeArea.empty();

  descriptions.forEach((desc, i) => {
    const name = pokemonData[i].name;
    const imgSrc = pokemonData[i].sprites.front_default;
    const description = descriptions[i];
    $pokeArea.append(makePokeCard(name, imgSrc, description));
  });
}

$btn.on("click", handleButtonClick);

function makePokeCard(name, imgSrc, description) {
  return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} alt="${name}" />
        <p>${description}</p>
      </div>
    `;
}
