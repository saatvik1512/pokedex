const pokemonContainer = document.querySelector('.pokemon-detail-container');

document.addEventListener('DOMContentLoaded', async ()=> {
    const pokemonId = document.querySelector('h2').textContent.split(' ')[2];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
    const details = await pokemonSpecies.json();
    const data = await response.json();
    const pokemonSprite = data.sprites.other.home.front_default;
    const pokemonName = data.name;
    const pokemonDetail = details.flavor_text_entries[0].flavor_text;
    createPokemon(pokemonSprite, pokemonName, pokemonDetail);
})

function createPokemon(pokemonSprite, pokemonName, pokemonDetail){
    pokemonContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: fit-content;
    border: 2px solid;
    padding: 1rem;`

    pokemonContainer.innerHTML += `<img src = ${pokemonSprite} alt = 'pokemon' style="width: 149px">

    <h1 class='heading'>${pokemonName}</h1>
    <p class='detail'>${pokemonDetail}</p>`
}