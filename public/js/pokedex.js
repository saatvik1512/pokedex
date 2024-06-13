const input = document.querySelector('.pokemon-search');
const listOfPokemon = document.querySelector('.list-of-pokemon');
const list = document.querySelector('.list')
const submit = document.querySelector('.submitButton');
let selectedPokemon = null;

const url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

input.addEventListener('input', () => {
    // listOfPokemon.style.width = `${input.offsetWidth}px`;
    if (input.value.trim() === '') {
        listOfPokemon.innerHTML = '';
        return;
    }
    getThePokemon(input.value);
});

async function getThePokemon(pokemonName) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const arrayOfPokemon = data.results.map((item, index) => ({
            name: item.name,
            id: index + 1
        }));

        const filteredPokemon = arrayOfPokemon
            .filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))
            .slice(0, 10);  // Limit to 10 suggestions

        displaySuggestions(filteredPokemon);
    } catch (error) {
        console.log(error);
    }
}

function displaySuggestions(pokemonList) {
    listOfPokemon.innerHTML = '';  // Clear any previous suggestions
    
    pokemonList.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.textContent = pokemon.name;
        listOfPokemon.appendChild(listItem);
        list.style.display = 'block'
        listOfPokemon.style.width = `${input.offsetWidth}px`;

        listItem.addEventListener('click', ()=>{
            input.value = listItem.innerHTML;
            selectedPokemon = pokemon;
            list.style.display = 'none'
        })
    });
}

submit.addEventListener('click', () => {
    if (selectedPokemon) {
        window.location.href = `http://localhost:3000/pokedex/${selectedPokemon.id}`;
    } else {
        alert('Please select a Pokémon from the list.');
    }
});