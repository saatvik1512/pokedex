async function pokemon() {
    const pokemonPromises = [];
    for (let i = 1; i < 152; i++) {
        pokemonPromises.push(getAPI(i));
    }
    await Promise.all(pokemonPromises);
}


const mainContainer = document.querySelector('.all-pokemon-container');

async function getAPI(index){
    try { 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        const data = await response.json();
        const pokemonName = data.name;
        const pokemonSprite = data.sprites.front_default;
        const types = data.types.map(element => element.type.name)
        makePokeMonCard(pokemonName, pokemonSprite, types);
    } catch (error) {
        console.error(error)
    }
}

function makePokeMonCard(pokemonName, pokemonSprite, types){
    const div = document.createElement('div');
    div.innerHTML = `<h1 class="pokemon-heading">${pokemonName}</h1>
    <img src = ${pokemonSprite} alt = "pokemon image" class='pokemon-img'>`
    div.classList.add('pokemon-card')
    const subdiv = document.createElement('div');
    subdiv.classList.add('subdiv')
    div.append(subdiv)
    mainContainer.append(div);
    for (const item of types){
        const color = getPokemonColor(item);
        subdiv.innerHTML += `<p style = "padding: 0.4rem 1rem;
        border: 2px solid ${color};
        border-radius: 20px;">${item}</p>`
    }
}


function getPokemonColor(pokemonColor) {
    const typeColors = {
        normal: "#A8A878",
        fire: "orange",
        water: "blue",
        electric: "yellow",
        grass: "green",
        ice: "#98D8D8",
        fighting: "red",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "pink",
        poison: "purple"
    };
    return typeColors[pokemonColor]
}

pokemon()