const input = document.querySelector('.pokemon-search');
const listOfPokemon = document.querySelector('.list-of-pokemon');
const list = document.querySelector('.list')
const submit = document.querySelector('.submitButton');

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
        const arrayOfPokemon = data.results.map(item => item.name);
        
        const filteredPokemon = arrayOfPokemon
            .filter(name => name.toLowerCase().includes(pokemonName.toLowerCase()))
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
        listItem.textContent = pokemon;
        listOfPokemon.appendChild(listItem);
        list.style.display = 'block'
        listOfPokemon.style.width = `${input.offsetWidth}px`;

        listItem.addEventListener('click', ()=>{
            input.value = listItem.innerText;
            list.style.display = 'none'
        })
    });
}

submit.addEventListener('click', (e)=>{
    if (input.value != ''){
        console.log(input.value)
    }

})